import { NATIONS, TOWNS } from "@/constants/locations"
import { BARTER_GOODS } from "@/constants/merchandise"
import type { RandomInt } from "@/utils/actions/types"
import { getDateOfDay } from "@/utils/date"
import { getRandomInt, pickRandom } from "@/utils/random"

export const DIALOGUE_PLACEHOLDERS = [
  "name",
  "title",
  "town",
  "nation",
  "enemy",
  "playerNation",
  "nationAdjective",
  "enemyAdjective",
  "playerNationAdjective",
  "otherTown",
  "nationTown",
  "enemyTown",
  "merchandise",
  "month",
  "year",
] as const

const ADJECTIVES: Record<Nation, string> = {
  England: "English",
  France: "French",
  Spain: "Spanish",
  Holland: "Dutch",
}

// A value starting a text, sentence or quote gets a capital letter
const STARTS_SENTENCE = /(^|[.!?] |(^|\s)["'\u201C\u2018])$/

type PlaceholderContext = {
  player: Player
  town: Town
  extra?: Record<string, string>
}

const buildValues = (
  { player, town }: { player: Player; town: Town },
  randomInt: RandomInt
) => {
  const towns = Object.keys(TOWNS) as Town[]
  const townNation = TOWNS[town].nation
  const enemy = NATIONS[townNation].warWith

  const townsOf = (nation: Nation) =>
    towns.filter((name) => name !== town && TOWNS[name].nation === nation)

  const values: Record<string, () => string> = {
    name: () => player.character.name,
    title: () => player.character.title.toLowerCase(),
    town: () => town,
    nation: () => townNation,
    enemy: () => enemy,
    playerNation: () => player.character.nationality,
    nationAdjective: () => ADJECTIVES[townNation],
    enemyAdjective: () => ADJECTIVES[enemy],
    playerNationAdjective: () => ADJECTIVES[player.character.nationality],
    otherTown: () =>
      pickRandom(
        towns.filter((name) => name !== town),
        randomInt
      ),
    nationTown: () => pickRandom(townsOf(townNation), randomInt),
    enemyTown: () => pickRandom(townsOf(enemy), randomInt),
    merchandise: () => pickRandom(BARTER_GOODS, randomInt),
    month: () =>
      getDateOfDay(player.character.day).toLocaleDateString("en-GB", {
        month: "long",
      }),
    year: () => String(getDateOfDay(player.character.day).getFullYear()),
  }

  return values
}

/**
 * Picks one value for every built-in placeholder found in the given texts, so
 * a whole entry (text, answers and replies) can be resolved consistently by
 * passing the result as `extra`.
 */
export const pickPlaceholderValues = (
  texts: string[],
  context: { player: Player; town: Town },
  randomInt: RandomInt = getRandomInt
) => {
  const values = buildValues(context, randomInt)
  const picked: Record<string, string> = {}

  texts.forEach((text) => {
    for (const [, key] of text.matchAll(/\{(\w+)\}/g)) {
      if (Object.hasOwn(values, key) && !Object.hasOwn(picked, key)) {
        picked[key] = values[key]()
      }
    }
  })

  return picked
}

/** Fills {placeholders} in dialogue. Unknown ones stay as they are. */
export const resolvePlaceholders = (
  text: string,
  { player, town, extra }: PlaceholderContext,
  randomInt: RandomInt = getRandomInt
) => {
  const values = buildValues({ player, town }, randomInt)
  const resolved: Record<string, string> = {}

  return text.replace(/\{(\w+)\}/g, (match, key: string, offset: number) => {
    let value: string | undefined

    if (extra && Object.hasOwn(extra, key)) {
      value = extra[key]
    } else if (Object.hasOwn(values, key)) {
      // The same placeholder repeated in one text gets the same value
      resolved[key] ??= values[key]()
      value = resolved[key]
    }

    if (value === undefined) {
      return match
    }

    const isTitleBeforeName =
      key === "title" && text.startsWith(" {name}", offset + match.length)

    if (isTitleBeforeName || STARTS_SENTENCE.test(text.slice(0, offset))) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return value
  })
}
