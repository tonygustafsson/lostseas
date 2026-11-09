import {
  DONE_TALKING_LINES,
  TIRED_CHANCE,
  TIRED_LINES,
} from "@/constants/dialogue"
import { TOWNS } from "@/constants/locations"
import { getNpcById, PLACEMENT_LOCATION } from "@/constants/npcs"
import { MAX_ACTIVE_QUESTS, QUEST_LINES } from "@/constants/quests"
import { getCargo } from "@/utils/cargo"
import { generateQuest, targetExtras } from "@/utils/npc/generateQuest"
import { findDialogue, pickDialogue } from "@/utils/npc/pickDialogue"
import {
  pickPlaceholderValues,
  resolvePlaceholders,
} from "@/utils/npc/placeholders"
import { getQuestBusiness } from "@/utils/npc/questBusiness"
import { goodsName } from "@/utils/npc/questText"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt, pickRandom } from "@/utils/random"

import type { ActionResult, RandomInt } from "./types"

export { MAX_ACTIVE_QUESTS }

/** One in this many visits, an NPC has a favour to ask */
const QUEST_CHANCE = 10

export type TalkLine =
  // A tired NPC adds a farewell to show they have nothing more to say
  | { kind: "statement"; text: string; farewell?: string }
  | { kind: "question"; text: string; answers: string[]; farewell?: string }
  // Said for the rest of the visit once the NPC has tired of talking
  | { kind: "tired"; text: string }
  | { kind: "questOffer"; text: string; quest: Quest }
  | { kind: "handIn"; text: string; quest: Quest }
  | {
      kind: "questProgress"
      text: string
      quest: Quest
      completed: boolean
      reward?: QuestReward
    }

const NO_ONE_HERE = "There is no one by that name here."

/** The NPC, if the player is standing in the same building */
const findNpcHere = (player: Player, npcId: string) => {
  const npc = typeof npcId === "string" ? getNpcById(npcId) : undefined

  if (
    !npc ||
    npc.town !== player.character.town ||
    player.character.location !== PLACEMENT_LOCATION[npc.placement]
  ) {
    return undefined
  }

  return npc
}

const getConversation = (player: Player, npc: Npc): ConversationState =>
  player.locationStates?.conversations?.[npc.id] ?? {}

// Replaced as a whole, so an old offer or question never mixes with a new one
const setConversation = (
  player: Player,
  npc: Npc,
  conversation: ConversationState
): Player => ({
  ...player,
  locationStates: {
    ...player.locationStates,
    conversations: {
      ...player.locationStates?.conversations,
      [npc.id]: conversation,
    },
  },
})

const giverName = (quest: Quest) => {
  const giver = getNpcById(quest.giverId)!

  return `${giver.name} of ${giver.town}`
}

type QuestProgress = { player: Player; line: TalkLine; log?: GameLog }

/** Settles quest business with the NPC */
const progressQuest = (
  player: Player,
  npc: Npc,
  quest: Quest,
  randomInt: RandomInt
): QuestProgress => {
  const say = (lines: string[], extra?: Record<string, string>) =>
    resolvePlaceholders(
      pickRandom(lines, randomInt),
      { player, town: npc.town, extra },
      randomInt
    )

  const advance = (text: string, patch: DeepPartial<Quest>) => {
    const updated = patchDeep<Quest>(quest, patch)

    return {
      player: patchDeep<Player>(player, { quests: { [quest.id]: updated } }),
      line: { kind: "questProgress", text, quest: updated, completed: false },
    } satisfies QuestProgress
  }

  const complete = (
    text: string,
    inventory: Partial<Inventory> = {}
  ): QuestProgress => {
    // Like loot, reward goods only fill the free hold space and the rest is left behind
    const { free } = getCargo({
      ships: player.ships,
      inventory: { ...player.inventory, ...inventory },
    })
    const fittingQuantity = Math.min(
      quest.reward.item?.quantity ?? 0,
      Math.max(free, 0)
    )
    const reward: QuestReward =
      quest.reward.item && fittingQuantity > 0
        ? {
            ...quest.reward,
            item: { ...quest.reward.item, quantity: fittingQuantity },
          }
        : { gold: quest.reward.gold }
    const rewardItem = reward.item
      ? {
          [reward.item.name]:
            (inventory[reward.item.name] ??
              player.inventory?.[reward.item.name] ??
              0) + reward.item.quantity,
        }
      : {}

    return {
      player: patchDeep<Player>(player, {
        character: {
          gold: player.character.gold + reward.gold,
          questsCompleted: (player.character.questsCompleted ?? 0) + 1,
        },
        inventory: { ...inventory, ...rewardItem },
        quests: { [quest.id]: null },
      }),
      line: { kind: "questProgress", text, quest, completed: true, reward },
      log: {
        type: "quest",
        message: `Completed a quest for ${giverName(quest)}.`,
      },
    }
  }

  switch (quest.type) {
    case "delivery":
      return complete(
        say(QUEST_LINES.deliveryComplete, { parcel: quest.parcel })
      )

    case "procurement":
      return complete(
        say(QUEST_LINES.procurementComplete, {
          quantity: String(quest.quantity),
          item: goodsName(quest.item),
        }),
        {
          [quest.item]: (player.inventory?.[quest.item] ?? 0) - quest.quantity,
        }
      )

    case "messageChain": {
      const next = quest.stepNpcIds[quest.step + 1]

      if (!next) {
        return complete(say(QUEST_LINES.chainComplete))
      }

      return advance(
        say(QUEST_LINES.chainStep, targetExtras(getNpcById(next)!)),
        { step: quest.step + 1 }
      )
    }

    case "findPerson": {
      const person = quest.personName

      if (quest.found) {
        return complete(say(QUEST_LINES.findComplete, { person }))
      }

      if (npc.town === quest.hiddenTown) {
        return advance(say(QUEST_LINES.findFound, { person }), { found: true })
      }

      const ruledOut = [...(quest.ruledOut ?? []), npc.town]

      // Now and then they also know a town where the person is not
      const hintTowns = (Object.keys(TOWNS) as Town[]).filter(
        (town) =>
          TOWNS[town].nation === quest.nation &&
          town !== quest.hiddenTown &&
          !ruledOut.includes(town)
      )

      if (hintTowns.length && randomInt(1, 2) === 1) {
        const hintTown = pickRandom(hintTowns, randomInt)

        return advance(say(QUEST_LINES.findHint, { person, hintTown }), {
          ruledOut: [...ruledOut, hintTown],
        })
      }

      return advance(say(QUEST_LINES.findNotHere, { person }), { ruledOut })
    }
  }
}

