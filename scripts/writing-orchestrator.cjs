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
  node scripts/writing-orchestrator.cjs init --name <项目名> --topic <主题方向>
  node scripts/writing-orchestrator.cjs status --project <项目目录>
  node scripts/writing-orchestrator.cjs claude-research --project <项目目录>
  node scripts/writing-orchestrator.cjs codex-review-prompt --project <项目目录> --round <1|2|3>
  node scripts/writing-orchestrator.cjs claude-revise --project <项目目录> --round <1|2|3>
  node scripts/writing-orchestrator.cjs codex-review --project <项目目录> --round <1|2|3>
  node scripts/writing-orchestrator.cjs auto-outline --project <项目目录> [--from-round <1|2|3>]
  node scripts/writing-orchestrator.cjs claude-draft --project <项目目录>
  node scripts/writing-orchestrator.cjs image-brief --project <项目目录>
  node scripts/writing-orchestrator.cjs finalize --project <项目目录>
  node scripts/writing-orchestrator.cjs validate --project <项目目录>
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
    if (a.startsWith('--')) args[a.slice(2)] = rest[++i];
  }
  return args;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

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

function runCodex(projectDir, prompt, options = {}) {
  const codex = spawnSync('zsh', ['-lc', 'command -v codex'], { encoding: 'utf8' });
  if (codex.status !== 0) fail('未找到 codex CLI');

  const expectedFile = options.expectedFile ? path.join(projectDir, options.expectedFile) : null;
  const result = spawnSync('codex', [
    'exec',
    '--skip-git-repo-check',
    '-C', ROOT,
    '--sandbox', 'danger-full-access',
    '--output-last-message', path.join(projectDir, '_logs', `codex-last-${Date.now()}.txt`),
    prompt,
  ], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: Number(options.timeoutMs || 240000),
    killSignal: 'SIGKILL',
  });

  const log = [
    `# Codex Run`,
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
  fs.writeFileSync(path.join(logDir, `codex-${Date.now()}.md`), log, 'utf8');

  const expectedExists = expectedFile && fs.existsSync(expectedFile);
  if (result.status !== 0 && !expectedExists) {
    if (options.softFail) {
      console.error(`Codex 执行失败，查看 ${logDir}`);
      return false;
    }
    fail(`Codex 执行失败，查看 ${logDir}`);
  }
  if (result.error && result.error.code === 'ETIMEDOUT' && expectedExists) {
    console.error(`[Codex] 已生成 ${options.expectedFile}，但 CLI 超时未退出；按文件生成成功继续。`);
  }
  process.stdout.write(result.stdout || '');
  return true;
}

function init(args) {
  if (!args.name) fail('缺少 --name');
  if (!args.topic) fail('缺少 --topic');

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
    stage: 'initialized',
    rounds_completed: 0,
    next: 'claude-research',
  });

  console.log(dir);
}

function status(args) {
  const dir = resolveProject(args.project);
  const stateFile = path.join(dir, 'state.json');
  const state = fs.existsSync(stateFile) ? readJson(stateFile) : {};
  console.log(`# ${path.basename(dir)}\n`);
  console.log(`stage: ${state.stage || 'unknown'}`);
  console.log(`next: ${state.next || 'unknown'}\n`);
  for (const f of projectFiles(dir)) {
    console.log(`${f.exists ? '[x]' : '[ ]'} ${f.name}`);
  }
}

function claudeResearch(args) {
  const dir = resolveProject(args.project);
  const prompt = renderTemplateFile(['prompts', 'claude-research.md'], { projectDir: dir, root: ROOT });
  runClaude(dir, prompt);
  updateState(dir, { stage: 'research_and_outline', next: 'codex-review-prompt --round 1' });
}

