# Level 3 Protocol

Level 3 is the file contract layer. It exists so a source file remains understandable in isolation.

## Required Fields

- `INPUT`: Semantic dependencies, consumed contracts, upstream assumptions.
- `OUTPUT`: Produced values, side effects, guarantees, or exported behavior.
- `ROLE`: Architectural purpose.

## Optional Fields

- `INVARIANTS`: Important truths that must remain stable.
- `LOCAL_REVIEW_WHEN`: File-specific reasons this header would become outdated.

## Hard Rules

- Keep the header about current truth, not historical chronology.
- Do not include dated changelog entries.
- Do not repeat folder-level or root-level review triggers here.
- Use concise, grep-friendly phrasing.

## When To Update

Update the header when any of these change:
- semantic dependencies
- exported behavior or side effects
- architectural role
- non-obvious invariants

Do not update it just because the file changed internally without contract impact.
