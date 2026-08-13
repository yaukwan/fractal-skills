# Project Module Discovery

Use this only in Project mode. Discovery proposes module candidates; the project-local scope checker separately decides whether each candidate may be written.

## Candidate signals

Collect candidates from all available signals:

1. Existing non-root `AGENTS.md` files
2. Root `AGENTS.md` `Topology` and `Local Maps` paths
3. Workspace and package manifests that define module roots
4. Concrete entry directories implied by `l2_folder_manifest.include` patterns
5. Directories with independent public entry points, tests, module docs, build units, or stable namespaces

Ignore generated output, dependencies, caches, vendored trees, VCS metadata, and configured scope exclusions.

## Boundary normalization

- Normalize every candidate to a project-relative directory.
- A glob match grants write permission; it does not prove a module boundary.
- Do not recursively turn every matching descendant into a module.
- Collapse a child into its parent when the child has no independent ownership evidence.
- Keep both parent and child only when each owns a distinct contract that future work must read separately.
- Treat an existing local `AGENTS.md` as strong boundary evidence, even when its content needs refresh.

## Candidate decision

For each candidate, record:

```text
path | signals | confidence | scope status | action
```

Actions:

- `create`: high confidence, scope matched, no manifest exists
- `refresh`: high confidence, or medium confidence with an existing manifest
- `unchanged`: manifest already reflects current evidence
- `skip`: scope did not match or evidence is too weak to create
- `blocked`: authoritative evidence conflicts or ownership remains direction-changing

Project mode must account for every normalized candidate with exactly one action.

## Interaction rule

Do not interview the user once per candidate. Continue independent work, then report blocked candidates with one recommended resolution each. Ask immediately only when one ambiguity changes the project-wide boundary model and would invalidate the remaining discovery.
