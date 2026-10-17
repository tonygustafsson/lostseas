import { describe, expect, it } from "vitest"

import { NATIONS, TOWNS } from "@/constants/locations"
import { TITLE_INFO } from "@/constants/title"
import { TREASURES } from "@/constants/treasures"
import {
  acceptNewTitle,
  changeCitizenship,
  handOverTreasure,
} from "@/utils/actions/cityhall"
import type { ActionResult } from "@/utils/actions/types"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const ALL_TOWNS = Object.keys(TOWNS) as Town[]

const townOf = (nation: Nation) =>
  ALL_TOWNS.find((town) => TOWNS[town].nation === nation)!

// The default test player is English and stands in Port Royale (English)
const atCityHall = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({ character: { location: "City hall" } }),
      overrides
    )
  )

const withBattles = (
  battles: Partial<Record<Nation, { won?: number; lost?: number }>>,
  character: DeepPartial<Character> = {}
) => atCityHall({ character: { battles, ...character } })

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

describe("acceptNewTitle", () => {
  it("promotes the player and pays the reward", () => {
    const result = expectSuccess(
      acceptNewTitle(withBattles({ France: { won: 15 } }))
    )

    expect(result.player.character.title).toBe("Ensign")
    expect(result.player.character.highestRewardedTitle).toBe("Ensign")
    expect(result.player.character.gold).toBe(1000 + TITLE_INFO.Ensign.reward)
    expect(result.data).toEqual({
      titleInfo: TITLE_INFO.Ensign,
      title: "Pirate",
    })
    expect(result.log).toBe(
      "Accepted new title Ensign from the governor of Port Royale."
    )
  })

  it.each([
    [10, "Ensign"],
    [20, "Captain"],
    [30, "Major"],
    [40, "Colonel"],
    [50, "Admiral"],
    [65, "Baron"],
    [80, "Count"],
    [100, "Marquis"],
    [120, "Duke"],
  ] as const)("%i enemy victories give the title %s", (won, title) => {
    const result = expectSuccess(
      acceptNewTitle(withBattles({ France: { won } }))
    )

    expect(result.player.character.title).toBe(title)
    expect(result.player.character.gold).toBe(1000 + TITLE_INFO[title].reward)
  })

  it("counts battles against the own nation against the player", () => {
    // 25 enemy victories minus 10 English battles = 15, which is Ensign
    const result = expectSuccess(
      acceptNewTitle(
        withBattles({ France: { won: 25 }, England: { won: 4, lost: 6 } })
      )
    )

    expect(result.player.character.title).toBe("Ensign")
  })

  it("rejects when the title is already held", () => {
    expectError(
      acceptNewTitle(withBattles({ France: { won: 15 } }, { title: "Ensign" })),
      "You already have the title Ensign."
    )
  })

  it("never demotes, as the guide says, and names the current title", () => {
    expectError(
      acceptNewTitle(withBattles({ France: { won: 15 } }, { title: "Duke" })),
      "You need more victories against France to be promoted from Duke."
    )
  })

  it("rejects promotions in another nation's town", () => {
    expectError(
      acceptNewTitle(
        withBattles({ France: { won: 15 } }, { town: townOf("Spain") })
      ),
      "Not your home nation."
    )
  })

  it("rejects outside the city hall", () => {
    expectError(
      acceptNewTitle(
        createTestPlayer({ character: { battles: { France: { won: 15 } } } })
      ),
      "You must be at City hall to do this."
    )
  })
})

describe("changeCitizenship", () => {
  it("matches the guide's example", () => {
    // A Spanish citizen with 50 victories against France who never attacked
    // England qualifies for English citizenship as Admiral
    const player = withBattles(
      { France: { won: 50 } },
      { nationality: "Spain", town: townOf("England") }
    )

    const result = expectSuccess(changeCitizenship(player))

    expect(result.player.character).toMatchObject({
      nationality: "England",
      title: "Admiral",
      gold: 1000 + TITLE_INFO.Admiral.reward,
    })
    expect(result.data).toEqual({
      titleInfo: TITLE_INFO.Admiral,
      title: "Pirate",
      newNationality: "England",
    })
  })

  it("can give a lower title than before, as the guide says", () => {
    const player = withBattles(
      { France: { won: 5 } },
      { nationality: "Spain", title: "Duke" }
    )

    const result = expectSuccess(changeCitizenship(player))

    expect(result.player.character.title).toBe("Pirate")
    expect(result.player.character.gold).toBe(1000)
  })

  it.each(Object.keys(NATIONS) as Nation[])(
    "lets a player join %s",
    (nation) => {
      const otherNation = (Object.keys(NATIONS) as Nation[]).find(
        (other) => other !== nation
      )!
      const player = withBattles(
        { [NATIONS[nation].warWith]: { won: 1 } },
        { nationality: otherNation, town: townOf(nation) }
      )

      const result = expectSuccess(changeCitizenship(player))

      expect(result.player.character.nationality).toBe(nation)
    }
  )

  it("rejects when battles against the desired nation cancel out victories", () => {
    expectError(
      changeCitizenship(
        withBattles(
          { France: { won: 5 }, England: { lost: 5 } },
          { nationality: "Spain" }
        )
      ),
      "You cannot change citizenship here at the moment."
    )
  })

  it("rejects in a town of the player's own nation", () => {
    expectError(
      changeCitizenship(withBattles({ France: { won: 50 } })),
      "You cannot change citizenship here at the moment."
    )
  })

  it("rejects outside the city hall", () => {
    expectError(
      changeCitizenship(
        createTestPlayer({
          character: { nationality: "Spain", battles: { France: { won: 9 } } },
        })
      ),
      "You must be at City hall to do this."
    )
  })
})

