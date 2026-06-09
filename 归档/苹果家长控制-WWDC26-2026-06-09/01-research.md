# 01 - 调研：WWDC26 苹果「信任与安全」更新——一场家长控制的社会战争

> 信息收集时间：2026-06-09
> 调研时间窗：2026/5/8 - 2026/6/9
> 调研人：Claude（写作 agent）
> 工作区状态：standard / claude-research 已通过 Tavily 替代完成（orchestrator `claude-research` 子命令 PATH 不可靠，6/3/6/8 教训后绕开）
> 下次更新建议：WWDC26 Session 视频（通常 6/8 当晚 / 6/9 发布）+ iOS 27 beta 文档

---

## 第 1 块：WWDC26 苹果"信任与安全"具体更新（5/8 - 6/9）

### 总结

6/8（北京时间 6/9 凌晨）WWDC26 keynote 后，苹果**单独发了一份"child safety features"新闻稿**，而没有把"信任与安全"塞进 iOS 27 主线——这本身就是一种产品/法务信号：这一次升级的范围是"产品+合规"双重驱动。

具体可以拆成五条线：

1. **Communication Safety 升级：18 岁以下自动 blur 暴力 + 裸露画面，并扩展到 FaceTime 共享相册。** 苹果与**美国儿科学会（AAP）**合作制定年龄分级指引，新增"对暴力画面的检测和模糊"——这是一个明确的扩展：上一代 Communication Safety 只针对裸露/性内容；2026 年这一版扩到**暴力画面**。同时把"自动 blur"的范围从 iMessage 共享相册扩展到 **FaceTime 通话中的裸体检测**，并继续走 on-device、端到端不破坏加密的路线。
2. **Screen Time / 家长控制重做。** 引入"App 时间配额（Recommended time allowances）"和"Ask to Browse（请求浏览特定网站）"——这两项 iOS 26 已经预告，WWDC26 正式落地到 iOS 27。家长可以设置"应用类型配额"（如"社交 App 每天 1 小时"），孩子突破后必须请求；Safari 浏览未列入白名单的网站时也会弹"Ask to Browse"提示，由家长审批。
3. **Home App 升级：4K HomeKit Secure Video + AI 视频摘要。** Apple Intelligence 进入 Home App，摄像头画面支持 4K HDR，并能在本地生成"今日门前发生了什么"的活动摘要——这是 on-device AI 第一次进入家庭安防场景，The Verge 和 CNET 都强调了"AI 看摄像头"的隐私张力。
4. **儿童账户的家长审批流程变化。** iOS 26 时期已经做了"年龄为基础的应用过滤、儿童账户设置流程更聪明"，iOS 27 在此基础上把"Ask to Buy / Ask to Install / Ask to Browse"做了**统一入口**，并把 Communication Safety 设定从"逐 App 开关"改成"按年龄档默认开"（≤17 岁默认开启、不可关闭；18+ 默认关闭、可在设置里开）。
5. **Age assurance / age estimation。** 这一块苹果**没有走 Apple 端的"人脸估年龄"**（Google/Instagram 在做），而是**给开发者一个 Declared Age Range API**——开发者可以请求一个"用户是否 ≥13/≥16/≥18"的布尔判定，**苹果不做生物特征识别**，只做账户自报年龄 + 设备/IP 区域推断 + App Store 分级匹配。苹果在 6/8 一份简报里把这条称为"既满足监管又不采集生物数据"的中位路线。

iOS 27 / iPadOS 27 / macOS 27（Golden Gate） / watchOS 27 / tvOS 27 / visionOS 27 全部包含上述儿童安全更新，秋季正式版推出。

### 引用链接

- Apple 官方（6/8）：https://www.apple.com/newsroom/2026/06/01/apple-previews-new-child-safety-features/ （搜索快照标题为 "Apple previews new child safety features"，原 URL 在 Apple newsroom 索引下；同稿也以 Business Wire 形式发布）
- The Verge（6/8）：https://www.theverge.com/news/2026/6/8/apple-wwdc-2026-child-safety-features（标题 "Apple is redesigning Screen Time and overhauling child controls"）
- CNET（6/8）：https://www.cnet.com/tech/services-and-software/apple-wwdc-2026-child-safety-features/（标题 "Apple's New Child Safety Features Include Letting Kids Ask to View New Sites"，含 AAP 合作细节）
- Financial Times 商业公告（6/8）：https://markets.ft.com/en/CompanyAnnouncements/Apple%20previews%20new%20child%20safety%20features
- TechCrunch（6/8）：https://techcrunch.com/2026/06/08/apple-wwdc-2026-parental-controls/
- Reuters（6/8）：https://www.reuters.com/technology/artificial-intelligence/from-siri-ai-to-child-safety-tools-key-takeaways-from-apples-wwdc-2026-06-08/（标题 "From Siri AI to child safety tools: Key takeaways from Apple's WWDC"）
- CNET Home AI（6/8）：https://www.cnet.com/home/smart-home/apples-new-home-ai-brings-video-descriptions-and-more-for-home-security/（"Apple's New Home AI Brings Video Descriptions and More for Home Security"）
- 9to5Mac iOS 27 + iCloud+：https://9to5mac.com/2026/06/08/ios-27-icloud-plus-features/（含 Home 4K + Apple Intelligence 整合细节）
- MacRumors iOS 27 tidbits：https://www.macrumors.com/2026/06/08/ios-27-tidbits-shared-phone-number-alarm-volume/（含 Ask to Browse、App 时间配额等条目）
- PhoneArena 总览：https://www.phonearena.com/news/ios-27-features-apple-wwdc-2026_id164000（"Siri AI, Child safety, and a farewell to Tim Cook"）

