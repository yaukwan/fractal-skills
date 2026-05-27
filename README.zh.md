# Fractal Skills

[English](./README.md) | [简体中文](./README.zh.md)

[![skills.sh](https://skills.sh/b/yaukwan/fractal-skills)](https://skills.sh/yaukwan/fractal-skills)

面向 coding agent 项目的 AI-native 文档编排技能组——提供三层上下文协议（L1 根级 / L2 目录级 / L3 文件级）及从建仓到复盘的完整生命周期管理。

## 快速开始

```bash
# 通过 vercel-labs/skills CLI 一键安装全部 8 个 skills
npx skills add yaukwan/fractal-skills

# 可选：生成 OpenCode 的 AGENTS.md 配置及 agent 文件
node scripts/install.js
```

`npx skills add` 将所有 Fractal Skills 安装到你的 coding agent 中。可选的 `node scripts/install.js` 会生成个性化的 `~/.config/opencode/AGENTS.md`，同时安装 `fractal` 和 `gstack` 两个编排 agent 定义文件。

## 为什么需要 Fractal Skills

### 问题

Coding agent 依赖项目级上下文——`AGENTS.md`、决策文档、局部 contract——来做出正确的架构判断。但文档会漂移。决策会过时。目录级上下文（`AGENTS.md`）会缺失或滞后。当 agent 基于过时的权威信息做实现决策时，产出的代码会与当前系统真相冲突。

没有结构化的协议来保持上下文同步，每一次任务都带着隐性的技术债务开始：agent 不知道自己不知道什么。

### 方案

Fractal Skills 提供了一套**三层上下文协议**，直接对应软件的实际组织方式：

| 层级 | 作用域 | 合约内容 |
|------|--------|----------|
| **Level 1** | 项目根目录 | 全局拓扑、入口点、跨模块约束 |
| **Level 2** | 目录 / 限界上下文 | 局部所有权、作用域边界、成员模块 |
| **Level 3** | 源代码文件 | 当前合约：输入、输出、角色、不变量 |

八个单一职责的 skill 覆盖完整的构建与维护生命周期：

1. **建仓**：搭建 `docs/` 文档结构（`fractal-setup`）
2. **巡检**：扫描决策过期、上下文缺失、lane 错位（`fractal-audit`）
3. **填充**：从代码中推断并补全缺失或过期的目录 contract（`fractal-agents-fill`）
4. **维护**：仓库级文档落点、命名、索引与生命周期管理（`fractal-repo`）
5. **规范**：当 header 语义漂移时，归一化 schema 字段含义（`fractal-context`）
6. **决策**：完整决策生命周期——检查、创建、更新、取代、合并（`decision-capture`）
7. **规格**：从已解决上下文或 PRD 生成可执行任务规格文档（`to-task-specs`）
8. **复盘**：为 bug、回归、故障产出结构化的根因记录（`postmortem`）

### 核心优势

- **上下文与代码保持同步。** 协议定义了每一层何时刷新、如何刷新——过时的权威信息不会再悄无声息地驱动错误实现。
- **决策权威是显式的。** `decision-capture` 强制 `docs/decisions/` 存放的是当前设计真相，而不是 ADR 坟场。
- **单一职责，可编排组合。** 每个 skill 只做一件事。可以独立使用，也可以通过 `FILL → DECIDE → SPEC → BUILD → POSTMORTEM` 流程编排使用。
- **从底层设计的 AI-native。** headers、manifests、contracts 都是为机器可读性和低 token 消耗设计的——而不是为了人类浏览 wiki。

## Skills

- **[fractal-setup](./skills/fractal-setup/SKILL.md)** — 一次性手动搭建 `docs/` 目录布局和 `fractal-scope.md` 配置。每个项目运行一次，建立 fractal 文档基础设施。
- **[fractal-audit](./skills/fractal-audit/SKILL.md)** — 报告型 fractal 健康巡检。对过期决策、缺失或过期的 `AGENTS.md`、lane 错位问题进行排名。不修复，只产出带优先级的修复报告。
- **[fractal-agents-fill](./skills/fractal-agents-fill/SKILL.md)** — 通过阅读代码和周边文档，填充或刷新目录的局部 `AGENTS.md` contract。contract 清晰时直接写入；仅在作用域或边界存在阻塞性歧义时才提问。
- **[fractal-repo](./skills/fractal-repo/SKILL.md)** — 仓库级文档拓扑管理：`decisions / engineering / research / postmortem / specs / archive` 的文档落点、命名规范、frontmatter、索引和生命周期转换。
- **[fractal-context](./skills/fractal-context/SKILL.md)** — Level 1/2/3 fractal schema 守卫者。归一化文件 header、验证目录 manifest 语义、在代码变更后运行 ripple 检查。仅在 scoped fractal repo 内执行写入。
- **[decision-capture](./skills/decision-capture/SKILL.md)** — 当前任务的完整决策生命周期。检查现有决策是否仍然覆盖当前真相，然后创建、更新、取代或合并决策文档，确保设计权威无可争议。
- **[to-task-specs](./skills/to-task-specs/SKILL.md)** — 从 PRD、已解决上下文或对话上下文中生成可执行的任务规格文档。按功能域分组任务，继承决策约束，产出可验证的验收标准。
- **[postmortem](./skills/postmortem/SKILL.md)** — 为 bug、回归、故障产出结构化的根因记录。记录症状、影响、根因、修复方案、验证方式和预防措施。任务主要性质为缺陷修复时必须产出。

## 编排流程

```
FILL → DECIDE → SPEC → BUILD → POSTMORTEM
```

- **SETUP** — `fractal-setup`：一次性手动建仓，不在主流程中。
- **FILL** — `fractal-agents-fill`：必要时补全缺失的局部 contract 上下文并刷新 `AGENTS.md`。
- **DECIDE** — `decision-capture`：检查决策覆盖范围并更新决策文档，直到当前真相已文档化。
- **SPEC** — `to-task-specs`：将已解决上下文转化为可执行的任务文档。
- **BUILD** — 按已确认的 spec 实施。
- **POSTMORTEM** — `postmortem`：任务主要性质为缺陷修复时必须产出。
- **辅助** — `fractal-audit`、`fractal-repo`、`fractal-context` 作为辅助 skill，可在主流程之外使用。

## OpenCode Agents（可选）

`opencode-agents/` 目录包含面向 OpenCode 用户的参考 agent 定义：

- **`fractal`** — 主导 `FILL → DECIDE → SPEC → BUILD → POSTMORTEM` 流程的主编排 agent。
- **`gstack`** — 面向 gstack 工具链的集成 agent。

这些 agent 文件会在运行 `node scripts/install.js` 时随 `AGENTS.md` 一起自动安装。也可以手动复制到 `~/.config/opencode/agents/` 目录下，适配到你自己的 OpenCode 配置中。
