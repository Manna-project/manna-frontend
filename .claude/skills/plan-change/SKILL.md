---
name: plan-change
description: Create an execution plan before a multi-module, contract, architecture, migration, refactor, or high-risk change.
disable-model-invocation: true
---

# Plan a Repository Change

Create `docs/exec-plans/active/$ARGUMENTS.md` with these sections:

1. Goal
2. Context
3. Constraints
4. Affected Areas
5. Plan
6. Verification
7. Risks
8. Decision Log
9. Progress

Read `ARCHITECTURE.md`, the relevant documents linked by `AGENTS.md`, and affected code before writing the plan. Use exact file paths and executable commands. Ask for approval before implementation. Move the plan to `completed/` only after `pnpm verify` succeeds and record the result.
