# Skill Authority Map

Use this map when tasks touch multiple adjacent documentation skills.

## Authority split

- `fractal-setup` — bootstrap authority
  - Owns initial `docs/` directory creation
  - Does not own ongoing audits or local `AGENTS.md` content

- `fractal-sync` — synchronization authority
  - Owns Level 1/2/3 semantics and repository document topology
  - Owns write eligibility for existing Level 1/2/3 artifacts and requested Level 3 headers
  - Owns bidirectional code/document ripple synchronization
  - Owns placement, naming, indexing, and lifecycle transitions

- `fractal-agents-fill` — module contract extraction authority
  - Owns extracting and writing module contracts from a supplied project or module path
  - Owns creation of Level 2 manifests
  - Owns target-module extraction and project-wide module discovery
  - Owns conservative `AGENTS.md` merging, module-relevant skill pointers, and blocked-boundary reporting

- `postmortem` — content-quality authority
  - Owns defect-vs-feature judgment for reusable incident records
  - Owns postmortem structure, root-cause depth, verification, and prevention quality bar

- `to-task-specs` — task-spec generation authority
  - Owns repository-grounded task contracts, decomposition, and the spec template
  - Stops for human review before implementation

- `impl-task-spec` — task-spec execution authority
  - Owns implementing approved tasks with project execution practices
  - Owns verified task checkmarks, execution evidence, and spec execution status
  - Returns contract changes for clarification or spec revision; does not own document placement or archiving

## Handoff rules

- If the task bootstraps fractal docs, start with `fractal-setup`.
- If code or documentation changed, use `fractal-sync` to reconcile both views.
- If the task needs one or all module contracts extracted or refreshed from project evidence, start with `fractal-agents-fill`.
- If the task changes **what incident knowledge must be captured**, start with `postmortem`.
- If resolved context needs a task spec, use `to-task-specs`; if an existing spec needs implementation or resumption, use `impl-task-spec`.

## Mixed-task rule

When a task spans multiple authorities:
1. decide the primary authority first
2. make the primary decision there
3. read adjacent skills only for the parts they own
4. avoid duplicating rules across skills
