# 选题 B 调研：平台 + AI 双重控制下的劳动

> **调研日期**：2026-06-10
> **切入点**：平台 + AI 把劳动"去技能化" + 算法监工。表面"灵活就业"，实质更深控制。
> **理论框架**：形式吸纳 / 实质吸纳（Burawoy）+ 劳动去技能化（Braverman）+ 算法治理 + 平台资本主义（Srnicek）
> **范围**：2024 - 2026 年关键事件、判决、研究、纪录片与数据
> **数据源**：tavily-search（13 次）+ WebFetch（HRW 长报告 1 次）+ 已知学界框架
> **状态**：已完成初稿；如下游有更细需求可补搜

---

## 摘要

2024-2026 三年里，平台 + AI 的双重控制呈现出**三个叠加趋势**：

1. **从算法剥削到"算法治理"被立法回拨**：欧盟 AI Act（2025 年 2 月生效）正式把"工作场所情绪识别 AI"列为"不可接受风险"，禁止使用；中国 2025 年发布首部外卖国家标准 GB/T 46862-2025，明确"配送员每天接单不超过 8 小时"、"原则上不应以扣款作为超时罚则"。
2. **从隐性控制到显性诉讼**：Surge AI（2025-05）、Scale AI（持续）被以"故意错误分类为独立承包人"集体诉讼；肯尼亚最高法院（2023-07）已判定 Meta 是 Nairobi 审核员的"主要雇主"。
3. **从"灵活就业"叙事到社保并轨**：京东、美团、饿了么 2025 年起为超百万骑手缴纳社保；印度 2026-01 政府限制"10 分钟必达"承诺。

但学界普遍判断：监管只控制了"显性扣款 / 极端时限"，而**真正的去技能化与实质吸纳**——把判断、节奏、情绪、关系都外包给算法——并未被触及。

---

## 1. 外卖骑手 + 智能调度（2025-2026）

### 1.1 关键事件 / 判决 / 新规（2025-2026）

| 时间 | 事件 | 来源 |
|---|---|---|
| 2025-02-11 | 京东宣布 2025-03-01 起为外卖全职骑手缴纳五险一金，个人部分公司全额承担 | 人民日报 / 新华网 |
| 2025-02-20 | 美团、饿了么跟进；美团试水"先缴后补"模式 | 人民日报 |
| 2025 年底 | 美团宣布"2025 年底前逐步取消骑手超时扣款"，建立算法公开机制 | 美团公告（人民日报转引） |
| 2025-12-02 | 国家市监总局 / 国标委发布 **GB/T 46862-2025《外卖平台服务管理基本要求》**，第 7 章"配送员权益保障"用 15 条条款框架 | 金诚同达律所专题 |
| 2026-04 | 中办、国办《关于加强新就业群体服务管理的意见》 | 新华网 |
| 2026-05-19 | 新华社报道：1000 多万外卖骑手中，"先缴后补"模式已覆盖数百万 | 新华网 |

### 1.2 GB/T 46862-2025 关键条款（金诚同达律所摘录）

- **7.2.8 反克扣条款**："原则上不应该将扣款作为配送超时、消费者差评等情况的处罚方式"
- **7.4.1.a**：每天接单时长不超过 8 小时；达 8 小时后必须弹提示由骑手自主确认
- **7.4.1.b**：连续接单超过 4 小时应**自动停推订单 20 分钟**
- **7.4.1.e**：每周应有一天的休息时间，禁止"全勤奖 / 冲单奖励"等变相强制加班
- **7.4.4**：平台**应以平均时速不超过 15 km/h 计算配送时长**——即算法必须放弃"极限速度"假设
- **7.1.7 / 7.1.8**：禁止强制骑手购买指定品牌换电 / 增值服务

### 1.3 关键数据点

- 2023 年美团上有接单收入骑手 745 万人，"全年累计接单天数 260 天以上"的稳定骑手约 82 万（美团研究院）
- 全国灵活就业人员 2 亿，新业态从业人员 8400 万（人社部 2025）
- 美团首批试点（泉州、南通）共 2.2 万骑手，**仅约 4000 人**达到补贴门槛——印证"灵活就业"中绝大多数不在社保覆盖
- 京东宣布为骑手全额承担五险一金（含个人部分），月均成本超 1000 元 / 人

