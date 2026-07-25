# Decision Skill Sync Rules

This file defines the rules for generating and syncing `.agents/skills/decision-{slug}/SKILL.md`
from a decision document's content. It is read by `decision-capture` during the
Step 8 skill-sync workflow.

## Description Auto-Generation

The `description` field is a **routing trigger** — it tells an agent *when to load* the skill,
not *what the skill contains*. Follow `skill-design-guidelines` conventions:
start with `Load when...`, use agent-task language, include a `Do not load for...` boundary.

### Priority

1. If the decision has a `skill_description` field in its YAML frontmatter, use it directly (no generation).
2. Otherwise, auto-generate using the rules below.

### Algorithm

Given a decision document with sections `## Context`, `## Decision`, `## Boundaries`, `## Non-goals`:

```
description = "Load when {triggers}. Do not load for {exclusions}."
```

#### Triggers (from `## Boundaries`)

1. Parse module/component names from `## Boundaries` (e.g. `auth/`, `tokens/`, `OAuth providers`, `session lifecycle`).
2. Map each to an agent-task phrase:

   | Boundary word | Agent-task mapping |
   |---|---|
   | `auth`, `authentication`, `login` | `modifying authentication logic, login/signup flows` |
   | `token`, `JWT`, `refresh` | `token refresh handling, JWT configuration` |
   | `OAuth`, `provider` | `OAuth integration, provider configuration` |
   | `session`, `state` | `session lifecycle management` |
   | `api`, `route`, `endpoint` | `modifying API endpoints, route handlers` |
   | `db`, `database`, `storage` | `database schema changes, storage layer modifications` |
   | `config`, `settings` | `configuration changes, environment settings` |
   | `middleware`, `pipeline` | `middleware changes, request pipeline modifications` |
   | `cache`, `caching` | `caching strategy, cache invalidation` |
   | `queue`, `job`, `worker` | `job queue changes, background worker modifications` |
   | `payment`, `billing` | `payment/billing logic changes` |
   | `permission`, `role`, `acl` | `permission model, role-based access changes` |
   | `event`, `message`, `pubsub` | `event system, message handling` |
   | `migration`, `schema` | `schema migrations, data model changes` |
   | `logging`, `monitor` | `logging or monitoring infrastructure changes` |

3. If a boundary word is not in the table, keep it as-is: e.g. `modifying {word}`.
4. Join mapped phrases with commas. The last element gets `, or ` prefix.

#### Trigger keywords (from `## Decision` + `## Context`)

After the task phrases, append 2-3 exact tech keywords from the decision content
as supplementary triggers. These help with exact-match routing:

Example: if decision is about `pgbouncer` and `connection pooling`, append:
`, pgbouncer, connection pooling configuration`.

Keywords should be:
- Domain-specific (not generic like `system`, `module`, `function`)
- Directly tied to the decision topic
- Max 3 keywords

#### Exclusions (default, all decision skills)

```
documentation updates, general refactoring, or unrelated feature development
```

### Length Limit

Target ≤ 50 words. If auto-generation exceeds this, trim trigger phrases
(highest-impact boundaries first), then keywords.

### Examples

**Decision: Auth Flow**
```
Load when modifying authentication logic, login/signup flows, token refresh handling, OAuth integration, or session lifecycle management. Do not load for documentation updates, general refactoring, or unrelated feature development.
```

**Decision: PostgreSQL Connection Pooling**
```
Load when database connection handling, pool configuration, or connection lifecycle changes. Do not load for documentation updates, general refactoring, or unrelated feature development.
```

## Skill Body Generation

Use `assets/decision-skill-template.md` as the structural template, populated with
the decision document's content. The body contains the full decision — the skill
IS the source of truth.

## Lifecycle Sync Rules

| Action | Skill Operation |
|--------|----------------|
| CREATE | Write `.agents/skills/decision-{slug}/SKILL.md` from template. |
| UPDATE | Regenerate the full SKILL.md body. If `skill_description` exists in the decision's YAML frontmatter, preserve it; otherwise regenerate description. |
| SUPERSEDE (old) | Modify SKILL.md: prefix `description` with `[SUPERSEDED]`; set `metadata.status` to `superseded`; set `metadata.superseded_by` to the new skill name. |
| SUPERSEDE (new) | Same as CREATE. |
| MERGE (absorbed) | Same as SUPERSEDE for each absorbed skill. |
| MERGE (result) | Same as UPDATE. |
| REJECT | If a skill exists at `.agents/skills/decision-{slug}/SKILL.md`, prefix description with `[ORPHANED]` and set `metadata.status` to `orphaned`. |
| CURRENT | No operation. |

## Idempotency

- `.agents/skills/decision-{slug}/SKILL.md` is fully owned by `decision-capture` — each sync overwrites it.
- User modifications to SKILL.md will be lost on next UPDATE. The canonical edit path is through
  the source decision's `skill_description` field for the description override, or through the
  decision content itself.
- Running CREATE twice on the same slug: second run is a no-op (detect existing, switch to UPDATE).
