# 10-image-brief: 三家万亿IPO 配图

## 状态
✅ 4/4 已生成（2026-06-08 16:23）

## 配图清单

### #1 封面 — rocket + AI data center
- **文件**: `trillion-IPO-1-rocket-datacenter-cover.png`（2.3MB，1536×1024）
- **位置**: `~/Desktop/AI图片/` + `归档/万亿IPO-2026-06-08/images/万亿IPO/`
- **位置 in 11-final**: 建议插在【引入】后
- **prompt**: A cinematic wide-angle photograph of a SpaceX Starship launching from Cape Canaveral at dawn, with a sleek orbital AI data center visible in the upper atmosphere catching golden sunlight. Below, Wall Street-style trading floors blend with server farms. Hyperrealistic photography, 8K, golden hour, dramatic lighting, anamorphic lens.

### #2 时代对比 — 2000 SF vs 2026 SF
- **文件**: `trillion-IPO-2-dotcom-vs-ai-sf-diptych.png`（3.0MB，1536×1024）
- **位置**: 建议插在「二、为什么这不是 dot-com 2.0」段首
- **prompt**: A split-screen diptych photography of downtown San Francisco: LEFT shows year 2000 (Porsche 911s, dot-com offices with AOL and Pets.com logos, brownstone cafes, film grain, faded colors); RIGHT shows year 2026 (autonomous EVs, OpenAI and Anthropic offices with sleek modern glass facades, rooftop data centers with cooling mist, clean digital aesthetic, sharp 8K). Same street corner, 26 years apart, hyperreal.

### #3 3 家 IPO 标志物 — cathedral
- **文件**: `trillion-IPO-3-three-logos-cathedral.png`（2.8MB，1536×1024）
- **位置**: 建议插在「一、3 家 IPO 的真实数据」末尾（数据呈现后 + 转 Alphabet 段前）
- **prompt**: An epic concept photo: three giant holographic logos floating in a vast industrial cathedral. Anthropic Claude's pink star logo on the left, OpenAI's black flower logo in the center, SpaceX's silver X logo on the right. Below, three distinct crowds of investors in suits, scientists in lab coats, and rocket engineers in flight suits converge. Cinematic, dramatic chiaroscuro lighting, 8K, hyperreal photography.

### #4 万亿 IPO 长河 — 5 eras panorama
- **文件**: `trillion-IPO-4-eras-panorama.png`（2.5MB，1915×821，21:9 超宽）
- **位置**: 建议插在「五、为什么三家同期很重要」段首
- **prompt**: A panoramic digital art piece showing 5 monumental gates from different eras side by side: 1950s industrial smokestacks, 1960s mainframe computers, 1990s dot-com billboards, 2010s smartphones, and 2026 AI rocket with orbital servers. Each gate labeled with a glowing neon era name. Cinematic 21:9, golden hour, hyperreal concept photography, 8K, dramatic warm lighting.

## 配图源使用规则
按 CLAUDE.md 优先级：
1. ✅ 公共领域 / Wikimedia Commons
2. ✅ AI 生成（本批 4 张用 DALL-E 走 gptplus-image skill）
3. ⏭️ 免费图库（Unsplash/Pexels）— 本次未用
4. ⏭️ 截图/官方素材 — 本次未用

## 未配的图（outline 提到但不需要 AI 生成的）
- **dot-com vs AI 4 维对比表**（数据精确表，AI 文字渲染差 → 跳过，用文字描述）
- **Alphabet $85B 增发公告**（数据为主 → 跳过用文字）
- **万亿 IPO 历史对照表**（同上，已在正文用 markdown 表格替代）
- **中美 AI 资本路径对比图**（同上）

## 经验教训（2026-06-08 这次）

### gptplus-image skill 实际跑通
- 4/4 全部成功
- 平均 30-60s 一张（遇到 stall 立即 refresh，5-15s 后图出来）
- stall 检测："最后微调一下" + "Instant" 字样 + 0 张图 → 立刻 `browser navigate` 到当前 conversation URL
- 输出稳定在 `~/Desktop/AI图片/`（xattr 不需要手动 strip，OpenClaw-managed Edge 自动处理）
- **走 fetch + blob + <a download> 主路径**，跨 CSP 零问题
- **新对话一定要在 prompt 注入前点击**（避免 context 累积 + 上次 prompt 残留）

### 3 个跟 SKILL.md 不一样的地方
1. **`newChatBtn` selector** — SKILL 没写"开新对话"的具体步骤，实际用 `a[href="/"]` 偶尔不灵，**fallback** 用 `browser navigate url="https://chatgpt.com/"`
2. **send button 时机** — 注入 prompt 后 `setTimeout 500ms` 再 click send 成功率更高（React state 没同步好 click 会被丢弃）
3. **stall recovery 时间** — SKILL 说 ~2 分钟，**实际 30s 就开始 stall**（可能在 ChatGPT Instant model 上更频繁）

### 4 张 prompt 复用度高
- 中文 prompt 翻译 → 英文 photography-brief 风格（subject + style + lighting + lens + palette）
- 每张都加 "hyperrealistic photography, 8K" 锁定风格
- #4 用 21:9（panoramic），其他 16:9