### 1.4 评论 / 异见

- **社科院王天玉**（"与其说困在系统里"原命题人）：从"算法囚徒"到"职业人"的身份跃迁；但下一步需把外卖行业探索**复制到更多灵活就业领域**
- **中国政法大学娄宇**：并非所有骑手都想放弃灵活性；强制纳保需分层分类
- **华东师大路锦非**：建议"分类保障"——全职 / 兼职 / 纯灵活 三档
- **武大赵青（1600 人调查）**：缴费太高、负担不起是不参保的首要原因

### 1.5 "15 km/h 限速"条款的实质

这是**用国家标准倒逼算法让渡"速度极限"**——以前算法按"理想路况"算时长，现在必须按"15 km/h 均速"倒推，超时责任从骑手转给平台 / 商家出餐慢。这是**形式吸纳 → 实质吸纳**的逆转点：以前平台把"风险"实质吸纳给自己（算法风险），现在立法把"安全底线"再吸纳回公共责任。

---

## 2. AI 训练数据标注员（Scale AI / Remotasks / Surge AI / 肯尼亚 / 菲律宾 / 印度）

### 2.1 2025-2026 关键事件

| 时间 | 事件 | 来源 |
|---|---|---|
| 2024-03-07 | Scale AI 旗下 Remotasks 突然切断**肯尼亚、尼日利亚、巴基斯坦**三国全部工人账号，无任何解释 | Rest of World, 2024 |
| 2024-09 | Scale AI 子公司 GlobalLogic（为 Google Gemini 训练）解雇 250 名美国工人，因他们投诉"工资差异"和"工作条件" | ETTelecom |
| 2024 年 | Remotasks 停止泰国、越南、波兰的新注册 | Rest of World |
| 2025-05-20 | 加州集体诉讼起诉 **Surge AI** "故意"把数据标注员分类为独立承包人，剥夺员工福利；服务对象包括 Meta、OpenAI | LA Times, Bloomberg Law |
| 2025 年 | Scale AI 同时被多起集体诉讼，类似错误分类指控 | Worksuite |
| 2025-10 | 加拿大媒体报道：肯尼亚 DLA（数据标注协会）正权衡对 Remotasks 的法律行动 | Canadian Affairs |
| 2026 | 80+ 国家 / 地区数据工人依然主要靠 Remotasks / Outlier / Surge AI 平台接活，**真实工资 $1-2 / 小时** | 多源汇总 |

### 2.2 工资 / 待遇细节

- **肯尼亚 OpenAI RLHF 工人**（2022-2023）：**$1.32 - $2 / 小时**，比当时最低工资还低（TIME 调查）
- **Scale AI / Outlier 当前美国 / 欧洲**：$15-60 / 小时（高技能任务），**但工人反映**"加上会议、培训、管理时间，**实际低于当地最低工资**"（AlgorithmWatch 调查，葡萄牙语专家工）
- **印度 / 拉美地区**：约 $8 / 小时起，**但任务不连续**（Reddit 工人报告）
- 60 Minutes / CBS 调查：肯尼亚工人 Nerima Wako-Ojiwa："劳动力又大又绝望，他们付多少就是多少，给你什么工作条件你就接受"

### 2.3 法律层面

- 美国：加州 AB-5 测试 + 集体诉讼路径（已成型，2025-2026 多起）
- 肯尼亚：本土劳动法**不覆盖数字劳动**——DLA 试图在 2025-2026 通过"集体诉求"而非诉讼
- **没有任何国家把"AI 训练数据标注"明确为受劳动法保护的雇佣关系**

### 2.4 学界对 Scale AI 模式的概括

- Antonio Casilli（Télécom Paris 教授）："click workers"——30 国访谈，2024 法文版《Slaves of the Click》，2025 英文版《Waiting for Robots: The Hired Hands of Automation》（芝加哥大学出版社）
- 关键论点：**没有 on-demand 的人力劳动，ImageNet 这种数据集根本不存在；现在这波 LLM / RLHF 仍是同一模式的放大版**
- 算法对标注员的**反向控制**：任务被分解成秒级切片，工人无议价权、无"工作"概念

