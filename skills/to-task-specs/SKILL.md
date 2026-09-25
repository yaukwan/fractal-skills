---
name: "to-task-specs"
description: "Load when turning a clarified PRD, decision summary, or resolved conversation into an implementation-ready task spec. Not for unresolved design choices, implementation, repo documentation structure, or postmortems."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# To Task Specs

Produce a repository-grounded spec that an executor can follow without the planning conversation. Stop at human review; implementation, test execution, and model selection are outside this skill.

## Workflow

1. **Resolve input and decisions.**
   - Use the first valid input: file path in `$ARGUMENTS` → inline task context in `$ARGUMENTS` → resolved conversation. Ask if none exists; a PRD file is not required.
   - Read applicable current decisions and inherit their constraints without duplicating their authority. Having no applicable durable decision does not block the task.
   - Proceed only when outcomes, scope, and consequential choices about public behavior, data integrity, permissions, and architecture are settled.

2. **Ground the plan.**
   - Read relevant project instructions and working-tree changes; trace affected entry points, callers, interfaces, reuse points, and tests.
   - Verify every existing path, symbol, and command used by the plan. Record the baseline, relevant local changes, and roles of key anchors; distinguish facts, assumptions, and planned additions, including new-project files.
   - Report missing evidence or contradictory current-state assumptions as blockers. An intentional behavior change is not such a contradiction.

3. **Draft executable tasks.**
   - Read `assets/task-spec-template.md` for the output structure; omit irrelevant sections and placeholders. State changed and preserved behavior, critical edge cases, and local design choices with reasons. Reference preserved contracts by path/symbol and summarize their obligations.
   - Read `references/task-group-structuring-guidelines.md` for grouping, dependencies, and verification. Finish when each required outcome and critical failure case has an owning task and check, with executable ordering and explicit write conflicts.
   - Keep public contracts and difficult invariants precise, but private implementation details open. Shrink task scope before adding prose; inherit project conventions and quality gates rather than inventing them.

4. **Cold-read the handoff.**
   - Using only the spec and its references, confirm an executor can locate changes, preserve required behavior, validate each outcome, and recognize escalation conditions. Include necessary decisions from the conversation.
   - Each check needs an entry point, working directory, command or reproducible procedure, and expected result. Mark new checks as planned; expectations are not actual passing results.

5. **Deliver and stop.** Apply the output rules below, reread the artifact, and request human review. New specs remain `draft` or `pending_review`; generation neither approves the spec nor starts implementation.

## Escalation

The spec must require evidence-backed review for missing anchors, contract conflicts, scope expansion, or validation failures needing design changes—not silent acceptance changes. Project modification restrictions remain binding; spec approval does not waive them or make them planning-only.

## Output

Before writing, read `.agents/skills/fractal-scope/config.yaml` when present and apply `spec_output.mode`:

| Mode | Action |
| --- | --- |
| `always_file` | Write `docs/specs/{YYYY_MM_dd}_{task_name}.md`; create the directory if needed. |
| `always_inline` | Output only in conversation; no file writes or directory creation. |
| `ask`, missing key, or missing config | Ask before writing, using the host's question tool or conversation. If confirmed, use the file path above. |

- `task_name`: use the second `$ARGUMENTS` token when provided; otherwise infer from the title/objective, falling back to `task-spec`. Use kebab-case.
- Frontmatter follows `fractal-sync`: `type: specs`, `status`, `updated`, `related`. Reference real source documents, or use `related: []`; summarize settled intent in the body instead of copying raw input.
- Return the file path or inline spec as input for implementation or issue splitting after review.
- After approval and an implementation request, `impl-task-spec` can execute the spec and maintain its checkboxes, evidence, and status; generation does not invoke it automatically.
