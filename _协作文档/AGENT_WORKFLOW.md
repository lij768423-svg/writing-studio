# 多智能体写作工作流

这个工作流使用共享文件夹协调 Codex 和 Claude Code。

完整结构说明见根目录 `WORKFLOW.md`。新项目默认使用项目级 `_briefs/`、`_knowledge_base/`、`images/` 和 `_logs/`。

## 常用命令

初始化项目：

```bash
node scripts/writing-orchestrator.cjs init --name "项目名" --topic "主题方向"
```

让 Claude Code 调研并写大纲：

```bash
node scripts/writing-orchestrator.cjs claude-research --project "_协作文档/项目名-YYYY-MM-DD"
```

自动跑完三轮大纲审查和修改：

```bash
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD"
```

从某一轮继续：

```bash
node scripts/writing-orchestrator.cjs auto-outline --project "_协作文档/项目名-YYYY-MM-DD" --from-round 2
```

三轮后让 Claude 写初稿：

```bash
node scripts/writing-orchestrator.cjs claude-draft --project "_协作文档/项目名-YYYY-MM-DD"
```

创建配图 brief 和最终稿：

```bash
node scripts/writing-orchestrator.cjs image-brief --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs finalize --project "_协作文档/项目名-YYYY-MM-DD"
```

收尾校验和归档：

```bash
node scripts/writing-orchestrator.cjs validate --project "_协作文档/项目名-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/项目名-YYYY-MM-DD"
```

## 单步调试命令

如果自动流程卡住，可以单步执行：

```bash
node scripts/writing-orchestrator.cjs codex-review --project "_协作文档/项目名-YYYY-MM-DD" --round 1
node scripts/writing-orchestrator.cjs claude-revise --project "_协作文档/项目名-YYYY-MM-DD" --round 1
```

`claude-revise` 会监控目标文件是否生成。若 Claude CLI 写出了文件但没有正常退出，脚本会按目标文件存在判定成功继续。

## 文件约定

- `00-topic.md`：选题和主编要求
- `01-research.md`：Claude 调研资料
- `02-outline.md`：Claude 初版大纲
- `03/05/07-review-round-*.md`：Codex 三轮审查意见
- `04/06/08-outline-*.md`：Claude 修改后的大纲
- `09-draft.md`：初稿
- `10-image-brief.md`：配图需求
- `11-final.md`：最终稿，可交给 `md-to-wechat`
- `state.json`：当前阶段和下一步
- `_briefs/`：本项目 brief
- `_knowledge_base/`：本项目调研资料
- `images/`：本项目图片
- `_logs/`：本地 agent 运行日志