---

## 3. 内容审核员（菲律宾 / 印度 / 肯尼亚 / 加纳）

### 3.1 关键事件 / 判决

| 时间 | 事件 | 来源 |
|---|---|---|
| 2022-05-10 | Daniel Motaung（南非裔，曾在内罗毕 Sama 工作）在肯尼亚就业法庭起诉 Meta 与 Sama | Reuters, TIME |
| 2023-06-01 | 内罗毕就业法庭判定：Meta 是审核员的"主要 / 首要雇主"，Sama 只是"代理人"——**判决具有里程碑意义** | The Guardian |
| 2023-06 | 法官 Byram Ongaya 临时裁决：要求 Meta "提供适当的医疗、精神病和心理护理"给审核员 | The Guardian |
| 2023-07-28 | 肯尼亚上诉法院判决（Motaung v Meta & Sama），确认上述原则 | Kenya Law |
| 2024-12-22 | CNN 报道：内罗毕审核员被诊断 PTSD，"终生创伤"——诉讼追讨赔偿 | CNN |
| 2025-04-27 | TBIJ + 卫报调查：Meta 把内容审核业务**秘密转移到加纳阿克拉**新外包点（具名后被公开），工作条件"几乎所有方面都比肯尼亚更差" | TBIJ |
| 2025-2026 | 加纳阿克拉新审核员诉 Majorel / Meta；肯尼亚 Majorel 工人准备起诉 | DW, Diplomatic Courier |
| 2026-02-12 | 肯尼亚法院推迟对两起 Meta 诉讼的判决（延期到 2026 下半年） | BHRRC |

### 3.2 工人状况

- **HRW 2025 报告《The Gig Trap》**（美国家政平台）：算法工资剥削典型——但**审核员创伤模式**是另一条线
- 184+ 前 Meta 审核员被诊断 PTSD（HR Magazine）
- Sama 培训时**不告知工作中将看到的内容**（BBC）
- 阿克拉新点工人："被强制达到不透明的目标，否则无法在阿克拉糊口"（TBIJ）

### 3.3 法律层面

- 肯尼亚就业法庭的"主要雇主"原则**未被任何美国法院同等适用**
- 集体诉讼在美国可行；Meta 选择"换个国家、换家外包"——**平台用工的"司法管辖套利"**

---

## 4. AI 客服 + 情绪识别 / 实时评分（2025-2026 关键拐点）

### 4.1 监管侧：欧盟 AI Act 2025-02 生效

**Article 5(1)(f) 工作场所情绪识别 = 不可接受风险 = 禁止**
- 例外 1：医学或安全目的（限于"保护生命")
- 例外 2：非基于生物特征数据的情绪推断（如纯文本情感分析）**不在禁令范围**
- 美国 / 中国 / 印度 / 巴西：**均无同等禁令**

### 4.2 市场侧

- 全球 Emotion AI 市场 2024 = **$2.9B**，预计 2034 = $19.4B，CAGR 21.7%（GMI）
- 主要应用：呼叫中心"实时情绪评分"+ 客服话术实时推荐 + 加班 / 离岗检测
- 学术研究（ACM 2023 / 2024）：工人普遍视为"对敏感情感信息的深度隐私侵犯"

### 4.3 经典场景

- 亚马逊仓库 AI 监工 + 心理评估（2019 Verge 报道延续到 2025）
- Teleperformance（加纳 / 印度客服外包）部署情绪 AI（2024 多源报道）
- 中国客服行业（阿里、京东、平安）：实时话术违规检测 + 情绪评分（2024 内部研究，多份学术论文）

### 4.4 学术框架

- UC Berkeley Labor Center（2025-05）：电子监控 + 自动决策系统——明确把"客服实时情绪评分"列为**已记录伤害**："work intensification"
- MIT Sloan / CMU 研究：去技能化（算法接管分诊决策）+ 工会抑制（算法识别"高组织化风险站点"）

---

## 5. Prompt 众包 / 模型微调（2025-2026）

### 5.1 平台格局