/**
 * Talks to an NPC: an open offer or quest business first, then an offer, a
 * question or a statement. skipHandIn chats instead of asking for the goods.
 */
export const talkTo = (
  player: Player,
  { npcId, skipHandIn }: { npcId: string; skipHandIn?: boolean },
  randomInt: RandomInt = getRandomInt
): ActionResult<{ npcId: string; line: TalkLine }> => {
  const npc = findNpcHere(player, npcId)

  if (!npc) {
    return { error: NO_ONE_HERE }
  }

  const conversation = getConversation(player, npc)
  const quest = getQuestBusiness(player, npc)

  // An offer left open, eg by closing the dialog, comes back
  if (conversation.questOffer) {
    const offer = conversation.questOffer

    return {
      player,
      data: {
        npcId: npc.id,
        line: { kind: "questOffer", text: offer.pitch, quest: offer },
      },
    }
  }

  // Goods are only handed over when the player says so
  if (quest?.type === "procurement" && !skipHandIn) {
    return {
      player,
      data: {
        npcId: npc.id,
        line: {
          kind: "handIn",
          text: resolvePlaceholders(
            pickRandom(QUEST_LINES.procurementAsk, randomInt),
            {
              player,
              town: npc.town,
              extra: {
                quantity: String(quest.quantity),
                item: goodsName(quest.item),
              },
            },
            randomInt
          ),
          quest,
        },
      },
    }
  }

  if (quest && quest.type !== "procurement") {
    const progress = progressQuest(player, npc, quest, randomInt)

    return {
      player: progress.player,
      log: progress.log,
      data: {
        npcId: npc.id,
        line: progress.line,
      },
    }
  }

  const context = { player, town: npc.town }
  const resolve = (text: string, extra?: Record<string, string>) =>
    resolvePlaceholders(text, { ...context, extra }, randomInt)

  if (conversation.tired) {
    return {
      player,
      data: {
        npcId: npc.id,
        line: {
          kind: "tired",
          text: resolve(pickRandom(DONE_TALKING_LINES, randomInt)),
        },
      },
    }
  }

  const saidIds = conversation.saidIds
  const activeQuests = Object.keys(player.quests ?? {}).length

  // Rolled on the first chat of the visit only, so talking on never fishes for quests
  const hasQuest =
    !conversation.questRolled &&
    activeQuests < MAX_ACTIVE_QUESTS &&
    randomInt(1, QUEST_CHANCE) === 1

  if (hasQuest) {
    const offer = generateQuest(npc, player, randomInt)

    return {
      player: setConversation(player, npc, {
        questRolled: true,
        ...(saidIds && { saidIds }),
        questOffer: offer,
      }),
      data: {
        npcId: npc.id,
        line: { kind: "questOffer", text: offer.pitch, quest: offer },
      },
    }
  }

  const entry = pickDialogue(
    npc,
    saidIds ?? [],
    randomInt(1, 2) === 1,
    randomInt
  )
  const nextSaidIds = [...(saidIds ?? []), entry.id]
  // Once tired, the NPC stays that way until the player sails
  const tired = randomInt(1, TIRED_CHANCE) === 1
  const farewell = tired
    ? { farewell: resolve(pickRandom(TIRED_LINES, randomInt)) }
    : {}

  if (entry.answers) {
    // Picked once, so a town or good named in the question is the same in the reply
    const values = pickPlaceholderValues(
      [
        entry.text,
        ...entry.answers.flatMap((answer) => [answer.text, ...answer.replies]),
      ],
      context,
      randomInt
    )
    const hasValues = Object.keys(values).length > 0

    return {
      player: setConversation(player, npc, {
        questRolled: true,
        ...(tired && { tired }),
        saidIds: nextSaidIds,
        pendingQuestionId: entry.id,
        ...(hasValues && { pendingValues: values }),
      }),
      data: {
        npcId: npc.id,
        line: {
          kind: "question",
          text: resolve(entry.text, values),
          answers: entry.answers.map((answer) => resolve(answer.text, values)),
          ...farewell,
        },
      },
    }
  }

  return {
    player: setConversation(player, npc, {
      questRolled: true,
      ...(tired && { tired }),
      saidIds: nextSaidIds,
    }),
    data: {
      npcId: npc.id,
      line: { kind: "statement", text: resolve(entry.text), ...farewell },
    },
  }
}

