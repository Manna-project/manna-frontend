import { mkdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { findDocumentationProblems } from "./check-docs.mjs"

const fixtureRoots = []

async function createRequiredDocs(root) {
  const documents = {
    "AGENTS.md":
      "# Mission\n# Repository Map\n# Where to Look\n# Development Commands\n# Non-Negotiable Invariants\n# Definition of Done\n",
    "CLAUDE.md": "@AGENTS.md\n",
    "ARCHITECTURE.md":
      "# System Overview\n# Module Boundaries\n# Dependency Direction\n# Data Flow\n# Entry Points\n# External Systems\n",
    "docs/README.md": "# Docs\n",
    "docs/QUALITY_SCORE.md": "# Score\n",
    "docs/architecture/boundaries.md": "# Boundaries\n",
    "docs/development/commands.md": "# Commands\n",
    "docs/development/testing.md": "# Testing\n",
    "docs/development/debugging.md": "# Debugging\n",
    "docs/exec-plans/tech-debt.md": "# Debt\n",
    ".claude/settings.json": '{"permissions":{"allow":[]}}\n',
    ".claude/rules/architecture.md": "# Architecture\n",
    ".claude/skills/verify/SKILL.md": "# Verify\n",
    ".claude/skills/plan-change/SKILL.md": "# Plan\n",
    ".github/workflows/verify.yml": "name: Verify\n",
    "scripts/verify": "#!/usr/bin/env sh\n",
  }
  for (const [relativePath, source] of Object.entries(documents)) {
    const filePath = path.join(root, relativePath)
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, source)
  }
}

afterEach(async () => {
  await Promise.all(
    fixtureRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  )
})

describe("documentation guard", () => {
  it("accepts the required documents and valid local links", async () => {
    const root = await import("node:fs/promises").then(({ mkdtemp }) =>
      mkdtemp(path.join(tmpdir(), "mannamap-docs-valid-")),
    )
    fixtureRoots.push(root)
    await createRequiredDocs(root)
    await writeFile(path.join(root, "docs/README.md"), "[Boundaries](architecture/boundaries.md)\n")

    await expect(findDocumentationProblems(root)).resolves.toEqual([])
  })

  it("reports broken local links with their source document", async () => {
    const root = await import("node:fs/promises").then(({ mkdtemp }) =>
      mkdtemp(path.join(tmpdir(), "mannamap-docs-broken-")),
    )
    fixtureRoots.push(root)
    await createRequiredDocs(root)
    await writeFile(path.join(root, "docs/README.md"), "[Missing](missing.md)\n")

    const problems = await findDocumentationProblems(root)
    expect(problems).toContain("docs/README.md: broken local link -> missing.md")
  })
})
