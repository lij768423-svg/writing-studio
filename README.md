# writing-studio

> 通用内容生产工作区 · Multi-platform content production workspace
>
> 从选题、调研、写作、审校、配图到归档的完整链路。

[中文](#中文) · [English](#english)

---

## 中文

这是一个**通用内容生产工作区**——为多平台分发而设计的内容生产栈。当前主要使用场景是**微信公众号长文**，并已规划支持知乎 / 小红书 / X 推文 / Newsletter / 播客等平台。

### ✨ 适合谁

- 写公众号 / 知乎 / 博客 / 通讯，想系统化生产高质量长文的人
- 想用 AI 辅助但**怕 AI 味重**的写作者
- 有自己的素材库 + 经验积累，想沉淀成可复用工作流的人
- 不想每次写文章都从零搭建工具链的人

### 🛠️ 工具栈

| 阶段 | 工具 | 作用 |
|---|---|---|
| 选题 | 内置 3-4 标题 + 大纲 + ⭐ 工作量评级 | 降低选题返工 |
| 调研 | Tavily（双语深度）+ last30days（10 源跨平台实时） | 多源事实核查 |
| 写作 | Markdown + 个人素材库 + 风格指南 | 降 AI 味 |
| 审校 | 三遍审校（内容 → 风格 → 细节） | 系统化降 AI 检测率 |
| 配图 | mmx image-01（5-8 张 16:9 概念图） | AI 生成配图 |
| 导出 | pandoc + Chrome headless（亮 / 深 双 PDF） | 多版本输出 |
| 归档 | `scripts/writing-orchestrator.cjs`（状态机） | 自动化 init / validate / archive |

### 🚀 5 分钟快速开始

**第 1 步：克隆仓库**
```bash
git clone git@github.com:lij768423-svg/writing-studio.git
cd writing-studio
```

**第 2 步：初始化新项目**
```bash
node scripts/writing-orchestrator.cjs init \
  --name "我的第一个项目" \
  --topic "我想写的话题方向" \
  --workflow standard
```
> 会在 `_协作文档/我的第一个项目-YYYY-MM-DD/` 下生成项目骨架。

**第 3 步：跑完 10 步流程**（详见下文"完整使用流程"）
- Step 1-4：brief / 调研 / 选题讨论 / 协作文档
- Step 5：读风格指南 + 素材
- Step 6：等用户给测试数据（如需）
- Step 7：写初稿
- Step 8：三遍审校
- Step 9：配图
- Step 10：归档

**第 4 步：归档**
```bash
node scripts/writing-orchestrator.cjs validate --project "_协作文档/我的第一个项目-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/我的第一个项目-YYYY-MM-DD"
```

### 📐 完整使用流程（10 步）

```
   选题 (Step 3)
        ↓
   调研 (Step 2)  ← Tavily + last30days
        ↓
   风格 + 素材 (Step 5)
        ↓
   写初稿 (Step 7)
        ↓
   三遍审校 (Step 8)  ← 内容 → 风格 → 细节
        ↓
   配图 (Step 9)  ← mmx
        ↓
   归档 (Step 10)  ← orchestrator archive
```

每步的细节见 `WORKFLOW.md` 和 `CLAUDE.md`。

### 🎚️ 三档工作流

| 档 | 适用 | 跳过 | 时长 |
|---|---|---|---|
| **fast** | 快速观点 / 短文 / 方向明确 | 完整调研、大纲审查 | 30-60 min |
| **standard** | 默认（普通公众号文章） | — | 2-4 h |
| **strict** | 商单 / 法律 / 高事实风险 | 不跳过 | 1-2 天 |

**当前 90% 文章走 `standard` 档**。

### 🗂 目录结构

```
writing-studio/
├── CLAUDE.md                    # 给 AI 看的规则 + 平台适配
├── WORKFLOW.md                  # 完整工作流文档
├── README.md                    # 本文件
├── scripts/
│   └── writing-orchestrator.cjs # 项目状态机
├── _协作文档/                   # 写作中项目
├── 归档/                        # 已完成项目（YYYY-MM-DD 命名）
├── _briefs/                     # 商单 brief
├── _knowledge_base/             # 知识库（长线复用）
├── _logs/                       # agent 运行日志（被 .gitignore）
├── 写作参考/                    # 风格指南 + 经验教训 + 素材
│   ├── 风格指南.md
│   ├── 写作经验教训.md
│   ├── 素材索引.md
│   └── 高流量文章参考.md
└── images/                      # 全局图片
```

### ⚙️ 配置

**1. last30days 调研工具的 API key**（首次使用需要）
```bash
# 编辑 ~/.zshrc，添加：
export BRAVE_API_KEY="..."           # Web 搜索
export XAI_API_KEY="..."             # X/Twitter 搜索
export SCRAPECREATORS_API_KEY="..."  # TikTok/Instagram/Threads/评论
export OPENROUTER_API_KEY="..."      # Perplexity Sonar 深度研究
export INCLUDE_SOURCES="perplexity"  # 启用 Perplexity

# 生效
source ~/.zshrc
```

**2. mmx 配图工具**（Apple Silicon Mac）
```bash
brew install mmx    # 实际是 MiniMax 官方 CLI
mmx image generate --prompt "..." --aspect-ratio 16:9
```

**3. pandoc + Chrome**（PDF 导出）
```bash
brew install pandoc
# Chrome 已在 macOS 安装（默认路径）
```

**4. SSH key**（推 GitHub）
```bash
ssh-keygen -t ed25519 -C "your@email.com"
# 把 ~/.ssh/id_ed25519.pub 加到 GitHub Settings → SSH keys
```

### 🌐 已规划的非公众号平台

| 平台 | 内容形态 | 字数 | 风格特征 |
|---|---|---|---|
| **知乎专栏** | 中长文 | 1500-3500 字 | 技术硬核、避免营销腔 |
| **小红书图文** | 短文 + 9 图 | 100-300 字 | 口语 + emoji + 首图关键词化 |
| **X / Twitter 推文** | 短句线程 | 280 字 / 帖 | 极简 + 强观点 + 1 hashtag |
| **Newsletter / Substack** | 英文长文 | 1500-3000 词 | 个人化 + 直呼读者 |
| **播客脚本** | 口语对白 | 30-60 min ≈ 5000-8000 字 | 极口语、不用书面词 |

详细适配规则见 `CLAUDE.md` 的"非公众号平台适配指南"小节。

### 📚 已归档文章（最新优先）

- **2026-06-09** · 苹果家长控制-WWDC26
- **2026-06-08** · 万亿 IPO
- **2026-06-03** · Anthropic 反超 OpenAI · 2 个月 $852B → $965B
- **2026-06-03** · 全球 AI 竞赛的地缘政治经济学
- **2026-05-30** · AI 异化劳动 - 马原课堂分享
- **2026-05-16** · 彩礼诈骗入刑
- **2026-05-11** · iOS 27 开放第三方 AI
- **2026-05-08** · 最危险的 AI - 白帽
- **2026-05-08** · AI 公司买的不是模型
- **2026-05-05** · DeepSeek-V4-Pro

### 🔑 关键设计理念

> **流程是指南，不是教条；核心原则不可妥协。**
>
> 流程可以灵活调整，但**绝不能编造数据 / 绝不使用过时信息 / 绝不省略透明思考 / 绝不在重要决策上跳过用户确认**。

### 📜 License

MIT

---

## English

A **multi-platform content production workspace** — a complete pipeline from topic selection, research, writing, review, illustration to archival.

**Current main use case**: WeChat Official Account long-form articles (mostly `standard` tier).
**Design goal**: Cover Zhihu, Xiaohongshu, X threads, Newsletter, blog, podcast scripts, video scripts, and commercial proposals.

### Quick start

```bash
git clone git@github.com:lij768423-svg/writing-studio.git
cd writing-studio

# 1. Init a new project
node scripts/writing-orchestrator.cjs init \
  --name "My first project" \
  --topic "Topic direction" \
  --workflow standard

# 2. Run 10-step workflow
#    - Step 1-4: brief / research / topic confirm / collab docs
#    - Step 5: read style guide + materials
#    - Step 6: collect test data (if needed)
#    - Step 7: write draft
#    - Step 8: three-pass review
#    - Step 9: generate images
#    - Step 10: archive

# 3. Archive
node scripts/writing-orchestrator.cjs validate --project "_协作文档/My project-YYYY-MM-DD"
node scripts/writing-orchestrator.cjs archive --project "_协作文档/My project-YYYY-MM-DD"
```

### Tool stack

| Stage | Tool |
|---|---|
| Topic | Built-in 3-4 titles + outlines + ⭐ effort ratings |
| Research | Tavily (bilingual deep search) + last30days (10 cross-platform sources) |
| Writing | Markdown + personal material library + style guide (anti-AI-tone) |
| Review | Three-pass (content → style → detail) |
| Illustration | mmx image-01 (5-8 concept images, 16:9) |
| Export | pandoc + Chrome headless (light/dark PDF) |
| Archive | `scripts/writing-orchestrator.cjs` (state machine) |

### Three workflow tiers

- **fast** — quick takes, short pieces, clear direction. Skip deep research, but never fabricate facts.
- **standard** — default. Ordinary articles: research + topic confirm + 1 review round + archive. **90% of articles use this.**
- **strict** — commercial / legal / new tech / high-factual-risk. 3 review rounds + illustration gate + full archive.

See `WORKFLOW.md` for details.

### Key principle

> **Process is a guide, not a dogma; core principles are non-negotiable.**
>
> The pipeline can flex, but never fabricate data, use stale info, skip transparent thinking, or skip user confirmation on important decisions.

### License

MIT
