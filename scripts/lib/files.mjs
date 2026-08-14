import { readdir } from "node:fs/promises"
import path from "node:path"

const ignoredDirectoryNames = new Set([".git", ".next", "coverage", "node_modules"])

export async function collectFiles(root, extensions) {
  const files = []

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) {
        continue
      }

      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(entryPath)
      } else if (extensions.has(path.extname(entry.name))) {
        files.push(entryPath)
      }
    }
  }

  await visit(root)
  return files.sort()
}

export function relativePath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join("/")
}
