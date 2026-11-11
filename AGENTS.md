# AGENTS.md
> Root index for this repository. Keep this file short, current-state only, and focused on navigation.

## Project
- Phase: skill-source-maintenance
- Last Reviewed: 2026-11-12
- Primary Domains: skill source files, skill packaging, repo documentation

## Topology
- `skills/`: source skill definitions, skill-local assets, and deterministic helpers
- `skills/<name>/`: one source skill per directory, plus its local assets and scripts
- `README.md` / `README.zh.md`: public project documentation

## Local Maps
- `skills/fractal-setup/SKILL.md`: bootstrap authority for the docs layout
- `skills/fractal-agents-fill/SKILL.md`: target-module and project-wide contract extraction into local `AGENTS.md`, and Level 2 manifest creation
- `skills/fractal-sync/SKILL.md`: bidirectional code/document synchronization, Level 1/2/3 semantics and write eligibility, and repository lifecycle
- `skills/decision-capture/SKILL.md`: decision lifecycle, authority split, decision skill shape (single-topic or index + `references/`), and retirement by deletion plus tombstone
- `skills/to-task-specs/SKILL.md`: spec generation and output-destination rules
- `skills/impl-task-spec/SKILL.md`: spec execution, verified task progress, and execution-state writeback
- `skills/postmortem/SKILL.md`: bugfix and incident root-cause records
- `skills/skill-design-guidelines/SKILL.md`: skill authoring, routing, layout, and validation guidance

## Global Constraints
- This repo owns skill source and documentation only; it does not ship installers or user-local installation state.
- Keep root `AGENTS.md` short, navigational, and current-state only.
- Do not record dated history, append-only notes, dependencies, or review triggers here.
- Do not treat consuming-project `.agents/skills/` as repo-owned output.

## Active Context
- `skills/fractal-agents-fill/`: source authority for target-module and project-wide contract extraction
