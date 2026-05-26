# Boundary With Adjacent Skills

## Use `decision-capture` when

- the current task may need decision coverage checked against existing docs
- an existing decision may no longer reflect current truth
- decision docs need to be created, updated, superseded, or merged to leave one current truth
- local tradeoffs are at risk of being promoted into `docs/decisions/`

## Use `fractal-repo` when

- choosing document lane placement
- deciding naming, indexing, lifecycle location, or archive placement
- updating repo topology or AGENTS.md entry structure

## Use `fractal-context` when

- editing Level 1/2/3 semantics
- defining file headers, IO/POS contracts, or folder manifest structure
- synchronizing context protocol structure

## Use `postmortem` when

- the work is about bug-fix learning, regression analysis, root cause, or prevention
- the core question is failure analysis rather than design authority

## Common confusion cases

### "We chose this implementation because X"
Usually `engineering/`, unless it became a long-lived cross-cutting system rule.

### "We compared three designs and picked one"
Usually `research` plus maybe `decisions/` for the final durable truth.

### "This bug showed our boundary was wrong"
Use `postmortem` for the failure learning, and `decision-capture` only if the bug led to a new system-level design truth that now governs the system.