- **Midjourney v7**：艺术质量最强，但禁止 API / 自动化（"严格禁止 API 接入"）
- **OpenAI GPT-4o**：对话式精修图像
- **Google Imagen 4**：Workspace 集成
- **Stable Diffusion 3**：开源 + LoRA / ControlNet 微调
- **Adobe Firefly**：商用安全（仅训练自授权 Adobe Stock + 公共领域）

### 5.2 微调任务的市场形态

- **LoRA 训练数据集**主要由 GlobalSouth 数据工人在 Scale AI / Outlier / Surge AI 上完成
- 典型任务：提供某种特定风格 / 概念 / 角色的"参考图 + 描述对"——单价 $0.05 - $0.50 / 对
- **Pony Diffusion** 等社区模型完全靠志愿者 + 微任务工人提供训练数据
- 学术研究（arXiv 2602.10548）：HCI 学者把 RLHF / Prompt 标注归入"labor process theory"

### 5.3 "Invisible Labor" 框架

- Rest of World（2025）"The AI Con" 摘录：**没有 on-demand 的人力劳动，AI 不可能存在**
- "AI 训练数据 = 现代的 ImageNet"——只是把"数据"再进一步推到"判断"
- 学界新词：**"ghost work"**（Mary Gray）+ **"inconspicuous labor"**（Casilli）

### 5.4 关键洞察

> "We are watching not the total replacement of human labor but its reorganization—rendered less visible, less protected, more easily attributed to the algorithm, and almost always cheaper, because the workers are farther from the value they create and farther from any regulatory framework that might constrain how they are treated." — In The Watershed, Substack

---

## 6. 学界理论框架（去技能化 + 平台资本主义 + 算法治理）

### 6.1 经典理论谱系

| 学者 | 核心论点 | 关键作品 |
|---|---|---|
| **Harry Braverman** | 资本主义技术进步系统性地**去技能化**工人、深化管理控制 | Labor and Monopoly Capital, 1974（Jacobin 2026-03 重提） |
| **Michael Burawoy**（1947-2025） | **制造同意**：工人在"赶工游戏"中自我规训 | Manufacturing Consent, 1979 |
| **Nick Srnicek** | 平台资本主义 = 抽取 + 控制 + 网络化 | Platform Capitalism, 2016 |
| **Antonio Casilli** | 等待机器人 = AI 的"雇佣之手" | En attendant les robots (2019) / Waiting for Robots (2025) |
| **Sarah T. Roberts** | "商业内容审核"作为新型工厂劳动 | Behind the Screen, 2019 |
| **Mary Gray / Siddharth Suri** | "幽灵工作" = on-demand 人类劳动 | Ghost Work, 2019 |

### 6.2 2025-2026 新文献

- **Michael R. Slone**（Case Western, 2025-08 博士论文）："Crowd Control: Platform Capitalism and the Labor Process"——专门讨论算法对劳动过程的物质性控制
- **Yuan & Zhang**（2025-04）："From Platform Capitalism to Digital China"——中国平台是资本主义一般形式 + 国家特殊治理的复合
- **Jacobin 2026-03**："How Work Got So Bad"——重读 Braverman，把 AI 视为"技术进步"的最深一环
- **Iran / HCI 学者**（arXiv 2602.10548）："Labor Process Theory for HCI"——把 LPT 引入 AI 标注 / 客服研究
- **FEPS 2024**："Algorithms By and For the Workers"——欧盟层面反制路径

### 6.3 三层理论框架（用于本文）

1. **形式吸纳 vs 实质吸纳**（Burawoy）：
   - 形式吸纳：法律意义上"自由雇佣"（众包、独立承包人）
   - 实质吸纳：算法 + 评分 + 时限把"风险"转嫁到个人——**真正的"灵活就业"是实质吸纳**
2. **去技能化**（Braverman → 平台时代）：
   - 1974 版：装配线把工匠活拆成重复动作
   - 2025 版：算法把"判断、节奏、情绪、关系"全部分解成可计分切片——**评论员、骑手、客服、标注员** 都经历这个
3. **算法治理**（Srnicek / Zuboff 路径）：
   - 平台不再雇佣工人，**只"提供"市场 + 规则 + 评分**
   - "控制"和"管理"被外包给"算法 + 用户评分 + 同行竞争"

