import { LOAN_LIMIT } from "@/constants/bank"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"

import type { ActionResult } from "./types"

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
    return { error: `You cannot loan more than a total of ${LOAN_LIMIT} gold.` }
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
