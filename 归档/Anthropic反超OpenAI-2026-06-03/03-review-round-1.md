# 03-review-round-1: Outline 自审（替代 codex 视角）

> 2026-06-03
> 审查者：Claude（self-review 模式，本项目起 codex MCP 已被弃用）

## 审查框架

按 codex 视角模拟：敌对审视，专门找**事实硬伤、论据链断裂、隐含假设、反直觉点是否真有依据**。

---

## 事实硬伤 / 待核实

### ✅ 已核实（可放心写）

1. **"Opus 4.8 自承比 Mythos 弱"** —— Business Insider 2026-05-28 原话："Anthropic called the new Opus 4.8 model 'weaker' than Mythos and said it's 'substantially behind' the unreleased model on cyber capabilities." ✓ 可直接引用
2. **Mythos "让企业和政府措手不及"** —— GIGAZINE 引用 Hassabis 原话："The fact that Anthropic's Mythos has the power to catch businesses and governments off guard shows that we are not yet prepared for the rapid evolution of these systems." ✓ 可直接引用
3. **Anthropic ARR 跳升**（$9-10B → $30B → $47B）—— LA Times / Forbes / Business Insider 三个独立信源交叉一致 ✓
4. **估值跳升**（3 月 $380B → 5 月 $965B，3 个月 2.5 倍）—— Forbes / TechCrunch / Business Insider 三源一致 ✓
5. **Series H $65B 投资方**（Altimeter / Dragoneer / Greenoaks / Sequoia / Coatue / ICONIQ）—— OpenTools / TechCrunch 引用 Reuters ✓
6. **IPO 6/1 秘密递交**—— CNN / NPR / Guardian / Bloomberg / SF Chronicle 五源 ✓
7. **SpaceX $1.25B/月 租 Anthropic 算力**—— Business Insider 引 SpaceX 自家 S-1 ✓

### ⚠️ 仍需核实（写作时需小心）

1. **"Claude Code 一年前发布"具体日期** —— 研究里没找到准确发布日。可能的影响：第二节"一年吃下 toB 圈层"的时间描述需要弱化。建议改为"近一年"或"2025 年下半年发布以来"。
2. **OpenAI "missed revenue targets" 具体细节** —— CNN 提到但没说哪个季度、哪个产品线、miss 多少。写作时不要脑补具体数字，只说"missed revenue targets"原话。
3. **Mythos 是否真在 15+ 国家部署** —— TechCrunch 早前一篇提到"critical infrastructure in 15+ countries"但没在这次的研究里。写作时如果用这个数字要确认信源；保守说法是"据报道已用于关键基础设施"。
4. **OpenAI Codex 登 AWS 具体日期** —— 研究里是 "5/28–6/2" 区间，不精确。如果要在文章里说日期，保守为"5 月底"。

---

## 论据链断裂

### ⚠️ 第二节"反超的真正引擎是 Claude Code"

**问题**：Outline 里说"反超的真正引擎不是 Opus 4.8，是 Claude Code"——但**没有任何信源直接说"反超的引擎是 Claude Code"**。这是**观点**，不是事实。

**两种处理**：
- A) 把这节降级为"我觉得是这样"，加入"我自己的体验"作为论据（用户确实用 Claude Code）
- B) 找补充信源佐证（TechCrunch / LA Times 是否有 Claude Code 直接推动 ARR 的报道）

建议采用 A + 加 1 句"TechCrunch / LA Times 同期报道"做侧证。避免"实际就是 Claude Code"这种斩钉截铁的因果链。

### ⚠️ 第四节"Google 内部把 AI 编程比赛输给 Anthropic"

**问题**：LA Times 那篇文章标题说"Google 内部斗争把 AI 编程比赛送给 Anthropic 和 OpenAI"——但**没有研究里没读到正文**。可能这标题是流量标题。

**处理**：写作时**只用 LA Times 标题**做引用，不下"Google 内部故事"的判断。或者干脆去掉这层。

### ⚠️ 第五节"OpenAI 'missed revenue targets'" 

**问题**：CNN 一句话带过。展开成"OpenAI 模式转向"的论据有点单薄。

**处理**：把 FDE 模式（$4B 启动驻场工程师）作为更硬的论据。这是"模式转向"的可观察证据，**比"missed revenue targets"具体**。

---

## 隐含假设

### ⚠️ "Opus 4.8 自承弱是策略" 假设

Outline 说"Anthropic 在主动暴露自己还有更强的牌"——这是**修辞**。信源里没有 Anthropic 任何人说过这是策略。

**处理**：把"这是策略"改成"这件事可以被解读为"——避免把推测当事实。

### ⚠️ "AGI 2029 警告是给监管听的"

Outline 说"Hassabis 的 AGI 警告是给监管听的"——这是**政治分析**，不是事实。

**处理**：保留作为"我的解读"段，加 1 句"也可能是给 Google 内部解压"——让假设有空间。

---

## 反直觉点是否真有依据

| 章节 | 反直觉点 | 依据 | 评级 |
|---|---|---|---|
| 1 | "发自承弱的模型" | Business Insider 原话 | ✓ 强 |
| 2 | "反超引擎是 Claude Code" | **无直接信源** | ⚠️ 中（要降级） |
| 3 | "toB 比 toC 估值更真实" | ARR 数据 vs OpenAI missed | ✓ 中（双源支撑） |
| 4 | "Google CEO 公开认输" | Hassabis 警告 + LA Times 标题 | △ 弱（标题不可全信） |
| 5 | "三连发 = 套现顶点" | Wedbush 原话 + 时间窗口 | △ 弱（Wedbush 是分析师观点） |
| 6 | "软件 vs 服务边界模糊" | 综合判断 | ✓ 弱（不需要强依据，是收尾问题） |

---

## 标题建议

Outline 里给的标题「Anthropic 5 天干掉 OpenAI：$852B 到 $965B 反超背后的真正引擎」——

**问题**：
- "5 天"不够准确（5/28 拿到钱是事实，但"反超"是估值层面，$852B 是 3 月的，$965B 是 5 月的，跨 2 个月不是 5 天）
- "干掉"语气过重

**建议**：
- 改为「Anthropic 2 个月反超 OpenAI：$852B 到 $965B 背后的真正引擎」
- 或「Anthropic 反超 OpenAI：$965B 估值的真正支撑是什么」

---

## 修改优先级

P0（必须改）：
- 第二节反超引擎降级为"我的判断 + Claude Code 体验"
- 第四节删掉"Google 内部"的具体描述，只用 LA Times 标题
- 标题从"5 天"改为"2 个月"

P1（建议改）：
- 第五节把"missed revenue targets"换成 FDE 模式作为主论据
- "Opus 4.8 自承弱是策略"改为"可被解读为"
- Mythos "15+ 国家"数字保守化

P2（可选）：
- 第二节加 1 句 TechCrunch / LA Times 侧证
- 加 1 段"为什么 Anthropic 不怕公开 Mythos 存在"的延展（Opus 4.8 自承弱 + Mythos 警告 = 双信号）

---

## 总体评价

Outline 角度鲜明、切口小、数据密。**主要风险在"反超引擎"这个核心论点上**——这是文章的中心论点，但信源只支持"Claude Code 重要"，不支持"Claude Code 是反超引擎"。

**写作时建议**：
- 把核心论点改成"我的判断 + 个人体验 + 侧证"三元结构
- 不要把"Claude Code 是反超引擎"当事实写
- 全文要留 2-3 处明确"我猜" / "可能" / "据报道" 的修辞空间
