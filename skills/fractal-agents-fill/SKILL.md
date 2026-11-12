---
name: "fractal-agents-fill"
description: "Load when extracting, creating, or refreshing module contracts in local `AGENTS.md` files from a target project path, including one specified module or project-wide module discovery. Do not load for bootstrap, ordinary code/document synchronization, decision lifecycle, or report-only audits."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "3.2"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Agents Fill

Extract current module contracts from code and project knowledge, then write them into the corresponding Level 2 `AGENTS.md` files.

## Inputs and mode

Resolve these inputs from the request and current working directory:

- **project root**: the repository root, or the directory the user names as the project
- **target path**: an optional module directory, file inside a module, or existing `AGENTS.md`

Choose exactly one mode:

- **Target mode** when a target path is supplied: extract one owning module contract.
- **Project mode** when only a project root is supplied or the user requests a whole-project fill: discover module candidates, then process each independently.

Do not ask the user to restate a path that can be resolved from the request or working directory.

## Write eligibility

An L2 manifest is a non-root `AGENTS.md` with a `Scope` section. Resolve file and `AGENTS.md` targets upward to the candidate module directory, then record one write basis for it, the first row below that applies:

| Basis | Applies when | Effect |
| --- | --- | --- |
| `excluded` | A project instruction excludes the path from fractal writes | Do not write; this basis overrides the others |
| `requested` | The module owns the target path named in the request | Create, restructure, or refresh its `AGENTS.md` |
| `existing` | The module already has an L2 manifest | Refresh it |
| `confirmed` | A discovered module without an L2 manifest was approved in the Project mode creation confirmation | Create or restructure its `AGENTS.md` |
| `declined` / `unconfirmed` | The user declined that module, or the confirmation has no answer | Do not write; list an unanswered confirmation under open questions |

Record every write basis in the final report.

## Target mode

1. Resolve the project root and one owning module directory. Complete when both paths are unambiguous.
2. Read the root `AGENTS.md` and other project instructions for a rule that excludes the module from fractal writes, then record the module's write basis. Complete when it is `requested`, or when `excluded` is reported and the run stops.
3. Read the root and nearest ancestor `AGENTS.md`, the local manifest if present, relevant code and tests, nearby docs, and overlapping project skills. Read `references/extraction-protocol.md` for evidence and field extraction rules. Complete when every proposed claim has a source or is excluded.
4. If ownership, durable constraints, or terminology remain direction-changing and unresolved, read `references/interaction-protocol.md` and ask one blocking question with a recommendation. Complete when writing is safe or the module is marked blocked.
5. Read `../fractal-sync/references/protocol/level2.md`, the Level 2 protocol in the sibling `fractal-sync` skill, for the manifest schema, Section Authority, and hard rules. Create or update `<module-directory>/AGENTS.md` with them. Complete when the manifest describes current ownership without inventing intent.
6. If root `AGENTS.md` exists, add or update only this manifest's `Local Maps` entry. Complete when unrelated root content is unchanged.

## Project mode

1. Read `references/project-discovery.md` and collect all supported candidate signals. Complete when existing manifests, root navigation, workspace manifests, and semantic module roots have been considered.
2. Normalize and de-duplicate candidates. Keep nested candidates only when each has independent ownership evidence. Complete when no candidate exists solely because it is a directory.
3. Confirm the creation set. Existing manifests proceed without confirmation. List every high-confidence candidate that would create or restructure an `AGENTS.md`, with its signals, and ask once which of them to write. A request that names those directories is the confirmation; a whole-project request is not. Complete when every candidate has a recorded write basis.
4. Process retained candidates independently with Target mode steps 3 and 5:
   - high confidence and clear contract: refresh the manifest, or create it when its basis is `confirmed`
   - medium confidence: refresh an existing manifest, but do not create one
   - low confidence or direction-changing conflict: skip and record the blocker
5. Continue after a blocked module when other modules are independent. Collect questions and blockers in the final report instead of running a directory-by-directory interview.
6. Update root `Local Maps` only for manifests actually created or refreshed. Do not regenerate or prune the whole map.

## Write rules

- If `../fractal-sync/references/protocol/level2.md` is missing, `fractal-sync` is not installed: stop and report it instead of writing a manifest from memory.
- To restructure an `AGENTS.md` that is not an L2 manifest, add the Level 2 sections and keep its existing content verbatim.
- A decision conflict is a `decision_drift_signal`, not authority to modify the decision.

## Output contract

Return an `Extraction Result` using `references/output-format.md`. At minimum report:

- project root and mode
- changed, unchanged, skipped, and blocked module paths
- write basis for every candidate
- evidence consulted for each changed module
- decision drift signals and root map updates
- unresolved questions

## Completion criteria

- Every created or restructured `AGENTS.md` has the basis `requested` or `confirmed`; no `excluded` path was written.
- Every written claim is supported by evidence at the authority level required by the extraction protocol.
- Existing manual intent was not silently replaced.
- Project mode considered every discovery signal and did not create manifests from directory shape alone.
- Root `Local Maps` changed only for manifests written in this run.
- The final report accounts for every candidate as changed, unchanged, skipped, or blocked.

## Boundaries

- Bootstrap belongs to `fractal-setup`.
- Synchronizing contracts after ordinary code or documentation changes belongs to `fractal-sync`.
- Creating or changing decision authority belongs to `decision-capture`.
- Report-only drift checks belong to `fractal-sync`; this skill performs extraction and writes manifests.
