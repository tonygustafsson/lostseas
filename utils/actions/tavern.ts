import { CARDS_PERCENTAGE_VALUES, TAVERN_ITEMS } from "@/constants/tavern"
import { increaseCrewMood } from "@/utils/crew"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt } from "@/utils/random"
import { canTreatCrew, getCardsBet } from "@/utils/tavern"

import type { ActionResult, RandomInt } from "./types"

export type TavernItem = keyof typeof TAVERN_ITEMS

export type CardsResult = "won" | "lost"

const NOT_AT_TAVERN = "You must be at Tavern to do this."

const getSailors = (player: Player) => ({
  numberOfSailors: player.locationStates?.tavern?.noOfSailors || 0,
  isHostile: player.locationStates?.tavern?.isHostile || false,
})

const clearSailors: DeepPartial<Player> = {
  locationStates: { tavern: { noOfSailors: 0 } },
}

export const treatCrew = (
  player: Player,
  { item }: { item: TavernItem }
): ActionResult<{
  item: TavernItem
  newMood: number
  newHealth: number
  totalPrice: number
}> => {
  if (typeof item !== "string" || !Object.hasOwn(TAVERN_ITEMS, item)) {
    return { error: "Not a valid item" }
  }

  if (player.character.location !== "Tavern") {
    return { error: NOT_AT_TAVERN }
  }

  const { label, price, healthIncrease, moodIncrease } = TAVERN_ITEMS[item]

  if (!player.crewMembers.count) {
    return { error: "You have no crew to treat." }
  }

  if (!canTreatCrew(player.crewMembers, TAVERN_ITEMS[item])) {
    return { error: `${label} would not improve your crew any further.` }
  }

  const totalPrice = price * player.crewMembers.count

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold" }
  }

  const newMood = increaseCrewMood(player.crewMembers.mood, moodIncrease)
  const newHealth = Math.min(player.crewMembers.health + healthIncrease, 100)

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      crewMembers: { mood: newMood, health: newHealth },
    }),
    log: `Tavern action "${label}" cost ${totalPrice} gold. New mood: ${newMood}, new health: ${newHealth}.`,
    data: { item, newMood, newHealth, totalPrice },
  }
}

export const acceptSailors = (
  player: Player
): ActionResult<{ numberOfSailors: number; isHostile: boolean }> => {
  if (player.character.location !== "Tavern") {
    return { error: NOT_AT_TAVERN }
  }

  const { numberOfSailors, isHostile } = getSailors(player)

  if (!numberOfSailors || isHostile) {
    return { error: "No sailors to accept" }
  }

  return {
    player: patchDeep<Player>(player, {
      ...clearSailors,
      crewMembers: { count: player.crewMembers.count + numberOfSailors },
    }),
    log: `Accepted ${numberOfSailors} new crew members.`,
    data: { numberOfSailors, isHostile },
  }
}

export const fightSailors = (
  player: Player,
  randomInt: RandomInt = getRandomInt
): ActionResult<{
  won: boolean
  numberOfSailors: number
  healthLoss: number
  loot?: number
}> => {
  if (player.character.location !== "Tavern") {
    return { error: NOT_AT_TAVERN }
  }

  const { numberOfSailors, isHostile } = getSailors(player)

  // Only hostile sailors can be fought. Friendly ones can be accepted or ignored.
  if (!numberOfSailors || !isHostile) {
    return { error: "No sailors to fight" }
  }

  // 70% chance to win
  const won = randomInt(1, 10) > 3
  const healthLoss = won ? randomInt(1, 9) : randomInt(10, 29)
  const health = Math.max(player.crewMembers.health - healthLoss, 0)

  if (!won) {
    return {
      player: patchDeep<Player>(player, {
        ...clearSailors,
        crewMembers: { health },
      }),
      log: `Fought sailors and lost; health loss ${healthLoss}.`,
      data: { won, numberOfSailors, healthLoss },
    }
  }

  const loot = randomInt(10, 99)

  return {
    player: patchDeep<Player>(player, {
      ...clearSailors,
      character: { gold: player.character.gold + loot },
      crewMembers: { health },
    }),
    log: `Fought sailors and won; loot ${loot}, health loss ${healthLoss}.`,
    data: { won, numberOfSailors, healthLoss, loot },
  }
}

export const ignoreSailors = (
  player: Player
): ActionResult<{ numberOfSailors: number }> => {
  if (player.character.location !== "Tavern") {
    return { error: NOT_AT_TAVERN }
  }

  const { numberOfSailors } = getSailors(player)

  if (!numberOfSailors) {
    return { error: "No sailors to ignore" }
  }

  return {
    player: patchDeep<Player>(player, clearSailors),
    data: { numberOfSailors },
  }
}

export const playCards = (
  player: Player,
  {
    betPercentage,
    selectedCard,
  }: { betPercentage: number; selectedCard: number },
  randomInt: RandomInt = getRandomInt
): ActionResult<{
  bet: number
  cardsResults: CardsResult
  cardsReturns: number
  selectedCard: number
  correctCard: number
  gold: number
}> => {
  if (
    !CARDS_PERCENTAGE_VALUES.includes(betPercentage) ||
    !Number.isInteger(selectedCard) ||
    selectedCard < 0 ||
    selectedCard >= 5
  ) {
    return { error: "Invalid card bet" }
  }

  if (player.character.location !== "Tavern") {
    return { error: NOT_AT_TAVERN }
  }

  const bet = getCardsBet(betPercentage, player.character.gold || 0)

  if (!Number.isSafeInteger(bet) || bet < 1) {
    return { error: "Bet must be at least 1 gold" }
  }

  if (player.character.gold < bet) {
    return { error: "Not enough gold" }
  }

  const correctCard = randomInt(0, 4)
  const cardsResults: CardsResult =
    selectedCard === correctCard ? "won" : "lost"
  const cardsReturns = cardsResults === "won" ? bet * 5 : -bet
  const gold = player.character.gold + cardsReturns

  return {
    player: patchDeep<Player>(player, { character: { gold } }),
    log: `Played cards: bet ${bet}, result ${cardsResults}. Gold change: ${cardsReturns}. New gold total: ${gold}.`,
    data: {
      bet,
      cardsResults,
      cardsReturns,
      selectedCard,
      correctCard,
      gold,
    },
  }
}
