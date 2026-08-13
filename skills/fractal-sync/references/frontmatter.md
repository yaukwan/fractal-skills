# Repository Frontmatter Convention

推荐用于仓库文档：

```yaml
---
type: decisions | engineering | research | postmortem | specs | archive
status: draft | stable | deprecated | ambiguity-flagged | superseded
updated: YYYY-MM-DD
related:
  - ./relative/path.md
---
```

可选扩展字段：

```yaml
owners: [@owner]
domain: <domain-name>
reviewed: YYYY-MM-DD
tags: [keyword]
changelog:
  - date: YYYY-MM-DD
    type: create | amend | deprecate | review
    description: <what changed>
    trigger: <why>
```

## Rules

- 只把最小必要字段当成协议核心
- 扩展字段可以按需追加，不要求全仓统一全量出现
- 历史记录优先进入 `changelog`，不要塞进 `AGENTS.md` 或 file header
- 用相对路径
- 不确定状态时用 `ambiguity-flagged`
- 若目标系统只允许最小 frontmatter，就缩减到其要求的最小集合