function codexReviewPrompt(args) {
  const dir = resolveProject(args.project);
  const round = Number(args.round || 1);
  const { reviewFile, inputOutline: outlineFile } = roundFiles(round);
  const promptFile = path.join(dir, `_codex-review-round-${round}-prompt.md`);
  const prompt = renderTemplateFile(['prompts', 'codex-review.md'], {
    projectDir: dir,
    root: ROOT,
    round,
    outlineFile,
    reviewFile,
  });
  fs.writeFileSync(promptFile, prompt + '\n', 'utf8');
  console.log(promptFile);
}

function buildCodexReviewPrompt(projectDir, round) {
  const { reviewFile, inputOutline: outlineFile } = roundFiles(round);
  return renderTemplateFile(['prompts', 'codex-review.md'], {
    projectDir,
    root: ROOT,
    round,
    outlineFile,
    reviewFile,
  });
}

function codexReview(args) {
  const dir = resolveProject(args.project);
  const round = Number(args.round || 1);
  const reviewFile = round === 1 ? '03-review-round-1.md' : round === 2 ? '05-review-round-2.md' : '07-review-round-3.md';
  ensureDir(path.join(dir, '_logs'));
  runCodex(dir, buildCodexReviewPrompt(dir, round), { expectedFile: reviewFile });
  updateState(dir, { stage: `review_round_${round}`, next: `claude-revise --round ${round}` });
}

