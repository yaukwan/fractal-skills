---
name: "fractal-setup"
description: "Load when bootstrapping a project's fractal documentation for the first time and emitting the project-level `.agents/skills/fractal-scope/config.yaml` consumed by other skills. Do not load for ongoing maintenance, audits, or `AGENTS.md` filling"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Setup

Set up fractal documentation infrastructure in a target project in one pass, including the project-level `.agents/skills/fractal-scope/SKILL.md`, `.agents/skills/fractal-scope/config.yaml`, and `.agents/skills/fractal-scope/scripts/check-scope.js` outputs that downstream fractal skills use for gating.

Use `assets/fractal-scope-template.md` as the generated config template. Copy `../fractal-scope/scripts/check-scope.js` into the generated scope skill.

## What this does

1. Create the `docs/` directory structure
2. Generate `.agents/skills/fractal-scope/SKILL.md`, `.agents/skills/fractal-scope/config.yaml`, and `.agents/skills/fractal-scope/scripts/check-scope.js` at the target project root (L2/L3 write scope configuration)
3. Do not write root `AGENTS.md` (each coding agent initializes its own)

## Directory layout

```
your-project/
├── docs/
│   ├── engineering/      # implementation notes, benchmarks, debt
│   ├── research/         # explorations, alternatives
│   ├── postmortem/       # postmortem docs
│   ├── specs/            # AI-generated task specification docs
│   └── archive/          # archived tombstones
│
└── .agents/
    └── skills/
        ├── fractal-scope/
        │   ├── config.yaml   # scope gate configuration
        │   └── scripts/
        │       └── check-scope.js
        └── decision-*/       # auto-generated decision skills (by decision-capture)
```

Decisions no longer live under `docs/decisions/`. Each decision is a project skill
at `.agents/skills/decision-{slug}/SKILL.md`, managed by `decision-capture`.

## Workflow

1. Confirm target project root (`pwd` or user-specified)
2. Create `.agents/skills/fractal-scope/` directory
3. Check if `.agents/skills/fractal-scope/SKILL.md`, `config.yaml`, or `scripts/check-scope.js` already exists
   - Exists → report "fractal docs already set up", ask whether to regenerate the scope skill, config, and script
   - Not found → continue
4. Create the 5 directories above under `docs/` (skip existing)
5. Generate `.agents/skills/fractal-scope/SKILL.md`, `.agents/skills/fractal-scope/config.yaml`, and `.agents/skills/fractal-scope/scripts/check-scope.js` from the packaged defaults
6. Ask whether to configure L2/L3 scope now or edit manually later

## Gotchas

- This is idempotent: existing directories and files are not overwritten
- `l3_file_header.enabled` and `l2_folder_manifest.enabled` default to `false`; user must enable manually
- Do not run in non-project directories (e.g. home, tmp)
- `docs/decisions/` is intentionally absent — decisions live as `.agents/skills/decision-*/SKILL.md`
