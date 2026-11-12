---
name: "fractal-sync"
description: "Load after a confirmed code, architecture, or repository-document change when existing Level 3 contracts, existing Level 2 manifests, Level 1 navigation, or repository lifecycle must be reconciled with current truth; when the user asks to add a Level 3 contract to named files; or when the user asks for a report-only drift check of those artifacts. Do not load for bootstrap, target-module or project-wide contract extraction, or decision lifecycle."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.3"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Sync

Synchronize code and documentation as two views of one system. A change is complete only when the machine view and semantic map describe the same current truth.

## Write Eligibility

An artifact that exists is maintained. A new artifact needs a request.

| Artifact | Recognized by | Update | Create |
| --- | --- | --- | --- |
| L2 manifest | A non-root `AGENTS.md` with a `Scope` section | When it exists | Never here; creation belongs to `fractal-agents-fill` |
| L3 header | A documentation comment with `INPUT`, `OUTPUT`, and `ROLE` fields; bracketed labels such as `[INPUT]:` count | When it exists | Only in files the user names for a header |
| Root `AGENTS.md` | The repository-root file | The sections it already has | A missing Level 1 section, or the file itself, only on request |

- Leave a nested `AGENTS.md` without a `Scope` section unchanged.
- A project instruction that excludes a path from fractal writes, such as a root `Global Constraints` rule, overrides this table.

## Workflow

1. **Confirm the outcome.** Establish the confirmed task outcome and the affected paths. Complete this step when the intended contract can be stated without guessing.
2. **Read current truth.** Read root `AGENTS.md`, relevant existing local `AGENTS.md`, L3 headers, code, tests, current decisions, and repository docs for the affected paths.
3. **Select the write set.** Apply Write Eligibility to every affected path. Complete when each affected manifest, header, and root section is classified as existing, requested, excluded, or absent.
4. **Ripple outward.** Synchronize only affected layers:
   - Existing or requested L3 headers when semantic inputs, outputs, role, or non-obvious invariants changed.
   - Existing L2 manifests, but only for contract changes established by this change (ownership, constraints, member responsibilities, vocabulary, related docs).
   - Existing root `AGENTS.md` sections when top-level topology, global constraints, or local-map navigation changed.
   - Repository docs when placement, naming, frontmatter, indexes, or lifecycle changed.
   - Decision skills when this change renames, merges, or removes one: rewrite every reference
     to the old slug in the same operation (root and per-layer `AGENTS.md`, `docs/**`, code
     comments). See `decision-capture`, `references/skill-sync-rules.md`, Reference Rewrite.
5. **Prove both directions.** Verify every changed documentation claim against code and represent every changed code contract at its owning documentation layer.
6. **Report the sync.** List `changed`, `checked-no-change`, and `blocked` items for both code and documentation. List as `not-maintained`, without writing them:
   - each excluded path whose manifest or header is now stale
   - each module whose contract changed and that has no L2 manifest at its own directory or a non-root ancestor
   - each file without a header whose changed contract is a kind listed under Header Candidates in `references/protocol/level3.md`

## Direction Rules

### Code to documentation

Treat implementation changes as evidence, not automatic design authority. Update the semantic map when the intended contract changed; leave it unchanged for internal work that preserves the contract.

### Documentation to code

Resolve documented paths, modules, dependencies, and public behavior against the repository. If the document records confirmed intended design, align code to it. If it is stale, correct the document. If authority is ambiguous, report one blocker rather than choosing silently.

### Mixed changes

Use the confirmed task outcome as authority and reconcile both diffs against it. Neither side wins merely because it changed most recently.

## Report-only Mode

When the user asks for a drift report, audit, or health check instead of a sync, write nothing.

1. Set the scope to the paths the user names. When none are named, use every existing L2 manifest, L3 header, root `AGENTS.md` section, and `docs/` lane document.
2. Read the Canonical References for each layer in scope, then read current truth as in Workflow step 2. No task outcome applies.
3. Check every claim in each manifest, header, and root section against current code, including a module, path, or responsibility that the artifact should list and does not. For each `docs/` document, check only that it sits in the lane that fits its kind. Its name and frontmatter are not drift, because those conventions apply only to new documents. Do not verify the claims in its content; they belong to the skill that produced it.
4. Report each mismatch as `drift`: its path, owning layer or `docs/` lane, the documented statement, the conflicting or missing fact, and the write a sync would make. Name the stale side when the evidence shows it; otherwise state the question that decides it. Report the number of artifacts checked without drift for each layer and for `docs/`, counting each root section as one artifact.

Complete when every artifact in scope was checked and no file changed.

## Canonical References

- Read `references/protocol/level3.md` before writing, normalizing, or checking an L3 contract, or listing header candidates.
- Read `references/protocol/level2.md` before writing, normalizing, or checking an L2 manifest; it holds the schema and the authority of each section.
- Read `references/protocol/level1.md` before changing or checking root navigation or global context.
- Read `references/lifecycle.md` when placing, naming, or checking a repository document, or when it may move between `engineering / research / postmortem / specs / archive`.
- Read `references/frontmatter.md` when creating repository-document metadata.

The protocol references are the single source of truth for schema meaning. Render L3 contracts with the target language's standard documentation-comment syntax.

## Completion Criteria

- Every affected path is classified under Write Eligibility; no manifest was created, and no header was created without a request.
- Every contract change maps to its owning layer, or is explicitly recorded as `checked-no-change` or `not-maintained`.
- Documented paths, modules, and contracts resolve against current code.
- Moved or removed entities leave no stale indexes or navigation entries, including no stale
  reference to a renamed or removed `decision-*` slug.
- The final report covers both the machine view and semantic map.

## Boundaries

- Bootstrap belongs to `fractal-setup`.
- Target-module or project-wide extraction, creation, or systematic refresh of Level 2 module contracts belongs to `fractal-agents-fill`.
- Decision freshness checks, creation, update, supersession, merge, and retirement belong to
  `decision-capture`, as does the reference rewrite that follows a decision-skill rename or removal.
- Postmortem content quality, naming, frontmatter, and retrieval link belong to `postmortem`; this skill owns later lifecycle transitions.
