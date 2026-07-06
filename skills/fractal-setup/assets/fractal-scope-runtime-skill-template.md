---
name: "fractal-scope"
description: "Load when checking this project's fractal scope config or explaining which L2/L3 writes are enabled. Do not load for generic YAML inspection or repo-local source maintenance."
---

# Fractal Scope

This project stores fractal scope data in `config.yaml`.

Use the installed `fractal-scope` skill package's `scripts/check-scope.js` implementation with this project's config:

```bash
node <fractal-scope-skill-root>/scripts/check-scope.js --config .agents/skills/fractal-scope/config.yaml --root . --path <target-path>
```

Do not copy checker scripts into this project. Behavior lives in the installed skill package; this directory owns project-local config only.
