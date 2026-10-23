import { LOAN_LIMIT } from "@/constants/bank"
import {
  isVentureId,
  type VentureOutcome,
  VENTURES,
} from "@/constants/ventures"
import { formatGold, isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt } from "@/utils/random"

import type { ActionResult, RandomInt } from "./types"

type AmountInput = { amount: number }

const NOT_AT_BANK = "You must be at Bank to do this."

const validateAmount = (player: Player, amount: unknown) => {
  if (!isPositiveSafeInteger(amount)) {
    return "Amount must be a positive whole number"
  }

  if (player.character.location !== "Bank") {
    return NOT_AT_BANK
  }
}

export const deposit = (
  player: Player,
  { amount }: AmountInput
): ActionResult<{ amount: number; gold: number }> => {
  const error = validateAmount(player, amount)

  if (error) {
    return { error }
  }

  if (player.character.loan) {
    return { error: "You cannot add funds until your loan is fully repaid." }
  }

  if (player.character.gold < amount) {
    return { error: "Not enough gold" }
  }

  const gold = player.character.gold - amount
  const account = (player.character.account || 0) + amount

  return {
    player: patchDeep<Player>(player, { character: { gold, account } }),
    log: `Deposited ${amount} gold into the bank. Current account balance: ${account} gold.`,
    data: { amount, gold },
  }
}

export const withdraw = (
  player: Player,
  { amount }: AmountInput
): ActionResult<{ amount: number; gold: number }> => {
  const error = validateAmount(player, amount)

  if (error) {
    return { error }
  }

  const currentAccount = player.character.account || 0

  if (currentAccount < amount) {
    return { error: "Not enough gold in bank account" }
  }

  const gold = player.character.gold + amount
  const account = currentAccount - amount

  return {
    player: patchDeep<Player>(player, { character: { gold, account } }),
    log: `Withdrew ${amount} gold from the bank. Current account balance: ${account} gold.`,
    data: { amount, gold },
  }
}

export const takeLoan = (
  player: Player,
  { amount }: AmountInput
): ActionResult<{ amount: number; gold: number; loan: number }> => {
  const error = validateAmount(player, amount)

  if (error) {
    return { error }
  }

  const loan = (player.character.loan || 0) + amount

  if (loan > LOAN_LIMIT) {
    return {
      error: `You cannot loan more than a total of ${formatGold(LOAN_LIMIT)}.`,
    }
  }

  const gold = player.character.gold + amount

  return {
    player: patchDeep<Player>(player, { character: { gold, loan } }),
    log: `Took a bank loan of ${amount} gold.`,
    data: { amount, gold, loan },
  }
}

export const repayLoan = (
  player: Player,
  { amount }: AmountInput
): ActionResult<{ amount: number; gold: number; loan: number | null }> => {
  const error = validateAmount(player, amount)

  if (error) {
    return { error }
  }

  const currentLoan = player.character.loan || 0

  if (currentLoan < amount) {
    return { error: "You cannot repay more than you owe the bank." }
  }

  if (player.character.gold < amount) {
    return { error: "Not enough gold" }
  }

  const gold = player.character.gold - amount
  const loan = currentLoan - amount

  return {
    player: patchDeep<Player>(player, { character: { gold, loan } }),
    log: `Repaid ${amount} gold to the bank. Remaining loan: ${loan} gold.`,
    // The client treats null as a fully repaid loan
    data: { amount, gold, loan: loan === 0 ? null : loan },
  }
}

type VentureInput = { ventureId: VentureId }

const validateVenture = (player: Player, ventureId: unknown) => {
  if (player.character.location !== "Bank") {
    return NOT_AT_BANK
  }

  if (!isVentureId(ventureId)) {
    return "Unknown venture"
  }
}

export const investInVenture = (
  player: Player,
  { ventureId }: VentureInput
): ActionResult<{ ventureId: VentureId; gold: number; returnDay: number }> => {
  const error = validateVenture(player, ventureId)

  if (error) {
    return { error }
  }

  const venture = VENTURES[ventureId]

  if (player.character.ventures?.[ventureId]) {
    return { error: "You already hold a share in this venture." }
  }

  if (player.character.gold < venture.stake) {
    return { error: "Not enough gold" }
  }

  const gold = player.character.gold - venture.stake
  const investedDay = player.character.day
  const returnDay = investedDay + venture.days

  return {
    player: patchDeep<Player>(player, {
      character: {
        gold,
        ventures: { [ventureId]: { investedDay, returnDay } },
      },
    }),
    log: `Invested ${venture.stake} gold in ${venture.name}. Expected back on day ${returnDay}.`,
    data: { ventureId, gold, returnDay },
  }
}

/** Rolls a number from 1 to 100 and picks the outcome whose chance range it falls in. */
const rollOutcome = (
  outcomes: VentureOutcome[],
  randomInt: RandomInt
): VentureOutcome => {
  const roll = randomInt(1, 100)
  let total = 0

  for (const outcome of outcomes) {
    total += outcome.chance

    if (roll <= total) {
      return outcome
    }
  }

  return outcomes[outcomes.length - 1]
}

export const collectVenture = (
  player: Player,
  { ventureId }: VentureInput,
  randomInt: RandomInt = getRandomInt
): ActionResult<{
  ventureId: VentureId
  returns: number
  message: string
  gold: number
}> => {
  const error = validateVenture(player, ventureId)

  if (error) {
    return { error }
  }

  const share = player.character.ventures?.[ventureId]

  if (!share) {
    return { error: "You hold no share in this venture." }
  }

  if (share.returnDay > player.character.day) {
    return { error: "The party has not yet returned." }
  }

  const venture = VENTURES[ventureId]
  const { returns, message } = rollOutcome(venture.outcomes, randomInt)
  const gold = player.character.gold + returns

  return {
    player: patchDeep<Player>(player, {
      character: { gold, ventures: { [ventureId]: null } },
    }),
    log: `${venture.name} returned ${returns} gold on a stake of ${venture.stake} gold.`,
    data: { ventureId, returns, message, gold },
  }
}
