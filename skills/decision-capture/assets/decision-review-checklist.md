# Decision Review Checklist

Use this before creating or accepting a decision skill.

- Does this describe current system-level truth rather than local task reasoning?
- Would future contributors be expected to follow this as an authority?
- Is the topic cross-cutting or durable enough to outlive the current task?
- Does an existing decision skill already cover this topic?
- If yes, should that existing skill be updated instead of creating a new one?
- Could this content belong in `docs/engineering/` instead?
- Could this content stay in `docs/research/` or thread context instead?
- After this change, will exactly one current authority be obvious for this topic?
- Is the body an index (multi-domain) or a single file (single-topic), with `§N` continuous
  and every reference file listed exactly once in the index table?
- Does the skill stay self-contained, with `docs/**` used only as background pointers?
- Is combined or split decided by the co-load unit, not by topic similarity?
- If an older decision skill is retired, is its directory deleted with a tombstone
  instead of left in place with a marked description?
- Is the generated routing description a valid trigger (starts with `Load when...`)?
