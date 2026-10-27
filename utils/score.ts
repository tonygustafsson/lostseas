import { VENTURES } from "@/constants/ventures"

import { getMannedCannons } from "./crew"

const TITLE_SCORE: Record<Title, number> = {
  Pirate: 0,
  Ensign: 50,
  Captain: 100,
  Major: 150,
  Colonel: 200,
  Admiral: 250,
  Baron: 300,
  Count: 350,
  Marquis: 400,
  Duke: 450,
}

/** Carried gold, bank savings and venture stakes, minus any loan */
export const getNetWorth = (player: Player) => {
  // Stakes at sea still belong to the player until the venture is collected
  const ventureStakes = (
    Object.keys(player.character.ventures || {}) as VentureId[]
  ).reduce((sum, ventureId) => sum + VENTURES[ventureId].stake, 0)

  return (
    player.character.gold +
    (player.character.account || 0) +
    ventureStakes -
    (player.character.loan || 0)
  )
}

export const getScoreBreakdown = (player: Player) => ({
  title: TITLE_SCORE[player.character.title] ?? 0,
  wealth: Math.floor(getNetWorth(player) / 500),
  ships: Object.keys(player.ships || {}).length * 10,
  cannons:
    getMannedCannons(player.crewMembers.count, player.inventory?.cannons || 0) *
    10,
})

export const getScore = (player: Player) => {
  const { title, wealth, ships, cannons } = getScoreBreakdown(player)

  return title + wealth + ships + cannons
}
