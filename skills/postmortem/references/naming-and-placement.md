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

Use `fractal-sync` for L2 indexing under the following gate; an existing manifest alone
is not write permission. Keep the saved postmortem regardless of the index outcome.

1. Identify each affected module's existing `AGENTS.md`. If absent, skip its index update;
   do not create a manifest solely to link a postmortem.
2. Confirm the project-local config and checker exist, then run the checker for that
   manifest's owning module directory:

   ```bash
   node <project-root>/.agents/skills/fractal-scope/scripts/check-scope.js \
     --config <project-root>/.agents/skills/fractal-scope/config.yaml \
     --root <project-root> --path <module-directory> --json
   ```

3. Add the `Docs` link only when `l2_folder_manifest.status` is `matched`; leave an existing
   correct link unchanged. Preserve unrelated manifest content and verify the link resolves.
4. For `disabled`, `excluded`, or `no-match`, skip the manifest edit and report the result.
   Missing config, missing checker, or checker errors block only the index update: leave
   the manifest untouched, report the prerequisite, and route runtime repair to
   `fractal-setup`. Never infer a match or change scope configuration to enable the write.

Complete when every candidate has an index outcome and a scope result or missing/error
prerequisite. Outside a fractal-managed project, the default postmortem path still applies;
this skill grants no ungated `AGENTS.md` writes.
