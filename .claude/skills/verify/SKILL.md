---
name: verify
description: Run the repository verification loop and repair failures before claiming completion.
---

# Verify Mannamap Frontend

1. Read `AGENTS.md` Definition of Done and `docs/development/self-review.md`.
2. Inspect `git diff --check` and `git diff` for unintended changes.
3. Run `pnpm verify` from the repository root.
4. Fix failures from the first failing stage; do not skip or weaken checks.
5. Run `pnpm verify` again after every fix.
6. Report the commands run, the final result, and any unverified external dependency.
