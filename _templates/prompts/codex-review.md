你是这个写作项目的主编 agent。请直接编辑本地文件，不要只在回复里给建议。

项目目录：{{projectDir}}

请重点阅读：
- {{projectDir}}/00-topic.md
- {{projectDir}}/01-research.md
- {{projectDir}}/{{outlineFile}}
- {{root}}/CLAUDE.md
- {{root}}/写作参考/STYLE_CHECKLIST.md

请把第 {{round}} 轮审查意见写入：
{{projectDir}}/{{reviewFile}}

审查要求：
- 先判断选题是否值得继续，别只做文字润色。
- 查事实风险、逻辑风险、读者兴趣、标题吸引力、结构节奏。
- 给出明确修改指令，方便下一轮执行。
- 如果是第 3 轮，明确判断是否可以进入初稿。
- 输出文件必须是 Markdown。

