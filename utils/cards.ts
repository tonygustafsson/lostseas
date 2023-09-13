import { randomInt } from "crypto"

import {
  CARDS_JACKPOT_MULTIPLIER,
  CARDS_RANDOM_MAX,
  CARDS_RANDOM_MIN,
  CARDS_WON_MULTIPLIER_MAX,
  CARDS_WON_MULTIPLIER_MIN,
} from "@/constants/tavern"

type CardsResult = "won" | "lost" | "jackpot"

export const getRandomCardsResult: () => CardsResult = () => {
  const chance = randomInt(CARDS_RANDOM_MIN, CARDS_RANDOM_MAX)

  if (chance <= 7) {
    return "won"
  }

  if (chance === 40) {
    return "jackpot"
  }

  return "lost"
}

export const getCardsReturns = (result: CardsResult, bet: number) => {
  switch (result) {
    case "won":
      return Math.floor(
        bet * randomInt(CARDS_WON_MULTIPLIER_MIN, CARDS_WON_MULTIPLIER_MAX)
      )
    case "jackpot":
      return Math.floor(bet * CARDS_JACKPOT_MULTIPLIER)
    default:
      return -bet
  }
}

export const getBet = (percentage: number, gold: number) => {
  if (percentage === 100) return gold

  return Math.floor((percentage / 100) * gold)
}
