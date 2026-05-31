# AGENTS.md Output Format

Example of a completed Level 2 folder manifest produced by `fractal-agents-fill` when it writes a directory contract directly.

## Scope

Authentication and authorization services. Handles user identity, session management,
OAuth provider integration, and access control enforcement.

## Constraints

- Public API signatures in `src/auth/public.ts` must remain backward-compatible — 
  downstream services depend on these interfaces without version negotiation.
- SQL queries in `src/auth/queries/` are manually optimized for PostgreSQL.
  Do not auto-rewrite or add ORM abstraction layers.
- Session token format must remain opaque to consumers — never expose internal
  structure through the public API.

## Members

- `src/auth/` — Core auth service and public API surface
- `src/auth/middleware/` — HTTP middleware for session validation
- `src/auth/providers/` — OAuth, SAML, and custom provider adapters
- `src/auth/queries/` — Database query layer

## Docs

- [Auth Flow Decision](../../skills/decision-auth-flow/SKILL.md)
- [OAuth Provider Integration Guide](../docs/engineering/oauth-integration.md)

## Exceptions

- Rate limiting is intentionally deferred to the API gateway layer
- Legacy `src/auth/v1/` still routes traffic — migration target Q4 2026
