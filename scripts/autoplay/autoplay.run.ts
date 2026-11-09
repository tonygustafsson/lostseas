import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

import { it } from "vitest"

import { playGame } from "./bot"
import { fuzzActions } from "./fuzz"
import { createReport, formatReport, toJson } from "./report"

const option = (name: string, fallback: number) => {
  const value = Number(process.env[name])

  return Number.isFinite(value) && value > 0 ? value : fallback
}

const GAMES = option("AUTOPLAY_GAMES", 100)
const DAYS = option("AUTOPLAY_DAYS", 400)
const SEED = option("AUTOPLAY_SEED", 1)
const TRACE = process.env.AUTOPLAY_TRACE === "1"

const OUTPUT = path.resolve(__dirname, "../../output/autoplay/report.json")

it(`plays ${GAMES} games of ${DAYS} days from seed ${SEED}`, () => {
  const started = performance.now()
  const report = createReport()

  for (let seed = SEED; seed < SEED + GAMES; seed++) {
    playGame(
      seed,
      DAYS,
      report,
      TRACE ? (line) => console.log(line) : undefined
    )
  }

  fuzzActions(report)

  mkdirSync(path.dirname(OUTPUT), { recursive: true })
  writeFileSync(OUTPUT, toJson(report))

  console.log(formatReport(report, (performance.now() - started) / 1000))
  console.log(`\nFull report: ${OUTPUT}`)
})
