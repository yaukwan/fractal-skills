# Naming and Placement

## Default Naming
Use a concise, searchable file name:

`YYYYMMDD-bug-description-en.md`

Examples:
- `20260510-login-redirect-loop.md`
- `20260510-empty-cart-price-crash.md`

## Default Placement
If no repository-specific rule exists, place postmortems under:

`docs/postmortem/`

## Repository Override
If the repository uses `fractal-sync`, read `../fractal-sync/references/lifecycle.md` and
`../fractal-sync/references/frontmatter.md` in the sibling `fractal-sync` skill and follow
them for:
- exact directory placement
- frontmatter requirements
- lifecycle transitions

## Retrieval Link

Link the postmortem from each affected module's existing L2 manifest. Keep the saved
postmortem regardless of the index outcome.

1. Identify each affected module's `AGENTS.md`. It is an L2 manifest only when it is not
   the root file and has a `Scope` section. Otherwise skip its index update; do not create
   or restructure a manifest solely to link a postmortem.
2. Skip a manifest in a path that a project instruction excludes from fractal writes.
3. Add the `Docs` link, creating the `Docs` section when it is absent; leave an existing
   correct link unchanged. Preserve unrelated manifest content and verify the link resolves.

Complete when every affected module has an index outcome: changed, already linked, or
skipped with its reason.
