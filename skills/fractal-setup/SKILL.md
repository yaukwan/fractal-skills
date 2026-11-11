---
name: "fractal-setup"
description: "Load when bootstrapping a project's fractal `docs/` layout or adding the fractal domain-language bridge to `docs/agents/domain.md`. Do not load for audits, `AGENTS.md` filling, code/document synchronization, or external skill overrides."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Setup

Set up the fractal documentation layout in a target project in one pass. Setup installs no project-local runtime or configuration; the other fractal skills decide what to write from the artifacts already in the project.

## What this does

1. Create the `docs/` directory structure, with a `.gitkeep` in each directory that holds no file so git tracks it
2. Do not write root `AGENTS.md` (each coding agent initializes its own)

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
        └── decision-*/       # decision skills, created later by decision-capture
```

Decisions no longer live under `docs/decisions/`. Each decision is a project skill at
`.agents/skills/decision-{slug}/`, managed by `decision-capture`. A retired decision skill
leaves its body as a tombstone at `docs/archive/decisions/{slug}.md`.

## Workflow

1. Confirm the target project root (`pwd` or user-specified).
2. Create the five directories above under `docs/` (skip existing).
3. Add an empty `.gitkeep` to each of the five directories that holds no file at any depth. Leave a directory that already holds a file unchanged.
4. If the consuming repo uses `docs/agents/domain.md` for external execution-skill guidance, offer the fractal domain-language bridge below.
5. Report which directories were created, which already existed, and where `.gitkeep` was added. State the next steps: `fractal-agents-fill` creates L2 manifests, and `fractal-sync` adds L3 headers on request.

## Matt Pocock-style domain docs bridge

For fractal-managed repos, `AGENTS.md` is the only source of truth for domain language. If a consuming repo uses `docs/agents/domain.md`, write this rule there instead of creating `CONTEXT.md`:

```md
Domain language lives in the nearest `AGENTS.md` under `## Language`.
Do not create `CONTEXT.md` for fractal-managed repos.
Treat `AGENTS.md` as the glossary source.
```

This is compatibility guidance, not enforcement. It affects skills that read `docs/agents/domain.md`; it does not intercept external skills that hard-code `CONTEXT.md` reads or writes.

## Gotchas

- Setup creates no L2 manifest and no L3 header
- Do not run in non-project directories (e.g. home, tmp)
- `docs/decisions/` is intentionally absent — decisions live as `.agents/skills/decision-*/`, and retired ones as `docs/archive/decisions/{slug}.md` tombstones
- Do not create `CONTEXT.md`; fractal-managed domain language lives in L2 `AGENTS.md > Language`
