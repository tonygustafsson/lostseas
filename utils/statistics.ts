import type { StatisticsEntry } from "@/firebase/db"

import { getMannedCannons } from "./crew"
import { getNetWorth, getScore, getScoreBreakdown } from "./score"

export const getBattleTotals = (battles: Character["battles"]) =>
  Object.values(battles || {}).reduce<{ won: number; lost: number }>(
    (totals, record) => ({
      won: totals.won + (record?.won || 0),
      lost: totals.lost + (record?.lost || 0),
    }),
    { won: 0, lost: 0 }
  )

/** Entries that recorded all the given metrics. Older entries lack newer metrics. */
export const withMetrics = (
  entries: StatisticsEntry[],
  metrics: (keyof StatisticsEntry)[]
) => entries.filter((entry) => metrics.every((key) => entry[key] != null))

export const getStatisticsSnapshot = (
  player: Player
): Omit<StatisticsEntry, "timestamp"> => {
  const breakdown = getScoreBreakdown(player)
  const battles = getBattleTotals(player.character.battles)
  const cannons = player.inventory?.cannons || 0

  return {
    day: player.character.day,
    score: getScore(player),
    netWorth: getNetWorth(player),
    scoreTitle: breakdown.title,
    scoreWealth: breakdown.wealth,
    scoreShips: breakdown.ships,
    scoreCannons: breakdown.cannons,
    mannedCannons: getMannedCannons(player.crewMembers.count, cannons),
    cannons,
    battlesWon: battles.won,
    battlesLost: battles.lost,
  }
}
