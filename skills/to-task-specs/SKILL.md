---
name: "to-task-specs"
description: "Load when a clarified task needs a written, implementation-ready spec from a PRD, decision summary, or resolved conversation context. Do not load for unresolved requirement or architecture choices, code implementation, repo placement, Level 1/2/3 schema work, or postmortem writing."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# To Task Specs

## Purpose

Transform a **resolved task context, PRD, or decision summary** into a repository-grounded specification that another executor can implement and verify without the planning conversation.

Output destination is configurable via `.agents/skills/fractal-scope/config.yaml`.

This skill prevents vague task lists, invented implementation anchors, and handoffs that leave consequential behavior choices to the executor.

## Decision Gate Dependency

- Check applicable current decisions and inherit their boundaries; reference their authority rather than creating a competing decision record.
- No applicable durable decision is a valid outcome. Do not require a decision file for every task.
- Record task-local implementation choices and their reasons in the spec. Leave ordinary private implementation details to the executor.
- If requirements or durable design truth conflict or remain unresolved, report the specific blocker and return for clarification or decision handling before generating a build-ready spec.

## Pipeline Position

Typical flow: resolved context + current repository evidence → `to-task-specs` → human review → implementation or issue splitting.

A generated spec is also valid input for tracker or issue-generation skills. This skill owns the handoff document, not implementation, test execution, or model selection.

## Default approach

1. **Establish intent.** Resolve the input using the precedence below and apply the Decision Gate. Complete when user-visible outcomes, non-goals, unchanged behavior, and applicable constraints are settled.
2. **Ground the handoff.** Inspect relevant project instructions and working-tree changes; trace each changed behavior through its entry points, affected callers/consumers, interfaces, reuse points, and tests. Complete when affected paths are accounted for and every existing symbol, contract, and verification entry point used by the plan has evidence from code or project configuration. For an inspected empty project, label new files, interfaces, and commands as planned. If required evidence is inaccessible or contradicts an assumed current-state fact, report the blocker instead of inventing a ready spec; an intentional behavior change is not such a contradiction.
3. **Close consequential choices.** Define changed behavior, inputs/outputs, defaults, failure effects, and applicable compatibility, security, or concurrency constraints. Complete when no unresolved choice could change public behavior, data integrity, permissions, or architectural boundaries. State local design choices and implementation freedoms separately.
4. **Build execution tasks.** Read `references/task-group-structuring-guidelines.md` and apply its grouping, dependency, and verification rules. Complete when every required outcome and relevant failure case maps to a task and a concrete check, with executable dependency order.
5. **Draft and cold-read.** Fill `assets/task-spec-template.md`, omitting irrelevant sections. Apply the Handoff Check below using only the draft and its explicit repository references, not chat memory. Complete when all checks pass and no unresolved placeholders or unsupported claims remain.
6. **Deliver and stop.** Resolve the output mode before any write, then reread the resulting artifact for completeness. Report the file path or inline spec and request human review. New specs remain `draft` or `pending_review`; generation is not approval and does not authorize implementation.

## Handoff Check

- **Grounding:** Current-state anchors identify existing files and symbols, their relevant roles, and reuse points. Planned additions and assumptions are distinguishable from observed facts; the baseline notes relevant uncommitted changes when present.
- **Contract:** Required behavior and critical edge cases are explicit. Existing unchanged contracts have precise references and a short statement of what is preserved, not merely "refer to the source code."
- **Execution:** Each task has an outcome, dependencies, change anchors, acceptance criteria, and verification. Shared-file conflicts and shared contracts are accounted for before claiming tasks can run in parallel.
- **Evidence:** Verification gives a working directory, command or reproducible procedure, and expected observable result. Existing commands are checked against project configuration; new checks are marked planned. Expected success is never reported as an actual passing result.
- **Escalation:** The spec distinguishes local implementation freedom from changes requiring review. Missing anchors, contract conflicts, necessary scope expansion, or validation failures that require changing the approved design must return with evidence rather than silently changing acceptance. Project modification restrictions remain binding; do not assume later spec approval waives them or reinterpret them as planning-only without an explicit scope.
- **Cold start:** An executor with only the spec, its references, and the repository can identify what to change, what to preserve, how to validate, and when to stop. Necessary decisions from the conversation are summarized in the artifact.

## Output Mode Configuration

This skill's output behavior is controlled by `.agents/skills/fractal-scope/config.yaml` > `spec_output.mode`.

-   If `.agents/skills/fractal-scope/config.yaml` exists and `spec_output.mode` is set:
  - `always_file`: Write to `docs/specs/{YYYY_MM_dd}_{task_name}.md`.
  - `always_inline`: Output to conversation context only. Do NOT write to disk or create directories.
  - `ask` or key missing: Ask the user before writing, using the host's question tool when available or a conversational question otherwise.
-   If `.agents/skills/fractal-scope/config.yaml` does not exist: default to `ask`.

## Decision rules

### Input source precedence

Choose the first valid source in this order:

1. `$ARGUMENTS` provides a valid file path → read that file.
2. `$ARGUMENTS` contains inline PRD, decision summary, or resolved task context → use it directly.
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

## Gotchas

- Do NOT assume a fixed PRD path like `docs/specs/prd.txt`.
- Do NOT assume a PRD is required — resolved context or a decision summary is a valid input.
- Do NOT start writing implementation code after generating the spec. The spec is a stop-gate.
- This skill produces `docs/specs/` documents (type: `specs`), not decision skills or engineering docs.
- `task_name` should be kebab-case.
- Derive architecture, naming, dependencies, and quality gates from the target project. Do not impose a service layer, language, linter, or coverage percentage without project evidence or an explicit requirement.
- Match detail to consequential uncertainty: specify public contracts and difficult invariants, not every loop or private helper. Shrink a task's decision scope before expanding prose.

## Conditional reads

- Always: read `assets/task-spec-template.md` for the spec document skeleton.
- Always: read `references/task-group-structuring-guidelines.md` for grouping and batching rules.
- When available: read `.agents/skills/fractal-scope/config.yaml` for `spec_output.mode`.
- When available: read the relevant current decision skills so the spec inherits their constraints.

## Output expectations

- Output file written to `docs/specs/{YYYY_MM_dd}_{task_name}.md` when output mode is `always_file` or user confirms write.
- Frontmatter follows the `fractal-sync` convention: `type: specs`, `status`, `updated`, `related`.
- Each Task Group includes: Purpose, Related Files, Requirements, sub-tasks (Dependencies / Input / Change Anchors / Instructions / Objective / Acceptance Criteria / Verification).
- References use real source documents or `related: []` when the input is conversational; a PRD file is not required. Keep settled intent in the body rather than duplicating the raw input in frontmatter.
- The generated spec is explicit enough to serve as a direct implementation input or issue-splitting input.
- After completion, explicitly request human review before implementation begins.
