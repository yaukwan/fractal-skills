# Root AGENTS.md Template

```markdown
# AGENTS.md
> AI Agent 进入本仓库的根索引。不要假设未被此索引或局部索引指向的文档已被加载。

## Project
- Phase:
- Last Reviewed:
- Primary Domains:

## Traversal
1. Start here: pick the owning subtree from Local Maps.
2. Read that subtree's AGENTS.md before opening files.
3. Check .agents/skills/decision-* freshness before changing architecture.

## Topology
- `.agents/skills/decision-*/SKILL.md`: design decisions and constraints (managed by `decision-capture`)
- `docs/engineering/`: implementation notes, benchmarks, tech debt
- `docs/research/`: explorations and alternatives
- `docs/postmortem/`: retrospectives and durable lessons
- `docs/archive/`: retired docs and tombstones

## Local Maps
- `path/to/AGENTS.md`: what this subtree owns

## Global Constraints
- <repo-wide rule>

<!-- Optional section below may be omitted when empty or not useful. -->

## Active Context
- `path`: why it matters now
```

## Notes

- 只保留当前有用的入口链接
- Active Context 只放高相关文档
- 用相对路径
- 不新增 `Review Triggers`
- 字段语义以 `../../fractal-context/references/protocol/level1.md` 为准
