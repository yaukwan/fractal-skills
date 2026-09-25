# Decision Skill Sync Rules

Read this before a write action to `.agents/skills/decision-{slug}/` for generated routing,
body format, retirement mechanics, and verification. Action selection and authorization
are defined in `SKILL.md`; read-only outcomes do not require this file.

## Description Auto-Generation

The `description` field is a **routing trigger** — it tells an agent *when to load* the skill,
not *what the skill contains*. Start with `Load when...` and use agent-task language.
Add a `Do not load for...` boundary only for a plausible adjacent misroute.

Any description that reaches the routing list is a **live authority claim**. Never carry a
lifecycle marker in the description.

### Priority

1. Preserve an explicit `skill_description` override and review it against the same routing
   criteria below. Report conflicts rather than silently changing user-authored routing.
2. Otherwise, derive the description from the decision's owned contract.

### Owned-contract routing

- Identify the affected modules and constrained behavior from the decision's own scope,
  decision content, and invariants. For an index, start with its scope statement, invariants,
  and `Read when` entries; open a domain reference only if coverage remains unclear.
- Write one task trigger per distinct owned branch. Keep domain meaning intact: order
  `state` does not imply authentication sessions, and an owned API contract does not cover
  every API endpoint. Use concrete module or technology names only when they distinguish
  that contract; there is no keyword quota or generic word-to-task mapping.
- Use sibling boundaries to delimit ownership, not to add the sibling's work as a trigger.
  In a multi-domain index, `## Boundaries` names sibling skills, not this skill's domains.
- Exclusions must describe actual near-misses outside the owned contract. A relevant
  refactor or contract-documentation change still needs the decision; do not exclude it
  merely because of the task category.

### Length Limit

Target ≤ 50 words. Remove synonyms and generic wording before shortening real branch
coverage; length is not a reason to omit an owned contract.

### Examples

**Decision: Order State Transitions**
```
Load when changing or verifying order-state transitions in orders/, including refactors and contract documentation. Do not load for authentication session state or order-page presentation changes.
```

**Decision: PostgreSQL Connection Pooling**
```
Load when changing or verifying the shared PostgreSQL connection pool's ownership, lifetime, or transaction boundaries. Do not load for SQL query tuning that leaves those contracts unchanged.
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

## Retirement Mechanics

For each retirement authorized by the Action matrix, preserve the retired content at
`docs/archive/decisions/{slug}.md` and remove `.agents/skills/decision-{slug}/` from discovery.
Preserve the body and any authoritative domain references in the tombstone before deleting
the skill directory. Its header is:

```md
> Archived on {date}. Active authority: {successor skill and section, or none}.
```

List absorbed slugs in the survivor's `metadata.supersedes` when merging.

The description prefix `[SUPERSEDED]` / `[ORPHANED]` is not used: any description that
reaches the routing list is a live authority claim. Removal is the only unambiguous
retirement signal.

`metadata.supersedes` is the only lifecycle metadata. A retired skill carries no metadata,
because it no longer exists.

## Reference Rewrite

Before a rename or retirement, collect all affected references and use `fractal-sync`'s
scope gate for any L2 manifest or L3 header edits. Preflight the full rewrite set before
mutating authority: if a required edit is out of scope or its checker is unavailable or
fails, leave the affected decision skills in place and report the blocker. Do not widen
scope or delete an authority first and defer its blocked reference cleanup.

When a decision skill is renamed, merged, or removed, rewrite every reference to the old
slug in the same operation: root and per-layer `AGENTS.md`, `docs/**`, and code comments.
When a successor exists, `§N` citations keep their number and resolve through its index
table; `ADR 000N` aliases resolve to that owner. Update local `AGENTS.md` alias definitions
where ownership changed. Relative links inside skills resolve against the skill directory
(`references/` is one level deeper than `SKILL.md`).

Reference rewrite is part of the retirement or rename, not follow-up work. When there is
no successor, remove active-authority pointers and direct any retained historical citations
to the tombstone. A rename or removal that leaves dangling citations has not completed.

A slug revived by a later CREATE updates the existing tombstone's `Active authority` line to
point at the revived skill instead of leaving it at `none`.

## Idempotency

- Use the current skill content as the source for authorized changes; preserve its explicit
  `skill_description` override rather than regenerating it.
- If a proposed new slug already exists, reclassify with the Action matrix before writing:
  sufficient existing truth needs no mutation; changed truth requires authorized revision.

## Sync proof

Every write action must satisfy the applicable checks before reporting completion:

- Every created or updated skill passes
  `python3 <skill-design-guidelines>/scripts/validate_skill.py <skill-dir>` with no FAIL/ERROR/WARN.
- Review each generated description against an intended request per owned branch and its
  nearest plausible miss. Check relevant refactors and contract-documentation work remain
  in scope. Use `skill-design-guidelines` routing review; structural validation alone is
  not routing proof. Resolve or report conflicting overrides before claiming completion.
- `§N` in each touched active skill is continuous, without duplicates or gaps, and existing
  citations retain their meaning. For an index, every domain reference is listed exactly
  once and every listed file exists. A single-topic skill needs no reference index.
- Retired content is preserved in a tombstone, the retired directory is absent, and its
  active-authority pointer resolves to the successor or explicitly states `none`.
- No stale reference to a removed or renamed slug remains outside `metadata.supersedes`
  and `docs/archive/**`; explicit historical links to its tombstone are allowed. Verify
  with `rg --hidden --glob '!.git' --glob '!node_modules'`.
- Every concrete `decision-*` citation resolves to an existing skill or archived tombstone,
  and links between skills resolve after any reference-depth change.
