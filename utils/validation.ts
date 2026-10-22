import { z } from "zod"

import { CHARACTER_IDS } from "@/constants/characters"
import { NATIONS, TOWNS } from "@/constants/locations"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { TREASURES } from "@/constants/treasures"

const validationRules = {
  playerId: z.string().uuid(),
  character: {
    name: z.string().min(3).max(50),
  },
  ship: {
    id: z.string().uuid(),
    name: z.string().min(2).max(30),
  },
}

const registrationValidationSchema = z.object({
  name: validationRules.character.name,
  characterId: z.enum(CHARACTER_IDS),
  musicOn: z.boolean(),
  soundEffectsOn: z.boolean(),
})

const loginValidationSchema = z.object({
  playerId: validationRules.playerId,
})

const renameShipValidationSchema = z.object({
  id: validationRules.ship.id,
  name: validationRules.ship.name,
})

const enumOf = <T extends string>(values: readonly T[]) =>
  z.enum(values as [T, ...T[]])

const town = enumOf(Object.keys(TOWNS) as Town[])
const nation = enumOf(Object.keys(NATIONS) as Nation[])
const nationOrPirate = enumOf<Nation | "Pirate">([
  ...(Object.keys(NATIONS) as Nation[]),
  "Pirate",
])
const title = enumOf(Object.keys(TITLE_INFO) as Title[])
const shipType = enumOf(Object.keys(SHIP_TYPES) as ShipType[])
const count = z.number().int().min(0)
const percentage = z.number().min(0).max(100)
const visited = z.literal(true).nullish()

/** Everything of a player that the god mode editor can change. */
const godModePlayerSchema = z.object({
  character: z.object({
    characterId: z.enum(CHARACTER_IDS),
    name: validationRules.character.name,
    nationality: nation,
    title,
    town: town.optional(),
    location: enumOf<TownLocation | SeaLocation>([
      "Bank",
      "Tavern",
      "Market",
      "Shop",
      "Shipyard",
      "City hall",
      "Harbor",
      "Sea",
    ]),
    journey: z
      .object({
        origin: town.optional(),
        destination: town,
        day: count,
        totalDays: count,
      })
      .optional(),
    gold: count,
    account: count.optional(),
    loan: count.optional(),
    day: count,
    battles: z
      .partialRecord(
        nationOrPirate,
        z.object({ won: count.optional(), lost: count.optional() })
      )
      .optional(),
    highestRewardedTitle: title.optional(),
  }),
  ships: z.record(
    z.string(),
    z.object({
      id: z.string(),
      name: validationRules.ship.name,
      type: shipType,
      health: percentage,
      createdDay: count,
    })
  ),
  crewMembers: z.object({
    count,
    health: percentage,
    mood: percentage,
  }),
  inventory: z
    .partialRecord(
      enumOf(Object.keys(MERCHANDISE) as (keyof Inventory)[]),
      count
    )
    .optional(),
  treasures: z
    .record(
      z.string(),
      z.object({
        id: z.string(),
        name: enumOf(TREASURES.map((treasure) => treasure.name)),
        rewarder: town,
      })
    )
    .optional(),
  locationStates: z
    .object({
      market: z
        .object({
          visited,
          items: z.record(
            z.string(),
            z.object({ quantity: count, price: count })
          ),
        })
        .optional(),
      tavern: z
        .object({
          visited,
          noOfSailors: count,
          isHostile: z.boolean(),
        })
        .optional(),
      sea: z
        .looseObject({
          shipMeeting: z
            .looseObject({
              nation: nationOrPirate,
              shipType,
              crewMembers: count,
              cannons: count,
            })
            .nullish(),
          battle: z
            .looseObject({
              enemyStrength: z.number(),
              playerStrength: z.number(),
            })
            .nullish(),
        })
        .optional(),
      harbor: z
        .looseObject({ lastHarborReason: z.literal("arrived").nullish() })
        .optional(),
    })
    .optional(),
})

export {
  godModePlayerSchema,
  loginValidationSchema,
  registrationValidationSchema,
  renameShipValidationSchema,
}

export default validationRules
