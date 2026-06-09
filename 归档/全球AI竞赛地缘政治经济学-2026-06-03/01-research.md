# 01-research.md

> 信息收集时间：2026-06-03
> 用途：全球AI竞赛地缘政治经济学（PPT 演讲稿）的事实底座
> 下次更新建议：2026-07-01（关注 Anthropic IPO 进展 / 欧盟 AI 法案新修订 / 中国 950PR 出货）

---

## 一、AI 出口管制：美国 5/31 新规堵漏

### 核心事实

- **5/31/2026 美国商务部 BIS 发布新指南**：规定凡总部设于 D:5 国家组（含中国）或澳门的实体，即便身处中国境外，向其出口先进计算物品均需申请许可证。
- 背景：2025 年 1 月发布的"AI 扩散规则"（AI Diffusion Rule）在 2025 年 5 月被暂缓执行，留有近一年监管漏洞。
- 估算：**过去一年有数 10 万颗高端 AI 芯片经中国企业在马来西亚等地的海外子公司流入**（路透社引供应链人士）。
- 英伟达声明新措施影响有限（原本已需许可）。
- 来源：
  - [VOA 中文：美国商务部周末急发新规 2026-06-01](https://www.voachinese.com/a/us-takes-step-to-halt-ai-chips-to-chinese-firms-outside-china-20260601/8156110.html)
  - [2CR 中文：美國收緊出口管制 2026-06-02](https://www.2cr.com.au/%E7%BE%8E%E5%9C%8B%E6%94%B6%E7%B7%8A%E5%87%BA%E5%8F%A3%E7%AE%A1%E5%88%B6-%E9%98%BB%E6%AD%A2%E8%8B%B1%E5%81%89%E9%81%94ai%E8%8A%AF%E7%89%87%E7%B6%93%E6%B5%B7%E5%A4%96%E5%AD%90%E5%85%AC%E5%8F%B8)
  - [statementdog：超微高階晶片對中國海外子公司納入管制](https://statementdog.com/news/16632)

### 算力差距的可量化表述

- 2026 年华为晶片产量约是英伟达的 **4%**；在更严格出口管制下，**民主国家可调用的算力是中国 AI 产业的 11 倍**。
- 来源：[Threads @learnwithcaspar（引述 2026 年估算）](https://www.threads.com/@learnwithcaspar/post/DYelErTD_d4/)

### 不确定 / 待核实

- H200 出口许可：HKEPC 报道称"已放行仍待"，但具体条款未明。**写作时不引用具体数字。**
- 实际流入中国的高端 AI 芯片数量：供应链人士估算"数十万颗"，无审计数据。

---

## 二、欧盟 AI 法案：5/7 Omnibus 简化方案

### 核心事实

- **5/7/2026 欧盟理事会与议会达成 Omnibus 协议**，简化 AI 法案。
- **高风险 AI 系统合规期限**：
  - 原定 8/2/2026 → **推迟到 12/2/2027**
  - 现有 AI 系统全面合规期限：8/2/2030
- 透明度 + 水印要求：推迟到 12/2/2026
- 推迟原因：实施所需的统一标准与工具尚未就绪。
- 来源：
  - [Consilium：Council and Parliament agree to simplify 2026-05-07](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules)
  - [Gibson Dunn：EU AI Act Omnibus Agreement 2026-05](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes)
  - [IoD Ireland：EU AI Act Omnibus](https://www.iodireland.ie/resources-media/media-hub/blog/eu-ai-act-omnibus)
  - [Latham & Watkins：AI Act Update](https://www.lw.com/en/insights/ai-act-update-eu-resolves-to-change-rules-and-extend-deadlines)

### 解读

- 欧盟是"以规则塑造 AI"路径的代表，但实施能力跟不上立法速度。
- 推迟到 2027 给了美国大公司喘息期——但欧盟本意是想在监管上"领先美国"，结果变成"先立法、再延期"。

---

## 三、中国 AI：国产算力"从能造到能用"

### 核心数据

| 指标 | 2025 | 2026 | 来源 |
|---|---|---|---|
| 华为昇腾出货 | 81.2 万张 | 950PR 目标 75 万颗（量产） | 经济观察网 / 极客公园 |
| 华为占国内 AI 加速卡 | 约 20% | 继续上升 | IDC |
| 英伟达中国市场份额 | 95% → 55% | 持续下降 | IDC |
| 国产芯片份额 | 突破 41% | 翻倍以上增长预测 | 极客公园 |
| 中国集成电路出口 | 4 月 310.85 亿美元，+100.1% YoY | 出口额 2 个月翻倍 | 海关总署 |

### DeepSeek V4 国产化突破

- **4/24/2026 DeepSeek V4 发布并开源**，V4-Pro（1.6T 参数，490B 激活）+ V4-Flash（284B 参数，130B 激活）
- **同日华为宣布昇腾超节点全系列支持 V4**——这是国产大模型首次在国产芯片上完成从训练到推理的**全栈部署**
- 推理时延：V4-Pro 20ms / V4-Flash 10ms
- 字节跳动 / 腾讯 / 阿里**已加码采购华为昇腾**（含 950PR）
- 寒武纪 / 摩尔线程 / 海光 / 百度昆仑芯 全部 "Day0" 适配（模型发布即适配上线）
- DeepSeek 官网定价明确：V4-Pro 下半年价格"绑定 950PR 批量上市"
- 来源：
  - [新华网瞭望：国产算力突围重塑产业竞争逻辑 2026-05-08](http://lw.xinhuanet.com/20260508/43fcfca7b8384c328ad521f50af3e7d7/c.html)
  - [经济观察网：华为算力"开链" 2026-05-06](http://www.eeo.com.cn/2026/0506/865597.shtml)
  - [极客公园：多方位突围 2026](https://www.geekpark.net/news/365192)

### 华为算力链上下游

- 哈勃投资 2019 年以来投 112+ 项目，构筑国产算力供应链
- 至少 15 家被投公司已在 A 股或港股 IPO
- 关键供应商：
  - **华丰科技**（连接器）：2025 年营收 25.28 亿，+131.5%；华为占 60.52%
  - **杰华特**（电源管理芯片）：2025 年营收 26.55 亿，+58.15%；仍亏损 7.17 亿
  - **强一股份**（晶圆测试探针卡）：2025 年净利 3.95 亿，+69.43%
  - **源杰科技**（光芯片）：2026 Q1 营收 3.55 亿，+320.94%
- 整机/集成商：神州数码、拓维信息、川润股份——"昇腾红利尚未传导到财报"

### 黄仁勋 4/15 表态（引述）

> "要是哪天像 DeepSeek 这样的成果先在华为平台上出现，那对我们国家会是非常糟糕的结果。"

— 英伟达 CEO 黄仁勋接受帕特尔专访，2026-04-15。来源：[经济观察网](http://www.eeo.com.cn/2026/0506/865597.shtml)

### 不确定 / 待核实

- 950PR 实际产能：业内人士数据，未审计
- "民主国家算力是中国 11 倍"——Threads 转引，未找到一手出处

---

## 四、AI 资本集中：725B 美元 capex 的算力金字塔

### 核心数据

- **2026 全球四大 hyperscaler 资本开支指引：$725B**（Augment Market 汇总）
- **全球数据中心 capex 2026 预测：$2.9 万亿**（Ropes & Gray Q1 2026 Global Report）
- 英伟达加速卡收入：3 月季度 **$60.4B**（3 年涨 1600%，Morningstar）
- NextEra 收购 Dominion Energy **$67B**（史上最大公用事业并购，明确为数据中心供电）

### Anthropic 付 xAI $1.25B/月

- SpaceX S-1 披露：**Anthropic 每月付 xAI $12.5 亿**，独占 Colossus 1（Memphis 220,000 颗 NVIDIA GPU，300MW）
- 这是"算力外包"的天价案例
- 来源：[Augment Market：$725B in capex](https://augment.market/pulse/725b-in-capex-the-math-behind-the-datacenter-buildout)

### CoreWeave 债务风险

- Q1 收入翻倍，但背 $25B 债务，11% 利率
- 反映"AI 算力租户"模式的资本风险

### 中国大模型市场

- 2026 年开源权重榜（4 月）：**GLM-5 排第一**（85 分），DeepSeek / Qwen / GLM / Kimi 全面领先
- 来源：[RemoteOpenClaw：Best Chinese AI Models 2026](https://www.remoteopenclaw.com/blog/best-chinese-models-2026)

### 不确定 / 待核实

- "民主国家算力是中国 11 倍"——一手出处未明，写作时谨慎使用
- NextEra-Dominion 交易是否完成——目前是"agreed"，可能有反垄断审批风险

---

## 五、Anthropic IPO：AI 资本周期的锚

> 这部分与 6/3 已归档的 [Anthropic反超OpenAI-2026-06-03](../Anthropic反超OpenAI-2026-06-03/11-final.md) 重合度高，**写作时只引用 2-3 个核心数据，不重复案例细节**。

- 5/27/2026 Anthropic 秘密递交 S-1
- 估值：$852B（OpenAI 3 月估值）vs $965B（Anthropic Series H，5/28）
- ARR 跳升：$9B（2025 底）→ $30B（4 月）→ $47B（5 月）
- 10/2026 可能上市
- 来源：[Futurum Group：Anthropic Files For IPO](https://futurumgroup.com/insights/anthropic-files-for-ipo-looking-to-beat-openai-to-the-punch)

---

## 六、可复用的工作区已有素材

| 素材 | 路径 | 用法 |
|---|---|---|
| AI 异化劳动 5/30 稿 | [归档/AI异化劳动-马原课堂分享-2026-05-30/11-final.md](../AI异化劳动-马原课堂分享-2026-05-30/11-final.md) | 风格参考（PPT 节奏），不重复内容 |
| Anthropic反超OpenAI 6/3 稿 | [归档/Anthropic反超OpenAI-2026-06-03/11-final.md](../Anthropic反超OpenAI-2026-06-03/11-final.md) | **不重复案例**，可引 1-2 个数据点 |
| DeepSeek V4 Pro 5/05 稿 | [归档/DeepSeek-V4-Pro-2026-05-05/](../DeepSeek-V4-Pro-2026-05-05/) | 国产大模型背景（可选） |
| 风格指南 | [写作参考/风格指南.md](../../写作参考/风格指南.md) | 强制遵守 |

---

## 七、本次调研的不确定项汇总

1. "民主国家算力是中国 11 倍"——Threads 转引，未找到一手来源
2. H200 出口许可细节——HKEPC 提及但未明
3. 950PR 实际产能——业内人士数据
4. 欧盟 AI 法案 Omnibus 终稿条款——5/7 是临时协议，最终条款待 EU 正式公布
5. "数十万颗"高端芯片经海外子公司流入——供应链人士估算

**写作处理**：这些点不作为强论据，可作为"业内估算"提一下。
