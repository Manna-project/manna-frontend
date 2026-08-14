import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { findArchitectureViolations } from "./check-architecture.mjs"

const fixtureRoots = []

async function createFixture(root, files) {
  fixtureRoots.push(root)
  for (const [relativePath, source] of Object.entries(files)) {
    const filePath = path.join(root, relativePath)
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, source)
  }
}

afterEach(async () => {
  const { rm } = await import("node:fs/promises")
  await Promise.all(
    fixtureRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  )
})

describe("architecture guard", () => {
  it("allows a feature to depend on entities and shared", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "mannamap-architecture-allowed-"))
    await createFixture(root, {
      "src/features/user/use-user.ts":
        'import type { User } from "@/entities/user"\nimport "@/shared/api/http"',
      "src/entities/user.ts": "export type User = { readonly id: string }",
      "src/shared/api/http.ts": "export const http = {}",
    })

    await expect(findArchitectureViolations(root)).resolves.toEqual([])
  })

  it("rejects shared code importing a feature", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "mannamap-architecture-forbidden-"))
    await createFixture(root, {
      "src/features/user/use-user.ts": "export const useUser = () => undefined",
      "src/shared/api/http.ts": 'import "@/features/user/use-user"',
    })

    const violations = await findArchitectureViolations(root)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.importer).toBe("src/shared/api/http.ts")
  })
})
