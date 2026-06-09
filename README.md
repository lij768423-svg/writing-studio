# writing-studio

> 通用内容生产工作区 · Multi-platform content production workspace
>
> 从选题、调研、写作、审校、配图到归档的完整链路。

[中文](#中文) · [English](#english)

---

## 中文

这是一个**通用内容生产工作区**——为多平台分发而设计的内容生产栈：从选题、调研、写作、审校、配图到归档的完整链路。

**当前主要场景**：微信公众号长文（`standard` 档为主）
**设计目标**：覆盖知乎专栏 / 小红书图文 / X 推文线程 / Newsletter / 博客 / 播客脚本 / 视频脚本 / 商业提案等多平台

### 工具栈

| 阶段 | 工具 |
|---|---|
| 选题 | 内置 3-4 个标题 + 大纲 + ⭐ 工作量评级供选择 |
| 调研 | Tavily（双语深度搜索）+ last30days（10 源跨平台实时反馈） |
| 写作 | Markdown + 个人素材库 + 风格指南降 AI 味 |
| 审校 | 三遍审校（内容 → 风格 → 细节） |
| 配图 | mmx image-01（5-8 张概念图，公众号风格 / 16:9） |
| 导出 | pandoc + Chrome headless（亮 / 深 双 PDF） |
| 归档 | `scripts/writing-orchestrator.cjs`（init / validate / archive 状态机） |

### 工作流分档

- **fast** —— 快速观点、短文、方向已明确。跳过完整调研和大纲审查，但仍不编造事实。
- **standard** —— 默认。普通公众号文章：调研 + 选题确认 + 1 轮审校 + 归档。**当前 90% 文章走这一档**。
- **strict** —— 商单 / 法律 / 新技术 / 高事实风险。3 轮审校 + 配图门禁 + 完整归档。

详见 `WORKFLOW.md`。

### 目录结构

```
.
├── CLAUDE.md                    # 工作区规则 + 平台适配指南
├── WORKFLOW.md                  # 完整工作流文档
├── scripts/
│   └── writing-orchestrator.cjs # 项目状态机（init/validate/archive/...）
├── _协作文档/                   # 写作中项目（含 brief / 知识库 / 草稿）
├── 归档/                        # 已完成项目（按 YYYY-MM-DD 命名）
├── _briefs/                     # 商单 brief
├── _knowledge_base/             # 知识库（长线复用资料）
├── 写作参考/                    # 风格指南 + 经验教训 + 素材索引
└── images/                      # 全局图片（项目内图片在归档/<项目>/images/）
```

### 已归档文章（最新优先）

- **2026-06-09** · 苹果家长控制-WWDC26
- **2026-06-08** · 万亿IPO
- **2026-06-03** · Anthropic 反超 OpenAI · 2 个月 $852B → $965B
- **2026-06-03** · 全球 AI 竞赛的地缘政治经济学
- **2026-05-30** · AI 异化劳动 - 马原课堂分享
- **2026-05-16** · 彩礼诈骗入刑
- **2026-05-11** · iOS 27 开放第三方 AI
- **2026-05-08** · 最危险的 AI - 白帽
- **2026-05-08** · AI 公司买的不是模型
- **2026-05-05** · DeepSeek-V4-Pro

### 关键设计理念

> **流程是指南，不是教条；核心原则不可妥协。**
>
> 流程可以灵活调整，但**绝不能编造数据 / 绝不使用过时信息 / 绝不省略透明思考 / 绝不在重要决策上跳过用户确认**。

---

## English

A **multi-platform content production workspace** — a complete pipeline from topic selection, research, writing, review, illustration to archival.

**Current main use case**: WeChat Official Account long-form articles (mostly `standard` tier).
**Design goal**: Cover Zhihu, Xiaohongshu, X threads, Newsletter, blog, podcast scripts, video scripts, and commercial proposals.

### Tool stack

| Stage | Tool |
|---|---|
| Topic | Built-in 3-4 titles + outlines + ⭐ effort ratings |
| Research | Tavily (bilingual deep search) + last30days (10 cross-platform sources) |
| Writing | Markdown + personal material library + style guide (anti-AI-tone) |
| Review | Three-pass (content → style → detail) |
| Illustration | mmx image-01 (5-8 concept images, 16:9) |
| Export | pandoc + Chrome headless (light/dark PDF) |
| Archive | `scripts/writing-orchestrator.cjs` (init/validate/archive state machine) |

### Three workflow tiers

- **fast** — quick takes, short pieces, clear direction. Skip deep research, but never fabricate facts.
- **standard** — default. Ordinary articles: research + topic confirm + 1 review round + archive. **90% of articles use this.**
- **strict** — commercial / legal / new tech / high-factual-risk. 3 review rounds + illustration gate + full archive.

See `WORKFLOW.md` for details.

### Key principle

> **Process is a guide, not a dogma; core principles are non-negotiable.**
>
> The pipeline can flex, but never fabricate data, use stale info, skip transparent thinking, or skip user confirmation on important decisions.
