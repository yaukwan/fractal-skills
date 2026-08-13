# Level 1 Protocol

Level 1 is the root context layer. It exists to orient an agent quickly at repository entry.

## Required Sections

```md
## Project
- Phase:
- Last Reviewed:
- Primary Domains:

## Traversal
1. Start here: pick the owning subtree from Local Maps.
2. Read that subtree's AGENTS.md before opening files.
3. Check .agents/skills/decision-* freshness before changing architecture.

## Topology
- `path`: <what lives here>

## Local Maps
- `path/to/AGENTS.md`: <what this subtree owns>

## Global Constraints
- <rule>
```

## Optional Sections

```md
## Active Context
- `path`: <why it matters now>
```

## Section Authority

- `Project`: mostly intent. Update when project phase or primary domains are deliberately redefined.
- `Traversal`: protocol fact. Keep aligned with this Level 1 protocol.
- `Topology`: fact-derived. Refresh when repo structure or doc lanes change.
- `Local Maps`: fact-derived. Refresh affected entries when Level 2 `AGENTS.md` files are created, moved, or removed; do not require a whole-repo generator.
- `Global Constraints`: intent. Change only when repo-wide rules are confirmed.
- `Active Context`: task-local intent. Keep only current high-signal links.

## Hard Rules

- Keep root context short and navigational.
- Put global synchronization logic in the fractal-sync protocol instead of scattering local trigger sections.
- Do not turn the root file into an implementation dump.
- Keep `Local Maps` synchronized opportunistically when filling an affected Level 2 manifest; use audits to report drift rather than forcing full automatic regeneration.
