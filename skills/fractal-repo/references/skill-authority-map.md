# Skill Authority Map

Use this map when tasks touch multiple adjacent documentation skills.

## Authority split

- `fractal-setup` — first-time bootstrap authority
  - Owns initial `docs/` directory creation
  - Owns first emission of `.agents/skills/fractal-scope/SKILL.md` and `config.yaml`
  - Does not own ongoing audits or local `AGENTS.md` content

- `fractal-scope` — scope-gate authority
  - Owns packaged `config.yaml` defaults
  - Owns deterministic scope matching via packaged `scripts/check-scope.js`
  - Owns runtime `.agents/skills/fractal-scope/` config refresh semantics

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

- If the task bootstraps fractal docs for the first time, start with `fractal-setup`.
- If the task configures or checks write scope, start with `fractal-scope`.
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
