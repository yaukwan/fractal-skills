---
name: "postmortem"
description: "Load when bugfix, regression, incident, or reliability work should leave behind a reusable root-cause record, especially after expected behavior has been restored. Do not load for pure feature work, cosmetic polish, formatting, or behavior-preserving refactors"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.2"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Postmortem

Produce a structured postmortem document for bugfix / regression / incident-resolution tasks.

## Core Rule

When the primary nature of the task is **defect correction** rather than pure feature work, a postmortem must be produced.

Prioritize for: regression / correctness issue / incident / broken test exposing a real defect / needing a reusable root cause record.
Do not use for: pure new feature / pure visual polish / behavior-preserving refactors / formatting or renames.

## Boundary Decision

If you are unsure whether this is a defect fix that should leave a postmortem record, read `references/decision-rules.md` first, then decide whether to produce one.

## Workflow

1. First determine whether the task is primarily defect correction
2. Collect implementation evidence:
   - symptom
   - impact
   - expected vs actual behavior
   - root cause
   - fix applied
   - verification
   - prevention / follow-ups
3. Read `templates/postmortem-template.md` and draft the postmortem; check `references/quality-bar.md` before calling its content complete
4. Read `references/naming-and-placement.md` and save the document under its naming and placement rules
5. Apply Retrieval Link from the same file for affected existing L2 manifests; record each link outcome
6. Reread the saved postmortem and any changed manifests; return the document path and index outcomes in the final delivery

## Output Standard

A qualified postmortem must clearly state:

- what went wrong
- why it went wrong
- what fix was applied
- how the fix was verified
- how to reduce recurrence probability

Must not contain only:

- fixed the bug
- issue resolved
- updated logic
- improved stability

## File Map

- `templates/postmortem-template.md` — default template
- `references/decision-rules.md` — when a postmortem is mandatory after loading this skill
- `references/quality-bar.md` — quality threshold
- `references/naming-and-placement.md` — naming, placement, repository override, and the L2 retrieval link

## Boundaries

- This skill owns whether defect work deserves a postmortem and its quality bar. Lifecycle
  transitions and `AGENTS.md` synchronization beyond the retrieval link belong to `fractal-sync`.

## Final Handoff Requirement

When you complete a bugfix, the final delivery must include:

- fix summary
- verification method
- postmortem document path
- brief root cause and prevention summary
- index outcomes: changed, already linked, or skipped with its reason
