---
name: "fractal-setup"
description: "Load when bootstrapping a project's fractal docs or repairing its generated `.agents/skills/fractal-scope/` runtime files. Do not load for scope configuration, audits, `AGENTS.md` filling, or external skill overrides."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Setup

Set up fractal documentation infrastructure in a target project in one pass, including a self-contained project-local `.agents/skills/fractal-scope/` runtime skill used by downstream fractal skills for gating.

Use `assets/fractal-scope/` as the deployable runtime template. Copy it into the consuming project and rename `SKILL.template.md` to `SKILL.md` so scope behavior and project-owned configuration stay together without exposing another source skill to recursive discovery.

## What this does

1. Create the `docs/` directory structure
2. Initialize `.agents/skills/fractal-scope/` from `assets/fractal-scope/`, including `SKILL.md`, `config.yaml`, references, and the deterministic checker
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
        │   ├── SKILL.md      # project-local scope behavior
        │   ├── config.yaml   # project-owned scope configuration
        │   ├── assets/       # runtime command examples
        │   ├── references/   # matching semantics
        │   └── scripts/      # deterministic checker and self-test
        └── decision-*/       # auto-generated decision skills (by decision-capture)
```

Decisions no longer live under `docs/decisions/`. Each decision is a project skill
at `.agents/skills/decision-{slug}/SKILL.md`, managed by `decision-capture`.

## Workflow

1. Confirm the target project root (`pwd` or user-specified).
2. Inspect `.agents/skills/fractal-scope/` before writing.
   - Missing directory: copy the complete `assets/fractal-scope/` runtime template, rename `SKILL.template.md` to `SKILL.md`, and leave no template file in the generated directory.
   - Existing directory: report that fractal docs are already set up and preserve `config.yaml`.
   - Missing or outdated managed runtime files: summarize the repair and ask before refreshing `SKILL.md`, `assets/`, `references/`, or `scripts/`.
   - Missing `config.yaml`: ask before creating it from `assets/fractal-scope/config.yaml`; never overwrite an existing config.
3. Create the five directories above under `docs/` (skip existing).
4. Ask whether to configure L2/L3 scope now or edit manually later.
5. If the consuming repo uses `docs/agents/domain.md` for external execution-skill guidance, offer the fractal domain-language bridge below.

## Matt Pocock-style domain docs bridge

For fractal-managed repos, `AGENTS.md` is the only source of truth for domain language. If a consuming repo uses `docs/agents/domain.md`, write this rule there instead of creating `CONTEXT.md`:

```md
Domain language lives in the nearest `AGENTS.md` under `## Language`.
Do not create `CONTEXT.md` for fractal-managed repos.
Treat `AGENTS.md` as the glossary source.
```

This is compatibility guidance, not enforcement. It affects skills that read `docs/agents/domain.md`; it does not intercept external skills that hard-code `CONTEXT.md` reads or writes.

## Support files

- `assets/fractal-scope/` — complete project-local runtime template; emit `SKILL.template.md` as `SKILL.md`

## Gotchas

- Existing `config.yaml` files are never overwritten
- Managed runtime files are refreshed only after explicit confirmation
- `l3_file_header.enabled` and `l2_folder_manifest.enabled` default to `false`; user must enable manually
- Do not run in non-project directories (e.g. home, tmp)
- `docs/decisions/` is intentionally absent — decisions live as `.agents/skills/decision-*/SKILL.md`
- Do not create `CONTEXT.md`; fractal-managed domain language lives in L2 `AGENTS.md > Language`
