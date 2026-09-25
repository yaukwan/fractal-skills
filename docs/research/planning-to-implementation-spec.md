# 高级模型规划、普通模型编码：证据与可执行 Spec 设计

核对日期：2026-09-25。

## 结论与证据边界

已有直接的跨模型实验和开源工具实践，但不能据此宣称“任意弱模型 + 足够详细的 spec = 强模型编码”。Self-planning 的跨模型实验支持计划可以帮助具备编码能力、但规划能力较弱的执行模型；Aider 和 Cline 提供实际分工机制。它们不证明任何模型组合都更便宜或更可靠。[S1][S2][S3]

本文将以下两类内容分开：
- **来源事实**：论文实验、官方文档描述的工作流。
- **工程建议**：基于这些来源提出的 spec 字段、粒度、升级协议与评估方法；不是论文证明的统一标准。

## 1. 最相关的一手资料

### S1. Self-planning Code Generation with Large Language Models

来源：论文，arXiv:2303.06689，TOSEM 接收；本文核对 v5 的 §4.2 / Table 3。

`https://arxiv.org/html/2303.06689v5`

- 将 planning 与 implementation 分开，并在跨模型实验中让 `code-davinci-002` 生成计划，交给其他模型实现。
- 对 `code-cushman-001`，HumanEval Pass@1：直接生成 34.0%；自己规划再生成 30.1%；使用 `code-davinci-002` 的计划生成 44.9%。
- 某些基本编码能力极弱的模型未得到类似改善。
- §2 的计划格式强调：编号步骤、每步一个容易实现的子问题、保持简洁，不展开普通算法的所有实现细节。
- **适用性**：这是直接支持“更强规划模型 → 较弱编码模型”的证据。
- **局限**：历史模型、函数级编程基准，不是现代大型仓库的完整工程验证；不能从参数规模推导当前模型的能力门槛。

### S2. Aider Architect / Editor

来源：项目作者文章，2024-09-26。

`https://aider.chat/2024/09/26/architect.html`

- Architect 解决编码问题，Editor 把解法转成可应用的文件编辑。
- 作者报告：`o1-preview` 搭配 `DeepSeek` 或 `o1-mini`，在当时 Aider code-editing benchmark 达到 85.0%。
- **适用性**：可直接参考的异构模型分工。
- **局限**：Architect 输出可能已经非常接近代码；Editor 不等同于负责整项工程的自主实现者。基线与部分组合使用的 edit format 不同，不能把差异全部归因于规划；作者也指出部分高分配置很慢。不是现行模型排行榜或普遍省钱结论。

### S3. Cline Plan / Act

来源：官方文档与官方使用分析。

`https://docs.cline.bot/core-workflows/plan-and-act`

`https://cline.bot/blog/plan-act-model-usage-patterns-in-cline`

- 官方文档明确支持分别配置规划模型和实现模型；切换模式保留对话上下文。
- 2025-10-09 的官方使用分析报告，在所分析的跨模式组合中，Opus 4.1 → Sonnet 4 占 25.3%。这是历史使用分布，不是当前比例。
- **适用性**：不仅有功能，也有用户采用这种分工的实践记录。
- **局限**：使用比例不证明质量或成本收益；保留完整聊天上下文，不等同于仅靠独立 spec 完成冷启动交接。不同客户端的功能应以其文档为准。

### S4. CodePlan: Repository-level Coding using LLMs and Planning

来源：论文，arXiv:2309.12499；官方实验仓库。

`https://arxiv.org/abs/2309.12499`

`https://github.com/microsoft/CodePlan`

- 通过增量依赖分析、变更影响分析和自适应规划生成多步代码修改链。
- 每一步结合相关代码位置、仓库上下文和此前修改调用 LLM。
- **适用性**：提醒 spec 作者记录跨文件依赖、影响范围与现状，而不仅罗列功能。
- **局限**：规划包含程序分析算法；不是“更大 LLM 写 Markdown，较小 LLM 编码”的直接验证。

### S5. PairCoder: A Pair Programming Framework for Code Generation via Multi-Plan Exploration and Feedback-Driven Refinement

来源：论文，arXiv:2409.05001，ASE 2024；官方仓库。

`https://arxiv.org/abs/2409.05001`

`https://github.com/nju-websoft/PairCoder`

- Navigator 选择计划，Driver 实现、测试、修正，并将执行反馈用于下一轮规划。
- **适用性**：支持计划必须能被测试反馈纠正，而非一次生成后永久冻结。
- **局限**：角色分离本身不证明两个角色必须使用不同能力档次的模型，也不证明单份静态 spec 足够。

