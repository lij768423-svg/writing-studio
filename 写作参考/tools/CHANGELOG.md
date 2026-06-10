# 工具链 CHANGELOG

> 工具链（tvly / mmx / draw.io / last30days / orchestrator）的问题、维护、性能记录
> 跟"写作经验"分开——这里只关注工具，不关注文章本身
> 对应新结构：跨工具 PATH 速查表 + 各工具最佳实践

## Tavily CLI（tvly）

### PATH + 认证
- 路径：`/Users/lijunjie/.local/bin/tvly`（**注意**：不是 `tavily`）
- 认证：`/Users/lijunjie/.tavily/config.json`（key 在 config.json，**不在 env**）
- 验证：`tvly --status`（应显示 "Authenticated via config file"）
- `settings.local.json` 必须 allow `Bash(tvly *)`——否则 agent 会"默默退到 WebSearch/WebFetch 失败"

### 最佳实践
- 2026-05-09 起用 tvly 作为默认搜索源（替代 WebSearch 的 403 类坑）
- 调研 Workflow 跑时 prompt 必须硬要求"如果 tvly 不可用立刻 report 错误，不要 fallback"
- 2026-06-10 调研中搜 12 次 = 4 分钟，工具链稳定

---

## MiniMax mmx（图片生成 CLI）

### PATH + 改名
- 路径：`/opt/homebrew/bin/mmx`（**注意**：2026-05-17 前叫 "mmx CLI"）
- 调用：`mmx <resource> <command>`（如 `mmx image generate`）
- `settings.local.json` 必须 allow `Bash(mmx auth *)` + `Bash(mmx image *)`

### 最佳实践
- **`--out <path>` 必须直接指定正确扩展名**（`.jpg` / `.png`）——不要事后改名
- 加 `--prompt-optimizer`
- Prompt 末尾加 `"no text, no watermark"`
- **mmx 生成的图片实际是 JPEG 格式但自动存为 .png**——生成后用 `file` 命令检查实际格式再插入文章
- **批量 4 张图并行**（不要串行）——每张 5-10 秒，4 张 1 分钟内全部完成（2026-05-30 / 6/9 / 6/10 三次确认）
- 单图 1 次过率高——`--prompt-optimizer` 拯救难画概念（如 "translucent ghost double"）

---

## draw.io（架构图 / 流程图）

### PATH
- 路径：`/Applications/draw.io.app/Contents/MacOS/draw.io`
- `settings.local.json` 必须 allow `Bash(command -v draw.io)` + draw.io 完整命令模式

### 最佳实践
- 长图用 `-s 2` 导出 2x 分辨率，公众号显示更清晰
- 4 列流程图布局（08-organic-composition.png）——不变资本 ↑ / 可变资本 ↓ / 利润来源 / 剥削仍在——下次经济类选题复用此模板
- **Token 价目图自适应 $0-30 vs $0.1 量级差异**——下次任何"价目对比"都先估算量级再画主轴，或在主轴不可见时主动加放大虚线框

---

## last30days（社交媒体调研工具）

### 最佳实践
- **named-entity 主题**（人名 / 公司名 / 产品名）要先生成 `plan JSON` 再调——"裸"调用会触发 degraded run
- `score` **不是真实互动数**（是 last30days 内部 rank score）——evidence 引用三原则：
  - ✅ 标题 + URL + 高亮句
  - ❌ 互动数据（除非单独核实）
  - ❌ rank score（不可外推）
- DEGRADED RUN WARNING 触发条件——需要 LLM 按 LAW 5/7 生成 `--plan JSON`（含 3-5 个改写 subqueries + source 列表）
- API key：`SCRAPECREATORS_API_KEY` / `XAI_API_KEY` / `OPENROUTER_API_KEY` 等任一即可

---

## 工具链 PATH 速查表（绝对路径）

| 工具 | 路径 | 备注 |
|---|---|---|
| **tvly** | `/Users/lijunjie/.local/bin/tvly` | 不是 `tavily` |
| **mmx** | `/opt/homebrew/bin/mmx` | 不是 `mmx CLI` |
| **draw.io** | `/Applications/draw.io.app/Contents/MacOS/draw.io` | |
| **node** | `/opt/homebrew/bin/node` | orchestrator 内部 spawn |
| **claude** | `/opt/homebrew/bin/claude` | orchestrator 需绝对路径 |
| **git** | `/usr/bin/git` | |
| **node (nvm)** | `~/.nvm/versions/node/.../bin/node` | 视 nvm 安装 |

> ⚠️ **这台机器的所有 spawnSync 都要用绝对路径**——shell 默认 PATH 不带 `/opt/homebrew/bin` 和 `~/.local/bin`（2026-06-03 教训）
