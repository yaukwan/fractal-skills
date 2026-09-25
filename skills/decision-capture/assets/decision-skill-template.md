---
name: "decision-{{slug}}"
description: "{{skill_description}}"
license: "Proprietary"
metadata:
  generated_by: "decision-capture"
  created: "{{date}}"
  last_updated: "{{date}}"
  affected_modules: {{affected_modules}}
  supersedes: []
---

Emit exactly one of the two shapes below and delete the other. Choose the shape with the
merge and separation criteria in `references/authority-rules.md`.

<!-- SHAPE: single-topic — one SKILL.md holding the whole decision -->

# Decision: {{title}}

## Context

{{context}}

## Decision

{{decision}}

## Boundaries

{{boundaries}}

## Implications

{{implications}}

## Non-goals

{{non_goals}}

## Provenance

{{provenance}}

<!-- SHAPE END: single-topic -->

<!-- SHAPE: multi-domain — SKILL.md is an index; each internal domain lives in references/{domain}.md -->

# Decision: {{title}}

{{scope}}

## Index

| § | Reference | Read when |
| --- | --- | --- |
| §{{from}}–§{{to}} | `references/{{domain}}.md` | {{read_when}} |

## Invariants

{{invariants}}

## Boundaries

{{boundaries}}

## Non-goals

{{non_goals}}

## Provenance

{{provenance}}

<!-- SHAPE END: multi-domain -->

<!-- SHAPE: reference file — one per internal domain, multi-domain decisions only.
     §N is continuous across all reference files of the skill and never reused. -->

# {{domain}}

## {{section_title}}

{{section_content}}

<!-- SHAPE END: reference file -->

Notes:

- `## Provenance` records retired slugs as `docs/archive/decisions/{slug}.md` tombstone
  paths, plus "Background only (not authority)" `docs/**` links. It never grants authority.
- Do not put decision prose in `docs/**`. A skill that needs content in order to be followed
  keeps it here, inline or under `references/`.
