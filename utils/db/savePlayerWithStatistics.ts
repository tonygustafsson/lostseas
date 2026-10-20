import { savePlayer, saveStatistics } from "@/firebase/db"
import { getScore } from "@/utils/score"

export const savePlayerWithStatistics = async (
  player: Player,
  log?: string,
  options?: { resetHistory?: boolean }
) => {
  const updatedPlayer = await savePlayer(player, log, options)

  try {
    await saveStatistics(updatedPlayer.id, {
      day: updatedPlayer.character.day,
      gold: updatedPlayer.character.gold || 0,
      score: getScore(updatedPlayer),
      crewMembers: updatedPlayer.crewMembers.count || 0,
      ships: Object.keys(updatedPlayer.ships || {}).length,
    })
  } catch (error) {
    console.error("Failed to save player statistics", error)
  }

  return updatedPlayer
}
