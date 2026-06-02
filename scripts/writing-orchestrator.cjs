#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.join(ROOT, '_协作文档');
const ARCHIVE_ROOT = path.join(ROOT, '归档');
const TEMPLATE_ROOT = path.join(ROOT, '_templates');
const TODAY = new Date().toISOString().slice(0, 10);

function usage() {
  console.log(`Usage:
  node scripts/writing-orchestrator.cjs init --name <项目名> --topic <主题方向> [--workflow fast|standard|strict] [--confirmed]
  node scripts/writing-orchestrator.cjs status --project <项目目录>
  node scripts/writing-orchestrator.cjs claude-research --project <项目目录>
  node scripts/writing-orchestrator.cjs confirm-topic --project <项目目录> --choice <选题方向> [--note <说明>]
  node scripts/writing-orchestrator.cjs claude-revise --project <项目目录> --round <1|2|3>
  node scripts/writing-orchestrator.cjs auto-outline --project <项目目录> [--from-round <1|2|3>] [--rounds <1|2|3>]
  node scripts/writing-orchestrator.cjs claude-draft --project <项目目录>
  node scripts/writing-orchestrator.cjs image-brief --project <项目目录>
  node scripts/writing-orchestrator.cjs mark-images-done --project <项目目录> [--note <说明>]
  node scripts/writing-orchestrator.cjs mark-reviewed --project <项目目录> [--note <说明>]
  node scripts/writing-orchestrator.cjs finalize --project <项目目录>
  node scripts/writing-orchestrator.cjs mark-lessons-updated --project <项目目录> [--note <说明>]
  node scripts/writing-orchestrator.cjs validate --project <项目目录>
  node scripts/writing-orchestrator.cjs audit-archives [--profile auto|legacy|simple|standard|full]
  node scripts/writing-orchestrator.cjs archive --project <项目目录>

Examples:
  node scripts/writing-orchestrator.cjs init --name "AI白帽" --topic "最危险的 AI 为什么只给白帽用"
  node scripts/writing-orchestrator.cjs claude-research --project "_协作文档/AI白帽-2026-05-08"
`);
}

function parseArgs(argv) {
  const [cmd, ...rest] = argv;
  const args = { cmd };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = rest[i + 1];
    if (next === undefined || next.startsWith('--')) args[key] = true;
    else args[key] = rest[++i];
  }
  return args;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

