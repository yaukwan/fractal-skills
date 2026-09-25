# Freshness and Supersession

Use these freshness rules as helper signals while keeping captured decisions current.

A decision skill is useful only if agents can trust it as current.

## Freshness standard

A decision skill should match the system as it exists now, not as it once existed.

If reality changed, the skill must change too.

## Action selection

Use the Action matrix in `SKILL.md` as the single authority for action selection, effects,
and completion. Check whether the core truth changed, whether a successor exists, and
whether overlapping skills form one co-load unit before selecting the action.

A rejected proposal does not authorize deleting an existing skill. If existing content
itself must retire, select a retirement action and obtain its required authorization.

## Conflict rule

One topic should not have multiple decision skills that all read like active authority.

If overlap exists, resolve it explicitly:

- pick a canonical current skill
- retire the others by deleting them and leaving tombstones
- remove ambiguous index references

Before an authorized mutation, read `references/skill-sync-rules.md` for retirement
mechanics, reference rewriting, and Sync proof. A lifecycle marker on a still-discoverable
skill does not remove its competing authority.

## Freshness warning signs

- agents ignore the decision skills because they no longer trust them
- two skills describe the same boundary differently
- code and skills have drifted for multiple iterations
- local implementation notes are doing the real authority work
- a new contributor cannot tell which decision skill is current
- a tombstone points at an authority that no longer exists
