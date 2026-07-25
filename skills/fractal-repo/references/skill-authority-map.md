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

- `fractal-audit` — report-only health authority
  - Owns stale decision, stale/missing `AGENTS.md`, and lane-placement reports
  - Owns prioritizing repair findings without applying fixes
  - Does not own the remediation content for each finding

- `fractal-context` — schema authority
  - Owns Level 1/2/3 semantics
  - Owns file header and AGENTS.md contract meaning
  - Owns ripple rules for semantic changes

- `fractal-agents-fill` — local contract capture authority
  - Owns creating or refreshing directory `AGENTS.md` from code, nearby docs, and current task evidence
  - Owns clarifying ambiguous local ownership or constraints one blocker at a time
  - Owns conservative local-manifest writing when the contract is clear

- `fractal-repo` — placement authority
  - Owns repo topology
  - Owns document placement, naming, indexing, and lifecycle transitions
  - Owns root/local AGENTS.md navigation strategy at repo topology level

- `postmortem` — content-quality authority
  - Owns defect-vs-feature judgment for reusable incident records
  - Owns postmortem structure, root-cause depth, verification, and prevention quality bar

## Handoff rules

- If the task bootstraps fractal docs or repairs generated scope runtime files, start with `fractal-setup`.
- If the task configures or checks write scope, use the consuming project's local `fractal-scope`; if it is absent, bootstrap it with `fractal-setup`.
- If the task asks for repo-wide health findings without fixes, start with `fractal-audit`.
- If the task changes **meaning**, start with `fractal-context`.
- If the task needs a directory contract inferred or refreshed from local evidence, start with `fractal-agents-fill`.
- If the task changes **where docs live or how they are linked**, start with `fractal-repo`.
- If the task changes **what incident knowledge must be captured**, start with `postmortem`.

## Mixed-task rule

When a task spans multiple authorities:
1. decide the primary authority first
2. make the primary decision there
3. read adjacent skills only for the parts they own
4. avoid duplicating rules across skills