const WORKFLOWS = {
  fast: {
    reviewRounds: 0,
    requireTopicConfirmation: false,
    requireResearch: false,
    requireImages: false,
    requireLessons: false,
    archiveProfile: 'simple',
    nextAfterInit: 'claude-draft',
  },
  standard: {
    reviewRounds: 1,
    requireTopicConfirmation: true,
    requireResearch: true,
    requireImages: false,
    requireLessons: false,
    archiveProfile: 'standard',
    nextAfterInit: 'claude-research',
  },
  strict: {
    reviewRounds: 3,
    requireTopicConfirmation: true,
    requireResearch: true,
    requireImages: true,
    requireLessons: true,
    archiveProfile: 'full',
    nextAfterInit: 'claude-research',
  },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(input) {
  return (input || '未命名项目')
    .trim()
    .replace(/[\\/:*?"<>|#%&{}$!'@+=`~，。？！、；：\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || '未命名项目';
}

function resolveProject(project) {
  if (!project) fail('缺少 --project');
  const p = path.isAbsolute(project) ? project : path.join(ROOT, project);
  if (!fs.existsSync(p)) fail(`项目目录不存在：${p}`);
  return p;
}

function writeNew(file, content) {
  if (fs.existsSync(file)) fail(`文件已存在，避免覆盖：${file}`);
  fs.writeFileSync(file, content, 'utf8');
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function updateState(projectDir, patch) {
  const file = path.join(projectDir, 'state.json');
  const state = fs.existsSync(file) ? readJson(file) : {};
  Object.assign(state, patch, { updated_at: new Date().toISOString() });
  writeJson(file, state);
  return state;
}

function getState(projectDir) {
  const file = path.join(projectDir, 'state.json');
  return fs.existsSync(file) ? readJson(file) : {};
}

function requireFile(projectDir, name) {
  if (!fs.existsSync(path.join(projectDir, name))) fail(`缺少文件：${name}`);
}

function requireState(projectDir, key, message) {
  const state = getState(projectDir);
  if (!state[key]) fail(message);
}

function workflowNameFromState(state) {
  return Object.prototype.hasOwnProperty.call(WORKFLOWS, state.workflow) ? state.workflow : 'standard';
}

function getWorkflow(projectDir) {
  return WORKFLOWS[workflowNameFromState(getState(projectDir))];
}

function normalizeWorkflowName(name) {
  const workflow = name || 'standard';
  if (!Object.prototype.hasOwnProperty.call(WORKFLOWS, workflow)) {
    fail(`未知 workflow：${workflow}，可选 fast|standard|strict`);
  }
  return workflow;
}

function normalizeArchiveProfile(profile) {
  const value = profile || 'auto';
  if (!['auto', 'legacy', 'simple', 'standard', 'full'].includes(value)) {
    fail(`未知 archive profile：${value}，可选 auto|legacy|simple|standard|full`);
  }
  return value;
}

function parsePositiveInt(value, fallback, min, max) {
  const n = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    fail(`数值必须是 ${min}-${max} 的整数`);
  }
  return n;
}

function readTemplate(...parts) {
  return fs.readFileSync(path.join(TEMPLATE_ROOT, ...parts), 'utf8');
}

function renderTemplate(content, values) {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match;
  });
}

function renderTemplateFile(parts, values) {
  return renderTemplate(readTemplate(...parts), values);
}

function roundFiles(round) {
  return {
    reviewFile: round === 1 ? '03-review-round-1.md' : round === 2 ? '05-review-round-2.md' : '07-review-round-3.md',
    inputOutline: round === 1 ? '02-outline.md' : round === 2 ? '04-outline-revised-round-1.md' : '06-outline-revised-round-2.md',
    outputOutline: round === 1 ? '04-outline-revised-round-1.md' : round === 2 ? '06-outline-revised-round-2.md' : '08-outline-final.md',
  };
}

function projectFiles(projectDir) {
  return [
    '00-topic.md',
    '01-research.md',
    '02-outline.md',
    '03-review-round-1.md',
    '04-outline-revised-round-1.md',
    '05-review-round-2.md',
    '06-outline-revised-round-2.md',
    '07-review-round-3.md',
    '08-outline-final.md',
    '09-draft.md',
    '10-image-brief.md',
    '11-final.md',
  ].map(name => ({ name, file: path.join(projectDir, name), exists: fs.existsSync(path.join(projectDir, name)) }));
}

function archiveRequiredFiles(profile) {
  const common = ['00-topic.md', '09-draft.md', '11-final.md', 'state.json'];
  if (profile === 'simple') return common;
  if (profile === 'standard') {
    return [
      '00-topic.md',
      '01-research.md',
      '02-outline.md',
      '03-review-round-1.md',
      '04-outline-revised-round-1.md',
      '08-outline-final.md',
      '09-draft.md',
      '11-final.md',
      'state.json',
    ];
  }
  return [
    '00-topic.md',
    '01-research.md',
    '02-outline.md',
    '03-review-round-1.md',
    '04-outline-revised-round-1.md',
    '05-review-round-2.md',
    '06-outline-revised-round-2.md',
    '07-review-round-3.md',
    '08-outline-final.md',
    '09-draft.md',
    '10-image-brief.md',
    '11-final.md',
    'state.json',
  ];
}

function finalOutlineForRound(round) {
  if (round <= 0) return '02-outline.md';
  return roundFiles(round).outputOutline;
}

function runClaude(projectDir, prompt, options = {}) {
  const claude = spawnSync('zsh', ['-lc', 'command -v claude'], { encoding: 'utf8' });
  if (claude.status !== 0) fail('未找到 claude CLI');

  const expectedFile = options.expectedFile ? path.join(projectDir, options.expectedFile) : null;
  const result = spawnSync('claude', [
    '-p',
    prompt,
    '--permission-mode', 'acceptEdits',
    '--output-format', 'json',
    '--add-dir', ROOT,
  ], {
    cwd: projectDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: Number(options.timeoutMs || 180000),
    killSignal: 'SIGKILL',
  });

  const log = [
    `# Claude Run`,
    ``,
    `时间：${new Date().toISOString()}`,
    `退出码：${result.status}`,
    ``,
    `## stdout`,
    ``,
    '```text',
    result.stdout || '',
    '```',
    ``,
    `## stderr`,
    ``,
    '```text',
    result.stderr || '',
    '```',
    '',
  ].join('\n');
  const logDir = path.join(projectDir, '_logs');
  ensureDir(logDir);
  fs.writeFileSync(path.join(logDir, `claude-${Date.now()}.md`), log, 'utf8');

  const expectedExists = expectedFile && fs.existsSync(expectedFile);
  if (result.status !== 0 && !expectedExists) {
    if (options.softFail) {
      console.error(`Claude 执行失败，查看 ${logDir}`);
      return false;
    }
    fail(`Claude 执行失败，查看 ${logDir}`);
  }
  if (result.error && result.error.code === 'ETIMEDOUT' && expectedExists) {
    console.error(`[Claude] 已生成 ${options.expectedFile}，但 CLI 超时未退出；按文件生成成功继续。`);
  }
  process.stdout.write(result.stdout || '');
  return true;
}

function init(args) {
  if (!args.name) fail('缺少 --name');
  if (!args.topic) fail('缺少 --topic');
  const workflowName = normalizeWorkflowName(args.workflow);
  const workflow = WORKFLOWS[workflowName];
  const confirmed = Boolean(args.confirmed);

  ensureDir(PROJECT_ROOT);
  const dir = path.join(PROJECT_ROOT, `${slugify(args.name)}-${TODAY}`);
  ensureDir(dir);
  ensureDir(path.join(dir, '_briefs'));
  ensureDir(path.join(dir, '_knowledge_base'));
  ensureDir(path.join(dir, 'images'));
  ensureDir(path.join(dir, '_logs'));

  const values = {
    name: args.name,
    topic: args.topic,
    date: TODAY,
    timestamp: new Date().toISOString(),
  };

  writeNew(path.join(dir, '00-topic.md'), renderTemplateFile(['project', '00-topic.md'], values));
  writeNew(path.join(dir, '_briefs', `${slugify(args.name)}-商单brief.md`), renderTemplateFile(['briefs', '商单brief.md'], values));
  writeJson(path.join(dir, 'state.json'), {
    project: args.name,
    topic: args.topic,
    created_at: values.timestamp,
    updated_at: values.timestamp,
    workflow: workflowName,
    archive_profile: workflow.archiveProfile,
    stage: 'initialized',
    rounds_completed: 0,
    required_review_rounds: workflow.reviewRounds,
    topic_confirmed: confirmed || !workflow.requireTopicConfirmation,
    confirmed_topic_choice: confirmed ? args.topic : '',
    draft_reviewed: false,
    images_done: false,
    lessons_updated: false,
    next: confirmed && workflow.requireResearch ? 'claude-research' : workflow.nextAfterInit,
  });

  console.log(dir);
}

function status(args) {
  const dir = resolveProject(args.project);
  const stateFile = path.join(dir, 'state.json');
  const state = fs.existsSync(stateFile) ? readJson(stateFile) : {};
  console.log(`# ${path.basename(dir)}\n`);
  console.log(`stage: ${state.stage || 'unknown'}`);
  console.log(`workflow: ${workflowNameFromState(state)}`);
  console.log(`required_review_rounds: ${state.required_review_rounds ?? getWorkflow(dir).reviewRounds}`);
  console.log(`next: ${state.next || 'unknown'}\n`);
  for (const f of projectFiles(dir)) {
    console.log(`${f.exists ? '[x]' : '[ ]'} ${f.name}`);
  }
}

function claudeResearch(args) {
  const dir = resolveProject(args.project);
  const workflow = getWorkflow(dir);
  const prompt = renderTemplateFile(['prompts', 'claude-research.md'], { projectDir: dir, root: ROOT });
  runClaude(dir, prompt);
  updateState(dir, { stage: 'research_and_outline', next: workflow.requireTopicConfirmation ? 'confirm-topic' : 'auto-outline' });
}

function confirmTopic(args) {
  const dir = resolveProject(args.project);
  if (!args.choice) fail('缺少 --choice，请写明用户确认的选题方向');
  requireFile(dir, '02-outline.md');
  updateState(dir, {
    stage: 'topic_confirmed',
    topic_confirmed: true,
    confirmed_topic_choice: args.choice,
    topic_confirmed_note: args.note || '',
    topic_confirmed_at: new Date().toISOString(),
    next: 'auto-outline',
  });
  console.log(`已确认选题：${args.choice}`);
}

function reviewFileForRound(round) {
  return round === 1 ? '03-review-round-1.md' : round === 2 ? '05-review-round-2.md' : '07-review-round-3.md';
}

function createReviewSkeleton(projectDir, reviewFile, round) {
  const fullPath = path.join(projectDir, reviewFile);
  if (fs.existsSync(fullPath)) return;
  const inputOutline = round === 1 ? '02-outline.md' : round === 2 ? '04-outline-revised-round-1.md' : '06-outline-revised-round-2.md';
  const skeleton = `# ${reviewFile.replace('.md', '')}: self-review

> 模式：self-review（替代原 codex 视角）
> 弃用说明：2026-06 起弃用 codex MCP（CLI PATH 解析失败 + 维护成本高），改由 Claude 按 codex 视角写敌对审视。
> 输入大纲：${inputOutline}
> 输出：本文件

## 审查框架

按 codex 视角模拟：敌对审视，专门找**事实硬伤、论据链断裂、隐含假设、反直觉点是否真有依据**。

## 事实硬伤 / 待核实

### 已核实（可放心写）
-

### 仍需核实（写作时需小心）
-

## 论据链断裂

## 隐含假设

## 反直觉点是否真有依据

| 章节 | 反直觉点 | 依据 | 评级 |
|---|---|---|---|
| | | | |

## 标题建议

## 修改优先级

P0（必须改）：
-
P1（建议改）：
-
P2（可选）：
-

## 总体评价
`;
  fs.writeFileSync(fullPath, skeleton, 'utf8');
}

function selfReview(args) {
  const dir = resolveProject(args.project);
  const round = Number(args.round || 1);
  const reviewFile = reviewFileForRound(round);
  if (fs.existsSync(path.join(dir, reviewFile))) {
    console.error(`已存在 ${reviewFile}，跳过骨架创建。请直接编辑该文件。`);
    return;
  }
  createReviewSkeleton(dir, reviewFile, round);
  console.log(reviewFile);
  updateState(dir, { stage: `review_round_${round}_skeleton`, next: 'edit-review-file' });
}

function claudeRevise(args) {
  const dir = resolveProject(args.project);
  const round = Number(args.round || 1);
  const { outputOutline } = roundFiles(round);
  runClaude(dir, buildRevisePrompt(dir, round), { expectedFile: outputOutline });
  updateState(dir, {
    stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
    rounds_completed: round,
    next: round >= 3 ? 'claude-draft' : `self-review --round ${round + 1}`,
  });
}

function buildRevisePrompt(dir, round) {
  return renderTemplateFile(['prompts', 'claude-revise.md'], {
    projectDir: dir,
    ...roundFiles(round),
  });
}

function autoOutline(args) {
  const dir = resolveProject(args.project);
  const workflow = getWorkflow(dir);
  if (workflow.requireTopicConfirmation) {
    requireState(dir, 'topic_confirmed', '选题尚未确认。请先运行 confirm-topic --choice <选题方向>');
  }
  ensureDir(path.join(dir, '_logs'));
  const startRound = Number(args['from-round'] || 1);
  const targetRounds = parsePositiveInt(args.rounds, getState(dir).required_review_rounds ?? workflow.reviewRounds, 0, 3);

  if (targetRounds === 0) {
    if (fs.existsSync(path.join(dir, '02-outline.md')) && !fs.existsSync(path.join(dir, '08-outline-final.md'))) {
      fs.copyFileSync(path.join(dir, '02-outline.md'), path.join(dir, '08-outline-final.md'));
    }
    updateState(dir, { stage: 'outline_final', rounds_completed: 0, required_review_rounds: 0, next: 'claude-draft' });
    console.log(path.join(dir, '08-outline-final.md'));
    return;
  }

  for (let round = startRound; round <= targetRounds; round++) {
    const reviewFile = round === 1 ? '03-review-round-1.md' : round === 2 ? '05-review-round-2.md' : '07-review-round-3.md';
    const outputOutline = round === 1 ? '04-outline-revised-round-1.md' : round === 2 ? '06-outline-revised-round-2.md' : '08-outline-final.md';

    if (!fs.existsSync(path.join(dir, reviewFile))) {
      console.error(`[auto-outline] 第 ${round} 轮 self-review 骨架 -> ${reviewFile}`);
      createReviewSkeleton(dir, reviewFile, round);
      updateState(dir, { stage: `review_round_${round}_skeleton`, next: `edit ${reviewFile}` });
      console.error(`[auto-outline] 已创建 ${reviewFile}。请按骨架写 self-review，然后重新运行 auto-outline 继续。`);
      return;
    } else {
      console.error(`[auto-outline] 已存在 ${reviewFile}，跳过骨架创建。`);
    }

    if (!fs.existsSync(path.join(dir, outputOutline))) {
      console.error(`[auto-outline] Claude 第 ${round} 轮修改 -> ${outputOutline}`);
      const ok = runClaude(dir, buildRevisePrompt(dir, round), {
        expectedFile: outputOutline,
        softFail: true,
        timeoutMs: 180000,
      });
      if (!ok && !fs.existsSync(path.join(dir, outputOutline))) {
        fail(`Claude 未完成 ${outputOutline}，请重试或手动编写。`);
      }
      updateState(dir, {
        stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
        rounds_completed: round,
        required_review_rounds: targetRounds,
        next: round >= targetRounds ? 'claude-draft' : `self-review --round ${round + 1}`,
      });
    } else {
      console.error(`[auto-outline] 已存在 ${outputOutline}，跳过修改。`);
      updateState(dir, {
        stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
        rounds_completed: round,
        required_review_rounds: targetRounds,
        next: round >= targetRounds ? 'claude-draft' : `self-review --round ${round + 1}`,
      });
    }
  }

  const finalOutline = finalOutlineForRound(targetRounds);
  if (finalOutline !== '08-outline-final.md' && fs.existsSync(path.join(dir, finalOutline))) {
    fs.copyFileSync(path.join(dir, finalOutline), path.join(dir, '08-outline-final.md'));
  }
  updateState(dir, { stage: 'outline_final', rounds_completed: targetRounds, required_review_rounds: targetRounds, next: 'claude-draft' });
  console.log(path.join(dir, '08-outline-final.md'));
}

function claudeDraft(args) {
  const dir = resolveProject(args.project);
  const workflow = getWorkflow(dir);
  if (workflow.requireTopicConfirmation) {
    requireState(dir, 'topic_confirmed', '选题尚未确认，不能进入初稿。请先运行 confirm-topic');
  }
  if (workflow.reviewRounds > 0) requireFile(dir, '08-outline-final.md');
  if (workflow.requireResearch) requireFile(dir, '01-research.md');
  const promptFile = workflow.reviewRounds > 0 ? ['prompts', 'claude-draft.md'] : ['prompts', 'claude-draft-fast.md'];
  const prompt = renderTemplateFile(promptFile, { projectDir: dir, root: ROOT });
  runClaude(dir, prompt);
  updateState(dir, {
    stage: 'draft_created',
    draft_reviewed: false,
    images_done: false,
    next: workflow.requireImages ? 'image-brief' : 'mark-reviewed',
  });
}

function imageBrief(args) {
  const dir = resolveProject(args.project);
  requireFile(dir, '09-draft.md');
  const file = path.join(dir, '10-image-brief.md');
  fs.writeFileSync(file, readTemplate('prompts', 'image-brief.md'), 'utf8');
  updateState(dir, { stage: 'image_brief_created', images_done: false, next: 'mark-images-done' });
  console.log(file);
}

function markImagesDone(args) {
  const dir = resolveProject(args.project);
  if (getWorkflow(dir).requireImages) requireFile(dir, '10-image-brief.md');
  updateState(dir, {
    stage: 'images_done',
    images_done: true,
    images_done_note: args.note || '',
    images_done_at: new Date().toISOString(),
    next: 'mark-reviewed',
  });
  console.log('已标记配图完成');
}

function markReviewed(args) {
  const dir = resolveProject(args.project);
  requireFile(dir, '09-draft.md');
  updateState(dir, {
    stage: 'draft_reviewed',
    draft_reviewed: true,
    draft_review_note: args.note || '',
    draft_reviewed_at: new Date().toISOString(),
    next: 'finalize',
  });
  console.log('已标记审校完成');
}

function finalize(args) {
  const dir = resolveProject(args.project);
  const workflow = getWorkflow(dir);
  const draft = path.join(dir, '09-draft.md');
  const final = path.join(dir, '11-final.md');
  if (!fs.existsSync(draft)) fail('缺少 09-draft.md');
  requireState(dir, 'draft_reviewed', '尚未标记三遍审校完成。请先运行 mark-reviewed');
  if (workflow.requireImages) requireState(dir, 'images_done', '尚未标记配图完成。请先运行 mark-images-done');
  if (!fs.existsSync(final)) {
    fs.copyFileSync(draft, final);
  }
  updateState(dir, { stage: 'final_ready', next: workflow.requireLessons ? 'mark-lessons-updated' : 'archive' });
  console.log(final);
}

function markLessonsUpdated(args) {
  const dir = resolveProject(args.project);
  updateState(dir, {
    stage: 'lessons_updated',
    lessons_updated: true,
    lessons_updated_note: args.note || '',
    lessons_updated_at: new Date().toISOString(),
    next: 'archive',
  });
  console.log('已标记写作经验教训更新完成');
}

function listMarkdownFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '_logs') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function relativeToProject(projectDir, file) {
  return path.relative(projectDir, file) || '.';
}

