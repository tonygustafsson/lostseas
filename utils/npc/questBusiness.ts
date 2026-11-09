import { TOWNS } from "@/constants/locations"

const hasBusiness = (quest: Quest, player: Player, npc: Npc) => {
  switch (quest.type) {
    case "delivery":
      return npc.id === quest.targetNpcId

    case "procurement":
      return (
        npc.id === quest.giverId &&
        (player.inventory?.[quest.item] ?? 0) >= quest.quantity
      )

    case "messageChain":
      return npc.id === quest.stepNpcIds[quest.step]

    case "findPerson":
      if (quest.found) {
        return npc.id === quest.giverId
      }

      // Tavern and market folk in the nation's towns know who comes and goes
      return (
        npc.placement !== "governor" &&
        npc.id !== quest.giverId &&
        TOWNS[npc.town].nation === quest.nation &&
        !quest.ruledOut?.includes(npc.town)
      )
  }
}

/**
 * The quest the player has to settle with this NPC, oldest first.
 * skipProcurement passes over goods the player chose to keep for now.
 */
export const getQuestBusiness = (
  player: Player,
  npc: Npc,
  skipProcurement = false
) =>
  Object.values(player.quests ?? {})
    .filter(
      (quest) =>
        !(skipProcurement && quest.type === "procurement") &&
        hasBusiness(quest, player, npc)
    )
    .sort((a, b) => a.acceptedDay - b.acceptedDay)[0] as Quest | undefined
