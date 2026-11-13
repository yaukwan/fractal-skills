---
name: "impl-task-spec"
description: "Implement or resume a task spec, including selected tasks. Write verified progress and evidence back to the spec. Excludes planning, spec revision, report-only audits, and coding without a spec."
license: "Apache-2.0"
disable-model-invocation: true
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Implement Task Spec

Execute approved tasks with the project's implementation and verification practices.
The original spec is the progress authority. Host task tools can mirror its IDs but cannot replace spec updates.

## 1. Check Scope and Evidence

1. Read the selected spec in full. Read applicable instructions, current decisions, and referenced contracts. If the target is missing or ambiguous, ask for it.
2. Record execution approval and task scope under `Execution Evidence`. An explicit implementation request can approve the identified content. Document approval alone does not request execution. Approval of selected tasks does not approve other tasks. If a prerequisite is outside scope, report it.
3. Check the current baseline, working-tree changes, implementation anchors, verification prerequisites, task IDs, and dependencies. Missing IDs, cycles, contract conflicts, and unresolved contract questions block affected tasks.
4. Compare existing evidence with the current implementation. Reverify results with missing evidence or relevant source changes. Reuse valid results after unrelated changes. Reset unsupported task and acceptance marks to `[ ]`, including affected dependents. Record the reason.

**Ready when:** each selected task is authorized and classified as verified, runnable, or blocked with a reason.
If no work remains, reconcile progress and status.

## 2. Execute Each Task

Execute tasks sequentially. Delegate only when dependencies, shared contracts, and write scopes permit it.
One coordinator updates the spec and accepts delegated evidence.

1. Select a task with verified prerequisites. Set status to `in_progress`. Record the active task ID.
2. Implement its acceptance criteria with the required tests and documentation. Keep acceptance work in the same task.
3. Run its specified verification and applicable project checks. Record observed results through Progress Writeback below.
4. After all acceptance criteria pass, update the task from `[ ]` to `[x]`.
5. Make one atomic Git commit with the task changes and progress update. Follow Atomic Task Commits below.

**Complete when:** verification, progress writeback, and the commit checkpoint succeed. Only then start the next task.

### Progress Writeback

- Mark verified acceptance items before marking their task. Other items stay `[ ]`. Leave human-review checkboxes to the user.
- Preserve IDs, wording, order, and checkbox formatting, including `- **[ ] 1.1: ...**`. Normalize bare `[]` only in the item being updated.
- Create `Execution Evidence` if absent. Record the run's baseline and relevant initial working-tree changes once. Use a project version or source snapshot without Git.
- For each task, record: task ID, run reference, result, remaining work, command and working directory or reproducible procedure, and artifacts.
- Identify the verified source revision or snapshot. Reference a patch for changes outside that version. Retain evidence for retries and reopened tasks. Record approved deviations and their approval source.
- When progress, evidence, or status changes, set `updated` to the current `YYYY-MM-DD`. Preserve other metadata.
- Update file specs in place. Reread changed sections. If saving fails, stop and report the blocker.
- For explicit inline specs, return updated status, checkboxes, and evidence at each checkpoint. Do not create a file.

### Atomic Task Commits

- Review the task diff and existing Git index. Stage only task changes and file-spec progress. Preserve unrelated staged and working-tree changes. If isolation is unsafe, stop and report the blocker.
- Verify the commit contains the intended changes. Verify unrelated index entries remain intact. If hooks change verified source, reverify affected acceptance. Report the commit ID. Git history links the commit to its progress entry.
- If Git is unavailable or the commit fails, preserve valid acceptance marks. Record a delivery blocker. Resolve it before continuing. Inspect repository state before retrying. Do not bypass hooks or expand commit scope.

## 3. Handle Blockers and Resume

- Fix implementation failures within the approved contract. Failed or unavailable checks leave affected items unchecked.
- If anchors are missing or a change exceeds the approved contract, stop affected tasks and dependents. This includes changes to behavior, interfaces, persistence, permissions, scope, or acceptance. Record evidence and the required decision. Use clarification, `decision-capture`, or `to-task-specs` to resolve it. Keep approved requirements unchanged until the user approves a revision.
- Continue independent authorized tasks only when the blocker cannot affect their contracts or checks. Commit blockers stop progression as specified above.
- Before a pause or handoff, save the active task, partial changes, last result, and next action when possible.
- On resume, repeat section 1. Before retrying risky operations, inspect previous effects and recovery constraints.

**Complete when:** each unresolved item has a task ID, evidence, an unblock condition, and a next action.

### Spec Status

Use this table for `to-task-specs` documents. For other lifecycles, use the project's mapping or clarify it before changing status.
Derive status from the whole spec. A check is due when its implementation and phase prerequisites hold.

| Status | Rule |
| --- | --- |
| `draft` / `pending_review` | Record approval before advancing to `approved`. Return to `pending_review` when the approved contract needs revision and review. |
| `approved` | Selected content has approval. Execution has not started. |
| `in_progress` | Execution has started. Includes pauses, completed subsets, pending authorization, and checks not yet due. A pending phase handoff needs an owner and next action. |
| `blocked` | Required authorized work or a due check cannot proceed. No independent authorized work remains runnable. This overrides a pending handoff. Resume with `in_progress` when the blocker clears. |
| `completed` | Every task, acceptance criterion, final integration check, and project check has passing evidence. Required commits and handoffs are complete. |

Missing or unknown status does not grant approval.
If evidence invalidates completion, reset affected marks as in section 1. Select the resulting status from this table.

## 4. Close the Run

1. Review the combined diff against scope and affected contracts. Run required project integration and regression checks, including for selected-task runs.
2. When all tasks pass and final checks are due, verify whole-spec success. Record checks awaiting unfinished tasks as pending. Do not expand scope to satisfy them.
3. Use `fractal-sync` for affected code/document contracts. Use `postmortem` when the project or spec requires it. For phase-confirmation gates, record the handoff owner and next action. That owner must record the outcome.
4. Apply Spec Status. Keep the spec at its current path. Completion does not authorize archiving, pushing, deploying, or contract changes.
5. Compare saved checkboxes, evidence, status, and `updated` with the implementation. Report the spec location, completed and remaining task IDs, verification results, and next action.

**Complete when:** saved progress matches verified work and the status accounts for remaining tasks and blockers.
