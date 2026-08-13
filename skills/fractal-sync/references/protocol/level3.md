# Level 3 Protocol

Apply this schema only after the project-local scope checker matches the target file.

Level 3 is the file contract layer. It exists so a source file remains understandable in isolation.

Write the header using the target language's standard documentation-comment syntax, such as a documentation comment or module docstring. Keep the canonical field names unchanged across languages.

## Required Fields

- `INPUT`: Semantic dependencies, consumed contracts, upstream assumptions.
- `OUTPUT`: Produced values, side effects, guarantees, or exported behavior.
- `ROLE`: Architectural purpose.

## Optional Fields

- `INVARIANTS`: Important truths that must remain stable.
- `LOCAL_REVIEW_WHEN`: File-specific reasons this header would become outdated.

## When To Enable

Enable Level 3 only for files whose contract is not obvious from code alone:

- FFI or serialization boundaries
- state machines
- concurrency invariants
- public API surfaces
- cross-module protocols

Do not blanket-enable L3 for every source file. L3 is an embedded source-file header, not a separate documentation file.

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
