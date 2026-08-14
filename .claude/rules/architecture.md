---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Source Architecture

- Keep imports in the `app -> features -> entities -> shared` direction.
- Compose different features in `src/app`; do not import one feature from another.
- Parse API responses, public environment values, and user input with Zod at their boundary.
- Keep server state in TanStack Query and transient UI state in the owning component.
- Run `pnpm architecture`, `pnpm typecheck`, and relevant tests after source changes.
