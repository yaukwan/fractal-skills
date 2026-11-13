---
name: "postmortem"
description: "Load when bugfix, regression, incident, or reliability work should leave behind a reusable root-cause record, especially after expected behavior has been restored. Do not load for pure feature work, cosmetic polish, formatting, or behavior-preserving refactors"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.5"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Postmortem

## Core Rule

When the primary nature of the task is **defect correction** rather than pure feature work, a postmortem must be produced.

## Workflow

1. Determine whether the task is primarily defect correction; read `references/decision-rules.md` for mixed or unclear cases
2. Read `templates/postmortem-template.md` for required evidence, output structure, and quality checks; collect implementation evidence and draft the postmortem
   - Write the body text in the language that project or user instructions set for documents; when none sets one, use the language of the user's request
   - Keep the template's frontmatter keys and section headings unchanged
3. Read `references/naming-and-placement.md` and save the document under its naming and placement rules
4. Apply Retrieval Link from the same file for affected existing L2 manifests; record each link outcome
5. Reread the saved postmortem and any changed manifests; return the document path and index outcomes in the final delivery

## Boundaries

- This skill owns whether defect work deserves a postmortem, its quality bar, and its naming,
  placement, and frontmatter. Lifecycle transitions and `AGENTS.md` synchronization beyond the
  retrieval link belong to `fractal-sync`.

## Final Handoff Requirement

When you complete a bugfix, the final delivery must include:

- fix summary
- verification method
- postmortem document path
- brief root cause and prevention summary
- index outcomes: changed, already linked, or skipped with its reason