describe("title rewards are paid once", () => {
  // An English Admiral who already got the Admiral reward
  const admiral = (overrides: DeepPartial<Character> = {}) =>
    ({
      title: "Admiral",
      highestRewardedTitle: "Admiral",
      ...overrides,
    }) as DeepPartial<Character>

  it("pays nothing for a lower title after changing citizenship", () => {
    const player = withBattles(
      { France: { won: 50 }, England: { won: 30 } },
      admiral({ nationality: "Spain", town: townOf("England") })
    )

    const result = expectSuccess(changeCitizenship(player))

    // 50 - 30 = 20 is Captain, lower than the Admiral already rewarded
    expect(result.player.character.title).toBe("Captain")
    expect(result.player.character.gold).toBe(1000)
    expect(result.player.character.highestRewardedTitle).toBe("Admiral")
    expect(result.data.titleInfo.reward).toBe(0)
  })

  it("blocks farming by changing citizenship and being promoted again", () => {
    const spainsEnemy = NATIONS.Spain.warWith

    // Step 1: an English Admiral switches to Spain and becomes a Captain
    let player = withBattles(
      { [spainsEnemy]: { won: 20 } },
      admiral({ town: townOf("Spain") })
    )
    const switched = expectSuccess(changeCitizenship(player))

    expect(switched.player.character.title).toBe("Captain")
    expect(switched.player.character.gold).toBe(1000)

    // Step 2: more victories make them an Admiral again in Spain, without a second reward
    player = patchDeep<Player>(switched.player, {
      character: { battles: { [spainsEnemy]: { won: 50 } } },
    })
    const regained = expectSuccess(acceptNewTitle(player))

    expect(regained.player.character.title).toBe("Admiral")
    expect(regained.player.character.gold).toBe(1000)

    // Step 3: a title they never held pays its reward as normal
    player = patchDeep<Player>(regained.player, {
      character: { battles: { [spainsEnemy]: { won: 65 } } },
    })
    const baron = expectSuccess(acceptNewTitle(player))

    expect(baron.player.character.gold).toBe(1000 + TITLE_INFO.Baron.reward)
    expect(baron.player.character.highestRewardedTitle).toBe("Baron")
  })

  it("uses the current title for older players without a rewarded title", () => {
    const player = withBattles(
      { France: { won: 30 } },
      { title: "Major", nationality: "Spain", town: townOf("England") }
    )

    const result = expectSuccess(changeCitizenship(player))

    expect(result.player.character.title).toBe("Major")
    expect(result.player.character.gold).toBe(1000)
    expect(result.player.character.highestRewardedTitle).toBe("Major")
  })
})