---

## 第 2 块：苹果 2021 CSAM 扫描风波的历史

### 总结

这一段在 6/8 的语境下是**最有叙事价值**的——5 年前苹果想做"端侧哈希扫描 iCloud 照片"，被骂到退场；5 年后苹果几乎**沿着同一条路径的另一侧**重新入场，但用"家长控制 + Communication Safety"的外衣。

**完整时间线：**

- **2021/8/5**，苹果高调宣布三项儿童安全功能：(a) **iCloud Photos 客户端 NeuralHash 扫描**（哈希匹配 NCMEC 数据库，触发人工复核，账户被封则上报 NCMEC）；(b) **iMessage Communications Safety**（未成年人收到/发送裸体图像时本地模糊 + 警告）；(c) **Siri / Search 中的干预提示**。
- **2021/8 上旬 - 9/3**，**EFF、电子前哨基金会**在 8/19 发布公开声明 "Apple's Plan to 'Think Different' About Encryption Opens a Backdoor to Your Private Life"——核心批评：客户端哈希扫描 = 一次为"为儿童保护"打开的、政府可被复用的"先例后门"；**90+ 国际组织**联署公开信（Reuters 2021/8/20 报道）要求苹果放弃。密码学家 Matthew Green、Johns Hopkins 的 Matthew D. Green 教授和 Princeton 的 Jonathan Mayer 等学者公开指出 NeuralHash 哈希碰撞可被恶意构造，让攻击者"栽赃"——Hacker News 上有人几小时内就构造出两张**哈希一致**的不同猫狗图。
- **2021/9/3**，苹果**宣布推迟** NeuralHash 上线，理由是"基于反馈进一步咨询"。Apple Wiki/HN 时间线显示这是事实上的暂停。
- **2022/12**，苹果在升级的"Expanded Protections for Children" 文档中**悄悄下线了 NeuralHash 扫描 iCloud Photos** 的实施部分——保留并**加强**了 Communication Safety（设备本地、不可被政府调用）和 Siri/Search 干预，**但放弃了 iCloud 端侧扫描**。WIRED 同期报道："Apple Kills Its Plan to Scan Your Photos for CSAM. Here's What's Next"——明确指出苹果把路径"切换到 Communication Safety 单一轨道"。

**这个背景对理解 WWDC26 的影响：**

WWDC26 的逻辑可以读成"2021 失败后的二次入场"——苹果 5 年前想用**面向政府的合规**（帮 FBI/NCMEC 找 CSAM）实现儿童保护，被骂了；现在改用**面向家长的合规**（家长控制 + Communication Safety 升级），但底层是**同一套设备端 ML 检测能力**。差别在：2021 是云端哈希+国家可调用，2026 是 on-device 模糊+家长可调用。**隐私代价没消失**，只是承担者从"全社会"换成了"未成年人 + 家长"。

这也解释了为什么苹果这次**和 AAP 合作 + 强调"4 大医学/儿童组织背书"**——他们要补 2021 缺失的"专家共识合法性"。但 EFF 2026 年初仍在持续关注 client-side scanning 的扩展是否会成为新的政府后门。

### 引用链接

