# 写作工作流总览

本工作区用一套项目目录串起写作、调研、审校、配图和归档。`CLAUDE.md` 定义写作原则，`scripts/writing-orchestrator.cjs` 执行机器流程，`_templates/` 存放可维护模板。

## 标准项目结构

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

## 工作流分档

- `fast`：快速观点、短文、方向已经非常明确的文章。只强制 `00-topic.md`、`09-draft.md`、`11-final.md` 和 `state.json`。
- `standard`：默认工作流。适合普通公众号文章，要求调研、选题确认、一轮主编审查、初稿、审校和归档。
- `strict`：商单、法律、新技术、高事实风险文章。要求调研、选题确认、三轮主编审查、配图、审校、经验教训更新和完整归档。

## 命令流程

默认使用 `standard`。可在初始化时指定 `--workflow fast|standard|strict`。

```bash
node scripts/writing-orchestrator.cjs init --name "项目名" --topic "主题方向" --workflow standard
node scripts/writing-orchestrator.cjs claude-research --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs confirm-topic --project "_协作文档/项目名-YYYY-MM-DD" --choice "确认的选题方向"
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs claude-draft --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-reviewed --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs finalize --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs validate --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs audit-archives
```

`strict` 额外执行：

```bash
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD" --rounds 3
node scripts/writing-orchestrator.cjs image-brief --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-images-done --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-lessons-updated --project "_协作文档/项目名-YYYY-MM-DD"
```

`fast` 可直接执行：

```bash
node scripts/writing-orchestrator.cjs init --name "项目名" --topic "主题方向" --workflow fast --confirmed
node scripts/writing-orchestrator.cjs claude-draft --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs mark-reviewed --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs finalize --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/项目名-YYYY-MM-DD"
```

## 文件职责

- `00-topic.md`：选题和主编要求。
- `01-research.md`：调研资料，必须包含来源链接、信息时间和不确定项。
- `02-outline.md`：初版选题角度和推荐大纲。
- `03/05/07-review-round-*.md`：主编审查意见。
- `04/06/08-outline-*.md`：修改后的大纲。
- `09-draft.md`：正文初稿。
- `10-image-brief.md`：配图需求。
- `11-final.md`：最终稿，可交给 `md-to-wechat`。
- `state.json`：当前阶段、工作流分档、下一步和关键门禁状态。

## 关键门禁

- `standard` 和 `strict`：调研和初版大纲完成后，必须用 `confirm-topic` 记录用户确认的选题，才能进入 `auto-outline`。
- `strict`：配图完成后，必须用 `mark-images-done` 标记完成，才能 `finalize`。
- 所有工作流：审校完成后，必须用 `mark-reviewed` 标记完成，才能 `finalize`。
- `strict`：更新 `写作参考/写作经验教训.md` 后，必须用 `mark-lessons-updated` 标记完成，才能 `archive`。
- 定期运行 `audit-archives` 检查历史归档是否符合当前标准结构。

## 知识分层

- 项目资料放在项目目录的 `_knowledge_base/`，随项目归档。
- 长期复用资料放在根目录 `_knowledge_base/evergreen/`。
- 公共 `_briefs/` 只作为模板和临时入口，不长期存放项目材料。
