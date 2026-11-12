# Naming and Placement

These rules and the frontmatter in `templates/postmortem-template.md` are the standard for
every new postmortem. Apply them even when older postmortems in the repository use another
name pattern or frontmatter, and leave those older files unchanged.

## Default Naming
Use a concise, searchable file name:

`YYYYMMDD-bug-description.md`

Examples:
- `20260510-login-redirect-loop.md`
- `20260510-empty-cart-price-crash.md`

## Default Placement
Unless a project instruction names another directory, place postmortems under:

`docs/postmortem/`

## Retrieval Link

Link the postmortem from each affected module's existing L2 manifest. Keep the saved
postmortem regardless of the index outcome.

1. Identify each affected module's `AGENTS.md`. It is an L2 manifest only when it is not
   the root file and has a `Scope` section. Otherwise skip its index update; do not create
   or restructure a manifest solely to link a postmortem.
2. Skip a manifest in a path that a project instruction excludes from fractal writes.
3. Add the `Docs` link, creating the `Docs` section when it is absent; leave an existing
   correct link unchanged. Match the shape of the section's existing entries; in a new
   section write ``- `<path from the project root>`: <when to read it>``. Preserve unrelated
   manifest content and verify the link resolves.

Complete when every affected module has an index outcome: changed, already linked, or
skipped with its reason.
