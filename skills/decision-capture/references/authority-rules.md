# Decision Admission Signals

Use these signals as helper rules while deciding whether the current task deserves
a decision skill at `.agents/skills/decision-{slug}/SKILL.md`.

Decision skills are reserved for **current system-level design truth**.

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

## Merge and Separation Criteria

Merge when one change would normally require loading both skills. Keep separate when:
the merged index would exceed roughly 250 lines of decision content; one of them is
reached by a domain the others never touch; or they have no shared invariant.
Merging is not the goal — one authority per co-load unit is.