---

## 7. 关键纪录片 / 报道（2024-2026）

### 7.1 纪录片 / 长视频

- **CBS 60 Minutes**（多集）：肯尼亚 AI 工人 $2/小时 / Sama / OpenAI RLHF（2023-2024 持续追踪）
- **TBIJ + The Guardian**（2025-04-27）："Meta's new moderators face worst conditions yet"——加纳阿克拉秘密审核点
- **More Perfect Union**（2024-2025）："These workers are training AI to take their own jobs"——美国"AI 血汗工厂"调查
- **PBS "Future of Work"**：55M 美国 gig economy 工人（2024 季）
- **HRW 纪录片**："Algorithms of Exploitation"（配套 2026-05 报告）

### 7.2 重要报告 / 长文

- **HRW "Algorithms of Exploitation"**（2026-05-13）：横跨 11 国（UK, US, 黎巴嫩, 印度, 孟加拉, 尼泊尔, 巴基斯坦, 肯尼亚, 墨西哥, UAE, 沙特）工人访谈
  - 全球平台工人在 2016-2021 增长 90%，**4.35 亿人**通过平台挣钱
  - 等待 = 30-50% 的**未付薪**工作时间
  - 黎巴嫩 Uber 抽成 25%；美国 2024 Uber 抽 42%（部分 >60%）
  - 美国德州 127 名司机调查：扣费后**时薪中位数 $5.12**（低于 $7.25 联邦最低工资）
  - 1/3 德州司机曾因工交通事故；1/5 遭骚扰
  - 肯尼亚工人 Susan 单趟报酬 2025 = **2016 年的不到 50%**
  - 黎巴嫩工人 Dany 50 小时工作 → 毛收 $107 → 扣 Uber 抽成 $75，**甚至不够油费**
  - 印度工人 Ravi 18 小时班 → 2000 卢比（约 $21.5）**未扣费**
  - 沙特 / UAE 工人冒着 45°C+（中午 55°C+）极端高温
  - **Uber Pro Diamond 评级**：3 个月内取消率 <4% + 评分 >4.9/5
- **HRW "The Gig Trap"**（2025-05-12）：美国平台算法工资 + 劳动剥削
- **IHRB 2024**："Content moderation is a new factory floor of exploitation"
- **ILO 2025-06 mini guide**：灵活就业 + AI 影响
- **AlgorithmWatch 2024-2025**："AI Revolution Comes with the Exploitation of Gig Workers"——Outlier 工人口述
- **Rest of World "The AI Con" 摘录**（2025）：暴露 AI 隐性劳动链
- **The Aula Fellowship 2026-03**："The Invisible Labor Force Powering AI"——南半球零工 + AI

### 7.3 关键叙事金句（可用于文章）

- 肯尼亚审核员 Daniel Motaung（自己申请去 Nairobi 以为要去 call center，结果是看血腥内容）：
  > "We can't have safe social media if the workers who protect us toil in a digital sweatshop." — Cori Crider, Foxglove 主任
- 印度外卖工 Ravi（HRW）：
  > "Deliver in ten minutes or your earnings will be cut…you'll get fined."
- 肯尼亚司机 Susan：
  > "They don't tell us. They just change it."
- 苏格兰骑手 Graeme：
  > "You go out as much as possible, take your chances, roll the dice, cast your net."

---

## 8. 数据汇编（用于图表 / 论据）

### 8.1 外卖骑手（中国）

| 指标 | 数值 | 时间 / 来源 |
|---|---|---|
| 美团骑手（有接单） | 745 万 | 2023 / 美团研究院 |
| 美团稳定骑手（260 天以上） | ~82 万（11%） | 2023 / 美团研究院 |
| 饿了么活跃骑手 | >400 万 | 2023 报告 |
| 京东外卖 / 达达活跃骑手 | >120 万 | 2023 达达年报 |
| 全国灵活就业 | 2 亿 | 2025 人社部 |
| 新业态从业 | 8400 万 | 2025 |
| 社保试点首批（泉州/南通） | 2.2 万骑手 / 4000 符合 | 2025 / 美团 |