describe("handOverTreasure", () => {
  const treasure = (
    id: string,
    name: TreasureName,
    rewarder: Town = "Port Royale"
  ): Treasure => ({ id, name, rewarder })

  it.each(TREASURES)("pays $value gold for the $name", ({ name, value }) => {
    const player = atCityHall({
      treasures: { a: treasure("a", name as TreasureName) },
    })

    const result = expectSuccess(handOverTreasure(player, { id: "a" }))

    expect(result.player.character.gold).toBe(1000 + value)
    expect(result.player.treasures).toEqual({})
    expect(result.data.treasureInfo?.value).toBe(value)
  })

  it("keeps the other treasures", () => {
    const player = atCityHall({
      treasures: {
        a: treasure("a", "Inca mask"),
        b: treasure("b", "Golden hen"),
      },
    })

    const result = expectSuccess(handOverTreasure(player, { id: "a" }))

    expect(Object.keys(result.player.treasures ?? {})).toEqual(["b"])
    expect(result.log).toBe("Handed over Inca mask to the town of Port Royale.")
  })

  it("rejects a treasure belonging to another town, as the guide says", () => {
    const player = atCityHall({
      treasures: { a: treasure("a", "Inca mask", "Havana") },
    })

    expectError(
      handOverTreasure(player, { id: "a" }),
      "You don't have this treasure"
    )
  })

  it.each(["missing", "", undefined])("rejects unknown id %s", (id) => {
    const player = atCityHall({
      treasures: { a: treasure("a", "Inca mask") },
    })

    expectError(
      handOverTreasure(player, { id } as never),
      "You don't have this treasure"
    )
  })

  it("rejects a treasure that is not in the treasure list", () => {
    const player = atCityHall({
      treasures: { a: treasure("a", "Lost sock" as TreasureName) },
    })

    expectError(
      handOverTreasure(player, { id: "a" }),
      "This treasure is unknown and cannot be handed over."
    )
  })

  it("rejects outside the city hall", () => {
    const player = createTestPlayer({
      treasures: { a: treasure("a", "Inca mask") },
    })

    expectError(
      handOverTreasure(player, { id: "a" }),
      "You must be at City hall to do this."
    )
  })
})

describe("random city hall play", () => {
  const NATION_KEYS = Object.keys(NATIONS) as Nation[]
  const LOCATIONS: TownLocation[] = ["City hall", "City hall", "Bank"]
  const TREASURE_NAMES = TREASURES.map(({ name }) => name as TreasureName)

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      const succeededActions = new Set<number>()
      const rewardedTitles = new Set<Title>()

      let player = createTestPlayer({ treasures: {} })

      for (let step = 0; step < 300; step++) {
        // Win or lose some battles and sometimes find a treasure on the way
        // Mostly fight the own nation's enemy, like a loyal captain
        const battleNation =
          random.int(0, 1) === 0
            ? NATIONS[player.character.nationality].warWith
            : random.pick(NATION_KEYS)
        const battles = player.character.battles?.[battleNation] ?? {}
        const treasureId = `t${step}`

        player = patchDeep<Player>(player, {
          character: {
            town: random.pick(ALL_TOWNS),
            location: random.pick(LOCATIONS),
            battles: {
              [battleNation]:
                random.int(0, 3) === 0
                  ? { ...battles, lost: (battles.lost ?? 0) + 1 }
                  : { ...battles, won: (battles.won ?? 0) + random.int(1, 3) },
            },
          },
          ...(random.int(0, 4) === 0 && {
            treasures: {
              [treasureId]: {
                id: treasureId,
                name: random.pick(TREASURE_NAMES),
                rewarder: random.pick(ALL_TOWNS),
              },
            },
          }),
        })

        const before = deepFreeze(structuredClone(player))
        const action = random.int(0, 2)
        const ownedIds = Object.keys(before.treasures ?? {})
        const id = ownedIds.length ? random.pick(ownedIds) : "none"
        const context = `seed ${seed}, step ${step}, action ${action}`

        const result =
          action === 0
            ? acceptNewTitle(before)
            : action === 1
              ? changeCitizenship(before)
              : handOverTreasure(before, { id })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const goldEarned = after.character.gold - before.character.gold
        const { titleInfo } = result.data as { titleInfo?: { reward: number } }

        expect(goldEarned, context).toBeGreaterThanOrEqual(0)
        expect(after.character.location, context).toBe("City hall")
        expect(after.character.battles, context).toEqual(
          before.character.battles
        )

        // A title reward is never paid twice
        if (action <= 1 && goldEarned > 0) {
          expect(rewardedTitles.has(after.character.title), context).toBe(false)
          rewardedTitles.add(after.character.title)
        }

        if (action === 0) {
          expect(
            TITLE_INFO[after.character.title].higherThan,
            context
          ).toContain(before.character.title)
          expect(goldEarned, context).toBe(titleInfo?.reward)
        }

        if (action === 1) {
          expect(after.character.nationality, context).toBe(
            TOWNS[before.character.town!].nation
          )
          expect(after.character.nationality, context).not.toBe(
            before.character.nationality
          )
          expect(goldEarned, context).toBe(titleInfo?.reward)
        }

        if (action === 2) {
          const handed = before.treasures![id]

          expect(handed.rewarder, context).toBe(before.character.town)
          expect(after.treasures?.[id], context).toBeUndefined()
          expect(Object.keys(after.treasures ?? {}), context).toHaveLength(
            ownedIds.length - 1
          )
          expect(goldEarned, context).toBe(
            TREASURES.find(({ name }) => name === handed.name)?.value
          )
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(3)
    }
  )
})
