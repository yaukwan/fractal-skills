# Changelog

All notable changes to the fractal-skills collection are documented here.

---

## [Unreleased]

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
