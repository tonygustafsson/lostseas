// Scans the source for every colour in use (theme tokens, Tailwind palette
// classes and literal values) and writes the result for the colour usage story.
// Run with `npm run scan:colors`.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = join(import.meta.dirname, "..", "..")
const SOURCES = [
  "app",
  "components",
  "hooks",
  "utils",
  "constants",
  "lib",
  "types",
  "styles",
  "fonts.ts",
]
const EXTENSIONS = [".ts", ".tsx", ".css"]
const OUTPUT = join(ROOT, "stories", "design", "colorUsage.data.ts")

const PALETTE_NAMES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]
const SPECIAL_COLORS = ["white", "black", "transparent", "current", "inherit"]
const UTILITIES = [
  "bg",
  "text",
  "border",
  "border-x",
  "border-y",
  "border-t",
  "border-r",
  "border-b",
  "border-l",
  "border-s",
  "border-e",
  "from",
  "via",
  "to",
  "ring",
  "ring-offset",
  "inset-ring",
  "fill",
  "stroke",
  "outline",
  "shadow",
  "inset-shadow",
  "drop-shadow",
  "text-shadow",
  "divide",
  "decoration",
  "placeholder",
  "caret",
  "accent",
]

const listFiles = (path) => {
  const stats = statSync(path)
  if (stats.isFile()) {
    return EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : []
  }

  return readdirSync(path).flatMap((name) => listFiles(join(path, name)))
}

