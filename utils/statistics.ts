import type { LeaderboardEntry, StatisticsEntry } from "@/firebase/db"

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

/** Wins and losses against each nation and the pirates you have fought */
export const getBattleRecordByNation = (battles: Character["battles"]) =>
  (
    Object.entries(battles || {}) as [
      Nation | "Pirate",
      { won?: number; lost?: number },
    ][]
  )
    .map(([nation, record]) => ({
      nation,
      won: record?.won || 0,
      lost: record?.lost || 0,
    }))
    .filter(({ won, lost }) => won + lost > 0)

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

export const getLeaderboardEntry = (player: Player): LeaderboardEntry => ({
  name: player.character.name,
  characterId: player.character.characterId,
  title: player.character.title,
  nationality: player.character.nationality,
  score: getScore(player),
  day: player.character.day,
})
