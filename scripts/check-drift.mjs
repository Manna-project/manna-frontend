import { readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { pathToFileURL } from "node:url"
import ts from "typescript"
import { collectFiles, relativePath } from "./lib/files.mjs"

const sourceExtensions = new Set([".cts", ".mjs", ".mts", ".ts", ".tsx"])
const maximumPureLines = 250

function countPureLines(source) {
  return source
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.trimStart().startsWith("//")).length
}

function collectDebtComments(source) {
  const comments = []
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, source)

  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if (
      token === ts.SyntaxKind.SingleLineCommentTrivia ||
      token === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      const text = scanner.getTokenText()
      if (/\b(?:TODO|FIXME)\b/.test(text)) {
        comments.push({ position: scanner.getTokenPos(), text })
      }
    }
  }

  return comments
}

function lineNumberAt(source, position) {
  return source.slice(0, position).split("\n").length
}

export async function findDriftProblems(root) {
  const files = [
    ...(await collectFiles(path.join(root, "src"), sourceExtensions)),
    ...(await collectFiles(path.join(root, "scripts"), sourceExtensions)),
  ]
  const debtRegister = await readFile(path.join(root, "docs/exec-plans/tech-debt.md"), "utf8")
  const problems = []

  for (const filePath of files) {
    const source = await readFile(filePath, "utf8")
    const pureLines = countPureLines(source)
    if (pureLines > maximumPureLines) {
      problems.push(
        `${relativePath(root, filePath)} has ${pureLines} pure lines; split it below ${maximumPureLines}.`,
      )
    }

    for (const comment of collectDebtComments(source)) {
      const debtId = comment.text.match(/DEBT:([a-z0-9-]+)/)?.[1]
      const lineNumber = lineNumberAt(source, comment.position)
      if (!debtId) {
        problems.push(
          `${relativePath(root, filePath)}:${lineNumber} has TODO/FIXME without DEBT:<id>.`,
        )
      } else if (!debtRegister.includes(`[${debtId}]`)) {
        problems.push(
          `${relativePath(root, filePath)}:${lineNumber} references unregistered debt [${debtId}].`,
        )
      }
    }
  }

  return problems
}

async function main() {
  const problems = await findDriftProblems(process.cwd())
  if (problems.length === 0) {
    console.log("Drift check passed.")
    return
  }

  console.error(
    ["Repository drift detected:", ...problems.map((problem) => `- ${problem}`)].join("\n"),
  )
  process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
