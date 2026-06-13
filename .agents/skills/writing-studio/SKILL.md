---
name: writing-studio
version: 1.0.0
description: "写作工作区 / writing-studio：处理公众号、知乎、小红书、X/Twitter、Newsletter、播客脚本等内容生产任务。用于新文章选题、调研、写作、审校降 AI 味、配图、项目归档、复盘和 writing-orchestrator 流程管理。"
metadata:
  workspace: "auto"
  requires:
    bins: ["node"]
  cliHelp: "node scripts/writing-orchestrator.cjs --help"
---

# writing-studio

本 skill 用于通用内容生产工作区。它把公众号长文和多平台内容生产串成一套流程：选题、调研、写作、审校、配图、归档、复盘。

## 进入工作区

执行写作相关任务前，先自动确认工作区根目录：

1. 如果当前目录或任一上级目录同时包含 `WORKFLOW.md`、`README.md`、`scripts/writing-orchestrator.cjs`，把该目录作为工作区根目录。
2. 如果当前目录不是写作工作区，优先询问用户要进入哪个写作仓库；不要写死本机用户名路径。
3. 确认根目录后再执行 `cd <workspace-root>`。

可用检查命令：

```bash
pwd
find .. -maxdepth 3 -name WORKFLOW.md -o -path "*/scripts/writing-orchestrator.cjs"
```

必须优先读取这些文件来获得最新规则：

- `CLAUDE.md`：写作原则、两层判断机制、平台适配、质量标准
- `WORKFLOW.md`：项目结构、状态机、orchestrator 命令
- `README.md`：工作区概览和近期变更
- `写作参考/写作经验教训.md`：用户反馈和踩坑记录
- 需要模仿风格时，再读 `写作参考/风格指南.md`、`写作参考/高流量文章参考.md`、`写作参考/素材索引.md`

## 触发场景

使用本 skill，当用户要：

- 写公众号、知乎、小红书、X/Twitter、Newsletter、播客脚本、课程分享稿
- 讨论选题、生成标题、大纲、初稿、最终稿
- 做文章调研、事实核查、资料整理、知识库沉淀
- 审校、降 AI 味、改口语化、三遍审校、主编审查
- 生成配图 brief、规划图片、插入 Markdown 图片路径
- 初始化、查看、校验、归档写作项目
- 整理 `归档/`、`_协作文档/`、`_briefs/`、`_knowledge_base/`

不要用于普通代码项目修 bug，除非用户明确是在维护 `scripts/writing-orchestrator.cjs` 或写作工作区工具链。

## 两层判断机制

每次收到任务，先做两层判断，并向用户简短说明判断结果。

### 第一层：工作区判断

- **公众号写作**：默认场景，按三档流程处理
- **其他平台写作**：按平台适配，不能只缩短字数，必须重写形态
- **快速咨询**：直接回答，不走完整流程

### 第二层：任务类型判断

- **A. 新写作任务（有完整 brief）**：保存 brief，再走流程
- **B. 新写作任务（无 brief，只有需求）**：先讨论选题，不直接写正文
- **C. 修改已有文章**：读原文 → 理解需求 → 修改
- **D. 审校 / 降 AI 味**：按三遍审校处理
- **E. 快速咨询**：直接回答

## 核心原则

- **不要直接写文章**：新写作任务必须先给 3-4 个选题方向，等用户选择
- **不能编造事实**：新技术、新产品、2024-2026 信息、高风险事实必须调研验证
- **透明思考**：关键判断要说明为什么这么做
- **使用个人素材库**：优先从真实经历和素材中降 AI 味，不编造案例
- **三遍审校**：内容事实 → 风格降 AI 味 → 细节节奏
- **重要门禁要等用户确认**：选题、用户审稿、归档等节点不能擅自跳过

## 平台适配

默认公众号。若用户指定其他平台：

| 平台 | 形态 | 风格 |
|---|---|---|
| 知乎专栏 | 1500-3500 字中长文 | 更技术、更硬、少营销腔，标题用 `##` |
| 小红书图文 | 100-300 字 + 9 图 | 口语、emoji、首图承担主要信息 |
| X/Twitter | 3-15 帖线程 | 极简、强观点、编号 `1/n`，1 个 hashtag |
| Newsletter/Substack | 英文 1500-3000 词 | 更个人化，开头 `Hi, {first_name}` |
| 播客脚本 | 30-60 分钟口语对白 | 极口语，配 show notes 和时间戳 |

同一调研和论点可以复用，但不同平台必须重写形态。

## 项目目录

标准活跃项目在：

