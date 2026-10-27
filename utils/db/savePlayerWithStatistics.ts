import { savePlayer, saveStatistics } from "@/firebase/db"
import { getStatisticsSnapshot } from "@/utils/statistics"

export const savePlayerWithStatistics = async (
  player: Player,
  log?: GameLog,
  options?: { resetHistory?: boolean }
) => {
  const updatedPlayer = await savePlayer(player, log, options)

  try {
    await saveStatistics(updatedPlayer.id, getStatisticsSnapshot(updatedPlayer))
  } catch (error) {
    console.error("Failed to save player statistics", error)
  }

  return updatedPlayer
}
