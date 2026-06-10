# Orchestrator CHANGELOG

> `scripts/writing-orchestrator.cjs`（node 脚本）的状态机、bug、维护、弃用记录
> 跟"写作经验"分开——这里只关注工具维护
> 对应新结构：稳态命令 + 脆性命令 + 已弃用 + 已修 bug

## 稳态命令（推荐用）

| 命令 | 用途 | 备注 |
|---|---|---|
| `node scripts/writing-orchestrator.cjs init` | 初始化项目（创建 _协作文档/项目名-日期/）| **稳** |
| `node scripts/writing-orchestrator.cjs validate` | 验证项目结构 | **稳** |
| `node scripts/writing-orchestrator.cjs archive` | 归档（移到 归档/项目名-日期/）| **稳** |
| `node scripts/writing-orchestrator.cjs mark-reviewed` | 标记审校完成 | **稳** |
| `node scripts/writing-orchestrator.cjs finalize` | finalize（写 11-final.md 后）| **稳** |
| `node scripts/writing-orchestrator.cjs mark-lessons-updated` | 标记复盘完成 | **稳** |

**standard 档最佳路径**（**直接执行"init → 自己写 research/outline/draft → mark-* / finalize / validate / archive"**）：
```
init → 自己写 01-research.md → 自己写 02-outline.md → confirm-topic → mark-reviewed → finalize → validate → archive
```

---

## 脆性命令（不推荐）

| 命令 | 问题 | workaround |
|---|---|---|
| `claude-research` | 经常 SIGKILLed（PATH 问题）| 直接用 tvly search + 手写 01-research.md |
| `claude-draft` | 经常路径问题 | 自己写 09-draft.md |
| `claude-revise` | 经常路径问题 | 自己改 outline / draft |
| `auto-outline` | 经常路径问题 | 自己写 02-outline.md |

**根本原因**：node spawnSync('claude', ...) 在 Bash 工具继承的 PATH 里找不到 `/opt/homebrew/bin/claude`——3 次失败都返回 `status: null`、空 stdout/stderr，调试花了一轮对话（2026-06-03 教训）

**结论**：claude-* 系列当前是脆的，**不要**让 orchestrator 跑它们——**直接手写 .md + 调 mark-* 状态门禁**。

---

## 已弃用

### codex MCP（2026-06-03 弃用）
- `codex` 是 node 脚本，启动时内部 spawn 找不到 `node`（shell PATH 不带 `/opt/homebrew/bin`）
- 外层 PATH 注入能解决但太脆
- 维护 codex-review 模板 + runCodex 函数 ≈ 110 行代码，性价比低
- **改用 self-review**（Claude 按 codex 视角写敌对审视）——少 1 个外部依赖、少 1 类故障
- 弃用前 grep 全工作区（`grep -rln "codex" --include="*.md" --include="*.cjs" --include="*.json"`）确认删除清单，避免漏改

---

## 已修 bug

### state.json 状态对不齐
- **2026-05-30**：`stage: archived` 但 `images_done: false` / `lessons_updated: false` 同时存在——finalize 没卡这两个门禁
- **2026-05-30**：课堂分享稿（无图需求）走 standard 时，state.json 要明确标 `images_skipped_reason`——避免 validator 误报
- **2026-06-08**：`confirm-topic` 强依赖 `02-outline.md` 存在——但 init 之后没有自动生成 outline，必须由 claude-research / 外部 LLM 来写。**如果绕开 claude-research**（已弃用），**要记得手写 02-outline.md 才能 confirm-topic**

### skill 提交 timeout
- **2026-06-08**：skill 提交 dashboard approval 一直 timeout（"Approval timed out"）
- **workaround**：用 CLI `openclaw skills workshop apply` 才能直通
- 以后写 skill 优先走 CLI apply

### Orchestrator PATH 问题（全局）
- **2026-06-03 早**：node spawnSync('claude', ...) 在 Bash 工具继承的 PATH 里找不到 /opt/homebrew/bin/claude
- **workaround**：**写 orchestrator 时应当用绝对路径 + 兜底 PATH 注入**，而不是 spawn 一个未知 PATH 环境的子进程
- **这台机器的所有 spawnSync 都要用 `/opt/homebrew/bin/...` 或 `~/.local/bin/...` 绝对路径**——应该写进 WORKFLOW.md 的"环境要求"一节

---

## 未修（已知但暂不修）

- orchestrator `claude-research` / `claude-draft` / `claude-revise` PATH 问题——**未修**（直接绕开，不值得修）

## 未完待办

- [ ] 把"spawnSync 绝对路径"加到 WORKFLOW.md "环境要求"一节
- [ ] 删代码里的 `claude-research` 等脆性命令调用（保留命令定义，但加 `// 脆性 - 不推荐` 注释）
- [ ] 优化 `finalize` 门禁校验：检查 `images_done` + `lessons_updated` 状态一致性