const css = readFileSync(join(ROOT, "styles", "globals.css"), "utf8")
const themeTokens = [
  ...new Set([...css.matchAll(/--color-([\w-]+):/g)].map((match) => match[1])),
]
const cssColorVars = new Set(
  [...css.matchAll(/^\s*--([\w-]+):\s*(oklch|#|rgb|hsl)/gm)].map(
    (match) => match[1]
  )
)

const escape = (value) => value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
const byLength = (a, b) => b.length - a.length
const colorPattern = [
  ...themeTokens.sort(byLength).map(escape),
  `(?:${PALETTE_NAMES.join("|")})-(?:50|[1-9]00|950)`,
  ...SPECIAL_COLORS,
].join("|")
const classRegex = new RegExp(
  `(?<=^|[\\s"'\`:!{(,])(${UTILITIES.sort(byLength).map(escape).join("|")})-(${colorPattern})(?:/(\\d+|\\[[^\\]]+\\]))?(?![\\w-])`,
  "g"
)
const varRegex = /var\(--([\w-]+)/g
const hexRegex =
  /(?<=["'\s(,:])#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g
const functionRegex =
  /(?<![a-zA-Z-])(rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(/g
const namedRegex = /\b(?:fill|stroke|color)=["'](white|black)["']/g
const opacityRegex = /(?<![\w-])opacity-(\d+)(?![\w-])|\bopacity:\s*(0?\.\d+)/g

const usages = new Map()
const elementOpacity = {}

const record = ({
  key,
  kind,
  name,
  token,
  css: swatch,
  variant,
  utility,
  file,
}) => {
  const entry = usages.get(key) ?? {
    kind,
    name,
    token,
    css: swatch,
    count: 0,
    variants: {},
    utilities: {},
    files: {},
  }

  entry.count += 1
  if (variant) entry.variants[variant] = (entry.variants[variant] ?? 0) + 1
  if (utility) entry.utilities[utility] = (entry.utilities[utility] ?? 0) + 1
  entry.files[file] = (entry.files[file] ?? 0) + 1
  usages.set(key, entry)
}

const readFunction = (text, start) => {
  let depth = 0

  for (let index = start; index < text.length; index++) {
    if (text[index] === "(") depth++
    if (text[index] === ")") depth--
    if (depth === 0 && text[index] === ")") return text.slice(start, index + 1)
  }

  return text.slice(start)
}

const toPercent = (alpha) =>
  alpha.endsWith("%") ? parseFloat(alpha) : Math.round(parseFloat(alpha) * 100)

// Reads the alpha of a colour literal as an opacity variant, eg "/48"
const readAlpha = (literal) => {
  const slash = literal.match(/\/\s*([\d.]+%?)\s*\)$/)
  const comma = literal.match(
    /^(?:rgba|hsla)\((?:[^,]+,){3}\s*([\d.]+%?)\s*\)$/
  )
  const alpha = slash?.[1] ?? comma?.[1]
  if (!alpha) return undefined

  return `/${toPercent(alpha)}`
}

const normaliseHex = (hex) => {
  const value = hex.toLowerCase()
  if (value.length > 4) return `#${value}`

  return `#${[...value].map((char) => char + char).join("")}`
}

const stripDeclarations = (text, file) => {
  if (!file.endsWith("globals.css")) return text

  // Token definitions and @theme mappings are not usages
  return text.replace(/^\s*--[\w-]+:[^;]*;/gm, "")
}

const scanFile = (path) => {
  const file = relative(ROOT, path).replaceAll("\\", "/")
  const text = stripDeclarations(readFileSync(path, "utf8"), file)

  for (const match of text.matchAll(classRegex)) {
    const [, utility, color, opacity] = match
    const isToken = themeTokens.includes(color)
    const isSpecial = SPECIAL_COLORS.includes(color)

    record({
      key: `class:${color}`,
      kind: isToken ? "token" : "palette",
      name: color,
      token: isSpecial ? color : `--color-${color}`,
      css:
        color === "current"
          ? "currentColor"
          : color === "transparent" || color === "inherit"
            ? color
            : `var(--color-${color})`,
      variant: opacity ? `/${opacity}` : undefined,
      utility,
      file,
    })
  }

  for (const match of text.matchAll(varRegex)) {
    const name = match[1].replace(/^color-/, "")
    if (!themeTokens.includes(name) && !cssColorVars.has(name)) continue

    record({
      key: `class:${name}`,
      kind: "token",
      name,
      token: `--color-${name}`,
      css: `var(--${name})`,
      utility: "var()",
      file,
    })
  }

  for (const match of text.matchAll(hexRegex)) {
    const value = normaliseHex(match[1])

    record({
      key: `literal:${value}`,
      kind: "literal",
      name: value,
      token: "Hex literal",
      css: value,
      variant:
        value.length === 9
          ? `/${Math.round((parseInt(value.slice(7), 16) / 255) * 100)}`
          : undefined,
      file,
    })
  }

  for (const match of text.matchAll(functionRegex)) {
    const value = readFunction(text, match.index + match[1].length)
    const literal = `${match[1]}${value}`.replace(/\s+/g, " ")
    const normalised = literal.replace(/\s*,\s*/g, ", ")

    record({
      key: `literal:${normalised}`,
      kind: literal.includes("var(") ? "derived" : "literal",
      name: normalised,
      token: literal.includes("var(")
        ? "Derived from token"
        : "Function literal",
      css: normalised,
      variant: readAlpha(normalised),
      file,
    })
  }

  for (const match of text.matchAll(opacityRegex)) {
    const value = match[1] ?? `${toPercent(match[2])}`
    elementOpacity[value] = (elementOpacity[value] ?? 0) + 1
  }

  for (const match of text.matchAll(namedRegex)) {
    record({
      key: `literal:${match[1]}`,
      kind: "literal",
      name: match[1],
      token: "Named literal",
      css: match[1],
      file,
    })
  }
}

SOURCES.flatMap((source) => listFiles(join(ROOT, source))).forEach(scanFile)

const colors = [...usages.values()].sort((a, b) => b.count - a.count)
const output = `// Generated by scripts/scan-colors. Do not edit by hand.

export type ColorUsage = {
  kind: "token" | "palette" | "literal" | "derived"
  name: string
  token: string
  css: string
  count: number
  variants: Record<string, number>
  utilities: Record<string, number>
  files: Record<string, number>
}

export const scannedAt = ${JSON.stringify(new Date().toISOString().slice(0, 10))}

// Opacity applied to whole elements (opacity-* classes and inline styles)
// prettier-ignore
export const elementOpacity: Record<string, number> = ${JSON.stringify(elementOpacity, null, 2)}

// prettier-ignore
export const colorUsage: ColorUsage[] = ${JSON.stringify(colors, null, 2)}
`

writeFileSync(OUTPUT, output)
console.log(`Found ${colors.length} colours in ${relative(ROOT, OUTPUT)}`)
