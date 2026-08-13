# AGENTS.md and Result Format

## Level 2 manifest

Use required sections and include optional sections only when supported content exists.

```md
## Scope
<current local ownership and boundary summary>

## Constraints
- <durable local rule>

## Members
- `subdomain-or-group`: <responsibility>

## Docs
- `path/to/doc.md`: <when or why to read it>

## Skills
- `.agents/skills/example/SKILL.md`: <module-specific trigger>

## Language
**Term**: <definition>
_Avoid_: <ambiguous synonym>

## Exceptions
- <deliberate deviation and reason>
```

`Scope`, `Constraints`, and `Members` are required. `Docs`, `Skills`, `Language`, and `Exceptions` are optional.

## Extraction Result

```md
## Extraction Result
- Project root:
- Mode: Target | Project
- Changed:
- Unchanged:
- Skipped:
- Blocked:
- Root map updates:
- Decision drift signals:
- Open questions:

### Modules
| Module | Confidence | Scope | Action | Evidence |
|---|---|---|---|---|
| `path` | high | matched | refreshed | `source paths` |
```

Target mode contains one module row. Project mode contains one row for every normalized candidate, including non-matches and blockers.