function claudeRevise(args) {
  const dir = resolveProject(args.project);
  const round = Number(args.round || 1);
  const { outputOutline } = roundFiles(round);
  runClaude(dir, buildRevisePrompt(dir, round), { expectedFile: outputOutline });
  updateState(dir, {
    stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
    rounds_completed: round,
    next: round >= 3 ? 'claude-draft' : `codex-review-prompt --round ${round + 1}`,
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
  ensureDir(path.join(dir, '_logs'));
  const startRound = Number(args['from-round'] || 1);

  for (let round = startRound; round <= 3; round++) {
    const reviewFile = round === 1 ? '03-review-round-1.md' : round === 2 ? '05-review-round-2.md' : '07-review-round-3.md';
    const outputOutline = round === 1 ? '04-outline-revised-round-1.md' : round === 2 ? '06-outline-revised-round-2.md' : '08-outline-final.md';

    if (!fs.existsSync(path.join(dir, reviewFile))) {
      console.error(`[auto-outline] Codex 第 ${round} 轮审查 -> ${reviewFile}`);
      runCodex(dir, buildCodexReviewPrompt(dir, round), { expectedFile: reviewFile });
      updateState(dir, { stage: `review_round_${round}`, next: `claude-revise --round ${round}` });
    } else {
      console.error(`[auto-outline] 已存在 ${reviewFile}，跳过审查。`);
    }

    if (!fs.existsSync(path.join(dir, outputOutline))) {
      console.error(`[auto-outline] Claude 第 ${round} 轮修改 -> ${outputOutline}`);
      const ok = runClaude(dir, buildRevisePrompt(dir, round), {
        expectedFile: outputOutline,
        softFail: true,
        timeoutMs: 180000,
      });
      if (!ok && !fs.existsSync(path.join(dir, outputOutline))) {
        console.error(`[auto-outline] Claude 未完成，改用 Codex 第 ${round} 轮修改 -> ${outputOutline}`);
        const codexPrompt = buildRevisePrompt(dir, round)
          + `\n\n你现在作为兜底修改 agent。请直接编辑 ${path.join(dir, outputOutline)}，不要等待用户确认。`;
        runCodex(dir, codexPrompt, { expectedFile: outputOutline });
      }
      updateState(dir, {
        stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
        rounds_completed: round,
        next: round >= 3 ? 'claude-draft' : `codex-review --round ${round + 1}`,
      });
    } else {
      console.error(`[auto-outline] 已存在 ${outputOutline}，跳过修改。`);
      updateState(dir, {
        stage: round >= 3 ? 'outline_final' : `outline_revised_round_${round}`,
        rounds_completed: round,
        next: round >= 3 ? 'claude-draft' : `codex-review --round ${round + 1}`,
      });
    }
  }

  updateState(dir, { stage: 'outline_final', rounds_completed: 3, next: 'claude-draft' });
  console.log(path.join(dir, '08-outline-final.md'));
}

function claudeDraft(args) {
  const dir = resolveProject(args.project);
  const prompt = renderTemplateFile(['prompts', 'claude-draft.md'], { projectDir: dir, root: ROOT });
  runClaude(dir, prompt);
  updateState(dir, { stage: 'draft_created', next: 'image-brief' });
}

function imageBrief(args) {
  const dir = resolveProject(args.project);
  const file = path.join(dir, '10-image-brief.md');
  fs.writeFileSync(file, readTemplate('prompts', 'image-brief.md'), 'utf8');
  updateState(dir, { stage: 'image_brief_created', next: 'finalize' });
  console.log(file);
}

function finalize(args) {
  const dir = resolveProject(args.project);
  const draft = path.join(dir, '09-draft.md');
  const final = path.join(dir, '11-final.md');
  if (!fs.existsSync(draft)) fail('缺少 09-draft.md');
  if (!fs.existsSync(final)) {
    fs.copyFileSync(draft, final);
  }
  updateState(dir, { stage: 'final_ready', next: 'md-to-wechat publish 11-final.md' });
  console.log(final);
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
  const requiredDirs = ['_briefs', '_knowledge_base', 'images', '_logs'];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(path.join(projectDir, dir))) errors.push(`缺少目录：${dir}/`);
  }
  if (!fs.existsSync(path.join(projectDir, '00-topic.md'))) errors.push('缺少文件：00-topic.md');
  if (!fs.existsSync(path.join(projectDir, 'state.json'))) errors.push('缺少文件：state.json');

  const stateFile = path.join(projectDir, 'state.json');
  let state = {};
  if (fs.existsSync(stateFile)) {
    try {
      state = readJson(stateFile);
    } catch (err) {
      errors.push(`state.json 不是合法 JSON：${err.message}`);
    }
  }

  const files = projectFiles(projectDir);
  const existingNames = new Set(files.filter(f => f.exists).map(f => f.name));
  const finalStages = new Set(['final_ready', 'archived']);
  if (finalStages.has(state.stage) && !existingNames.has('11-final.md')) {
    errors.push('state.stage 已到最终阶段，但缺少 11-final.md');
  }
  if (state.rounds_completed >= 3 && !existingNames.has('08-outline-final.md')) {
    warnings.push('state.rounds_completed >= 3，但缺少 08-outline-final.md');
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

function archive(args) {
  const dir = resolveProject(args.project);
  const result = validateProject(dir);
  if (result.errors.length > 0) fail('项目校验失败，已停止归档。');

  ensureDir(ARCHIVE_ROOT);
  const target = path.join(ARCHIVE_ROOT, path.basename(dir));
  if (path.resolve(dir).startsWith(path.resolve(ARCHIVE_ROOT) + path.sep)) {
    fail(`项目已经在归档目录中：${dir}`);
  }
  if (fs.existsSync(target)) {
    fail(`归档目录已存在，避免覆盖：${target}`);
  }

  updateState(dir, { stage: 'archived', next: 'update 写作参考/写作经验教训.md' });
  fs.renameSync(dir, target);
  console.log(target);
}

const args = parseArgs(process.argv.slice(2));
if (!args.cmd || args.cmd === 'help' || args.cmd === '--help') usage();
else if (args.cmd === 'init') init(args);
else if (args.cmd === 'status') status(args);
else if (args.cmd === 'claude-research') claudeResearch(args);
else if (args.cmd === 'codex-review-prompt') codexReviewPrompt(args);
else if (args.cmd === 'codex-review') codexReview(args);
else if (args.cmd === 'auto-outline') autoOutline(args);
else if (args.cmd === 'claude-revise') claudeRevise(args);
else if (args.cmd === 'claude-draft') claudeDraft(args);
else if (args.cmd === 'image-brief') imageBrief(args);
else if (args.cmd === 'finalize') finalize(args);
else if (args.cmd === 'validate') validate(args);
else if (args.cmd === 'archive') archive(args);
else usage();