function validateProject(projectDir) {
  const errors = [];
  const warnings = [];
  const state = getState(projectDir);
  const workflow = WORKFLOWS[workflowNameFromState(state)];
  const requiredDirs = ['_briefs', '_knowledge_base', 'images'];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(path.join(projectDir, dir))) errors.push(`缺少目录：${dir}/`);
  }
  if (!fs.existsSync(path.join(projectDir, '_logs'))) warnings.push('缺少本地日志目录：_logs/');
  if (!fs.existsSync(path.join(projectDir, '00-topic.md'))) errors.push('缺少文件：00-topic.md');
  if (!fs.existsSync(path.join(projectDir, 'state.json'))) errors.push('缺少文件：state.json');

  const stateFile = path.join(projectDir, 'state.json');
  if (fs.existsSync(stateFile)) {
    try {
      readJson(stateFile);
    } catch (err) {
      errors.push(`state.json 不是合法 JSON：${err.message}`);
    }
  }

  const files = projectFiles(projectDir);
  const existingNames = new Set(files.filter(f => f.exists).map(f => f.name));
  const finalStages = new Set(['final_ready', 'lessons_updated', 'archived']);
  if (finalStages.has(state.stage) && !existingNames.has('11-final.md')) {
    errors.push('state.stage 已到最终阶段，但缺少 11-final.md');
  }
  if (state.stage === 'research_and_outline' && !state.topic_confirmed) {
    warnings.push('已完成调研和初版大纲，但尚未确认选题');
  }
  if (workflow.requireTopicConfirmation && (state.rounds_completed > 0 || existingNames.has('08-outline-final.md')) && !state.topic_confirmed) {
    errors.push('大纲审查已开始或完成，但 state.topic_confirmed 不是 true');
  }
  if ((state.rounds_completed || 0) >= (state.required_review_rounds ?? workflow.reviewRounds) && (state.required_review_rounds ?? workflow.reviewRounds) > 0 && !existingNames.has('08-outline-final.md')) {
    warnings.push('大纲审查已完成，但缺少 08-outline-final.md');
  }
  if (workflow.requireResearch && (existingNames.has('09-draft.md') || finalStages.has(state.stage)) && !existingNames.has('01-research.md')) {
    errors.push('当前工作流要求调研，但缺少 01-research.md');
  }
  if (state.stage === 'draft_created' && !state.draft_reviewed) {
    warnings.push('初稿已生成，但尚未标记三遍审校完成');
  }
  if (finalStages.has(state.stage) && !state.draft_reviewed) {
    errors.push('已进入初稿/最终阶段，但尚未标记三遍审校完成');
  }
  if (state.stage === 'image_brief_created' && !state.images_done) {
    warnings.push('配图 brief 已生成，但尚未标记配图完成');
  }
  if (workflow.requireImages && finalStages.has(state.stage) && !state.images_done) {
    errors.push('已进入配图/最终阶段，但尚未标记配图完成');
  }
  if (workflow.requireLessons && state.stage === 'final_ready' && !state.lessons_updated) {
    warnings.push('最终稿已就绪，但尚未标记写作经验教训更新完成');
  }

  const research = path.join(projectDir, '01-research.md');
  if (fs.existsSync(research)) {
    const content = fs.readFileSync(research, 'utf8');
    if (!/https?:\/\//.test(content)) warnings.push('01-research.md 没有检测到来源链接');
    if (!/(信息收集时间|收集时间|更新时间|日期)/.test(content)) warnings.push('01-research.md 没有检测到信息时间字段');
  }

  for (const md of listMarkdownFiles(projectDir)) {
    const content = fs.readFileSync(md, 'utf8');
    if (/\bTODO\b|待补充|待确认/.test(content)) warnings.push(`${relativeToProject(projectDir, md)} 仍包含 TODO/待补充/待确认`);

    const imageRe = /!\[[^\]]*\]\(([^)]+)\)/g;
    for (const match of content.matchAll(imageRe)) {
      const raw = match[1].trim().replace(/^<|>$/g, '').split(/\s+/)[0];
      if (!raw || /^(https?:|data:|#|\/)/.test(raw)) continue;
      const imagePath = path.resolve(path.dirname(md), raw);
      if (!fs.existsSync(imagePath)) {
        warnings.push(`${relativeToProject(projectDir, md)} 引用的图片不存在：${raw}`);
      }
    }
  }

  console.log(`# ${path.basename(projectDir)} validate\n`);
  if (errors.length === 0) console.log('errors: 0');
  else {
    console.log(`errors: ${errors.length}`);
    for (const item of errors) console.log(`- ${item}`);
  }
  console.log(`warnings: ${warnings.length}`);
  for (const item of warnings) console.log(`- ${item}`);

  return { errors, warnings };
}

