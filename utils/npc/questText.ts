import { MERCHANDISE } from "@/constants/merchandise"
import { getNpcById, getNpcPlace } from "@/constants/npcs"
import { formatGold } from "@/utils/number"

/** Goods as quest texts name them, eg "barrels of rum" */
export const goodsName = (item: keyof Inventory) =>
  `${MERCHANDISE[item].unit} of ${item}`

/** A quest reward, eg "900 gold and 10 barrels of rum" */
export const formatReward = ({ gold, item }: QuestReward) =>
  item
    ? `${formatGold(gold)} and ${item.quantity} ${goodsName(item.name)}`
    : formatGold(gold)

const describeNpc = (npcId: string) => {
  const npc = getNpcById(npcId)!

  return `${npc.name}, ${getNpcPlace(npc)}`
}

/** What the player has to do next for a quest, as shown in the Status drawer */
export const getQuestObjective = (quest: Quest) => {
  const giver = describeNpc(quest.giverId)

  switch (quest.type) {
    case "delivery":
      return `Deliver ${quest.parcel} to ${describeNpc(quest.targetNpcId)}`

    case "procurement":
      return `Bring ${quest.quantity} ${goodsName(quest.item)} to ${giver}`

    case "messageChain": {
      const { stepNpcIds, step } = quest

      if (step >= stepNpcIds.length - 1) {
        return `Return to ${giver}`
      }

      return `Speak to ${describeNpc(stepNpcIds[step])} (step ${step + 1} of ${stepNpcIds.length})`
    }

    case "findPerson":
      if (quest.found) {
        return `Return to ${giver}`
      }

      return `Find ${quest.personName} somewhere in ${quest.nation}'s towns`
  }
}
