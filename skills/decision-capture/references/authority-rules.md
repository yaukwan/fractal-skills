# Decision Admission Signals

Use these signals as helper rules while deciding whether the current task deserves capture in `docs/decisions/`.

`docs/decisions/` is reserved for **current system-level design truth**.

## Positive signals

A topic is a good candidate when most of these are true:

- it affects multiple modules, teams, or future workstreams
- it defines a durable boundary or principle
- it constrains later implementation choices
- it would confuse future contributors if undocumented
- it is expected to remain true beyond the current task or PR

## Negative signals

A topic is not a good candidate when any of these dominate:

- it only matters to one feature
- it is mainly a local implementation tradeoff
- it is useful only for debugging or maintenance
- it is still just exploration input
- it can be fully understood from code or nearby implementation notes
- it is likely to expire quickly

## Smell tests

### Smell: "This feels important"
Importance alone is not enough.  
Ask whether it is important as **system truth**, not merely important to the current task.

### Smell: "We discussed multiple options"
Option comparison alone does not justify a decision doc.  
Only the adopted, durable truth belongs here.

### Smell: "This was a hard problem"
Difficulty alone does not make it a decision.  
Hard implementation work often belongs in `engineering/`, not `decisions/`.

## Promotion rule

Promote content into `docs/decisions/` only when it has crossed from:
- situational reasoning
into:
- durable authority
