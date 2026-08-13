---
name: "fractal-agents-fill"
description: "Load when extracting, creating, or refreshing module contracts in local `AGENTS.md` files from a target project path, including one specified module or project-wide module discovery. Do not load for bootstrap, ordinary code/document synchronization, decision lifecycle, or report-only audits."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Agents Fill

Extract current module contracts from code and project knowledge, then write them into the corresponding Level 2 `AGENTS.md` files.

## Inputs and mode

Resolve these inputs from the request and current working directory:

- **project root**: the directory that owns `.agents/skills/fractal-scope/`
- **target path**: an optional module directory, file inside a module, or existing `AGENTS.md`

Choose exactly one mode:

- **Target mode** when a target path is supplied: extract one owning module contract.
- **Project mode** when only a project root is supplied or the user requests a whole-project fill: discover module candidates, then process each independently.

Do not ask the user to restate a path that can be resolved from the request or working directory.

## Preconditions

Confirm the project-local files below exist:

```text
.agents/skills/fractal-scope/config.yaml
.agents/skills/fractal-scope/scripts/check-scope.js
```

- Missing config means the project is not writable under this protocol. Report it and stop.
- Missing checker belongs to `fractal-setup`. Report the required repair and stop.
- Resolve file and `AGENTS.md` targets upward to the candidate module directory before checking scope.

For every directory considered for writing, run:

```bash
node .agents/skills/fractal-scope/scripts/check-scope.js \
  --config .agents/skills/fractal-scope/config.yaml \
  --root <project-root> \
  --path <module-directory> \
  --json
```

Write only when `l2_folder_manifest.status` is `matched`. Record every scope result in the final report.

## Target mode

1. Resolve the project root and one owning module directory. Complete when both paths are unambiguous.
2. Pass the module directory through the scope gate. Complete when its exact result is recorded.
3. Read the root and nearest ancestor `AGENTS.md`, the local manifest if present, relevant code and tests, nearby docs, and overlapping project skills. Read `references/extraction-protocol.md` for evidence, field extraction, and merge rules. Complete when every proposed claim has a source or is excluded.
4. If ownership, durable constraints, or terminology remain direction-changing and unresolved, read `references/interaction-protocol.md` and ask one blocking question with a recommendation. Complete when writing is safe or the module is marked blocked.
5. Create or update `<module-directory>/AGENTS.md` using `references/output-format.md`. Complete when the manifest describes current ownership without inventing intent.
6. If root `AGENTS.md` exists, add or update only this manifest's `Local Maps` entry. Complete when unrelated root content is unchanged.

## Project mode

1. Read `references/project-discovery.md` and collect all supported candidate signals. Complete when existing manifests, root navigation, workspace manifests, scope entry paths, and semantic module roots have been considered.
2. Normalize and de-duplicate candidates. Keep nested candidates only when each has independent ownership evidence. Complete when no candidate exists solely because it is a directory.
3. Run the scope gate for every candidate and discard non-matches from the write set. Complete when every retained candidate has a recorded `matched` result.
4. Process retained candidates independently with the Target mode extraction and merge rules:
   - high confidence and clear contract: create or refresh the manifest
   - medium confidence: refresh an existing manifest, but do not create one
   - low confidence or direction-changing conflict: skip and record the blocker
5. Continue after a blocked module when other modules are independent. Collect questions and blockers in the final report instead of running a directory-by-directory interview.
6. Update root `Local Maps` only for manifests actually created or refreshed. Do not regenerate or prune the whole map.

## Write rules

- Preserve the Level 2 sections `Scope`, `Constraints`, `Members`, `Docs`, `Skills`, `Language`, and `Exceptions`; optional sections may be absent.
- Treat existing user-authored intent conservatively according to the merge rules in `references/extraction-protocol.md`.
- Summarize bounded contexts, capabilities, or ownership groups; do not produce a file inventory.
- Put only project-local, module-relevant skills in `Skills`, with a concrete trigger for each pointer.
- Put resolved vocabulary in `Language`; do not create or synchronize `CONTEXT.md`.
- Write current truth only: no timestamps, history, dependency dumps, or local review triggers.
- A decision conflict is a `decision_drift_signal`, not authority to modify the decision.

## Output contract

Return an `Extraction Result` using `references/output-format.md`. At minimum report:

- project root and mode
- changed, unchanged, skipped, and blocked module paths
- scope result for every write candidate
- evidence consulted for each changed module
- decision drift signals and root map updates
- unresolved questions

## Completion criteria

- Every changed manifest passed the project-local L2 scope gate.
- Every written claim is supported by evidence at the authority level required by the extraction protocol.
- Existing manual intent was not silently replaced.
- Project mode considered every discovery signal and did not create manifests from directory shape alone.
- Root `Local Maps` changed only for manifests written in this run.
- The final report accounts for every candidate as changed, unchanged, skipped, or blocked.

## Boundaries

- Bootstrap and scope-runtime repair belong to `fractal-setup`.
- Scope configuration belongs to the project-local `fractal-scope` skill.
- Synchronizing contracts after ordinary code or documentation changes belongs to `fractal-sync`.
- Creating or changing decision authority belongs to `decision-capture`.
- This skill performs extraction and writes manifests; it is not a report-only audit.
