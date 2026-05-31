# Skill Review Checklist

Use this as a quick pass before shipping or merging a skill.

## Routing

- [ ] Directory name exactly matches `name`
- [ ] Name is lowercase and hyphenated
- [ ] Description starts with `Load when...`
- [ ] Description describes user intent, not feature summary
- [ ] Description is concise
- [ ] Description includes boundaries if adjacent skills may conflict

## Body

- [ ] Every sentence changes model behavior
- [ ] Obvious/common knowledge removed
- [ ] Gotchas included
- [ ] Failure handling included
- [ ] Negative examples or non-goals included
- [ ] Instructions are principle-based, not brittle shell-command spam

## Structure

- [ ] Heavy docs moved into `references/`
- [ ] Templates/schemas/examples moved into `assets/`
- [ ] Deterministic logic belongs in `scripts/`
- [ ] Root file stays lean

## Evals

- [ ] Positive routing examples exist
- [ ] Negative routing examples exist
- [ ] Neighbor-confusion cases exist
- [ ] Known historical failures are represented

## Maintenance

- [ ] Fast-changing content kept out
- [ ] New failures are turned into gotchas or evals
- [ ] Wording has been compressed where possible
