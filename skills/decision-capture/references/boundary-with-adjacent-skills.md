# Boundary with Adjacent Skills

This file helps `decision-capture` decide when a topic should not become a decision skill,
and which adjacent skill is the correct handler.

## Lane routing

When a document should not be a decision skill, route it here:

| Kind | Destination | Skill |
|------|-------------|-------|
| Implementation notes, benchmarks, debt | `docs/engineering/` | manual placement |
| Explorations, alternatives, experiments | `docs/research/` | manual placement |
| Bug-fix root-cause record | `docs/postmortem/` | `postmortem` |
| PRD → executable task groups | `docs/specs/` | `to-task-specs` |
| Archived past docs | `docs/archive/` | `fractal-repo` |

## Common boundary confusions

### "We should document this choice"

Not every choice is a decision skill. Ask: will this constrain future implementations?
If the answer is "it might be useful context," prefer `docs/engineering/`.

### "This is how our auth works"

If it describes current behavior that can be learned from code, it is documentation,
not a decision. Decision skills constrain — they don't just describe.

### "Let's record this bug root cause"

This is a postmortem. The `postmortem` skill owns this workflow.

### "We're still exploring — let's write down what we found"

This is research output. Put it in `docs/research/`. Decision skills need durable answers,
not open questions.

## Signal: local tradeoff at risk of promotion

When a local tradeoff (e.g., "we chose Redis over Memcached for this one cache")
is at risk of being promoted into a decision skill:

- If the constraint only affects one module → `docs/engineering/`
- If the constraint sets a project-wide cache policy → decision skill
