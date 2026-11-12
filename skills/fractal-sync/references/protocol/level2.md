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
- `path/to/doc.md`: <when or why to read it>

## Skills
- `.agents/skills/example/SKILL.md`: <when work in this module should load it>

## Language
**Term**: <one or two sentence definition>
_Avoid_: <synonym, ambiguous phrase>

## Exceptions
- <deliberate deviation and why>
```

## Section Authority

Every skill that writes an L2 manifest applies this policy.

- `Scope`: intent. Preserve it; replace it only with confirmed intent.
- `Constraints`: intent. Preserve existing rules; add a rule only with confirmed intent, evidence from a public contract, configuration, or tests, or a module-wide L3 header statement; remove a rule that a confirmed task outcome contradicts; report any other contradiction instead of deleting a rule.
- `Members`: fact-derived. Replace from the current module structure at responsibility-group granularity.
- `Docs`: fact-derived. Merge relevant links and keep the shape of existing entries; remove a path proven missing or out of scope.
- `Skills`: fact-derived. Replace from current project-local relevance.
- `Language`: intent. Add only vocabulary with confirmed intent or the authority of an existing project document.
- `Exceptions`: intent. Add a confirmed deviation; remove one only when explicit evidence says it ended.

Confirmed intent is a user statement, a confirmed task outcome that states the ownership, rule, or term, or a current decision skill. Implementation details alone are not intent.

A confirmed task outcome contradicts a rule when the outcome itself changes or ends that rule. Code that breaks a rule while the outcome is silent on it does not contradict the rule; report it.

A module-wide L3 header statement states a rule that binds other members of the module or the module boundary that `Scope` describes, not only the file that holds the header. A statement about that file's own implementation, such as a constant, an algorithm, or an internal state, stays at Level 3.

## Hard Rules

- `Members` must summarize folder-level responsibilities, not act as a per-file inventory.
- Prefer subfolders, bounded contexts, capabilities, or ownership groups as `Members` entries.
- `Skills` lists only project-local skills relevant to this bounded context, with a concrete trigger for each pointer.
- Keep this manifest focused on current ownership, not history or timestamps.
- Use `Language` for domain vocabulary owned by this bounded context. It is the fractal-native glossary source; do not create or synchronize `CONTEXT.md` for fractal-managed language.
- Do not add `Dependencies` unless the repository has a strong local convention that truly uses them.
- Do not add local `Review Triggers`; the fractal-sync workflow already defines when Level 2 must be revisited.
- Treat domain language as intent, not code-derived fact. Code exploration may reveal candidate terms, but resolved vocabulary requires user or existing-doc authority.