### S6. OpenHands Planning Agent

来源：官方 SDK 示例。

`https://docs.openhands.dev/sdk/guides/agent-custom`

- 规划代理只读分析代码，并仅能通过专用编辑工具写 `PLAN.md`；随后执行代理使用完整编辑能力实现。
- 计划结构包括目标、上下文、方案、实施步骤、测试和验证。
- **适用性**：直接展示以文件作为交接载体的两阶段工作流。
- **局限**：示例说明角色和工具权限分离，不证明换成更弱执行模型后仍保持质量。

### S7. GitHub Spec Kit

来源：官方模板。

`https://github.com/github/spec-kit/blob/main/templates/spec-template.md`

`https://github.com/github/spec-kit/blob/main/templates/plan-template.md`

`https://github.com/github/spec-kit/blob/main/templates/tasks-template.md`

- `spec.md`：用户场景、验收行为、边界条件、需求、成功标准与假设。
- `plan.md`：技术背景、实现方向和实际项目结构；可关联 data model 与 contracts。
- `tasks.md`：按用户故事组织、给出文件路径、依赖与独立验证方式。
- **适用性**：分离“行为真相”“实施方案”“执行任务”，避免在一个 checklist 中混合所有层次。
- **局限**：模板不是跨模型收益实验；其中测试任务被标为可选。本文针对较弱执行器建议关键行为必须有验证，不照搬这一可选策略。

### S8. OpenAI ExecPlan

来源：官方 Cookbook，Using PLANS.md for multi-hour problem solving（2025-10-07）；当前页面已标为 archived，本文仅借鉴文档设计原则，不采用其模型/API 推荐。

`https://developers.openai.com/cookbook/articles/codex_exec_plans`

- 将执行计划写成可独立接手的、持续维护的文档，假定执行者只有当前仓库和计划，没有此前聊天记忆。
- 要求说明可观察成果、具体修改位置、接口、验证命令、预期结果、决策及执行中发现。
- **适用性**：适合借鉴“冷启动也能接手”的交付标准。
- **局限**：长任务实践，不是强弱模型组合的受控实验；简单任务无需照搬全部章节。

## 2. 建议采用的最小结构

以下均为工程建议，不是某篇论文的原样规范。

小任务使用一个 `spec.md` 即可，按逻辑分三层；只有内容变大、需要独立维护时再拆文件：

1. **Behavior contract**：目标、范围、输入输出、状态和错误、不变量、可验证结果。
2. **Implementation plan**：已经确定的设计、仓库锚点、复用入口、影响范围、依赖顺序。
3. **Execution tasks**：每个任务的产出、前置条件、验收和阻塞时的升级规则。

不要把 PRD 或“先写后端、再写前端、最后测试”的列表当作可执行 spec。规划阶段应先阅读仓库；不允许凭空给出路径、接口或测试命令。

## 3. 需要细到什么程度

核心标准：**关键决策闭合，局部实现开放。**

| 内容 | 建议粒度 |
| --- | --- |
| 用户可见行为 | 写到具体输入、前置状态、输出与副作用 |
| 范围 | 明确本次做什么、不做什么、必须保持不变什么 |
| 仓库上下文 | 实际路径 + 符号/模块 + 相关职责 + 必须复用的入口 |
| 公共接口与持久化 | 精确字段、类型、可空性、默认值、兼容策略；需要时给 schema/signature |
| 状态与错误 | 触发条件、结果状态、错误码、是否重试、是否产生部分写入 |
| 并发、安全、资源边界 | 按任务实际风险写明顺序、隔离、幂等、权限和释放要求；不机械塞入所有条目 |
| 文件修改 | 指明要改的职责和锚点，而非固定行号；新文件要注明 planned，而非冒充现状 |
| 内部实现 | 普通变量、循环、私有 helper 拆分由执行器决定 |
| 困难算法 | 补不变量、复杂度要求、关键伪代码和反例；不必逐行翻译为自然语言 |
| 验证 | 每条重要行为有测试或可重复手工检查，并写命令与可观察预期 |

如果两个实现者按文档做出了互不兼容的公共行为，而两者都能声称符合 spec，则继续补行为/契约；如果只是变量或 helper 不同，则不必继续细化。

执行模型越弱，应优先缩小每次任务的决策范围、给出真实参考实现和反例，而不是无限增加文档长度。模型是否够用要实测，不能由 spec 字数推导。

## 4. 可复制模板

