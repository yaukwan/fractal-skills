---
name: to-task-specs
description: Load when a task has been clarified and relevant decisions are current, and you need a task specification document from a PRD, resolved context, decision summary, or current conversation context. Do not load for repo placement decisions, Level 1/2/3 schema work, or postmortem writing.
---

# To Task Specs

## Purpose

Transform a **resolved task context or PRD** into a structured, verifiable, group-executable task specification document.

Output destination is configurable via `docs/decisions/fractal-scope.md`.

This skill exists because the base model tends to either jump straight to implementation or produce vague task lists without proper grouping, file-level scoping, and acceptance criteria.

## Decision Gate Dependency

Do not generate task specs until relevant decisions are confirmed current.

Specs must inherit the boundaries and constraints already fixed by current decisions.

If decision truth is unclear, stop and resolve that first.

## Default approach

1. Receive input from `$ARGUMENTS` or from already-resolved conversation context.
2. Read the relevant current decisions and task context.
3. Parse the task into business objectives, functional domains, boundaries, constraints, and acceptance criteria.
4. Group tasks by functional domain + code boundary — never by project phase.
5. Fill the template from `assets/task-spec-template.md`.
6. Resolve output destination per `## Output Mode Configuration`.
7. Stop. Do not start implementation.

## Output Mode Configuration

This skill's output behavior is controlled by `docs/decisions/fractal-scope.md` > `## Spec Output Preference`.

- If `fractal-scope.md` exists and `output_mode` is set:
  - `always_file`: Write to `docs/specs/{YYYY_MM_dd}_{task_name}.md`.
  - `always_inline`: Output to conversation context only. Do NOT write to disk or create directories.
  - `ask` or key missing: Use the `question` tool to ask the user before writing.
- If `fractal-scope.md` does not exist: default to `ask`.

## Decision rules

### Input source precedence

Choose the first valid source in this order:

1. `$ARGUMENTS` provides a valid file path → read that file.
2. `$ARGUMENTS` contains inline PRD or resolved task context → use it directly.
3. The conversation already contains resolved local contract context and current decision truth → synthesize from that.
4. If none of the above exist → stop and ask for the missing context.

### task_name inference

- Use the second `$ARGUMENTS` token if provided.
- Otherwise, infer from the PRD title or core objective.
- Fallback: `task-spec`.

### Output directory

- If output mode is `always_inline`, skip directory creation and file write entirely.
- Otherwise, if `docs/specs/` does not exist, create it.
- When writing to disk: `docs/specs/{YYYY_MM_dd}_{task_name}.md`.

### Task structuring rules

- Merge sub-tasks when the same operation pattern applies to multiple files.
- Never create "Testing Only" or "Documentation Only" task groups — fold quality requirements into each task group's acceptance criteria.
- Reflect current decision constraints in the relevant requirements or acceptance criteria.

## Gotchas

- Do NOT assume a fixed PRD path like `docs/specs/prd.txt`.
- Do NOT assume a PRD is required — resolved context is a valid input.
- Do NOT start writing implementation code after generating the spec. The spec is a stop-gate.
- This skill produces `docs/specs/` documents (type: `specs`), not `docs/decisions/` or `docs/engineering/`.
- `task_name` should be kebab-case.
- All acceptance criteria must be verifiable — no "looks good" or "works correctly".

## Conditional reads

- Always: read `assets/task-spec-template.md` for the spec document skeleton.
- Always: read `references/task-group-structuring-guidelines.md` for grouping and batching rules.
- When available: read `docs/decisions/fractal-scope.md` for `## Spec Output Preference`.
- When available: read the relevant current decision docs so the spec inherits their constraints.

## Output expectations

- Output file written to `docs/specs/{YYYY_MM_dd}_{task_name}.md` when output mode is `always_file` or user confirms write.
- Frontmatter follows fractal-repo convention: `type: specs`, `status`, `updated`, `related`.
- Each Task Group includes: Purpose, Related Files, Requirements, sub-tasks (Input / Instructions / Objective / Acceptance Criteria).
- The generated spec is explicit enough to serve as a direct implementation input.
- After completion, explicitly request human review before implementation begins.