- EFF 2021 原始声明（仍在）：https://www.eff.org/deeplinks/2021/08/apples-plan-think-different-encryption-threatens-everyone
- EFF 2021 后续："Apple Has Listened And Will Retract Some Harmful Phone-Scanning"：https://www.eff.org/deeplinks/2021/09/apple-has-listened-and-will-retract-some-harmful-phone-scanning
- Reuters 2021/8/20（90+ 团体联署）：https://www.reuters.com/technology/policy-groups-ask-apple-drop-plans-inspect-imessages-scan-abuse-2021-08-19/
- WIRED 2022（CSAM 退场分析）：https://www.wired.com/story/apple-csam-scanning-plan-killed/（搜索快照 "Apple Kills Its Plan to Scan Your Photos for CSAM. Here's What's Next"）
- CNN 2022（CSAM 退场报道）：https://www.cnn.com/2022/12/06/tech/apple-csam-scanning/index.html（搜索快照 "Apple abandons controversial plan to check iOS devices and iCloud"）
- HN/学术：https://news.ycombinator.com/item?id=28238274（NeuralHash 哈希碰撞 PoC 讨论）
- 学术 PDF（科罗拉多大学法学院）：https://scholar.law.colorado.edu/cgi/viewcontent.cgi?article=1750&context=articles（"Apple's NeuralHash Controversy, the ECPA, the Fourth Amendment..."）

---

## 第 3 块：全球儿童在线保护监管对比

### 总结

WWDC26 的"全球统一升级"不是苹果的**自发**——5 个司法辖区，**5 套不同压力**，苹果在 WWDC26 同时响应/主动设置"中位标准"。可以拆成 3 类压力源。

**A. 美国——双轨压力（联邦慢 / 州级快）**

- **COPPA 2.0 / KOSA**：COPPA 1998 的更新在 2024-2025 年反复推、反复没通过；**KOSA（Kids Online Safety Act）** 2024 在参议院通过众议院受阻，2025 年由 Josh Hawley / Marsha Blackburn 等人重新提出。**州层面**反而在动：**Texas SB 2420（2025）**要求 App Store 对所有用户做年龄验证、未成年下载需家长同意；**Utah / South Carolina** 类似。
- **针对苹果的具体压力**：2026 年 Apple 已经在 Texas App Store 实施"新账户必须自报年龄 + 13 岁以下需家长设置儿童账户 + 18+ 类别应用需家长审批"——这正是 iOS 27 在 WWDC 推出"全球统一"功能的事实原因。
- **COPPA 罚款风险**：单次违规最高 **$51,744**（2024 FTC 调整后），并已多次对 TikTok / YouTube / Epic 开出上亿美元罚单。

**B. 欧盟——DSA + 临时 CSAM 检测法律 2026 年 4 月到期**

- **DSA（Digital Services Act）** 2024/2 全面适用，要求大型平台对未成年人提供"高隐私高安全"标准；欧盟委员会主席 **von der Leyen 2025 年提出"social media delay"**——直接要求成员国禁止 16 岁以下使用社交媒体，2026 夏季立法。
- **CSAM 临时检测法律**（"chat control"前身）：2021 年作为 GDPR 临时例外通过，**2026 年 4 月正式到期**——Google/Meta/Snap/Microsoft 联名致信 The Guardian 警告"到期不延期 = 检测能力消失"，但**德国 + 荷兰明确反对**重启"客户端扫描"立法（chat control 2.0 2025 已被丹麦撤回、议会多数反对）。
- **苹果的态度**：iCloud+ 走端到端加密 + RCS E2EE 2026 上线——**和 chat control 路线相反**；但在**儿童账户**这一层，苹果愿意配合 DSA 的"未成年人高保护"。

**C. 英国——AADC + Online Safety Act 双法**

- **AADC（Age Appropriate Design Code）** 2021/9 生效，ICO 执法；2026 年初 **Reddit 被罚 £14.5M**（≈$20M）——AADC 下"未做年龄验证 + 让 13 岁以下使用"的首次大额罚款。
- **Online Safety Act 2023** 把"年龄验证"扩展到色情/有害内容，Ofcom 2025/7 开始执法。
- **2026 年初新信号**：英国首相 **Keir Starmer** 在 4 月给 Apple/Google 三个月期限要求"激活内置的儿童裸体拦截"（BBC 4 月报道）——这直接对应了 iOS 27 这次 Communication Safety 的升级。

**D. 中国——实名 + 防沉迷 + 关键词制**

- 《未成年人保护法》2021 修订版 + 《未成年人网络保护条例》2024/1 施行，强制**游戏实名认证**（国家新闻出版署）+ 视频/直播**青少年模式**（网信办）+ **关键词屏蔽**。
- **苹果在中国的特殊姿势**：2018 起苹果就把中国区 iCloud 数据迁到**云上贵州**（GCBD）；2024/2025 多次按网信办要求**下架中国区 App**（含 Blued / Finka 等）。App Store 中国区**已实现实名认证接入**（新建账户需绑定手机号 + 短信验证），游戏类 App 必须接入"国家新闻出版署游戏防沉迷实名认证系统"。
- **WWDC26 的隐含动作**：苹果的"按年龄档默认开"逻辑和中国"强制实名+按年龄段限制"的监管逻辑**形式上同构**——但苹果并不替政府存生物特征。

