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
If the repository uses `fractal-sync`, follow its rules for:
- exact directory placement
- frontmatter requirements
- indexing
- lifecycle transitions

## Retrieval Link
When the affected directory has a Level 2 `AGENTS.md`, add a `Docs` link to the written postmortem. This makes defect knowledge discoverable during traversal; it does not move the postmortem source of truth out of `docs/postmortem/`.
