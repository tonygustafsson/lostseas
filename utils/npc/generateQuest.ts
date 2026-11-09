import { TOWNS } from "@/constants/locations"
import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { getNpcPlace, NPCS } from "@/constants/npcs"
import {
  MISSING_PERSON_BACKSTORIES,
  PARCELS,
  PROCUREMENT_QUANTITY,
  QUEST_PITCHES,
  QUEST_REWARDS,
  QUEST_TYPE_WEIGHTS,
} from "@/constants/quests"
import type { RandomInt } from "@/utils/actions/types"
import getDutchFemaleName from "@/utils/names/getDutchFemaleName"
import getDutchMaleName from "@/utils/names/getDutchMaleName"
import getDutchSurname from "@/utils/names/getDutchSurname"
import getEnglishFemaleName from "@/utils/names/getEnglishFemaleName"
import getEnglishMaleName from "@/utils/names/getEnglishMaleName"
import getEnglishSurname from "@/utils/names/getEnglishSurname"
import getFrenchFemaleName from "@/utils/names/getFrenchFemaleName"
import getFrenchMaleName from "@/utils/names/getFrenchMaleName"
import getFrenchSurname from "@/utils/names/getFrenchSurname"
import getSpanishFemaleName from "@/utils/names/getSpanishFemaleName"
import getSpanishMaleName from "@/utils/names/getSpanishMaleName"
import getSpanishSurname from "@/utils/names/getSpanishSurname"
import { resolvePlaceholders } from "@/utils/npc/placeholders"
import { goodsName } from "@/utils/npc/questText"
import { getRandomInt, pickRandom } from "@/utils/random"

type NameGetter = (randomInt?: RandomInt) => string

type NameGetters = {
  male: NameGetter
  female: NameGetter
  surname: NameGetter
}

const NAMES: Record<Nation, NameGetters> = {
  England: {
    male: getEnglishMaleName,
    female: getEnglishFemaleName,
    surname: getEnglishSurname,
  },
  France: {
    male: getFrenchMaleName,
    female: getFrenchFemaleName,
    surname: getFrenchSurname,
  },
  Spain: {
    male: getSpanishMaleName,
    female: getSpanishFemaleName,
    surname: getSpanishSurname,
  },
  Holland: {
    male: getDutchMaleName,
    female: getDutchFemaleName,
    surname: getDutchSurname,
  },
}

const roundTo10 = (value: number) => Math.round(value / 10) * 10

const pickType = (placement: NpcPlacement, randomInt: RandomInt) => {
  const weights = Object.entries(QUEST_TYPE_WEIGHTS[placement]) as [
    QuestType,
    number,
  ][]
  const total = weights.reduce((sum, [, weight]) => sum + weight, 0)
  let roll = randomInt(1, total)

  for (const [type, weight] of weights) {
    roll -= weight
    if (roll <= 0) {
      return type
    }
  }

  return weights[0][0]
}

/** Sailing days along a route of towns, leg by leg */
const routeDays = (towns: Town[]) =>
  towns
    .slice(1)
    .reduce(
      (sum, town, index) => sum + TOWNS[towns[index]].map.distanceTo[town],
      0
    )

const travelGold = (days: number) =>
  days * QUEST_REWARDS.goldPerDay + QUEST_REWARDS.baseGold

/** Now and then part of the value is paid as a random barter good */
const createReward = (
  value: number,
  randomInt: RandomInt,
  exclude?: keyof Inventory
): QuestReward => {
  const paysInGoods =
    randomInt(1, 100) <= Math.round(QUEST_REWARDS.itemChance * 100)

  if (!paysInGoods) {
    return { gold: roundTo10(value) }
  }

  const name = pickRandom(
    (BARTER_GOODS as (keyof Inventory)[]).filter((good) => good !== exclude),
    randomInt
  )
  const quantity = Math.floor(
    (value * QUEST_REWARDS.itemShare) / MERCHANDISE[name].buy
  )

  // A handful of goods is more bother than it is worth, so pay gold instead
  if (quantity < 5) {
    return { gold: roundTo10(value) }
  }

  return {
    gold: roundTo10(value - quantity * MERCHANDISE[name].buy),
    item: { name, quantity },
  }
}

