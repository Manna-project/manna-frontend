import { access, readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { pathToFileURL } from "node:url"
import { collectFiles, relativePath } from "./lib/files.mjs"

const requiredDocuments = [
  "AGENTS.md",
  "CLAUDE.md",
  "ARCHITECTURE.md",
  "docs/README.md",
  "docs/QUALITY_SCORE.md",
  "docs/architecture/boundaries.md",
  "docs/development/commands.md",
  "docs/development/testing.md",
  "docs/development/debugging.md",
  "docs/exec-plans/tech-debt.md",
  ".claude/settings.json",
  ".claude/rules/architecture.md",
  ".claude/skills/verify/SKILL.md",
  ".claude/skills/plan-change/SKILL.md",
  ".github/workflows/verify.yml",
  "scripts/verify",
]

const requiredHeadings = new Map([
  [
    "AGENTS.md",
    [
      "Mission",
      "Repository Map",
      "Where to Look",
      "Development Commands",
      "Non-Negotiable Invariants",
      "Definition of Done",
    ],
  ],
  [
    "ARCHITECTURE.md",
    [
      "System Overview",
      "Module Boundaries",
      "Dependency Direction",
      "Data Flow",
      "Entry Points",
      "External Systems",
    ],
  ],
])

async function pathExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return false
    throw error
  }
}

function extractLocalTargets(markdown) {
  const targets = []
  const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g
  const claudeImport = /^@([^\s]+)$/gm

  for (const match of markdown.matchAll(markdownLink)) {
    const target = match[1]?.trim()
    if (target) targets.push(target)
  }
  for (const match of markdown.matchAll(claudeImport)) {
    const target = match[1]?.trim()
    if (target) targets.push(target)
  }
  return targets.filter(
    (target) =>
      !target.startsWith("#") &&
      !target.startsWith("http://") &&
      !target.startsWith("https://") &&
      !target.startsWith("mailto:"),
  )
}

export async function findDocumentationProblems(root) {
  const problems = []

  for (const document of requiredDocuments) {
    if (!(await pathExists(path.join(root, document)))) {
      problems.push(`Missing required document: ${document}`)
    }
  }

  for (const [document, headings] of requiredHeadings) {
    const documentPath = path.join(root, document)
    if (!(await pathExists(documentPath))) continue
    const markdown = await readFile(documentPath, "utf8")
    for (const heading of headings) {
      if (!markdown.includes(`# ${heading}`)) {
        problems.push(`${document}: missing required heading "${heading}"`)
      }
    }
  }

  const claudeSettingsPath = path.join(root, ".claude/settings.json")
  if (await pathExists(claudeSettingsPath)) {
    try {
      const settings = JSON.parse(await readFile(claudeSettingsPath, "utf8"))
      if (!settings.permissions || !Array.isArray(settings.permissions.allow)) {
        problems.push(".claude/settings.json: permissions.allow must be an array")
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown JSON error"
      problems.push(`.claude/settings.json: invalid JSON -> ${reason}`)
    }
  }

  const markdownFiles = await collectFiles(root, new Set([".md"]))
  for (const markdownPath of markdownFiles) {
    const markdown = await readFile(markdownPath, "utf8")
    for (const target of extractLocalTargets(markdown)) {
      const withoutFragment = target.split("#", 1)[0]
      if (!withoutFragment) continue
      const resolved = path.resolve(path.dirname(markdownPath), decodeURIComponent(withoutFragment))
      if (!(await pathExists(resolved))) {
        problems.push(`${relativePath(root, markdownPath)}: broken local link -> ${target}`)
      }
    }
  }

  return problems
}

async function main() {
  const problems = await findDocumentationProblems(process.cwd())
  if (problems.length === 0) {
    console.log("Documentation check passed.")
    return
  }

  console.error(
    ["Documentation validation failed:", ...problems.map((problem) => `- ${problem}`)].join("\n"),
  )
  process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
