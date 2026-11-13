# Retirement and Reference Changes

Apply these rules when an authorized operation renames or retires a decision skill, or
revives an archived slug. Action selection and authorization remain in `SKILL.md`.

## Reference Rewrite

Before a rename, retirement, or revival, collect all affected references. Preflight the full rewrite
set before mutating authority: if a required edit cannot be made, because a project
instruction excludes its path from fractal writes or the file is not writable, leave the
affected decision skills in place and report the blocker. Do not delete an authority first
and defer its blocked reference cleanup.

Preflight the citation mapping against the numbering rules in `references/skill-sync-rules.md`.
If merged sources use the same `§N` for different meanings, or the mapping cannot preserve
existing citation meanings and numbering, leave the affected skills unchanged and report
the conflict for a numbering decision. Do not invent renumbering or relax Sync proof.

When a decision skill is renamed, merged, or removed, rewrite every reference to the old
slug in the same operation: root and per-layer `AGENTS.md`, `docs/**`, and code comments.
When a successor exists, `§N` citations keep their number and resolve through its index
table; `ADR 000N` aliases resolve to that owner. Update local `AGENTS.md` alias definitions
where ownership changed. Relative links inside skills resolve against the skill directory
(`references/` is one level deeper than `SKILL.md`).

Reference rewrite is part of the retirement or rename, not follow-up work. When there is
no successor, remove active-authority pointers and direct any retained historical citations
to the tombstone. A rename or removal that leaves dangling citations has not completed.

## Retirement Mechanics

For each retirement authorized by the Action matrix, preserve the retired content at
`docs/archive/decisions/{slug}.md` and remove `.agents/skills/decision-{slug}/` from discovery.
Preserve the body and any authoritative domain references in the tombstone before deleting
the skill directory. Its header is:

```md
> Archived on {date}. Active authority: {successor skill and section, or none}.
```

List absorbed slugs in the survivor's `metadata.supersedes` when merging.

The description prefix `[SUPERSEDED]` / `[ORPHANED]` is not used: any description that
reaches the routing list is a live authority claim. Removal is the only unambiguous
retirement signal.

`metadata.supersedes` is the only lifecycle metadata. A retired skill carries no metadata,
because it no longer exists.

## Revival

A slug revived by a later CREATE updates the existing tombstone's `Active authority` line to
point at the revived skill instead of leaving it at `none`.

## Completion checks

- For retirement, content is preserved in a tombstone, the retired directory is absent, and its
  active-authority pointer resolves to the successor or explicitly states `none`.
- For rename or retirement, no stale reference to the old slug remains outside `metadata.supersedes`
  and `docs/archive/**`; explicit historical links to its tombstone are allowed. Verify
  with `rg --hidden --glob '!.git' --glob '!node_modules'`.
- For revival, the existing tombstone points at the revived skill and the pointer resolves.
