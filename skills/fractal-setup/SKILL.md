---
name: "fractal-setup"
description: "Load when bootstrapping a project's fractal documentation for the first time and emitting the project-level `.agents/skills/fractal-scope/config.yaml` consumed by other skills. Do not load for ongoing maintenance, audits, `AGENTS.md` filling, or external skill overrides"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Setup

Set up fractal documentation infrastructure in a target project in one pass, including the project-level `.agents/skills/fractal-scope/SKILL.md` and `.agents/skills/fractal-scope/config.yaml` outputs that downstream fractal skills use for gating.

Use `assets/fractal-scope-template.md` as the generated config template and `assets/fractal-scope-runtime-skill-template.md` as the minimal runtime skill template. Do not copy `../fractal-scope/scripts/check-scope.js` into the consuming repository; downstream skills call the packaged `fractal-scope` checker with the consuming repo config path.

## What this does

1. Create the `docs/` directory structure
2. Generate `.agents/skills/fractal-scope/SKILL.md` and `.agents/skills/fractal-scope/config.yaml` at the target project root (L2/L3 write scope configuration)
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
        │   ├── SKILL.md      # minimal runtime marker and config notes
        │   └── config.yaml   # scope gate configuration
        └── decision-*/       # auto-generated decision skills (by decision-capture)
```

Decisions no longer live under `docs/decisions/`. Each decision is a project skill
at `.agents/skills/decision-{slug}/SKILL.md`, managed by `decision-capture`.

## Workflow

1. Confirm target project root (`pwd` or user-specified)
2. Create `.agents/skills/fractal-scope/` directory
3. Check if `.agents/skills/fractal-scope/SKILL.md` or `config.yaml` already exists
   - Exists → report "fractal docs already set up", ask whether to regenerate the scope skill and config
   - Not found → continue
4. Create the 5 directories above under `docs/` (skip existing)
5. Generate `.agents/skills/fractal-scope/SKILL.md` from `assets/fractal-scope-runtime-skill-template.md` and `config.yaml` from `assets/fractal-scope-template.md`
6. Ask whether to configure L2/L3 scope now or edit manually later
7. If the consuming repo uses `docs/agents/domain.md` for external execution-skill guidance, offer the fractal domain-language bridge below

## Matt Pocock-style domain docs bridge

For fractal-managed repos, `AGENTS.md` is the only source of truth for domain language. If a consuming repo uses `docs/agents/domain.md`, write this rule there instead of creating `CONTEXT.md`:

```md
Domain language lives in the nearest `AGENTS.md` under `## Language`.
Do not create `CONTEXT.md` for fractal-managed repos.
Treat `AGENTS.md` as the glossary source.
```

This is compatibility guidance, not enforcement. It affects skills that read `docs/agents/domain.md`; it does not intercept external skills that hard-code `CONTEXT.md` reads or writes.

## Support files

- `assets/fractal-scope-template.md` — generated `config.yaml` defaults
- `assets/fractal-scope-runtime-skill-template.md` — generated minimal runtime `SKILL.md`

## Gotchas

- This is idempotent: existing directories and files are not overwritten
- `l3_file_header.enabled` and `l2_folder_manifest.enabled` default to `false`; user must enable manually
- Do not run in non-project directories (e.g. home, tmp)
- `docs/decisions/` is intentionally absent — decisions live as `.agents/skills/decision-*/SKILL.md`
- Do not create `CONTEXT.md`; fractal-managed domain language lives in L2 `AGENTS.md > Language`
