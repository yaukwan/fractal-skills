# Freshness and Supersession

Use these freshness rules as helper signals while keeping captured decisions current.

A decision skill is useful only if agents can trust it as current.

## Freshness standard

A decision skill should match the system as it exists now, not as it once existed.

If reality changed, the skill must change too.

## Preferred actions

The operation for each action is defined once in `references/skill-sync-rules.md`
under Lifecycle Sync Rules. This file only explains when to pick one.

### Update in place

Use when the underlying design truth is still the same, but details drifted.
Overwrite the skill body. Regenerate the routing description unless the decision
frontmatter has a manually set `skill_description`.

### Supersede

Use when the old decision skill is no longer the active truth and a new one now
governs the topic. Delete `.agents/skills/decision-{old}/`, write the tombstone at
`docs/archive/decisions/{old}.md` naming the new authority, then create the new
decision skill normally.

Do not keep the retired skill on disk with a marked description. A retired skill that still
sits in `.agents/skills/` keeps competing with the new authority in the routing list, which
is the ambiguity supersession is supposed to end.

### Merge

Use when multiple decision skills are one co-load unit and create authority confusion.
Delete each absorbed skill with the same tombstone as supersession, list the absorbed slugs
in the survivor's `metadata.supersedes`, and update the survivor.

### Archive

Use when the topic no longer defines any current part of the system. Delete the directory
and write the same tombstone with `Active authority: none`.

## Conflict rule

One topic should not have multiple decision skills that all read like active authority.

If overlap exists, resolve it explicitly:

- pick a canonical current skill
- retire the others by deleting them and leaving tombstones
- remove ambiguous index references

## Skill sync freshness

After any mutating action (CREATE, UPDATE, SUPERSEDE, MERGE, ARCHIVE, REJECT), the resulting
skill set must match the current truth. See `references/skill-sync-rules.md` for the detailed
sync workflow.

Specifically:

- `UPDATE`: regenerate the body and the description (unless a `skill_description` override exists)
- `SUPERSEDE`: the old directory is gone and tombstoned; the new skill is created fresh
- `MERGE`: absorbed directories are gone and tombstoned; the survivor carries `metadata.supersedes`
- `ARCHIVE` / `REJECT`: the directory is gone and tombstoned
- every reference to a retired slug is rewritten in the same operation

## Freshness warning signs

- agents ignore the decision skills because they no longer trust them
- two skills describe the same boundary differently
- code and skills have drifted for multiple iterations
- local implementation notes are doing the real authority work
- a new contributor cannot tell which decision skill is current
- a tombstone points at an authority that no longer exists
