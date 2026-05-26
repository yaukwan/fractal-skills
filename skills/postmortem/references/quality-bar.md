# Quality Bar

A good postmortem is:
- specific
- causal
- reproducible
- useful for future prevention

## Minimum acceptable quality
It must answer:
1. what failed
2. why it failed
3. what fixed it
4. how the fix was verified
5. what reduces recurrence risk

## Weak postmortems
Avoid vague phrases like:
- fixed an issue
- optimized logic
- updated implementation
- improved stability

These are not enough unless backed by concrete explanation.

## Strong postmortems
Prefer statements like:
- a null branch was not handled when the API returned an empty array
- cache invalidation depended on stale local state after route transition
- the validation schema allowed invalid enum values during partial updates
