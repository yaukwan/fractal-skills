---
name: fractal-setup
description: Load when initializing a project's fractal documentation structure for the first time. Create the docs/ directory layout and fractal-scope.md configuration. Do not load for ongoing doc maintenance, auditing, or filling AGENTS.md — use fractal-audit or fractal-agents-fill instead.
---

# Fractal Setup

Set up fractal documentation infrastructure in a target project in one pass.

## What this does

1. Create the `docs/` directory structure
2. Generate `docs/decisions/fractal-scope.md` (L2/L3 write scope configuration)
3. Do not write root `AGENTS.md` (each coding agent initializes its own)

## Directory layout

```
your-project/
└── docs/
    ├── decisions/        # contains fractal-scope.md
    ├── engineering/      # implementation notes, benchmarks, debt
    ├── research/         # explorations, alternatives
    ├── postmortem/       # postmortem docs
    ├── specs/            # AI-generated task specification docs
    └── archive/          # archived tombstones
```

## Workflow

1. Confirm target project root (`pwd` or user-specified)
2. Check if `docs/decisions/fractal-scope.md` already exists
   - Exists → report "fractal docs already set up", ask whether to regenerate scope config
   - Not found → continue
3. Create the 6 directories above (skip existing)
4. Generate `docs/decisions/fractal-scope.md` from `assets/fractal-scope-template.md`, replacing `{{DATE}}`
5. Ask whether to configure L2/L3 scope now or edit manually later

## Gotchas

- This is idempotent: existing directories and files are not overwritten
- `fractal-scope.md` `enabled` defaults to `false`; user must enable manually
- Do not run in non-project directories (e.g. home, tmp)
