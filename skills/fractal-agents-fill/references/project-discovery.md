# Project Module Discovery

Use this only in Project mode. Discovery proposes module candidates; Write eligibility in `SKILL.md` separately decides whether each candidate may be written.

## Candidate signals

Collect candidates from all available signals:

1. Existing non-root `AGENTS.md` files
2. Root `AGENTS.md` `Topology` and `Local Maps` paths
3. Workspace and package manifests that define module roots
4. Directories with independent public entry points, tests, module docs, build units, or stable namespaces

Ignore generated output, dependencies, caches, vendored trees, and VCS metadata, unless a project instruction excludes the path from fractal writes: report that path once as an `excluded` candidate.

## Boundary normalization

- Normalize every candidate to a project-relative directory.
- Do not recursively turn every descendant into a module.
- Collapse a child into its parent when the child has no independent ownership evidence.
- Keep both parent and child only when each owns a distinct contract that future work must read separately.
- Treat an existing local `AGENTS.md` as strong boundary evidence, even when its content needs refresh.

## Candidate decision

For each candidate, record:

```text
path | signals | confidence | write basis | action
```

Actions:

- `create`: high confidence, no L2 manifest exists, write basis `confirmed`
- `refresh`: high confidence, or medium confidence with an existing manifest
- `unchanged`: manifest already reflects current evidence
- `skip`: write basis `declined`, `unconfirmed`, or `excluded`, or evidence is too weak to create
- `blocked`: authoritative evidence conflicts or ownership remains direction-changing

Project mode must account for every normalized candidate with exactly one action.

## Interaction rule

Do not interview the user once per candidate. Ask the single creation confirmation from `SKILL.md`, continue independent work, then report blocked candidates with one recommended resolution each. Ask another immediate question only when one ambiguity changes the project-wide boundary model and would invalidate the remaining discovery.