export const targetExtras = (npc: Npc) => ({
  target: npc.name,
  targetTown: npc.town,
  targetPlace: getNpcPlace(npc),
})

export const generateQuest = (
  giver: Npc,
  player: Player,
  randomInt: RandomInt = getRandomInt
): Quest => {
  const type = pickType(giver.placement, randomInt)
  const elsewhere = NPCS.filter((npc) => npc.town !== giver.town)
  const base = {
    id: crypto.randomUUID(),
    giverId: giver.id,
    acceptedDay: player.character.day,
  }

  const withPitch = (extra: Record<string, string>) =>
    resolvePlaceholders(
      pickRandom(QUEST_PITCHES[type], randomInt),
      { player, town: giver.town, extra },
      randomInt
    )

  if (type === "delivery") {
    const target = pickRandom(elsewhere, randomInt)
    const parcel = pickRandom(PARCELS, randomInt)
    const days = routeDays([giver.town, target.town])

    return {
      ...base,
      type,
      parcel,
      targetNpcId: target.id,
      reward: createReward(travelGold(days), randomInt),
      pitch: withPitch({ ...targetExtras(target), parcel }),
    }
  }

  if (type === "procurement") {
    // The player has to travel for these, so skip goods sold in the giver's town
    const item = pickRandom(
      (BARTER_GOODS as (keyof Inventory)[]).filter(
        (good) => !isTradeGoodAvailableInTown(good, giver.town)
      ),
      randomInt
    )
    const { min, max, step } = PROCUREMENT_QUANTITY
    const quantity = randomInt(min / step, max / step) * step
    const value =
      quantity * MERCHANDISE[item].buy * QUEST_REWARDS.procurementPremium

    return {
      ...base,
      type,
      item,
      quantity,
      reward: createReward(value, randomInt, item),
      pitch: withPitch({
        quantity: String(quantity),
        item: goodsName(item),
      }),
    }
  }

  if (type === "messageChain") {
    const intermediates = randomInt(1, 2)
    const steps: Npc[] = []

    for (let i = 0; i < intermediates; i++) {
      const used = steps.map((npc) => npc.town)
      steps.push(
        pickRandom(
          elsewhere.filter((npc) => !used.includes(npc.town)),
          randomInt
        )
      )
    }

    const days = routeDays([
      giver.town,
      ...steps.map((npc) => npc.town),
      giver.town,
    ])

    return {
      ...base,
      type,
      stepNpcIds: [...steps.map((npc) => npc.id), giver.id],
      step: 0,
      reward: createReward(travelGold(days), randomInt),
      pitch: withPitch(targetExtras(steps[0])),
    }
  }

  const nation = pickRandom(Object.keys(NAMES) as Nation[], randomInt)
  const hiddenTown = pickRandom(
    (Object.keys(TOWNS) as Town[]).filter(
      (town) => TOWNS[town].nation === nation && town !== giver.town
    ),
    randomInt
  )
  const names = NAMES[nation]
  const firstName = randomInt(0, 1)
    ? names.male(randomInt)
    : names.female(randomInt)
  const personName = `${firstName} ${names.surname(randomInt)}`

  return {
    ...base,
    type: "findPerson",
    personName,
    nation,
    hiddenTown,
    ...(nation === TOWNS[giver.town].nation && { ruledOut: [giver.town] }),
    reward: createReward(QUEST_REWARDS.findPersonGold, randomInt),
    pitch: withPitch({
      person: personName,
      backstory: pickRandom(MISSING_PERSON_BACKSTORIES, randomInt),
      questNation: nation,
    }),
  }
}
