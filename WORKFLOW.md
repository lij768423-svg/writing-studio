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

## 命令流程

```bash
node scripts/writing-orchestrator.cjs init --name "项目名" --topic "主题方向"
node scripts/writing-orchestrator.cjs claude-research --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs claude-draft --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs image-brief --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs finalize --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs validate --project "_协作文档/项目名-YYYY-MM-DD"
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
- `state.json`：当前阶段和下一步。

## 知识分层

- 项目资料放在项目目录的 `_knowledge_base/`，随项目归档。
- 长期复用资料放在根目录 `_knowledge_base/evergreen/`。
- 公共 `_briefs/` 只作为模板和临时入口，不长期存放项目材料。