```markdown
# <Feature / Change>

## Goal and scope
- 用户完成后能观察到什么：
- In scope：
- Non-goals / unchanged behavior：

## Current-state anchors
- 基线 commit / 相关工作区差异：
- 必须阅读的路径、符号及用途：
- 现有依赖和应复用的模式：
- 已验证事实 / 明示假设：

## Behavioral contract
- Inputs / outputs / defaults：
- States / errors / side effects：
- Invariants：
- Compatibility / security / concurrency constraints（仅适用项）：

## Chosen design
- 采用的方案及关键原因：
- 不得自行重选的决策：
- 可由执行器决定的局部细节：

## Tasks
### T1 — <Observable outcome>
- Depends on：
- Read / modify anchors：
- Required change：
- Acceptance：
- Validation command and expected result：

## Escalation and recovery
- 哪些事实不符、未知条件或失败必须退回规划：
- 允许独立处理的局部修复：
- 涉及风险操作时的回退方式：

## Execution evidence
- 完成任务与实际运行结果：
- 偏离计划的事实、影响和批准记录：
```

模板中不相关的项应删除，而非留空占位。`Ready` 状态不应包含影响数据、公共接口、权限或架构方向的未决问题；探索未知技术应先成为独立、可验证的探索任务。

## 5. 同一需求的粒度示例

以下为假想项目示例，不声称路径、函数或命令存在于当前仓库。

不足：为标签批量导入增加去重，完善错误处理并测试。

更合适的交接：

```text
Outcome:
  将已解析的标签名称列表归一化并去重，接入现有导入流程。

Contract:
  normalizeTags(names: string[]): string[]
  每个名称去除首尾空白；空名称忽略。
  仅做 ASCII A-Z 的大小写不敏感比较，非 ASCII 字符按原值比较。
  保留首次出现的名称拼写及输入顺序。
  不修改输入数组；不新增依赖。

Anchors:
  src/import/tags.ts::importTags 是现有唯一导入入口。
  归一化放在解析完成、持久化开始之前；CSV 解析与数据库行为不变。
  若发现另一个导入入口，先确认覆盖范围，不静默绕过。

Acceptance:
  [" Alpha ", "alpha", "", "Beta"] -> ["Alpha", "Beta"]
  ["B", "A", "b"] -> ["B", "A"]
  [] -> []；输入数组在调用后不变。
  经真实导入入口调用时，持久化的数据也满足上述规则。
```

仍需在真实项目规划时补齐：测试入口和命令、既有约束是否允许归一化、涉及旧数据时是否需要迁移。无需规定必须使用哪一种循环；可以指向已有 helper，但不应发明一个只为本任务服务的抽象层。

## 6. 任务大小与执行闭环

建议按“一个可验收行为”拆任务，而非按文件机械拆分。一个任务可以跨 route/service/repository/test；修改一个文件也可能包含过多独立决策。共享接口先定稿，有依赖关系的任务按序执行，不把它们假装成可独立并行任务。[S4][S7]

建议流程：

```text
强模型：查仓库 → 澄清需求 → 解决关键决策 → 写 spec 与验收
普通模型：冷读 spec → 报告阻塞性歧义 → 按任务实现并验证
确定性工具：测试 / 类型检查 / lint / build
强模型或人工：审查契约遵守与遗漏 → 必要时修订 spec
```

执行器可以修复局部编译错误，但发现接口不存在、仓库行为与 spec 冲突、必须扩大范围，或有限次局部修复仍不能通过验证时，应附上证据升级，不能暗改验收标准。

实施前的冷启动检查：执行器仅凭 spec、项目公共说明和仓库，能否说清楚改哪里、复用什么、哪些行为不能变、如何证明成功、何时停下来？检查的是决策是否齐全，不是禁止执行器正常读代码。

## 7. 如何验证这种分工值得采用

建议先选一批具有代表性的真实任务，比较：

- A：普通模型直接实现。
- B：强模型写 spec，普通模型实现。
- C：强模型直接实现。

固定仓库起点、工具权限、验收集与重试预算；可行时重复运行，避免把一次运气当作结论。记录端到端通过率、回归率、人工纠正次数、返工次数、总时延和总费用。总费用包括规划、执行、复核与重试，而非只算执行模型 token。

诊断方向：找错文件补定位锚点；选错语义补行为契约；集成不一致补接口及依赖；局部算法仍反复失败则减小任务或升级执行模型。不要把所有失败都解释为 spec 还不够长。

## 验证范围

本记录核对了一手论文和项目文档；没有在本仓库进行跨模型编码实验，也没有验证任何当前模型组合的收益。历史 benchmark 和使用分布仅用于说明证据与机制，不代表当前排名或成本。
