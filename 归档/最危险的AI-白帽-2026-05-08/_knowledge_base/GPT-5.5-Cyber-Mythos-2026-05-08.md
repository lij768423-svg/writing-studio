# GPT-5.5-Cyber & Anthropic Mythos — AI 网络安全模型调研

## 信息收集时间
2026-05-08

## 核心事件

### Anthropic Claude Mythos（2026.4.7 发布）
- Anthropic 的前沿模型，编码和推理能力的"溢出效应"使其具备强大漏洞发现能力
- 发现了所有主流 OS 和浏览器中的数千个高危/严重漏洞（>99% 仍在协调修复中未公开）
- **关键数据**：
  - Firefox 147 JS 引擎：181 个可用 exploit（Opus 4.6 仅 ~2 个），成功率从 0.8% 跃升至 72.4%
  - 发现 27 年前的 OpenBSD TCP 漏洞、16 年前的 FFmpeg H.264 漏洞
  - 可串联 4 个浏览器漏洞实现沙箱逃逸
  - 每次 exploit 运行成本低至 ~$50 计算资源
  - $20K 可运行 1000 次并行 OpenBSD 扫描
- **UK AISI 独立验证**：首个完成端到端 32 步企业网络攻击模拟的模型
- 解决 73% 的专家级 CTF 挑战

### Project Glasswing（Anthropic 的应对方案）
- 不公开发布 Mythos，成立防御联盟
- 创始伙伴：AWS、Apple、Cisco、CrowdStrike、Google、JPMorganChase、Microsoft、NVIDIA、Palo Alto Networks、Linux Foundation
- 40+ 额外组织
- $1 亿使用积分 + $400 万开源安全捐赠
- 向美国政府做简报

### OpenAI GPT-5.5-Cyber（2026.5 初发布）
- 基于 GPT-5.5 的网络安全专用模型
- 三级访问框架（TAC）：
  1. GPT-5.5 默认版 — 标准护栏
  2. GPT-5.5 with TAC — 面向经验证防御者的漏洞分类、恶意软件分析、检测工程
  3. GPT-5.5-Cyber — 最宽松层，用于红队、渗透测试、受控验证
- 需强身份验证（钓鱼抵抗认证，2026.6.1 起强制）
- 合作安全厂商：Cisco、SentinelOne、Intel、Snyk、Semgrep、Socket、Gen Digital
- UK AISI 评为"cyber 任务上最强的模型之一"，第二个完成端到端多步攻击模拟的系统

### Sam Altman 的争议
- 此前在 Core Memory 播客上公开嘲讽 Anthropic 的限制访问策略
- 原话："We have built a bomb, we are about to drop it on your head. We will sell you a bomb shelter for $100 million."
- 将 Anthropic 的做法类比为"贩卖恐惧"
- 但 OpenAI 随后采用了几乎相同的门控策略
- 被媒体和社区批评为"虚伪"

### 实际影响案例

**Firefox**：
- 2026.4 发布 423 个漏洞修复 vs 去年同月 31 个（增长 13.6 倍）
- 发现沙箱漏洞（极复杂，需多步攻击）
- 发现 15 年前的 HTML 元素解析 bug
- Mozilla 工程师："这些东西突然变得非常好用了"
- 仍未用 AI 自动修漏洞——仍是一人写补丁一人审查

**cURL**：
- 用 AI 分析工具发现并修复 100+ 之前未发现的深层漏洞
- 但同时关闭了漏洞赏金计划——95% 提交是 AI 生成的幻觉漏洞报告（伪造的 GDB 调试会话和寄存器转储）

### 专家观点

**Yoshua Bengio**：
- "私人个体在为所有人决定基础设施的命运"
- 呼吁建立类似 FDA 的 AI 监管机构
- 警告开源模型可能比专有系统更危险（护栏可被移除）
- 认为中国模型能力落后美国约 6 个月
- 强调"国际承诺变得紧迫"

**David Sacks（前白宫加密/AI 主管）**：
- "Mythos 不是魔法，不是末日装置"
- "这是第一个能自动化网络任务的模型，后续还会有更多"
- 如果防御者先拿到，净效应是积极的

**Mozilla Brian Grinstead**：
- "这对攻击者和防御者都有用，但拥有工具会略微向防御方倾斜"
- "说实话，目前没人知道答案"

### 核心矛盾
- AI 工业化漏洞发现：从"手工匠人"变为"机器速度搜索"
- 补丁时间线坍塌：exploit 开发从数周降至数小时
- 每月补丁周期被认为"结构上不可持续"
- 防御瓶颈转移：不再是找不到漏洞，而是吸收和修补的速度跟不上
- 开源风险：公开源代码的透明度从优势变为 AI 扫描的靶子
- 权力集中：一家美国私企单方面决定谁先获得防御能力
- 开源追赶速度：David Sacks（4.30）公开表态约 6 个月，中国模型届时也将追上
- 五角大楼 vs Anthropic：2026.2 首次对美企使用"供应链威胁"条款，加州法院已临时阻止
- 欧洲被排除：EC 不在 40 个组织内，数十 MEP 联名致信；英国 AISI 获访问权并一周内发布评估

## 信息来源
- OpenAI 官方博客：https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/
- Politico：https://www.politico.com/news/2026/05/07/openai-chatgpt-cyber-ai-model-00910704
- The Register：https://www.theregister.com/2026/05/01/openai_locks_gpt55cyber_behind_velvet/
- The Verge：https://www.theverge.com/ai-artificial-intelligence/921073/openai-sam-altman-new-cybersecurity-model-gpt-5-5-cyber
- TechCrunch：https://techcrunch.com/2026/05/07/how-anthropics-mythos-has-rewritten-firefoxs-approach-to-cybersecurity/
- Fortune（Bengio 采访）：https://fortune.com/2026/04/17/anthropic-mythos-cybersecurity-capabilities-highlight-problem-of-ais-concentration-of-power-ai-godfather-yoshua-bengio-says/
- Cyber Defense Magazine：https://www.cyberdefensemagazine.com/when-ai-stops-assisting-and-starts-discovering-what-claude-mythos-preview-means-for-cybersecurity/
- CSA Research Note：https://labs.cloudsecurityalliance.org/research/csa-research-note-claude-mythos-autonomous-offensive-thresho/
- Illumio Blog：https://www.illumio.com/blog/time-to-rewrite-the-entire-cybersecurity-model-or-face-the-consequences
- 中文媒体：IT之家、至顶网等

## 下次更新建议
- 关注 GPT-5.5-Cyber 正式开放后的实际效果反馈
- 关注 Project Glasswing 是否扩大成员范围
- 关注是否有非盟国/非友好国家获取类似能力
- 关注各国监管机构（EU、UK、中国）的回应