/** Hands over the goods for a procurement quest */
export const handInQuest = (
  player: Player,
  { npcId }: { npcId: string },
  randomInt: RandomInt = getRandomInt
): ActionResult<{ npcId: string; line: TalkLine }> => {
  const npc = findNpcHere(player, npcId)

  if (!npc) {
    return { error: NO_ONE_HERE }
  }

  const quest = getQuestBusiness(player, npc)

  if (quest?.type !== "procurement") {
    return { error: "You have nothing to hand over." }
  }

  const progress = progressQuest(player, npc, quest, randomInt)

  return {
    player: progress.player,
    log: progress.log,
    data: {
      npcId: npc.id,
      line: progress.line,
    },
  }
}

/** Answers the NPC's question */
export const answerNpc = (
  player: Player,
  { npcId, answerIndex }: { npcId: string; answerIndex: number },
  randomInt: RandomInt = getRandomInt
): ActionResult<{ reply: string }> => {
  const npc = findNpcHere(player, npcId)

  if (!npc) {
    return { error: NO_ONE_HERE }
  }

  const { pendingQuestionId, pendingValues, ...conversation } = getConversation(
    player,
    npc
  )
  const question = pendingQuestionId
    ? findDialogue(npc, pendingQuestionId)
    : undefined

  if (!question?.answers) {
    return { error: "There is no question to answer." }
  }

  const answer = Number.isInteger(answerIndex)
    ? question.answers[answerIndex]
    : undefined

  if (!answer) {
    return { error: "Not a valid answer." }
  }

  return {
    player: setConversation(player, npc, conversation),
    data: {
      reply: resolvePlaceholders(
        pickRandom(answer.replies, randomInt),
        { player, town: npc.town, extra: pendingValues },
        randomInt
      ),
    },
  }
}

/** Takes on the quest the NPC just offered. */
export const acceptQuest = (
  player: Player,
  { npcId }: { npcId: string },
  randomInt: RandomInt = getRandomInt
): ActionResult<{ quest: Quest; text: string }> => {
  const npc = findNpcHere(player, npcId)

  if (!npc) {
    return { error: NO_ONE_HERE }
  }

  const { questOffer, ...conversation } = getConversation(player, npc)

  if (!questOffer) {
    return { error: "There is no quest to accept." }
  }

  if (Object.keys(player.quests ?? {}).length >= MAX_ACTIVE_QUESTS) {
    return { error: `You already have ${MAX_ACTIVE_QUESTS} active quests.` }
  }

  const quest = { ...questOffer, acceptedDay: player.character.day }

  return {
    player: patchDeep<Player>(setConversation(player, npc, conversation), {
      quests: { [quest.id]: quest },
    }),
    log: {
      type: "quest",
      message: `Accepted a quest from ${giverName(quest)}.`,
    },
    data: {
      quest,
      text: resolvePlaceholders(
        pickRandom(QUEST_LINES.accept, randomInt),
        { player, town: npc.town },
        randomInt
      ),
    },
  }
}

/** Turns down the quest the NPC just offered. */
export const declineQuest = (
  player: Player,
  { npcId }: { npcId: string },
  randomInt: RandomInt = getRandomInt
): ActionResult<{ text: string }> => {
  const npc = findNpcHere(player, npcId)

  if (!npc) {
    return { error: NO_ONE_HERE }
  }

  const { questOffer, ...conversation } = getConversation(player, npc)

  if (!questOffer) {
    return { error: "There is no quest to decline." }
  }

  return {
    player: setConversation(player, npc, conversation),
    data: {
      text: resolvePlaceholders(
        pickRandom(QUEST_LINES.decline, randomInt),
        { player, town: npc.town },
        randomInt
      ),
    },
  }
}

/** Gives up a quest. It works anywhere and costs nothing. */
export const abandonQuest = (
  player: Player,
  { questId }: { questId: string }
): ActionResult<{ quest: Quest }> => {
  const quest =
    typeof questId === "string" && Object.hasOwn(player.quests ?? {}, questId)
      ? player.quests![questId]
      : undefined

  if (!quest) {
    return { error: "There is no such quest.", status: 404 }
  }

  return {
    player: patchDeep<Player>(player, { quests: { [questId]: null } }),
    log: {
      type: "quest",
      message: `Abandoned a quest for ${giverName(quest)}.`,
    },
    data: { quest },
  }
}
