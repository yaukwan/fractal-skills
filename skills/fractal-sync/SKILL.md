---
name: "fractal-sync"
description: "Load after code, architecture, or repository documentation changes to synchronize the machine view and semantic map. Trace affected paths, update scoped Level 3 contracts, local Level 2 `AGENTS.md`, root Level 1 navigation, and repository document placement, then verify both sides describe the same current truth. Do not load for bootstrap, report-only audits, decision lifecycle, or unresolved directory intent."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Sync

Synchronize code and documentation as two views of one system. A change is complete only when the machine view and semantic map describe the same current truth.

## Scope Gate

Before writing an L2 manifest or L3 header, run the consuming project's checker for every affected path:

```bash
node .agents/skills/fractal-scope/scripts/check-scope.js --config .agents/skills/fractal-scope/config.yaml --root . --path <target-path>
```

- Missing config: this is not a writable fractal repository; report the missing gate and do not apply fractal writes.
- Missing checker: stop and repair the project-local runtime with `fractal-setup`.
- L3 writes require `l3_file_header.status: matched`.
- L2 writes require `l2_folder_manifest.status: matched`.

L2 and L3 are independently scoped. Never infer scope rules when the checker can decide them.

## Workflow

1. **Traverse inward.** Read root `AGENTS.md`, the nearest local `AGENTS.md`, and existing L3 headers before changing the target. Complete this step when the owning boundary and documented contract are known.
2. **Establish current truth.** Reconcile the request, code, tests, current decisions, and nearby docs. If directory intent remains unresolved, hand off to `fractal-agents-fill`. Complete this step when one intended contract can be stated without guessing.
3. **Apply the primary change.** Implement the requested code or documentation change within its owning boundary.
4. **Ripple outward.** Check and update only affected layers:
   - L3 when semantic inputs, outputs, role, or non-obvious invariants changed.
   - L2 when directory ownership, constraints, member responsibilities, vocabulary, or related docs changed.
   - L1 when top-level topology, global constraints, or local-map navigation changed.
   - Repository docs when placement, naming, frontmatter, indexes, or lifecycle changed.
5. **Prove both directions.** Verify every changed documentation claim against code and represent every changed code contract at its owning documentation layer.
6. **Report the sync.** List `changed`, `checked-no-change`, and `blocked` items for both code and documentation.

## Direction Rules

### Code to documentation

Treat implementation changes as evidence, not automatic design authority. Update the semantic map when the intended contract changed; leave it unchanged for internal work that preserves the contract.

### Documentation to code

Resolve documented paths, modules, dependencies, and public behavior against the repository. If the document records confirmed intended design, align code to it. If it is stale, correct the document. If authority is ambiguous, report one blocker rather than choosing silently.

### Mixed changes

Use the confirmed task outcome as authority and reconcile both diffs against it. Neither side wins merely because it changed most recently.

## Canonical References

- Read `references/protocol/level3.md` before writing or normalizing an L3 contract.
- Read `references/protocol/level2.md` before writing or normalizing an L2 manifest.
- Read `references/protocol/level1.md` before changing root navigation or global context.
- Read `references/templates/{lang}.md` only to render an enabled L3 contract in the target language.
- Read `references/lifecycle.md` when a document may move between `engineering / research / postmortem / specs / archive`.
- Read `references/frontmatter.md` when creating or normalizing repository-document metadata.
- Read `references/skill-authority-map.md` when an adjacent fractal skill may own part of the task.

The protocol references are the single source of truth for schema meaning. Language templates render syntax only.

## Completion Criteria

- Every affected L2/L3 path has a recorded scope-check result.
- Every contract change maps to its owning layer, or is explicitly recorded as `checked-no-change`.
- Documented paths, modules, and contracts resolve against current code.
- Moved or removed entities leave no stale indexes or navigation entries.
- The final report covers both the machine view and semantic map.

## Boundaries

- Bootstrap or runtime repair belongs to `fractal-setup`.
- Missing, stale, or ambiguous directory intent belongs to `fractal-agents-fill`.
- Report-only repository health scans belong to `fractal-audit`.
- Decision creation, update, supersession, or merge belongs to `decision-capture`.
- Postmortem content quality belongs to `postmortem`; this skill owns its placement and retrieval links.
