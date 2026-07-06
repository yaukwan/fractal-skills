# Quick Checks

## Commands

- Inspect the active config:
  `node <skill-root>/scripts/check-scope.js`
- Check specific paths:
  `node <skill-root>/scripts/check-scope.js --path docs/guide.md --path src/lib.rs`
- Machine-readable output:
  `node <skill-root>/scripts/check-scope.js --path docs/guide.md --json`
- Override an external config:
  `node <skill-root>/scripts/check-scope.js --config /tmp/project/.agents/skills/fractal-scope/config.yaml --root /tmp/project --path docs/guide.md`

## Reading results

- `matched` — include hit and no exclude hit
- `excluded` — exclude wins
- `disabled` — level off
- `no-match` — enabled, but nothing included
