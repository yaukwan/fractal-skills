---
name: "impl-task-spec"
description: "Load when implementing or resuming an existing task spec, including task-scoped execution with progress and evidence written back to that spec. Do not load for spec generation or revision, report-only progress audits, or coding without a task spec."
license: "Apache-2.0"
disable-model-invocation: true
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Implement Task Spec

Execute an approved task spec using the project's implementation and verification practices. Keep its task checkboxes, execution evidence, and document status aligned with verified work, including across sessions.

This skill owns the execution protocol, not a separate coding, TDD, debugging, review, or model-selection methodology. The original spec remains the progress authority; host task tools may mirror its IDs but do not replace writeback.

## 1. Establish the Execution Contract

- Read the user-selected spec in full and its relevant repository instructions, current decisions, and referenced contracts. Use an unambiguous spec from the conversation when no path is supplied; ask when the target is missing or ambiguous.
- Confirm implementation authorization and approval of the selected content. An explicit user instruction to implement that identified spec can serve as approval; merely generating, opening, or naming a draft cannot. Record that approval in `Execution Evidence`, without checking human-review boxes on the user's behalf. An approved document alone is not a request to run it.
- Determine whether approval and the execution request cover the whole spec or named task IDs. Record and honor the narrower scope; if an unfinished prerequisite lies outside it, report the dependency instead of silently expanding the request. Task-scoped approval does not approve the remaining spec.
- Identify any user- or project-authorized commit policy, including whether each task requires a commit checkpoint. Apply Authorized Task Commits below only under that authorization.
- Inspect working-tree changes and validate the baseline, implementation anchors, verification prerequisites, task IDs, and dependency order against the current repository. Missing IDs, cycles, consequential ambiguity, or contract conflicts block affected work. Preserve unrelated changes.
- Read existing checkmarks and evidence against the current implementation. Recheck prerequisite results whose evidence is missing or invalidated by later changes; do not blindly rerun completed work or trust checkmarks alone. Restore unsupported completion marks to `[ ]` with the reason before relying on them.

**Complete when:** the selected scope is authorized, its contract is actionable, and each selected task is classified as verified complete, runnable, or blocked with a reason. If nothing remains, reconcile the evidence and status without inventing more implementation work.

## 2. Execute in Dependency Order

- Select a runnable task whose prerequisites are verified. Before editing, set the document to `in_progress` and identify the active task ID under `Execution Evidence`.
- Follow the spec's change anchors, acceptance criteria, project conventions, and existing implementation/test/debug skills. Deliver the behavior with its required tests and documentation; do not defer acceptance work to a later task.
- Run the task's specified verification through the relevant entry point and record observed results, not just the command or expected result. Apply project quality gates proportionate to the change.
- Make local implementation choices within the granted freedom. When a fix requires changing approved behavior, interfaces, persistence, permissions, scope, or acceptance, follow the escalation rules below.
- Default to sequential execution. Delegate only when dependencies, shared contracts, and write scopes permit it; one coordinator owns spec edits and accepts verification evidence before marking delegated work complete.

**Complete each task only when:** its deliverable and every required acceptance criterion are verified. Immediately write back its evidence and checkmarks before starting another task, rather than batching progress updates at the end.

### Progress Writeback

- Mark each verified acceptance item `[x]`; then change the owning task's `[ ]` to `[x]`. Preserve task IDs, wording, order, and formatting, including the template's `- **[ ] 1.1: ...**` form. Normalize a bare `[]` only for the specific item being updated; never globally replace checkboxes.
- Partial, failed, blocked, skipped, and unverified tasks remain `[ ]`. Record the active task, remaining work, and blockers in evidence instead of introducing extra checkbox states. Human-review checkboxes are not execution tasks.
- Under `Execution Evidence` (create the section if absent), record each run's baseline revision and relevant initial working-tree changes once; use the project's version identifier or a source snapshot when Git is unavailable.
- Add or update a concise entry per task: task ID; run reference; outcome or remaining work; actual command and working directory or reproducible procedure; observed result; and relevant artifact paths. Identify the implementation verified by that result using its revision or source snapshot, with a reference to the relevant patch for changes not included there. HEAD alone does not identify a dirty working tree. On resume, compare relevant changes with this evidence and reverify affected results; unrelated changes alone do not invalidate them. Record approved deviations with their approval source. Preserve evidence needed to explain retries or reopened work; avoid raw log dumps.
- Update frontmatter `updated` to the current `YYYY-MM-DD` whenever progress, evidence, or status changes. Preserve `type`, identity, references, and unrelated metadata.
- For a file spec, update that file in place and reread the changed sections. If writeback is unavailable, report the persistence blocker before proceeding further; chat-only updates do not substitute for a writable file. For an explicitly inline spec, return the revised status, task/acceptance checkboxes, and evidence inline at each checkpoint; do not silently create a file.

