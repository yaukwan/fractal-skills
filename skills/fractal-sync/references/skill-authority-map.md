# Skill Authority Map

Use this map when tasks touch multiple adjacent documentation skills.

## Authority split

- `fractal-setup` — bootstrap and runtime-template authority
  - Owns initial `docs/` directory creation
  - Owns the deployable runtime source under `assets/fractal-scope/`
  - Owns first emission and repair of managed `.agents/skills/fractal-scope/` runtime files
  - Preserves the project-owned `config.yaml` during repair
  - Does not own ongoing audits, scope configuration, or local `AGENTS.md` content

- project-local `fractal-scope` — scope-gate authority
  - Owns `.agents/skills/fractal-scope/config.yaml`
  - Owns deterministic matching via `.agents/skills/fractal-scope/scripts/check-scope.js`
  - Owns scope configuration and match inspection inside the consuming project

- `fractal-sync` — synchronization authority
  - Owns Level 1/2/3 semantics and repository document topology
  - Owns bidirectional code/document ripple synchronization
  - Owns placement, naming, indexing, and lifecycle transitions

- `fractal-agents-fill` — module contract extraction authority
  - Owns extracting and writing module contracts from a supplied project or module path
  - Owns target-module extraction and project-wide module discovery
  - Owns conservative `AGENTS.md` merging, module-relevant skill pointers, and blocked-boundary reporting

- `postmortem` — content-quality authority
  - Owns defect-vs-feature judgment for reusable incident records
  - Owns postmortem structure, root-cause depth, verification, and prevention quality bar

## Handoff rules

- If the task bootstraps fractal docs or repairs generated scope runtime files, start with `fractal-setup`.
- If the task configures or checks write scope, use the consuming project's local `fractal-scope`; if it is absent, bootstrap it with `fractal-setup`.
- If code or documentation changed, use `fractal-sync` to reconcile both views.
- If the task needs one or all module contracts extracted or refreshed from project evidence, start with `fractal-agents-fill`.
- If the task changes **what incident knowledge must be captured**, start with `postmortem`.

## Mixed-task rule

When a task spans multiple authorities:
1. decide the primary authority first
2. make the primary decision there
3. read adjacent skills only for the parts they own
4. avoid duplicating rules across skills
