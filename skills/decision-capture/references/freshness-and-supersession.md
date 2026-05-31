# Freshness and Supersession

Use these freshness rules as helper signals while keeping captured decisions current.

A decision skill is useful only if agents can trust it as current.

## Freshness standard

A decision skill should match the system as it exists now, not as it once existed.

If reality changed, the skill must change too.

## Preferred actions

### Update in place

Use when the underlying design truth is still the same, but details drifted.
Overwrite `.agents/skills/decision-{slug}/SKILL.md`. Regenerate the routing description
unless the decision frontmatter has a manually set `skill_description`.

### Supersede

Use when the old decision skill is no longer the active truth and a new one now
governs the topic. Mark the old skill: `[SUPERSEDED]` prefix on description,
`status: superseded` in metadata. Create the new decision skill normally.

### Merge

Use when multiple decision skills partially overlap and create authority confusion.
Mark absorbed skills as superseded. Update the merged result skill.

### Archive

Use when the topic no longer defines any current part of the system.
Mark the skill: `[SUPERSEDED]` prefix on description, `status: archived` in metadata.

## Conflict rule

One topic should not have multiple decision skills that all read like active authority.

If overlap exists, resolve it explicitly:

- pick a canonical current skill
- mark the others as superseded, merged, or archived
- remove ambiguous index references

## Skill sync freshness

After any mutating action (CREATE, UPDATE, SUPERSEDE, MERGE), the decision skill's
`description`, `metadata`, and body must all match the current truth. See
`references/skill-sync-rules.md` for the detailed sync workflow.

Specifically:

- `UPDATE`: regenerate body content and description (unless `skill_description` override exists)
- `SUPERSEDE`: old skill description gets `[SUPERSEDED]` prefix; new skill created fresh
- `MERGE`: absorbed skills marked `[SUPERSEDED]`; result skill updated
- `REJECT`: if orphan skill exists, prefix with `[ORPHANED]`

## Freshness warning signs

- agents ignore the decision skills because they no longer trust them
- two skills describe the same boundary differently
- code and skills have drifted for multiple iterations
- local implementation notes are doing the real authority work
- a new contributor cannot tell which decision skill is current
