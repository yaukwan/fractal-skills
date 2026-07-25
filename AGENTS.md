# AGENTS.md
> Root index for this repository. Keep this file short, current-state only, and focused on navigation.

## Project
- Phase: skill-source-maintenance
- Last Reviewed: 2026-07-25
- Primary Domains: skill source files, skill packaging, OpenCode reference agents

## Topology
- `skills/`: source skill definitions, skill-local assets, and deterministic helpers
- `skills/fractal-setup/assets/fractal-scope/`: embedded template for the generated project-local scope runtime
- `opencode-agents/`: reference agent definitions packaged with the repo
- `scripts/`: install and packaging utilities
- `AGENTS.template.md`: template used by `scripts/install.js` to generate a user-local OpenCode `AGENTS.md`

## Local Maps
- `skills/fractal-setup/SKILL.md`: bootstrap and repair authority for docs layout and the project-local scope runtime
- `skills/fractal-setup/assets/fractal-scope/SKILL.template.md`: generated runtime behavior template
- `skills/fractal-setup/assets/fractal-scope/config.yaml`: default project-owned scope configuration
- `skills/fractal-setup/assets/fractal-scope/scripts/check-scope.js`: deterministic local scope matcher
- `skills/fractal-repo/SKILL.md`: repo-level document topology and lifecycle rules
- `skills/fractal-agents-fill/SKILL.md`: local contract capture for directories
- `skills/fractal-context/SKILL.md`: Level 1/2/3 schema semantics
- `skills/decision-capture/SKILL.md`: decision lifecycle and authority split
- `skills/to-task-specs/SKILL.md`: spec generation behavior controlled by the fractal scope config
- `skills/postmortem/SKILL.md`: bugfix and incident root-cause records
- `skills/skill-design-guidelines/SKILL.md`: skill authoring, routing, layout, and validation guidance

## Global Constraints
- This repo owns skill source and packaging assets, not user-local installation state.
- Keep root `AGENTS.md` short, navigational, and current-state only.
- Do not record dated history, append-only notes, dependencies, or review triggers here.
- Do not treat consuming-project `.agents/skills/` as repo-owned output.

## Active Context
- `skills/fractal-setup/`: source authority and embedded template for the generated project-local scope runtime