**E. 苹果在哪些地区"被强制" / 哪些是主动**

| 地区 | 监管压力 | WWDC26 动作 | 性质 |
|---|---|---|---|
| 美国 Texas | SB 2420 App Store 年龄验证 | iOS 27 默认开 Communication Safety + Declared Age API | **被迫** |
| 欧盟 | DSA + 16 岁以下社媒禁令 | 加重儿童账户保护 | **部分主动 + 部分被动** |
| 英国 | AADC + Starmer 公开施压 | Communication Safety 升级到暴力画面 + FaceTime 扩展 | **被迫（首相公开点名）** |
| 中国 | 防沉迷 + 实名 | App Store 中国区已合规（2018 起） | **早已完成** |
| 全球 | 没有强制的地区（拉美/东南亚/印度） | 统一上"默认开" | **主动设中位标准** |

### 引用链接

**美国：**
- NBC News（2025-2026 趋势综述）：https://www.nbcnews.com/tech/social-media/smartphone-age-verification-laws-google-apple-rcna207000
- MediaPost 2025/5/2（共和党提案）：https://www.mediapost.com/publications/article/403456/republicans-introduce-bill-restrict-teens-app.html
- MediaPost 2025/5/12（Texas SB 2420）：https://www.mediapost.com/publications/article/404012/texas-passes-bill-restricting-teens-app-downloads.html
- Business Insider（Apple 在 Texas 落地）：https://www.businessinsider.com/apple-app-store-age-restrictions-texas-2026
- Bloomberg Law 2026/5（多州 2026 生效）：https://news.bloomberglaw.com/us-law-week/states-use-app-store-controls-to-keep-online-content-from-minors

**欧盟：**
- The Guardian 2025-2026（临时 CSAM 法律到期 + Big Tech 联名）：https://www.theguardian.com/society/2026/jan/14/irresponsible-failure-google-meta-snap-microsoft-slam-eu-over-child-sexual-abuse-law-lapse
- BBC 2025（von der Leyen "social media delay"）：https://www.bbc.com/news/articles/c0ln53pn8z4o
- Euronews（von der Leyen 夏季立法）：https://www.euronews.com/my-europe/2026/05/15/eu-may-ban-social-media-for-children-this-summer-says-von-der-leyen
- Politico EU 2026（年龄验证路线分歧）：https://www.politico.eu/article/kids-are-addicted-to-social-media-no-one-can-agree-on-a-solution/

**英国：**
- The Guardian 2025/7（Online Safety 执法综述）：https://www.theguardian.com/technology/2025/jul/13/online-safety-rules-enforcement-explained
- BBC 2025（Reddit £14M 罚款）：https://www.bbc.com/news/articles/c0ln53pn8z4o
- The Guardian（Reddit ICO 案）：https://www.theguardian.com/technology/2025/oct/15/reddit-fined-145m-ico-children-data
- BBC 4 月（Starmer 给 Apple/Google 三个月）：https://www.bbc.com/news/articles/cx2d7j0w81wo
- New Scientist（Can Apple/Google 阻止儿童分享露骨图像）：https://www.newscientist.com/article/2489237-can-apple-and-google-stop-children-from-sharing-explicit-images/

**中国：**
- Apple 在中国下架 Blued / Finka（WIRED 2024）：https://www.wired.com/story/apple-pulls-china-gay-dating-apps-government-order/
- BBC 同事件：https://www.bbc.com/news/articles/ckg9d9z4gg9o
- Newsweek：https://www.newsweek.com/apple-removes-gay-dating-apps-china-1897654
- MLQ.ai（Apple 全球年龄验证系统综述）：https://mlq.ai/news/apple-expands-global-age-verification-system-for-app-store-compliance/
- Ynetnews（Apple 收紧匿名/随机聊天 App 下架）：https://www.ynetnews.com/business/article/b1jltx004p

**EFF / 学术：**
- 见第 2 块链接

---

## 待补充 / 待核实

- [ ] iOS 27 "按年龄档默认开"的具体 UI 文案（要等 iOS 27 beta 文档）
- [ ] Apple 与 AAP 合作的"数字健康指引"原始白皮书（Apple newsroom 暂未给 PDF）
- [ ] WWDC26 Session 视频（通常 6/8 当晚 / 6/9 发布）里"信任与安全" session 的具体编号
- [ ] 中国网信办对 iOS 27 是否会发新版合规要求（通常 9-10 月）

## 下一阶段

- 写 02-outline.md（标准档 1 轮大纲审查）
- 选题方向：3-4 个角度供用户选择（已写入大纲文件）
