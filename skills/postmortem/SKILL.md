---
name: "postmortem"
description: "Load when bugfix, regression, incident, or reliability work should leave behind a reusable root-cause record, especially after expected behavior has been restored. Do not load for pure feature work, cosmetic polish, formatting, or behavior-preserving refactors"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Postmortem

Produce a structured postmortem document for bugfix / regression / incident-resolution tasks.

## Core Rule

When the primary nature of the task is **defect correction** rather than pure feature work, a postmortem must be produced.

Prioritize for: regression / correctness issue / incident / broken test exposing a real defect / needing a reusable root cause record.
Do not use for: pure new feature / pure visual polish / behavior-preserving refactors / formatting or renames.

## Scope Gate

**This skill's content-quality rules apply only when `skills/fractal-scope/config.yaml` exists**. If the project doesn't use fractal docs, follow `references/naming-and-placement.md` defaults for where to write.

## Skill Authority Map

This skill owns **content-quality authority**: whether this defect work deserves a postmortem, and to what quality standard.

- placement / naming / indexing / lifecycle → `fractal-repo`
- header / AGENTS.md schema semantics → `fractal-context`

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
3. Draft postmortem following the template
4. Place the document according to repo rules
5. Return the document path in the final delivery

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
- `references/naming-and-placement.md` — default naming and placement recommendations

## Placement Rule

If the repo has `fractal-repo` rules, follow them for postmortem:

- placement
- naming
- indexing
- lifecycle

If no repo-level rules exist, follow the defaults in `references/naming-and-placement.md`.

## Final Handoff Requirement

When you complete a bugfix, the final delivery must include:

- fix summary
- verification method
- postmortem document path
- brief root cause and prevention summary