function validate(args) {
  const dir = resolveProject(args.project);
  const result = validateProject(dir);
  if (result.errors.length > 0) process.exit(1);
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(dir, entry.name))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function collectImageWarnings(projectDir) {
  const warnings = [];
  for (const md of listMarkdownFiles(projectDir)) {
    const content = fs.readFileSync(md, 'utf8');
    const imageRe = /!\[[^\]]*\]\(([^)]+)\)/g;
    for (const match of content.matchAll(imageRe)) {
      const raw = match[1].trim().replace(/^<|>$/g, '').split(/\s+/)[0];
      if (!raw || /^(https?:|data:|#|\/)/.test(raw)) continue;
      const imagePath = path.resolve(path.dirname(md), raw);
      if (!fs.existsSync(imagePath)) {
        warnings.push(`${relativeToProject(projectDir, md)} 引用的图片不存在：${raw}`);
      }
    }
  }
  return warnings;
}

function inferArchiveProfile(dir, requestedProfile) {
  const profile = normalizeArchiveProfile(requestedProfile);
  if (profile !== 'auto') return profile;
  const stateFile = path.join(dir, 'state.json');
  if (!fs.existsSync(stateFile)) return 'legacy';
  try {
    const state = readJson(stateFile);
    if (state.archive_profile) return state.archive_profile;
    return WORKFLOWS[workflowNameFromState(state)].archiveProfile;
  } catch (_) {
    return 'legacy';
  }
}

