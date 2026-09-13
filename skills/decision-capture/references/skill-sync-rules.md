# Decision Skill Sync Rules

This file defines the rules for generating and syncing `.agents/skills/decision-{slug}/`
from a decision's content. It is read by `decision-capture` during the Step 8 skill-sync
workflow.

## Description Auto-Generation

The `description` field is a **routing trigger** — it tells an agent *when to load* the skill,
not *what the skill contains*. Follow `skill-design-guidelines` conventions:
start with `Load when...`, use agent-task language, include a `Do not load for...` boundary.

Any description that reaches the routing list is a **live authority claim**. Never carry a
lifecycle marker in the description.

### Priority

1. If the decision has a `skill_description` field in its YAML frontmatter, use it directly (no generation).
2. Otherwise, auto-generate using the rules below.

### Algorithm

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
5. For a multi-domain decision, take the triggers from the index scope statement and
   `## Boundaries`, and the supplementary keywords from the reference file titles. Do not
   read every reference to write a description — the description routes, it does not summarize.

#### Trigger keywords (from the decision content)

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

Decisions are **project skills** at `.agents/skills/decision-{slug}/`. There is no
`docs/decisions/` directory. The skill directory is the source of truth.

Two shapes:

- **Single-topic decision** — one `SKILL.md` holding the whole decision.
- **Multi-domain decision** — `SKILL.md` is an index and each internal domain lives in
  `references/{domain}.md`.

An index `SKILL.md` contains only: frontmatter, a one-paragraph scope statement,
an index table (`§` range | reference file | read when), `## Invariants` (rules every
branch must obey), `## Boundaries` (sibling skills only), `## Non-goals`, and
`## Provenance`. All `## `-level decision prose lives in the references.

`§N` numbering is continuous across the skill's references and stable over time: code,
`AGENTS.md`, and `docs/**` cite `decision-{slug}` §N, and the index table resolves §N to
a file. Never renumber as a side effect of editing; never reuse a retired §N for new meaning.

Choose the shape from the merge and separation criteria in `references/authority-rules.md`.

For a single-topic decision, `§N` numbers the decision's own `##` sections in order, so
`decision-{slug} §N` resolves the same way for both shapes. The single-topic shape therefore
also carries `## Provenance`. Use `assets/decision-skill-template.md` for both shapes.

## Self-Contained Authority

A decision skill must be self-contained. Links to `docs/**` are allowed only as
"Background only (not authority)" pointers, plus archived-tombstone paths in
`## Provenance`. Content that the skill needs in order to be followed belongs in the skill
(inline, or in `references/`), never in `docs/`.

Do not shorten a decision skill by pushing its rules into `docs/engineering/`,
`docs/specs/`, or a similar lane: the reader then has to leave the authority to find the
rule. Shorten an index by moving per-domain prose into `references/`, which stays inside
the skill.

## Lifecycle Sync Rules

| Action | Skill Operation |
|--------|----------------|
| CREATE | Create `.agents/skills/decision-{slug}/` from the template — an index plus `references/`, or a single `SKILL.md`. |
| UPDATE | Regenerate the skill body (choose index or single-topic shape from the content). If `skill_description` exists in the decision's YAML frontmatter, preserve it; otherwise regenerate the description. |
| SUPERSEDE (old) | Delete `.agents/skills/decision-{old}/`, write tombstone `docs/archive/decisions/{old}.md` → `> Archived on {date}. Active authority: {new skill}# {section}.` |
| SUPERSEDE (new) | Same as CREATE. |
| MERGE (absorbed) | Same as SUPERSEDE (old) for each absorbed skill; list them in the survivor's `metadata.supersedes`. |
| MERGE (result) | Same as UPDATE (choose index or single-topic shape from the content). |
| ARCHIVE | Delete the directory, write the same tombstone with `Active authority: none`. |
| REJECT | Delete the directory if it exists, write the same tombstone. |
| CURRENT | No operation. |

The description prefix `[SUPERSEDED]` / `[ORPHANED]` is not used: any description that
reaches the routing list is a live authority claim. Removal is the only unambiguous
retirement signal.

A tombstone preserves the retired text (move the deleted body there) so the reasoning is
still auditable after the skill disappears.

`metadata.supersedes` is the only lifecycle metadata. A retired skill carries no metadata,
because it no longer exists.

## Reference Rewrite

When a decision skill is renamed, merged, or removed, rewrite every reference to the old
slug in the same operation: root and per-layer `AGENTS.md`, `docs/**`, and code comments.
`§N` citations keep their number and resolve through the new index table. `ADR 000N` aliases
must still resolve to a current owner, and local `AGENTS.md` definitions of an alias must be
updated where the owning skill changed. Relative links inside skills resolve against the
skill directory (`references/` is one level deeper than `SKILL.md`).

Reference rewrite is part of the SUPERSEDE / MERGE / ARCHIVE / REJECT operation, not follow-up
work. A rename or removal that leaves citations to a removed slug has not completed.

A slug revived by a later CREATE updates the existing tombstone's `Active authority` line to
point at the revived skill instead of leaving it at `none`.

## Idempotency

- `.agents/skills/decision-{slug}/` is fully owned by `decision-capture` — each sync overwrites it.
- User modifications to SKILL.md will be lost on next UPDATE. The canonical edit path is through
  the source decision's `skill_description` field for the description override, or through the
  decision content itself.
- Running CREATE twice on the same slug: second run is a no-op (detect existing, switch to UPDATE).