### 8.2 全球平台工人

| 指标 | 数值 | 来源 |
|---|---|---|
| 全球平台经济人 | 4.35 亿 | 2021 / HRW 2026-05 |
| 2016-2021 增长 | +90% | HRW |
| 等待占未付工时 | 30-50% | HRW |
| Uber 抽成（黎巴嫩） | 25% | HRW |
| Uber 抽成（美国） | 42% 均值，部分 >60% | HRW |
| 德州司机中位时薪（扣费后） | $5.12（联邦最低 $7.25，生活工资 $16.75） | HRW |
| 印度 Ravi 18h 班 | $21.5 毛收 | HRW |

### 8.3 AI 训练数据

| 指标 | 数值 | 来源 |
|---|---|---|
| OpenAI RLHF 肯尼亚时薪 | $1.32 - $2 | TIME 2023 |
| Scale AI / Outlier 西方 | $15-60/h | AI Gig Jobs |
| Scale AI / Outlier 印拉 | ~$8/h | Reddit / AlgorithmWatch |
| Surge AI 案件 | 集体诉讼中 | LA Times 2025-05 |
| Remotasks 一夜关停国家 | 肯尼亚 / 尼日利亚 / 巴基斯坦 | Rest of World 2024 |
| Google Gemini 训练被解雇 | 250 人 | GlobalLogic 2024-09 |

### 8.4 监管

| 监管 | 条款 | 时间 |
|---|---|---|
| 欧盟 AI Act Art.5(1)(f) | 禁工作场所情绪识别 AI | 2025-02 指南生效 |
| 中国 GB/T 46862-2025 | 外卖 8h / 4h 强制休息 / 禁超时罚款 / 15 km/h 限速 | 2025-12-02 |
| 京东 / 美团 / 饿了么 | 100w+ 骑手社保 | 2025 起 |
| 印度 | 禁"10 分钟必达"宣传 | 2026-01 |
| 墨西哥 | 2024 改革：plataforma digitales 享社保 | 2024 |
| ILO | 2025-06 协议开发平台工标准 | 2025-06 |

---

## 9. 给选题 B 的写作建议（备稿阶段）

### 9.1 文章可能的结构（参考选题 A 的"立论 + 矛盾 + 行动"骨架）

- **开头**：用 Daniel Motaung 真实故事 / Ravi 的 18 小时 / 美团 745 万骑手中的 82 万稳定工——一个具体的人引入
- **第一层**：外卖 = "算法最浅显的去技能化"——8 分钟 / 3 公里，平台告诉你"系统是客观的"
- **第二层**：数据标注 = "去技能化的极致"——$1.32/h 把"判断"切成 10 秒一片
- **第三层**：内容审核 + 情绪 AI = "去技能化的代价"——看到血腥 + 听到愤怒 + 被算法评分
- **第四层**：立法回拨的**有限性**——欧盟禁了情绪 AI，但文本情感分析还能用；中国出了国家标准，但"先缴后补"门槛只覆盖 4000/22000
- **结尾**：回到 Burawoy——**"赶工游戏"在 AI 时代变成了"赶工 + 评分 + 排名"的三重游戏**；表面被赋权的灵活就业者，实质是更彻底的实质吸纳

### 9.2 个人素材库检索关键词

> 建议在动笔前用 Grep 在 `全部即刻动态.csv` 搜索：
> - "外卖"、"骑手"、"美团"、"饿了么"、"京东"
> - "AI 客服"、"智能客服"、"评分"、"监控"
> - "众包"、"数据标注"、"Scale"、"Remotasks"
> - "自由职业"、"灵活就业"
> - "打零工"、"副业"、"项目制"

### 9.3 选题 B 相比选题 A 的独特价值

- A 偏**国家 + 制度**（政策与博弈）
- B 偏**全球 + 微观**（具体的人、具体的工作环节）
- 两者可形成系列：**A 看天花板，B 看地板**

### 9.4 待补的研究空白（如下游要深挖）

