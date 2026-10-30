import { getGoldEffectiveness, getMedicineEffectiveness } from "@/utils/crew"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"

import type { ActionResult } from "./types"

/** Accepts whole numbers sent as numbers or as numeric strings. */
const toWholeNumber = (value: unknown) => {
  const number =
    typeof value === "string" && value.trim() !== "" ? Number(value) : value

  return isPositiveSafeInteger(number) ? number : undefined
}

export const dismissCrew = (
  player: Player,
  input: { count: number | string }
): ActionResult<{ count: number; newCount: number }> => {
  const count = toWholeNumber(input.count)

  if (!count) {
    return { error: "You need to dismiss at least 1 crew member" }
  }

  if (player.crewMembers.count < count) {
    return { error: "Not enough crew members to dismiss" }
  }

  const newCount = player.crewMembers.count - count

  return {
    player: patchDeep<Player>(player, { crewMembers: { count: newCount } }),
    log: {
      type: "crew",
      message: `Dismissed ${count} crew members. New crew count is ${newCount}.`,
    },
    data: { count, newCount },
  }
}

export const giveGold = (
  player: Player,
  input: { gold: number | string }
): ActionResult<{ gold: number; newMood: number }> => {
  const gold = toWholeNumber(input.gold)

  if (!gold) {
    return { error: "You need to give at least 1 doubloon" }
  }

  if (!player.crewMembers.count) {
    return { error: "You have no crew to give gold to." }
  }

  if (player.crewMembers.mood >= 100) {
    return { error: "Your crew's mood is already at 100%." }
  }

  if (player.character.gold < gold) {
    return { error: "Not enough gold" }
  }

  const newMood = getGoldEffectiveness(
    player.crewMembers.count,
    player.crewMembers.mood,
    gold
  )

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - gold },
      crewMembers: { mood: newMood },
    }),
    log: {
      type: "crew",
      message: `Gave ${gold} gold to crew members, increasing their mood to ${newMood}.`,
    },
    data: { gold, newMood },
  }
}

export const giveMedicine = (
  player: Player,
  input: { medicine: number | string }
): ActionResult<{ medicine: number; newHealth: number }> => {
  const medicine = toWholeNumber(input.medicine)

  if (!medicine) {
    return { error: "You need to give at least 1 box of medicine" }
  }

  if (!player.crewMembers.count) {
    return { error: "You have no crew to give medicine to." }
  }

  if (player.crewMembers.health >= 100) {
    return { error: "Your crew's health is already at 100%." }
  }

  const currentMedicine = player.inventory?.medicine || 0

  if (currentMedicine < medicine) {
    return { error: "Not enough medicine" }
  }

  const newHealth = getMedicineEffectiveness(
    player.crewMembers.count,
    player.crewMembers.health,
    medicine
  )

  return {
    player: patchDeep<Player>(player, {
      inventory: { medicine: currentMedicine - medicine },
      crewMembers: { health: newHealth },
    }),
    log: {
      type: "crew",
      message: `Gave ${medicine} medicine to crew, increasing their health to ${newHealth}.`,
    },
    data: { medicine, newHealth },
  }
}
