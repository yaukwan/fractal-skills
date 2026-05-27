---
name: "decision-capture"
description: "Load when the current task may need decision-doc handling, especially to check whether existing decisions still match current design truth or to update, supersede, or merge them. Do not load for repo-wide lane placement, Level 1/2/3 schema semantics, or postmortem writing"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Decision Capture

Handle the full decision lifecycle for the current task: inspect existing decision coverage, choose the right action, and when needed leave `docs/decisions/` in a current state.

This skill is for **decision handling**, not a generic documentation policy explainer.

## Purpose

- determine whether the current task is already covered by existing decision docs
- choose the correct decision action for the task
- complete the required decision doc changes when the truth is not yet current
- leave a clear record of the current design truth and any drift found

## Default workflow

1. Identify the affected code and doc scope.
2. Find overlapping decision docs by topic, directory, module, or contract boundary.
3. Ask whether the task touches a **cross-cutting, long-lived, current design truth**.
4. Choose the action from the matrix.
5. If the action mutates docs, complete the doc change now and make the resulting authority state unambiguous.
6. Return the resulting current truth.

## Completion criteria

- `CURRENT` — Existing decision paths were checked and still represent the task's current truth.
- `CREATE | UPDATE | SUPERSEDE | MERGE` — The required decision doc changes are finished and the resulting authority state is unambiguous.
- `REJECT` — It is clear this topic should not live in `docs/decisions/`, and the correct alternative lane is named.

If the resulting truth is not yet current, this skill is **not done**.

## Scope Gate

**This skill applies only when `docs/decisions/fractal-scope.md` exists.**

If not found, this is not a fractal-repo — do not apply decision capture rules.

## What this skill owns

This skill owns the rules for:

- checking whether existing decisions already cover the task
- selecting and executing the decision action for the task
- keeping decision docs aligned with current system truth
- resolving stale, overlapping, or superseded decision docs
- preventing local tradeoffs from being promoted into global authority
- proactively flagging touched decisions for review when code changes overlap their scope

## What this skill does not own

Do not use this skill for:

- choosing which lane a doc belongs to across `decisions / engineering / research / postmortem / archive / specs`
- Level 1/2/3 schema semantics or file header structure
- writing implementation notes, benchmarks, migrations, or workaround records
- generating bug-fix postmortems
- task spec generation

For lane placement, use `fractal-repo`.
For schema semantics, use `fractal-context`.
For failure-learning workflow, use `postmortem`.
For task specs, use `to-task-specs`.

## Output contract

Return:

- the primary action: `CURRENT | CREATE | UPDATE | SUPERSEDE | MERGE | REJECT`
- the relevant decision path(s)
- one short statement of the resulting current truth
- a short rationale for the action

If doc mutation was required, include the written or updated path(s).

## Action matrix

Return exactly one primary action:

- `CURRENT` — Existing decision remains accurate and sufficient.
- `CREATE` — No existing decision covers a durable system truth that now needs authority.
- `UPDATE` — Existing decision is still fundamentally right but needs refresh.
- `SUPERSEDE` — Existing decision’s truth materially changed and should be replaced.
- `MERGE` — Multiple current-looking decisions overlap and should become one clearer authority doc.
- `REJECT` — The content is not durable system design truth and should not enter `docs/decisions/`.

## Admission rule

Use this rule as a helper while deciding whether the task belongs in `docs/decisions/`:

> If a new contributor reads this, will they better understand a stable system-level design truth they are expected to follow?

If not, prefer `CURRENT` or `REJECT` unless there is another clear reason the topic must become authority.

### A strong decision candidate usually satisfies all three

1. **Hard to reverse** — changing your mind later would be meaningfully costly
2. **Surprising without context** — future readers would reasonably ask “why is it this way?”
3. **Result of a real trade-off** — there were genuine alternatives and one was chosen for specific reasons

### Typical good fits

- cross-module design constraints
- system boundaries
- durable architecture choices
- long-lived behavior contracts
- authority splits across documentation lanes
- rules that future implementations are expected to inherit

### Typical non-fits

- a tradeoff inside one feature
- a naming choice inside one PR
- an implementation workaround
- temporary exploration output
- a local decision with no system-wide implications

## Freshness trigger

When code changes touch an area referenced by an existing decision, flag that decision for review:

1. Identify decisions whose scope overlaps the changed path or contract.
2. Ask: "Does this task change the design truth documented there?"
3. If no, return `CURRENT` and note the verification.
4. If yes, perform the correct mutating action.

This closes the "stale authority driving wrong implementation" failure mode.

## Freshness rule

A decision doc must represent the **current effective design state**.

Stale authority is worse than missing docs.

When a decision no longer matches reality, prefer one of these actions:

- `UPDATE` when the design is still fundamentally the same
- `SUPERSEDE` when the system truth materially changed
- `MERGE` when multiple docs drifted into the same topic boundary

Do not leave multiple documents silently competing to define the same truth.

## Minimal content invariants

This skill does **not** require a single rigid template, but every created or materially updated decision must make these points clear:

- what the current design truth is
- why it deserves long-lived authority
- which boundaries or constraints it sets for later work
- how it relates to any prior decision docs

## Supersession rule

When the same design topic already exists:

- update the existing doc if the design is still fundamentally the same
- supersede it if the system truth materially changed
- merge if multiple docs now overlap
- reject parallel current-looking docs that split the same authority surface

Avoid append-only decision growth.
`docs/decisions/` is not an ADR graveyard.

## Gotchas

- “Important” does not automatically mean “decision”.
- “We chose A over B” is not enough by itself; the result must become durable system truth.
- If the content mainly helps future debugging or implementation, it likely belongs in `engineering/`.
- If readers could mistake an outdated doc for active authority, fix that before calling the task's decision truth confirmed.

## Escalation reads

Read these only when needed:

- `references/authority-rules.md` for detailed admission and rejection patterns
- `references/freshness-and-supersession.md` for current-state maintenance rules
- `references/boundary-with-adjacent-skills.md` when routing is ambiguous
- `assets/decision-review-checklist.md` for a fast review pass
- `assets/decision-frontmatter-example.md` for a minimal doc shape example
