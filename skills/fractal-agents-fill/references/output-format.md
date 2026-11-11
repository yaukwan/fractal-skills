# Extraction Result Format

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
| Module | Confidence | Basis | Action | Evidence |
|---|---|---|---|---|
| `path` | high | existing | refreshed | `source paths` |
```

Target mode contains one module row. Project mode contains one row for every normalized candidate, including declined, excluded, and blocked candidates.
