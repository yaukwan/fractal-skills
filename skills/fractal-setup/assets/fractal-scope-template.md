---
decision: fractal-scope
status: active
created: {{DATE}}
---

# Fractal Scope Configuration

Controls where fractal-context writes Level 2 folder manifests and Level 3 file headers.

## L3 File Header

- `enabled: false`
- `scope:`

```yaml
include: []
exclude: []
```

When enabled, `fractal-context` writes file-level contract headers (INPUT / OUTPUT / ROLE / INVARIANTS)
to source files whose paths match `include` and do not match `exclude`.

## L2 Folder Manifest

- `enabled: false`
- `scope:`

```yaml
include: []
exclude: []
```

When enabled, `fractal-context` creates or updates `AGENTS.md` in folders whose paths match
`include` and do not match `exclude`. Use `fractal-agents-fill` to author or refresh local content.

## Spec Output Preference

Controls whether `to-task-specs` writes spec files to disk or outputs inline.

- `output_mode: ask` | `always_file` | `always_inline`
  - `ask` (default): Prompt the user whether to write to `docs/specs/` or output in context only.
  - `always_file`: Always write to `docs/specs/{YYYY_MM_dd}_{task_name}.md`.
  - `always_inline`: Output only to conversation context, never write to disk.