### Authorized Task Commits

When per-task commits are authorized, finish this checkpoint before starting the next task:

- After verification and progress writeback, review the task diff and existing index. Selectively stage and commit only the task's deliverables and corresponding file-spec progress; inline progress stays in conversation. Preserve unrelated staged and working-tree changes. If the task cannot be isolated without disturbing them, report the blocker instead of including or resetting them.
- Verify the resulting commit contains the intended task changes and progress, and that unrelated index entries remain intact. If hooks or other edits changed the verified implementation, reverify affected acceptance before proceeding. Report the commit ID; use Git history to associate the commit with its progress entry rather than attempting to embed its own hash in that commit.
- A failed commit is a delivery blocker, not a failed acceptance check. Preserve valid verification and checkmarks, record the commit failure separately, and resolve the required checkpoint before starting another task. Inspect repository and index state before retrying; do not bypass hooks or expand commit scope to force success.

## 3. Handle Blockers and Resumption

- For implementation or test failures within the approved design, diagnose and fix using project practices. Missing environments, unavailable checks, and failed checks are not passes; keep affected work unchecked and state what would unblock verification.
- For missing anchors, design drift, necessary scope expansion, or failures that require a contract change, stop affected tasks and their dependents. Record the conflicting evidence and the decision needed; return to clarification, `decision-capture`, or `to-task-specs` as appropriate. Keep approved requirements and acceptance intact until revision is authorized.
- Continue independent authorized tasks only when the blocker cannot affect their contracts or verification. If the user pauses or the session must hand off, persist the current task, partial changes, last verification result, and next safe action before stopping when possible.
- On resume, repeat the contract and evidence checks in step 1. Reuse valid completed work, reverify invalidated results, and retry risky or non-idempotent operations only after inspecting their effects and the specified recovery constraints.

**Complete when:** every unresolved item has an affected task ID, evidence, an unblock condition, and a next action, and no dependent task is presented as ready or complete without valid prerequisites.

### Spec Status

These execution states extend the `to-task-specs` template. Use them for specs following that contract; if a project defines a different lifecycle, follow its documented mapping or clarify it before changing metadata.

| Status | Meaning and transition |
| --- | --- |
| `draft` / `pending_review` | Not approved for execution. Record explicit approval before advancing to `approved`; use `pending_review` again when an approved contract needs revision and renewed review. |
| `approved` | The selected spec content has approval; implementation has not started. Move to `in_progress` when authorized execution begins. |
| `in_progress` | Work has started but the whole spec is not verified complete. Keep this for a pause, completed subset, remaining tasks awaiting authorization, or checks not yet due. A normal phase handoff awaiting confirmation stays here when its owner and next action are recorded and no blocking condition below applies. |
| `blocked` | Required authorized work or a required gate now due cannot proceed because of a failed check, missing environment, or another concrete execution blocker, and no authorized independent work remains runnable. This takes precedence over a pending handoff. Preserve valid completed tasks and record the unblock condition. Return to `in_progress` once execution can resume. |
| `completed` | Every implementation task and required acceptance criterion, plus final integration and project gates, is verified with recorded evidence. A completed subset or all code being written is insufficient. |

A missing or unrecognized status is not approval. Reconcile it using explicit user approval and project rules. If later evidence invalidates completion, reopen only the affected tasks/criteria and dependents whose acceptance no longer holds, explain why, and leave `completed` using the appropriate state above.

## 4. Close the Run

- Review the resulting diff and acceptance against the selected scope and its affected contracts. Run project integration/regression gates required for these combined changes even for a task-scoped run. Reopen affected completion marks if these checks disprove them.
- Evaluate whole-spec success criteria and run final completion checks once all implementation tasks and their acceptance are verified and the checks' prerequisites hold. Until then, record checks that depend on unfinished tasks as pending, not failed; do not expand implementation scope to satisfy them. Isolated task passes do not establish whole-spec success.
- Reconcile affected code/document contracts with `fractal-sync` when applicable. Route defect root-cause records to `postmortem` when required by the project or spec. Respect orchestrator phase-confirmation gates: record a required later-stage handoff with its owner and next action; that owner must write back the outcome after the stage. Derive waiting or blocked status using Spec Status above.
- Derive document status from the whole spec, not just this run's selected tasks. Preserve the spec at its current path; completion does not authorize archiving, committing, pushing, deploying, or changing the approved contract.
- Reread the saved spec and compare task marks, acceptance marks, evidence, status, and `updated` for consistency. Report the spec path (or inline artifact), completed task IDs, remaining or blocked IDs, actual verification results, and next action when unfinished.

**Complete when:** implemented changes and the persisted progress record agree, all claimed completions have evidence, and the final status truthfully distinguishes a completed spec from a partial or blocked run.