```text
_协作文档/项目名-YYYY-MM-DD/
├── 00-topic.md
├── 01-research.md
├── 02-outline.md
├── 03-review-round-1.md
├── 04-outline-revised-round-1.md
├── 05-review-round-2.md
├── 06-outline-revised-round-2.md
├── 07-review-round-3.md
├── 08-outline-final.md
├── 09-draft.md
├── 10-image-brief.md
├── 11-final.md
├── _briefs/
├── _knowledge_base/
├── images/
├── _logs/
└── state.json
```

归档项目在：

```text
归档/项目名-YYYY-MM-DD/
```

归档后，最终稿必须是 `11-final.md`，brief 放 `_briefs/`，知识库放 `_knowledge_base/`，图片放 `images/文章主题/`。

## 三档工作流

- `fast`：快速观点、短文、方向明确。强制 `00-topic.md`、`09-draft.md`、`11-final.md`、`state.json`
- `standard`：默认。调研、选题确认、一轮主编审查、初稿、用户审、审校、归档
- `strict`：商单、法律、新技术、高事实风险。三轮审查、配图、经验教训更新、完整归档

2026-06-10 后新增规则：`draft` 写好后必须先给用户审，用户 OK 后才进入 subagent/self-review 审校，再应用审校、生成 final、归档。

## 常用命令

初始化：

```bash
node scripts/writing-orchestrator.cjs init --name "项目名" --topic "主题方向" --workflow standard
```

查看状态：

```bash
node scripts/writing-orchestrator.cjs status --project "_协作文档/项目名-YYYY-MM-DD"
```

调研与确认选题：

```bash
node scripts/writing-orchestrator.cjs claude-research --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs confirm-topic --project "_协作文档/项目名-YYYY-MM-DD" --choice "确认的选题方向"
```

大纲审查和初稿：

```bash
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs claude-draft --project "_协作文档/项目名-YYYY-MM-DD"
```

审稿、最终稿、归档：

```bash
node scripts/writing-orchestrator.cjs mark-reviewed --project "_协作文档/项目名-YYYY-MM-DD" --note "用户已审"
node scripts/writing-orchestrator.cjs finalize --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs validate --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/项目名-YYYY-MM-DD"
```

strict 额外门禁：

```bash
node scripts/writing-orchestrator.cjs image-brief --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-images-done --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-lessons-updated --project "_协作文档/项目名-YYYY-MM-DD"
```

审计归档：

```bash
node scripts/writing-orchestrator.cjs audit-archives --profile auto
```

## 新写作任务流程

1. 保存 brief 到项目 `_briefs/`
2. 涉及新产品、新技术、新事实时先调研，资料保存到项目 `_knowledge_base/`
3. 给 3-4 个选题方向，每个包含标题、核心角度、工作量评级、优劣、是否测试、大纲
4. 等用户选题后，创建或更新协作文档
5. 阅读风格指南、经验教训和至少 2-3 篇参考文章
6. 搜索个人素材库，优先使用真实经历
7. 写初稿，但先给用户审
8. 用户 OK 后做三遍审校
9. 需要配图时生成图片和相对路径
10. validate + archive，并更新经验教训

## 三遍审校

第一遍：内容审校

- 事实、时间、产品名准确
- 逻辑无矛盾
- 结构不跑题
- 数据和案例有来源

第二遍：风格审校

- 删除套话：在当今时代、综上所述、值得注意的是
- 拆掉连续 AI 句式：不是……而是……
- 替换书面词：显著提升、充分利用、进行操作
- 加入口语、数字、真实细节和个人态度

第三遍：细节打磨

- 句子以 15-25 字为主，超过 30 字拆短
- 手机端段落 3-5 行
- 多用句号，少用逗号连接长句
- 大声朗读，调整节奏

## 归档规则

用户说“归档”“收尾”“整理项目”时：

1. 先运行 `validate`
2. 如为 strict，确认配图完成、经验教训已更新
3. 运行 `archive`
4. 清理根目录、`_briefs/`、`_knowledge_base/`、`images/` 中该项目活跃副本
5. 不删除无关项目；同名旧版本先放 `_legacy/` 或 `_backup_时间/`
6. 归档后更新 `写作参考/写作经验教训.md`

2026-06-10+ 的新归档默认不进 git，遵守 `.gitignore`。

## 工具链备注

- Web 调研优先使用 Tavily / last30days 相关 skill
- 飞书文档、表格、日历等需求转给对应 `lark-*` skill
- 维护 orchestrator 时查看 `scripts/CHANGELOG.md`
- 工具链问题查看 `写作参考/tools/CHANGELOG.md`
