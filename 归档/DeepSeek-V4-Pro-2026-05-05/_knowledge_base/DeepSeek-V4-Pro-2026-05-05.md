# DeepSeek V4 Pro 调研资料

## 信息收集时间
2026-05-05

## 信息来源
- Artificial Analysis (artificialanalysis.ai)
- Morph LLM (morphllm.com)
- DeepInfra 定价指南
- 36氪、钛媒体、驱动之家、DoNews 中文评测
- CAISI (NIST) 独立评测
- 知乎用户实测
- SuperCLUE 中文能力测评
- DeepSeek 官方 API 文档

## 发布时间
2026年4月24日，预览版上线，MIT 协议开源

## 模型规格
- V4-Pro: 1.6T 参数（MoE），49B 激活参数，100万上下文
- V4-Flash: 284B 参数，13B 激活参数，100万上下文
- 注意力机制：CSA + HCA 混合注意力
- 训练数据：33T tokens
- 优化器：Muon
- 已适配华为昇腾 NPU

## 核心基准 (V4-Pro Max)
- SWE-bench Verified: 80.6%（官方）/ 74%（CAISI 独立评测）
- LiveCodeBench Pass@1: 93.5（所有模型第一）
- Codeforces: 3206（所有模型第一）
- AIME 2025: 97%
- GPQA Diamond: 90.1%
- MMLU-Pro: 87.5%
- AA Intelligence Index: 52（第10名，GPT-5.5为60）

## API 价格
### V4-Pro（限时2.5折，截至5月5日）
- 输入（缓存命中）: ¥0.025/百万token
- 输入（未命中）: ¥3/百万token
- 输出: ¥6/百万token

### V4-Flash
- 输入（缓存命中）: ¥0.02/百万token
- 输入（未命中）: ¥1/百万token
- 输出: ¥2/百万token

### 美元价格
- V4-Pro: 输入$1.74, 输出$3.48
- V4-Flash: 输入$0.14, 输出$0.28
- V4-Pro 输出 $3.48/1M tokens，Claude Opus 4.6 公开常见输出价 $25/1M tokens，便宜约 86%（约 1/7）

## 优点
- 性价比极高：以约 14% 的成本提供约 87% 的能力（按 AA Intelligence Index 粗略换算）
- 代码能力开源最强，LiveCodeBench和Codeforces双料冠军
- 百万上下文标配，长文本处理能力强
- Agent任务开源第一
- MIT开源，华为昇腾适配，国产化优势
- 中文能力SuperCLUE国内第一

## 缺点
- 综合能力仍落后GPT-5.5/Claude Opus 4.7约3-6个月（官方自评）
- 不支持多模态（无图像/视频输入）
- 复杂工程从零构建不如GPT-5.5
- 前端精致输出不如Claude
- 知识类基准（SimpleQA）明显落后
- 本地部署门槛高（Flash版284B也无法在32GB机器运行）
- 长上下文下响应延迟不稳定
- 幻觉率较高（不知道答案时94%幻觉率）

## 竞品对比
- vs GPT-5.5: 输出价格约 1/9（$3.48 vs $30），代码竞赛略胜，但知识与综合推理仍有差距
- vs Claude Opus 4.6/4.7: 输出价格约 1/7（$3.48 vs $25），代码接近，但长上下文质量和知识不如
- vs Gemini 3.1 Pro: 代码和Agent略胜，知识和多模态不如
- vs Kimi K2.6: V4 Pro在AA指数上不如（52 vs 54），但Agent和代码更强
- vs 国内模型：SuperCLUE排名第一

## 适用人群
- 成本敏感型开发者/创业团队：最佳选择
- 长文本处理需求者（法律、财报、论文）：非常合适
- Agent/自动化工作流搭建者：开源最强
- 寻求国产化部署的企业：华为生态优势
- 日常编程辅助：够用且便宜
- 追求极致质量的专业开发者：GPT-5.5/Claude仍更可靠
- 需要多模态的用户：不推荐
- 想在本地PC运行的用户：不推荐（无小型蒸馏版）

## 下次更新建议
- 关注后续V4.1改进（bug修复、幻觉率降低）
- 关注下半年华为昇腾950量产后的价格变化
- 关注多模态版本是否发布
