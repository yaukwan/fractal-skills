# Level 2 Protocol

Level 2 is the folder manifest layer. It describes what a folder owns and how its subdomains fit together.

## Required Sections

```md
## Scope
<current local ownership and boundary summary>

## Constraints
- <rule>

## Members
- `subdomain-or-group`: <responsibility>
```

`Scope` may use `Position` / `Owns` / `Excludes` subfields when that improves clarity, but they are not required schema fields.

## Optional Sections

```md
## Docs
- Design:
- Implementation:
- Interfaces:

## Exceptions
- <deliberate deviation and why>
```

## Update Policy

- `Scope`: manual-only
- `Constraints`: manual-only
- `Members`: replace-on-sync
- `Docs`: merge-on-sync
- `Exceptions`: append-only

## Hard Rules

- `Members` must summarize folder-level responsibilities, not act as a per-file inventory.
- Prefer subfolders, bounded contexts, capabilities, or ownership groups as `Members` entries.
- Keep this manifest focused on current ownership, not history.
- Do not add `Dependencies` unless the repository has a strong local convention that truly uses them.
- Do not add local `Review Triggers`; the fractal-context protocol already defines when Level 2 must be revisited.
