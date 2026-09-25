# Task Group Structuring & Splitting Guidelines

## 1. Groups Organize Context; Tasks Define Execution

- Group by functional domain and code boundary, not project phases such as design, coding, and testing.
- A group collects related context; it is not automatically an independent or parallel execution unit.
- Make each task a bounded, observable outcome that is testable once its declared prerequisites hold. A task may cross entry point, service, storage, and tests to deliver one behavior.
- Separate independently accepted behaviors even when they share a module or file. File overlap is a dependency or write-conflict signal, not a mandatory merge rule.
- Name groups by functional responsibility and tasks by delivered outcome. Follow the target project's naming conventions for files and symbols.

## 2. Size and Batching

- Split when a task combines independent outcomes or requires several unresolved design choices; do not split merely to reach a file count, step count, or document length.
- Batch the same mechanical change across files only when the contract, prerequisites, and verification are shared. List every affected file and ensure the check covers all of them.
- Keep distinct logic separate when it needs different acceptance or failure handling. Keep the related edits needed to make one outcome work together.
- Avoid micro-tasks such as "add an import" and broad tasks such as "implement the backend" without a bounded result.

## 3. Dependencies and Shared Changes

- Give tasks stable IDs and explicit `Depends on` entries; use `none` for an actual root task.
- Establish shared contracts before dependent implementations. Identify both the producer and consumers of an interface change.
- Order tasks so prerequisites are delivered before use. Check for missing IDs and cycles.
- Sequence tasks that modify the same file unless their non-overlapping write scopes are established. Record this sequencing even if their behaviors are independent.
- Mark tasks parallel only when prerequisites, shared contracts, and write scopes permit it. Disjoint file lists alone are not proof of independence.

## 4. Acceptance and Verification

- State acceptance as observable behavior with concrete inputs, preconditions, outputs, or side effects. Cover the success path and the critical failure/boundary cases introduced by the change.
- A behavior task owns the test additions and documentation needed to accept that behavior. Its acceptance may use its own changes and completed prerequisites, never checks delivered only by a later task; do not split one outcome into "implement now, add its tests later."
- Dedicated test or documentation tasks/groups are valid when those are the user's requested deliverables, rather than deferred acceptance for an earlier implementation task.
- Associate each acceptance criterion with a test/check or reproducible manual procedure. Include the working directory, command or steps, and expected result; distinguish existing checks from planned additions.
- Validate through the affected user or module entry point, not only a newly introduced helper. For a pure function, its public call can be the entry point; for documentation, use its actual consumer or a reproducible review/check.
- Reuse the project's verification tools and derive additional checks from change risk. Expand coverage for changed permissions, persistent data, public interfaces, and cross-module behavior; do not invent project-wide tool or coverage requirements.
- Treat commands and expected results as a validation plan, not execution evidence. If an environment prerequisite is unavailable, state it and the consequence for verification rather than claiming a pass.

## 5. Completion Check

Before handing off the task list, verify:

- Every requirement and critical edge case has an owning task and a concrete check.
- Every task identifies its prerequisites, existing/planned change anchors, deliverable, and acceptance.
- Dependency order is executable and file conflicts are explicit.
- Tests exercise the delivered behavior at the relevant entry point.
- No task introduces unrelated refactoring, dependencies, or architecture under the guise of a quality gate.