function auditArchiveDir(dir, requestedProfile) {
  const profile = inferArchiveProfile(dir, requestedProfile);
  const missingFiles = profile === 'legacy' ? [] : archiveRequiredFiles(profile).filter(name => !fs.existsSync(path.join(dir, name)));
  const missingDirs = profile === 'legacy'
    ? []
    : ['_briefs', '_knowledge_base', 'images'].filter(name => !fs.existsSync(path.join(dir, name)));
  const warnings = [];

  if (profile !== 'legacy' && fs.existsSync(path.join(dir, '_协作文档'))) {
    warnings.push('包含嵌套 _协作文档/，建议迁移为归档根目录标准文件');
  }
  warnings.push(...collectImageWarnings(dir));

  if (profile === 'legacy' && listMarkdownFiles(dir).length === 0) {
    warnings.push('legacy 归档中没有 Markdown 文件');
  }

  const stateFile = path.join(dir, 'state.json');
  if (profile !== 'legacy' && fs.existsSync(stateFile)) {
    try {
      const state = readJson(stateFile);
      const workflow = WORKFLOWS[workflowNameFromState(state)];
      const requiredKeys = ['draft_reviewed'];
      if (workflow.requireTopicConfirmation) requiredKeys.push('topic_confirmed');
      if (workflow.requireImages) requiredKeys.push('images_done');
      if (workflow.requireLessons) requiredKeys.push('lessons_updated');
      for (const key of requiredKeys) {
        if (!state[key]) warnings.push(`state.${key} 不是 true`);
      }
      if (state.stage !== 'archived') warnings.push(`state.stage 不是 archived：${state.stage || 'unknown'}`);
    } catch (err) {
      warnings.push(`state.json 不是合法 JSON：${err.message}`);
    }
  }

  const isCurrent = missingFiles.length === 0 && missingDirs.length === 0 && warnings.length === 0;
  return { dir, profile, isCurrent, missingFiles, missingDirs, warnings };
}

