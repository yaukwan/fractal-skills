# Freshness and Supersession

Use these freshness rules as helper signals while keeping captured decisions current.

A decision document is useful only if readers can trust it as current.

## Freshness standard

A decision doc should match the system as it exists now, not as it once existed.

If reality changed, the doc must change too.

## Preferred actions

### Update in place
Use when the underlying design truth is still the same, but details drifted.

### Supersede
Use when the old decision is no longer the active truth and a new one now governs the topic.

### Merge
Use when multiple decision docs partially overlap and create authority confusion.

### Archive
Use when the topic no longer defines any current part of the system.

## Conflict rule

One topic should not have multiple docs that all read like active authority.

If overlap exists, resolve it explicitly:
- pick a canonical current doc
- mark the others as superseded, merged, or archived
- remove ambiguous index references

## Freshness warning signs

- contributors ignore the docs because they no longer trust them
- two docs describe the same boundary differently
- code and docs have drifted for multiple iterations
- local implementation notes are doing the real authority work
- a new contributor cannot tell which doc is current