- 中国 AI 客服行业的实际部署数据（2025-2026 内部研究多，但**公开报道少**——可考虑做 1-2 次非公开访谈）
- 中国内容审核员的实际工作条件（与 OpenAI 肯尼亚工人平行）
- prompt 众包的中国平台（百度文心、阿里通义、字节豆包等的 RLHF 工人）——基本无公开报道
- 2026-2026 中国"算法公开机制"是否真落地（美团承诺了）——可观察

---

## 10. 引用源汇总（绝对路径 / 优先 URL）

### 中国外卖 / 监管

- 人民日报 2025-02-28《外卖骑手"社保"破局》：https://paper.people.com.cn/zgjjzk/pc/content/202502/28/content_30063891.html
- 新华网 2026-05-19《给外卖骑手交社保，进展如何》：https://www.news.cn/politics/20260519/d5d53fdbdd6d4831aa2964ade035a4ff/c.html
- 第一财经《多平台为外卖骑手缴纳社保》：https://www.jfdaily.com/wx/detail.do?id=864969
- 金诚同达律所《GB/T 46862-2025 劳动法解读》：https://jtn.com/CN/booksdetail.aspx?type=06001&keyid=00000000000000009433&PageUrl=majorbook&Lan=CN
- 财新《社保缴费新规是否涵盖外卖骑手》：https://m.caixin.com/m/2025-08-12/102351160.html

### AI 标注 / 审核（全球）

- LA Times 2025-05-21 Surge AI 诉讼：https://www.latimes.com/business/story/2025-05-21/surge-ai-is-latest-san-francisco-start-up-to-face-lawsuit-for-allegedly-misclassifying-data-labeling-workers
- Bloomberg Law 2025 Surge AI：https://news.bloomberglaw.com/litigation/ai-training-firm-surge-ai-hit-with-worker-misclassification-suit
- Rest of World 2024 Remotasks 关闭国家：https://restofworld.org/2024/scale-ai-remotasks-banned-workers
- Canadian Affairs 2025-10：https://www.canadianaffairs.news/2025/10/17/the-gruelling-low-paid-human-work-behind-generative-ai-curtain
- CBS News 肯尼亚 AI 工人：https://www.cbsnews.com/news/ai-work-kenya-exploitation-60-minutes
- TIME 2023 Motaung v Meta：https://time.com/6253180/meta-kenya-lawsuit-motaung
- TBIJ 2025-04-27 加纳新审核点：https://www.thebureauinvestigates.com/stories/2025-04-27/suicide-attempts-sackings-and-a-vow-of-silence-metas-new-moderators-face-worst-conditions-yet
- The Guardian 2023 肯尼亚就业法庭判决：https://www.theguardian.com/global-development/2023/jun/07/a-watershed-meta-ordered-to-offer-mental-health-care-to-moderators-in-kenya
- CNN 2024-12-22 肯尼亚 PTSD：https://www.cnn.com/2024/12/22/business/facebook-content-moderators-kenya-ptsd-intl
- AlgorithmWatch Outlier：https://algorithmwatch.org/en/ai-revolution-exploitation-gig-workers
- Rest of World "The AI Con" 摘录：https://restofworld.org/2025/the-ai-con-book-invisible-labor

### AI Act / 情绪 AI

- Wolters Kluwer 2025 AI Act 情绪 AI 禁令：https://legalblogs.wolterskluwer.com/global-workplace-law-and-policy/the-prohibition-of-ai-emotion-recognition-technologies-in-the-workplace-under-the-ai-act
- Forasoft 2026 FAQ 情绪识别：https://www.forasoft.com/blog/article/emotion-recognition-video-conferencing
- FPF Red Lines：https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions
- UC Berkeley Labor Center 2025-05：https://laborcenter.berkeley.edu/wp-content/uploads/2025/05/Electronic-Monitoring-and-Automated-Decision-Systems-FAQ.pdf

### 学界理论

