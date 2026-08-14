import { readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { pathToFileURL } from "node:url"
import ts from "typescript"
import { collectFiles, relativePath } from "./lib/files.mjs"

function classifyModule(filePath) {
  const segments = filePath.split("/")
  if (segments[0] !== "src") return undefined
  if (segments[1] === "app") return { layer: "app" }
  if (segments[1] === "features") return { layer: "features", feature: segments[2] }
  if (segments[1] === "entities") return { layer: "entities" }
  if (segments[1] === "shared") return { layer: "shared" }
  return undefined
}

function resolveInternalImport(importer, specifier) {
  if (specifier.startsWith("@/")) return `src/${specifier.slice(2)}`
  if (!specifier.startsWith(".")) return undefined
  return path.posix.normalize(path.posix.join(path.posix.dirname(importer), specifier))
}

function isAllowedDependency(source, target) {
  if (!source || !target) return true
  if (source.layer === "app") return true
  if (source.layer === "shared") return target.layer === "shared"
  if (source.layer === "entities") return target.layer === "entities" || target.layer === "shared"
  if (source.layer === "features") {
    return (
      target.layer === "shared" ||
      target.layer === "entities" ||
      (target.layer === "features" && source.feature === target.feature)
    )
  }
  return false
}

function collectImportSpecifiers(sourceFile) {
  const specifiers = []

  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text)
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return specifiers
}

export async function findArchitectureViolations(root) {
  const sourceRoot = path.join(root, "src")
  const files = await collectFiles(sourceRoot, new Set([".ts", ".tsx", ".mts", ".cts"]))
  const violations = []

  for (const filePath of files) {
    const importer = relativePath(root, filePath)
    const sourceText = await readFile(filePath, "utf8")
    const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    const sourceFile = ts.createSourceFile(
      filePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      scriptKind,
    )

    for (const specifier of collectImportSpecifiers(sourceFile)) {
      const targetPath = resolveInternalImport(importer, specifier)
      if (!targetPath) continue
      const source = classifyModule(importer)
      const target = classifyModule(targetPath)
      if (!isAllowedDependency(source, target)) {
        violations.push({ importer, specifier, source, target })
      }
    }
  }

  return violations
}

export function formatArchitectureViolation(violation) {
  const sourceName = violation.source?.feature
    ? `${violation.source.layer}/${violation.source.feature}`
    : violation.source?.layer
  const targetName = violation.target?.feature
    ? `${violation.target.layer}/${violation.target.feature}`
    : violation.target?.layer

  return [
    "Architecture violation:",
    `${violation.importer} imports ${violation.specifier}.`,
    `${sourceName} modules cannot depend on ${targetName} modules.`,
    "Allowed direction: app -> features -> entities -> shared.",
    "Move shared contracts downward or compose the dependency in src/app.",
  ].join("\n")
}

async function main() {
  const violations = await findArchitectureViolations(process.cwd())
  if (violations.length === 0) {
    console.log("Architecture check passed.")
    return
  }

  console.error(violations.map(formatArchitectureViolation).join("\n\n"))
  process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
