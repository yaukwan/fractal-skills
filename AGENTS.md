# AGENTS.md
> Root index for this repository. Keep this file short, current-state only, and focused on navigation.

## Project
- Phase: skill-source-maintenance
- Last Reviewed: 2026-06-01
- Primary Domains: skill source files, skill packaging, OpenCode reference agents

## Topology
- `skills/`: source skill definitions, skill-local assets, and eval fixtures
- `skills/fractal-scope/`: source package for the fractal-scope skill and its default config
- `opencode-agents/`: reference agent definitions packaged with the repo
- `scripts/`: install and packaging utilities
- `AGENTS.template.md`: template used by `scripts/install.js` to generate a user-local OpenCode `AGENTS.md`

## Local Maps
- `skills/fractal-scope/SKILL.md`: source skill definition for project-local fractal scope setup
- `skills/fractal-scope/config.yaml`: packaged default scope-gate config used by the skill
- `skills/fractal-setup/SKILL.md`: one-time bootstrap helper for docs layout and scope config
- `skills/fractal-repo/SKILL.md`: repo-level document topology and lifecycle rules
- `skills/fractal-agents-fill/SKILL.md`: local contract capture for directories
- `skills/fractal-context/SKILL.md`: Level 1/2/3 schema semantics
- `skills/decision-capture/SKILL.md`: decision lifecycle and authority split
- `skills/to-task-specs/SKILL.md`: spec generation behavior controlled by the fractal scope config
- `skills/postmortem/SKILL.md`: bugfix and incident root-cause records

## Global Constraints
- This repo owns skill source and packaging assets, not user-local installation state.
- Keep root `AGENTS.md` short, navigational, and current-state only.
- Do not record dated history, append-only notes, dependencies, or review triggers here.
- Do not treat consuming-project `.agents/skills/` as repo-owned output.

## Active Context
- `skills/fractal-scope/`: source package for the project-local fractal-scope skill and its independent config template