- Jacobin 2026-03 "How Work Got So Bad"：https://jacobin.com/2026/03/work-deskilling-labor-capitalism-technology
- Slone 2025 Case Western 博士论文：https://etd.ohiolink.edu/acprod/odb_etd/ws/send_file/send?accession=case1749215545409255&disposition=inline
- Yuan & Zhang 2025 "Platform Capitalism to Digital China"：https://linzhangweb.org/wp-content/uploads/2025/04/yuan-and-zhang-2025-from-platform-capitalism-to-digital-china-the-path-governance-and-geopolitics.pdf
- FEPS 2024 "Algorithms By and For the Workers"：https://feps-europe.eu/wp-content/uploads/2024/01/PS-Algorithms-by-and-for-the-workers.pdf
- arXiv 2602.10548 LPT for HCI：https://arxiv.org/html/2602.10548v1
- Casilli "Waiting for Robots" 2025：https://press.uchicago.edu/ucp/books/book/chicago/W/bo239039613.html

### 印度 / 全球 gig 抗议

- Countercurrents 2026-02 全国女性 gig 工抗议：https://countercurrents.org/2026/02/nationwide-protest-led-by-women-gig-workers-across-the-country
- Frontier Weekly 2025-26 印度 gig 工罢工：https://frontierweekly.com/articles/vol-58/58-34/58-34-Gig%20Workers%20Recent%20Strikes.html
- The Academic 2025-05 印度食品配送抵抗：https://theacademic.in/wp-content/uploads/2025/06/17.pdf

### HRW

- HRW 2026-05-13 "Algorithms of Exploitation"：https://www.hrw.org/feature/2026/05/13/algorithms-of-exploitation/rights-abuses-in-the-gig-economy-and-the-global-fight
- HRW 2026-06-03 "AI Already Runs the Gig Economy"：https://www.hrw.org/news/2026/06/03/ai-already-runs-the-gig-economy
- HRW 2025-05-12 "The Gig Trap"：https://www.hrw.org/report/2025/05/12/the-gig-trap/algorithmic-wage-and-labor-exploitation-in-platform-work-in-the-us
- HRW 2026-05-13 ILO 公约评论：https://www.hrw.org/news/2026/05/13/ilo-labor-treaty-should-protect-all-gig-workers

### 国际报告

- ILO 2025-06 Mini Guide：https://www.ilo.org/sites/default/files/2025-06/ILO%20-%20Mini%20Guide_(Digital)_13jun.pdf
- IHRB 2024 内容审核工厂：https://www.ihrb.org/latest/content-moderation-is-a-new-factory-floor-of-exploitation-labour-protections-must-catch-up
- The Aula Fellowship 2026-03：https://theaulafellowship.org/2026/03/01/the-invisible-labor-force-powering-ai
- More Perfect Union 2024 调查：https://www.facebook.com/MorePerfectUS/videos/new-these-workers-are-training-ai-to-take-their-own-jobs...

---

## 11. 自评与未完成项

### 已覆盖（2024-2026 关键素材 ✓）
- 1. 外卖骑手 + 智能调度 ✓
- 2. AI 训练数据标注员 ✓
- 3. 内容审核员 ✓
- 4. AI 客服 + 情绪识别 ✓
- 5. prompt 众包 / 模型微调任务 ✓
- 6. 学界：去技能化 / 平台资本主义 / 算法治理 ✓
- 7. 关键纪录片 / 报道 ✓

### 仍可深挖（如下游要写 3500+ 字深度文）
- 中国 AI 客服行业实际部署（无公开数据）
- 中国数据标注 / 审核员的国内情况（多在公众号深度文，学术研究少）
- 印度 2025-12 / 2026-01 罢工的"算法 + 监管"具体诉求
- 京东 / 美团 / 饿了么社保并轨的"先缴后补"模式详细规则
- 2026 下半年肯尼亚法院对 Meta 两起诉讼的最终判决（**值得追踪**）
- ILO 2026-06 公约（HRW 已预告）

### 数据可靠性
- ★★★★★：HRW 报告（11 国访谈）、欧盟 AI Act 文本、GB/T 46862-2025 国标、肯尼亚就业法庭判决
- ★★★★：LA Times / Bloomberg / TIME / Reuters（4 大主媒直接报道）
- ★★★：Rest of World / TBIJ（专注报道，深度信源）
- ★★：The Academic / Frontier Weekly（印度本地报道，但核实较少）
- ★：Reddit / LinkedIn 个人帖（仅作工人声音用，不作硬数据）