function auditArchives(args) {
  const dirs = listDirs(ARCHIVE_ROOT);
  if (dirs.length === 0) {
    console.log('没有归档项目。');
    return;
  }

  let failed = 0;
  for (const dir of dirs) {
    const report = auditArchiveDir(dir, args.profile);
    if (!report.isCurrent) failed += 1;
    console.log(`\n# ${path.basename(dir)}`);
    console.log(`profile: ${report.profile}`);
    console.log(report.isCurrent ? 'status: ok' : 'status: needs-migration');
    if (report.missingFiles.length) console.log(`missing files: ${report.missingFiles.join(', ')}`);
    if (report.missingDirs.length) console.log(`missing dirs: ${report.missingDirs.join(', ')}`);
    for (const warning of report.warnings) console.log(`warning: ${warning}`);
  }

  console.log(`\nsummary: ${dirs.length - failed} ok, ${failed} needs-migration`);
  if (failed > 0) process.exitCode = 1;
}

function archive(args) {
  const dir = resolveProject(args.project);
  const workflow = getWorkflow(dir);
  const result = validateProject(dir);
  if (result.errors.length > 0) fail('项目校验失败，已停止归档。');
  requireFile(dir, '11-final.md');
  if (workflow.requireLessons) {
    requireState(dir, 'lessons_updated', '归档前请先更新 写作参考/写作经验教训.md，并运行 mark-lessons-updated');
  }

  ensureDir(ARCHIVE_ROOT);
  const target = path.join(ARCHIVE_ROOT, path.basename(dir));
  if (path.resolve(dir).startsWith(path.resolve(ARCHIVE_ROOT) + path.sep)) {
    fail(`项目已经在归档目录中：${dir}`);
  }
  if (fs.existsSync(target)) {
    fail(`归档目录已存在，避免覆盖：${target}`);
  }

  updateState(dir, { stage: 'archived', archive_profile: workflow.archiveProfile, next: workflow.requireLessons ? 'done' : 'done' });
  fs.renameSync(dir, target);
  console.log(target);
}

const args = parseArgs(process.argv.slice(2));
if (!args.cmd || args.cmd === 'help' || args.cmd === '--help') usage();
else if (args.cmd === 'init') init(args);
else if (args.cmd === 'status') status(args);
else if (args.cmd === 'claude-research') claudeResearch(args);
else if (args.cmd === 'confirm-topic') confirmTopic(args);
else if (args.cmd === 'self-review') selfReview(args);
else if (args.cmd === 'auto-outline') autoOutline(args);
else if (args.cmd === 'claude-revise') claudeRevise(args);
else if (args.cmd === 'claude-draft') claudeDraft(args);
else if (args.cmd === 'image-brief') imageBrief(args);
else if (args.cmd === 'mark-images-done') markImagesDone(args);
else if (args.cmd === 'mark-reviewed') markReviewed(args);
else if (args.cmd === 'finalize') finalize(args);
else if (args.cmd === 'mark-lessons-updated') markLessonsUpdated(args);
else if (args.cmd === 'validate') validate(args);
else if (args.cmd === 'audit-archives') auditArchives(args);
else if (args.cmd === 'archive') archive(args);
else usage();
