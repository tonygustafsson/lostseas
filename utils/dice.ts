import { randomInt } from "crypto"

import {
  DICE_JACKPOT_MULTIPLIER,
  DICE_RANDOM_MAX,
  DICE_RANDOM_MIN,
  DICE_WON_MULTIPLIER_MAX,
  DICE_WON_MULTIPLIER_MIN,
} from "@/constants/tavern"

type DiceResult = "won" | "lost" | "jackpot"

export const getRandomDiceResults: () => DiceResult = () => {
  const chance = randomInt(DICE_RANDOM_MIN, DICE_RANDOM_MAX)

  if (chance <= 7) {
    return "won"
  }

  if (chance === 40) {
    return "jackpot"
  }

  return "lost"
}

export const getDiceReturns = (result: DiceResult, bet: number) => {
  switch (result) {
    case "won":
      return Math.floor(
        bet * randomInt(DICE_WON_MULTIPLIER_MIN, DICE_WON_MULTIPLIER_MAX)
      )
    case "jackpot":
      return Math.floor(bet * DICE_JACKPOT_MULTIPLIER)
    default:
      return -bet
  }
}

export const getBet = (percentage: number, doubloons: number) => {
  if (percentage === 100) return doubloons

  return Math.floor((percentage / 100) * doubloons)
}
