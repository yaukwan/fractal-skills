---
name: "decision-capture"
description: "Load when checking or changing current design authority in fractal decision skills, including capturing durable decisions, resolving drift or overlap, and retiring obsolete decisions. Not for explicit ADR files, local implementation notes, task specs, or postmortems."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Decision Capture

Keep durable system design truth current and discoverable at
`.agents/skills/decision-{slug}/`. The decision skill is the authority, not a copy of
`docs/decisions/` or a record of local implementation reasoning.

## Scope Gate

**This skill applies only when `.agents/skills/fractal-scope/config.yaml` exists.**

If not found, this is not a fractal-managed repository — do not apply decision capture rules.

## Workflow

1. **Establish scope and authority.** Find overlapping decision skills by topic, module,
   or contract boundary and compare them with confirmed intent, affected code, and docs.
   Admit only cross-cutting, long-lived design constraints; importance or analysis depth
   alone is insufficient. Read `references/authority-rules.md` when admission is unclear.
   Complete when existing coverage and any drift are identified without inventing intent.
2. **Choose an action.** Use the Action matrix. Read
   `references/freshness-and-supersession.md` when existing authority may be stale or
   overlapping. Complete when the action, affected skills, and intended authority are clear.
3. **Check authorization.** For an action that writes, apply Authorization below before
   editing. Complete when the exact change is authorized or reported as blocked.
   Read-only outcomes need no write approval.
4. **Apply the selected action.** Only for a write action, read
   `references/skill-sync-rules.md` before editing for routing, body format, retirement,
   and reference-rewrite rules. For a new or reshaped skill, also use
   `assets/decision-skill-template.md` and run `assets/decision-review-checklist.md`;
   resolve any failed item before writing. Complete when the authorized content and all
   required routing, tombstone, and reference changes are saved.
5. **Verify and report.** Reread changed files and satisfy the Action matrix's completion
   evidence; every write action also requires Sync proof in `references/skill-sync-rules.md`.
   Complete when the resulting authority is unambiguous and the output matches saved state.
   Missing authorization or failed proof leaves the action incomplete; report the blocker
   instead of claiming current truth is resolved.

## Action matrix

This table is the authority for action selection, effects, and completion. Return exactly
one primary action. Every action whose Writes column is not `None` requires Authorization
and Sync proof; the read-only actions require neither mutation nor retirement checks.

| Action | Choose when | Writes | Completion evidence |
| --- | --- | --- | --- |
| `CURRENT` | Existing authority is accurate and sufficient. | None | Relevant skills checked; no unresolved drift or competing authority. |
| `CREATE` | Admitted design truth has no existing owner. | Create a decision skill. | New authority covers the confirmed scope. |
| `UPDATE` | An existing decision's core truth holds but its details need correction. | Update that skill and its routing. | Content and description reflect the confirmed truth. |
| `SUPERSEDE` | A materially changed decision replaces an existing authority. | Create the successor; retire the old skill with a tombstone; rewrite references. | One active successor; retired references resolve to it. |
| `MERGE` | Overlapping skills form one co-load unit with a shared invariant. | Create or update the survivor; retire absorbed skills with tombstones; rewrite references. | One authority preserves the covered contracts and records absorbed slugs. |
| `ARCHIVE` | An existing skill no longer qualifies as current authority and has no replacement. | Retire it with a tombstone naming no active authority; rewrite references. | No active retired skill or dangling references; retained citations identify archived history. |
| `REJECT` | Proposed content does not qualify as durable system truth. | None | Explain the rejection and name the appropriate alternative. |

Rejecting a proposal leaves existing skills untouched. If an existing skill itself needs
retirement, select `ARCHIVE` or the applicable replacement action instead.

## Authorization

- An explicit user instruction approving the identified decision content and requesting
  the selected operation is sufficient authorization. Reuse that approval for the same
  scope rather than asking again; discussion, a draft, or an instruction to review is not
  permission to mutate authority.
- Before an unapproved change, summarize the proposed truth, why it qualifies (or why the
  existing authority must retire), and the affected or replaced skills. Ask one blocking
  question with a recommendation and wait for explicit confirmation.
- New unresolved tradeoffs, expanded scope, and deletion not covered by the approval
  require confirmation. Approval of a named replacement or merge covers its stated
  retirements; approval to write a decision alone does not. Respect rejection or redirection
  and leave unauthorized changes unwritten.

## Output contract

Return:

- the primary action from the Action matrix, marked incomplete if blocked
- relevant decision skill paths, a short rationale, and the resulting current truth
- the generated skill path(s), empty when none were created or updated
- written, updated, or retired paths, including tombstones when applicable
- skill sync action: `CREATED | UPDATED | MERGED | REMOVED | NONE`, reflecting actual writes;
  for a completed supersession use `CREATED` and also list the retired paths above
- verification evidence or the blocker and next required decision

## Boundaries

- Explicit ADR files follow the repository's ADR convention.
- Lane placement and Level 1/2/3 synchronization belong to `fractal-sync`.
- Root-cause records belong to `postmortem`; task specs belong to `to-task-specs`.
- Read `references/boundary-with-adjacent-skills.md` when a rejected topic needs another
  home or routing is ambiguous.
