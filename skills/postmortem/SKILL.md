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

**This skill's content-quality rules apply only when `.agents/skills/fractal-scope/config.yaml` exists**. If the project doesn't use fractal docs, follow `references/naming-and-placement.md` defaults for where to write.

L2 index writes are separate from the postmortem body. Before any `AGENTS.md > Docs` edit,
follow Retrieval Link in `references/naming-and-placement.md`; only a recorded
`l2_folder_manifest.status: matched` permits that write. A skipped or blocked index update
does not discard the postmortem.

## Skill Authority Map

This skill owns **content-quality authority**: whether this defect work deserves a postmortem, and to what quality standard.

- placement / naming / indexing / lifecycle and AGENTS.md synchronization → `fractal-sync`

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
4. Place the document according to repo rules
5. Apply Retrieval Link in `references/naming-and-placement.md` for affected existing L2 manifests; record each scope result and link outcome
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
- `references/naming-and-placement.md` — default naming and placement recommendations

## Placement Rule

If the repo has `fractal-sync` rules, follow them for postmortem:

- placement
- naming
- indexing
- lifecycle

After writing the postmortem, use the gated Retrieval Link procedure in
`references/naming-and-placement.md` for L2 indexing. This remains a retrieval pointer;
the postmortem stays under `docs/postmortem/`.

If no repo-level rules exist, follow the defaults in `references/naming-and-placement.md`.

## Final Handoff Requirement

When you complete a bugfix, the final delivery must include:

- fix summary
- verification method
- postmortem document path
- brief root cause and prevention summary
- index outcomes: changed, already linked, skipped, or blocked, with scope results or missing prerequisites
