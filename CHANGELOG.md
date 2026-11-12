# Changelog

All notable changes to the fractal-skills collection are documented here.

---

## [Unreleased]

### scope gate removal (breaking)

- Removed the project-local `fractal-scope` runtime: the embedded template, `config.yaml`,
  `check-scope.js`, and its self-test. No skill runs a checker before writing.
- Write eligibility now comes from the project. An existing L2 manifest (a non-root
  `AGENTS.md` with a `Scope` section) or L3 header (`INPUT`, `OUTPUT`, `ROLE`) is
  maintained. A new one is created only on request: `fractal-agents-fill` creates L2
  manifests, and `fractal-sync` adds an L3 header to files the user names.
- A project instruction that excludes a path from fractal writes, such as a root
  `Global Constraints` rule, replaces `exclude` patterns.
- Migration for consuming projects:
  - Delete `.agents/skills/fractal-scope/` and remove references to it from the project
    instructions; nothing reads it.
  - The default changes from "disabled until configured" to "existing artifacts are
    maintained". For a path that was excluded but already holds an L2 manifest or L3
    header, add an exclusion rule to the project instructions or delete the artifact.
  - Move a `spec_output.mode` of `always_file` or `always_inline` into the project
    instructions.

### fractal-setup (1.1 → 2.1)

- Bootstraps only the `docs/` layout and the domain-language bridge; installs no runtime or
  configuration.
- Adds a `.gitkeep` to each empty `docs/` lane directory so git tracks the layout.

### postmortem (1.0 → 1.3)

- Content-quality rules always apply. Retrieval links are added only to existing L2
  manifests, without a checker.
- Removed the `SKILL.md` sections that repeated the placement and indexing rules;
  `references/naming-and-placement.md` is their single source.
- Owns its naming, placement, frontmatter, and L2 retrieval link. New postmortems use the
  skill's own template frontmatter and `YYYYMMDD-bug-description.md`; the `-en` suffix and the
  `fractal-sync` repository override are gone. Existing postmortems are left unchanged.

### to-task-specs (1.0 → 2.0)

- Output destination comes from the request or a project instruction, then from an existing
  `docs/specs/` spec, then from a question; `spec_output.mode` is gone.

### docs and skill contracts

- Aligned runtime decision skill paths on `.agents/skills/decision-*/` across README, audit, fill, and decision-capture materials.
- Documented the `docs/archive/decisions/{slug}.md` tombstone path for retired decision skills across setup, sync, and decision-capture materials.
- Aligned `fractal-agents-fill` behavior and README copy with the ask-first interaction model.
- Standardized postmortem placement on `docs/postmortem/`.
- Documented the current source-skill inventory.
- Reworked `skill-design-guidelines` around the Agent Skills common contract, predictable execution, explicit completion criteria, and temporary prompt validation.
- Removed committed skill eval fixtures and their generation contract; structural validation now checks only portable, deterministic requirements.
- Merged `fractal-repo` and `fractal-context` into the action-oriented `fractal-sync` skill for bidirectional code/document synchronization.
- Removed the `fractal-audit` skill; report-only drift checks are a mode of `fractal-sync`.
- Dropped the per-language L3 header templates in favor of rendering canonical fields in each target language's standard documentation-comment syntax.
- Removed the OpenCode installer, reference agent definitions, and `AGENTS.template.md`; the repo now ships skill sources and documentation only.
- Removed the leftover `agent_title.json` and two unreferenced files:
  `fractal-sync/references/skill-authority-map.md` and
  `decision-capture/assets/decision-frontmatter-example.md`.
- Added `npm test`, which validates the structure of every skill and runs the validator's
  unit tests, and a CI workflow that runs it.

### fractal-agents-fill (1.1 → 3.2)

- Reframed as contract extraction: target mode extracts one owning module contract, project mode discovers modules and processes each independently.
- Records a write basis per module. Project mode asks one creation confirmation for every
  manifest it would create or restructure.
- Reads the Level 2 schema and section authority from the `fractal-sync` protocol instead of
  carrying a second copy.
- L3 header statements are not promoted into L2 `Constraints`.

### fractal-sync (1.0 → 2.2)

