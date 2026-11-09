/** Where the bot's gold came from, summed over every game */
export type IncomeSource =
  | "plunder"
  | "quests"
  | "titles"
  | "treasures"
  | "bounties"
  | "ventures"
  | "cards"
  | "brawls"
  | "sales"

type Problem = { count: number; example: string }

export const createReport = () => ({
  games: 0,
  daysPlayed: [] as number[],
  netWorth: [] as number[],
  scores: [] as number[],
  finalTitles: {} as Partial<Record<Title, number>>,
  /** The day each title was first reached, one entry per game that got there */
  titleDays: {} as Partial<Record<Title, number[]>>,
  enemyWins: [] as number[],
  income: {} as Partial<Record<IncomeSource, number>>,
  battles: { won: 0, lost: 0, fled: 0, failedToFlee: 0, ignored: 0 },
  attacks: { enemy: 0, neutral: 0 },
  sunkShips: 0,
  goldLostInDefeats: 0,
  cards: { played: 0, staked: 0, paidOut: 0 },
  ventures: {} as Partial<Record<VentureId, { staked: number; paid: number }>>,
  quests: { offered: 0, accepted: 0, completed: 0, abandoned: 0 },
  loans: 0,
  resets: [] as string[],
  blockedDepartures: {} as Record<string, number>,
  /** Broken rules, unexpected errors and exceptions: these are the bugs */
  problems: new Map<string, Problem>(),
  /** Every error message an action returned, expected or not */
  errors: new Map<string, number>(),
  /** Junk input that an action accepted instead of rejecting */
  acceptedJunk: [] as string[],
})

export type Report = ReturnType<typeof createReport>

export const addProblem = (
  report: Report,
  problem: string,
  example: string
) => {
  const known = report.problems.get(problem)

  if (known) {
    known.count++
  } else {
    report.problems.set(problem, { count: 1, example })
  }
}

export const addIncome = (
  report: Report,
  source: IncomeSource,
  gold: number
) => {
  report.income[source] = (report.income[source] ?? 0) + gold
}

export const countUp = (counts: Record<string, number>, key: string) => {
  counts[key] = (counts[key] ?? 0) + 1
}

const percentile = (values: number[], share: number) => {
  if (!values.length) {
    return "-"
  }

  const sorted = [...values].sort((a, b) => a - b)

  return sorted[Math.min(sorted.length - 1, Math.floor(share * sorted.length))]
}

const spread = (values: number[]) =>
  `p10 ${percentile(values, 0.1)}, median ${percentile(values, 0.5)}, p90 ${percentile(values, 0.9)}, max ${percentile(values, 1)}`

const ratio = (paid: number, staked: number) =>
  staked ? (paid / staked).toFixed(2) : "-"

const section = (title: string, lines: string[]) =>
  [`\n${title}`, ...lines.map((line) => `  ${line}`)].join("\n")

/** Plain text summary for the terminal. The JSON file holds everything. */
export const formatReport = (report: Report, seconds: number) => {
  const perGame = (total = 0) => Math.round(total / (report.games || 1))
  const income = Object.entries(report.income).sort(([, a], [, b]) => b - a)
  const incomeTotal = income.reduce((sum, [, gold]) => sum + gold, 0)

  return [
    `Lost Seas autoplay: ${report.games} games in ${seconds.toFixed(1)} s`,

    section("Problems (bugs to look at)", [
      ...(report.problems.size ? [] : ["None found"]),
      ...[...report.problems].map(
        ([problem, { count, example }]) => `${count}x ${problem} (${example})`
      ),
      ...report.acceptedJunk.map((junk) => `Accepted junk input: ${junk}`),
    ]),

    section("Progress", [
      `Days played: ${spread(report.daysPlayed)}`,
      `Net worth: ${spread(report.netWorth)}`,
      `Score: ${spread(report.scores)}`,
      `Enemy wins per game: ${spread(report.enemyWins)}`,
      `Final titles: ${JSON.stringify(report.finalTitles)}`,
      ...Object.entries(report.titleDays).map(
        ([title, days]) =>
          `${title} reached in ${days.length} games, median day ${percentile(days, 0.5)}`
      ),
    ]),

    section(
      "Income per game",
      income.map(
        ([source, gold]) =>
          `${source}: ${perGame(gold)} gold (${Math.round((gold / incomeTotal) * 100)}%)`
      )
    ),

    section("Gambling and investments", [
      `Cards: ${report.cards.played} games, pays back ${ratio(report.cards.paidOut, report.cards.staked)}x the stake`,
      ...Object.entries(report.ventures).map(
        ([id, { staked, paid }]) =>
          `${id}: pays back ${ratio(paid, staked)}x the stake`
      ),
    ]),

    section("Sea", [
      `Battles: ${JSON.stringify(report.battles)}`,
      `Attacks: ${JSON.stringify(report.attacks)}`,
      `Ships sunk: ${report.sunkShips}, gold lost in defeats: ${perGame(report.goldLostInDefeats)} per game`,
    ]),

    section("Town", [
      `Quests: ${JSON.stringify(report.quests)}`,
      `Loans taken: ${report.loans}`,
      `Departures blocked by: ${JSON.stringify(report.blockedDepartures)}`,
      `Resets (stuck games): ${report.resets.length}`,
      ...report.resets.slice(0, 10).map((reset) => `  ${reset}`),
    ]),
  ].join("\n")
}

/** Maps are turned into objects so the JSON file is readable. */
export const toJson = (report: Report) =>
  JSON.stringify(
    {
      ...report,
      problems: Object.fromEntries(report.problems),
      errors: Object.fromEntries(
        [...report.errors].sort(([, a], [, b]) => b - a)
      ),
    },
    null,
    2
  )