- Narrowed to confirmed code/document changes; extraction belongs to `fractal-agents-fill`.
- Removed the obsolete root `AGENTS.md` template and tightened lifecycle guidance.
- Decision-skill renames, merges, and removals now trigger the outward ripple: every reference
  to the old slug (root and per-layer `AGENTS.md`, `docs/**`, code comments) is rewritten in the
  same operation.
- Replaced the Scope Gate with Write Eligibility. It never creates an L2 manifest, creates
  an L3 header only in files the user names, and synchronizes only the root `AGENTS.md`
  sections that exist.
- The sync report lists unmaintained modules and files as `not-maintained` candidates.
- Added Report-only Mode: a drift report over existing artifacts that writes nothing.
- `references/protocol/level2.md` owns Section Authority for every skill that writes an L2
  manifest and defines confirmed intent. `Exceptions` is no longer append-only: a deviation
  is removed when explicit evidence says it ended.
- Level 1 sections are standard instead of required; a missing section is added only on
  request.
- Naming and frontmatter conventions apply to new documents only. Report-only Mode checks a
  document's lane, not its name or frontmatter.
- An L3 header statement is not evidence for an L2 `Constraints` rule.

### decision-capture (1.1 → 2.2)

- Promoted decisions to project skills under `.agents/skills/decision-{slug}/SKILL.md`.
- Applies when the project already has a decision skill or the user asks to capture or
  check a decision.
- Unified current-truth lifecycle actions: current, create, update, supersede, merge, archive,
  and reject. Reject is read-only; retiring an existing skill requires a retirement action.
- Added skill-sync rules for generated decision skill routing contracts.
- Generate routing from owned contracts instead of generic keyword mappings; relevant
  refactors and contract-documentation changes are no longer excluded by task category.
- Load output-format and synchronization details only for write actions, and reuse explicit
  same-scope authorization while still confirming unapproved scope expansion or retirement.
- Decision skills now have two shapes: a single-topic `SKILL.md`, or an index `SKILL.md` plus
  `references/{domain}.md` per internal domain. Both stay self-contained; `docs/**` links are
  background only, never authority.
- Retirement (supersede, merge, archive) deletes the skill directory and writes a
  `docs/archive/decisions/{slug}.md` tombstone. The `[SUPERSEDED]` / `[ORPHANED]` description
  prefix is gone, so a retired decision can no longer stay in the routing list.
- Merge is chosen by co-load unit rather than topic similarity; the reference rewrite across
  `AGENTS.md`, `docs/**`, and code comments is part of the rename, merge, or removal operation.
- Preflight required reference rewrites before retirement; blocked rewrites leave the
  affected authority in place.
- Write completion requires applicable structural and routing checks, continuous `§N`
  (with a bidirectional index for multi-domain skills), no stale active-authority references,
  and resolvable links. Read-only outcomes do not require mutation or retirement checks.

## [0.1.1] - 2026-06-01

### fractal-scope

- Added the project-local `fractal-scope` skill package and its default scope-gate config for downstream fractal skills.

### docs and skill contracts

- Tightened the setup, audit, context, repo, decision-capture, postmortem, and task-spec skills to respect the scope gate and current-state doc rules.
- Updated the English and Chinese README guidance to point at the new fractal-scope setup flow.

### decision-capture (1.0 → 1.1)

- Write operations (CREATE / UPDATE / SUPERSEDE / MERGE) now require explicit
  user confirmation before proceeding. The agent presents a summary of the
  proposed decision, its durability qualification, and its relation to existing
  decisions, then waits for confirmation before writing.
- Added an explicit admission-rule guard: thorough analysis alone does not
  qualify a finding as a durable system decision. The bar is about system-wide
  impact and longevity, not analysis depth.
- Added a review-checklist step before any decision creation.

### fractal-agents-fill (1.0 → 1.1)

- **Interaction model changed.** The default is now to ask the user one question
  at a time per L2 manifest section, rather than writing directly when code
  evidence appears sufficient. User intent drives all writes.
- Added a `<what-to-do>` block as the authoritative workflow instruction.
- Added `skip` / `done` commands: the user can skip a single question or stop
  all questioning and write immediately with whatever has been gathered.
- Removed the direct-write path entirely. Code exploration reduces what is
  asked, not whether asking happens.
- Clarified that the primary value of this skill is capturing intent that
  cannot be inferred from code (ownership boundaries, constraints, direction).
- Restructured the suggested question sequence into a **required** sequence
  with clear per-section semantics.
