import { MERCHANDISE } from "@/constants/merchandise"
import { MAX_ACTIVE_QUESTS } from "@/constants/quests"
import { TITLE_INFO } from "@/constants/title"
import { isOverloaded } from "@/utils/cargo"

/** Losing a ship, by selling it or in battle, is the only allowed way to overload the hold */
const MAY_OVERLOAD = ["shipyard:sellShip", "sea:battleMove"]

const isWholeAmount = (value: unknown) =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0

const isPercentage = (value: number) =>
  Number.isInteger(value) && value >= 0 && value <= 100

/**
 * Rules every saved player must follow, whatever happened before.
 * Returns the broken rules, so an empty list means the state is sound.
 */
export const findBrokenRules = (
  player: Player,
  previous?: { player: Player; action: string }
) => {
  const broken: string[] = []
  const { character, crewMembers } = player
  const ships = Object.values(player.ships ?? {})

  const check = (isSound: boolean, rule: string) => {
    if (!isSound) {
      broken.push(rule)
    }
  }

  check(isWholeAmount(character.gold), "gold is not a whole amount")
  check(isWholeAmount(character.account ?? 0), "account is not a whole amount")
  check(isWholeAmount(character.loan ?? 0), "loan is not a whole amount")

  for (const [item, quantity] of Object.entries(player.inventory ?? {})) {
    check(Object.hasOwn(MERCHANDISE, item), `unknown inventory item ${item}`)
    check(isWholeAmount(quantity ?? 0), `${item} is not a whole amount`)
  }

  check(isWholeAmount(crewMembers.count), "crew count is not a whole amount")
  check(isPercentage(crewMembers.health), "crew health is not 0 to 100")
  check(isPercentage(crewMembers.mood), "crew mood is not 0 to 100")

  check(ships.length > 0, "player has no ships")
  // A lower title after changing nation keeps the extra ships, but the fleet
  // must never grow past the limit
  const shipCountBefore = Object.keys(previous?.player.ships ?? {}).length

  check(
    ships.length <= TITLE_INFO[character.title].maxShips ||
      (!!previous && ships.length <= shipCountBefore),
    "fleet grew past the title's ship limit"
  )

  for (const ship of ships) {
    check(isPercentage(ship.health), "ship health is not 0 to 100")
    check(!!ship.id && !!ship.name, "ship without id or name")
  }

  // Starting over is allowed to turn back the clock
  if (previous && previous.action !== "user:resetGame") {
    check(character.day >= previous.player.character.day, "day went backwards")
    check(
      MAY_OVERLOAD.includes(previous.action) ||
        isOverloaded(previous.player) ||
        !isOverloaded(player),
      "the hold became overloaded"
    )
  }

  if (character.location === "Sea") {
    const { journey } = character

    check(!!journey, "at sea without a journey")
    check(!character.town, "at sea while in a town")
    check(
      !journey || (journey.day >= 1 && journey.day <= journey.totalDays),
      "journey day outside the journey"
    )
  } else {
    check(!!character.town, "on land without a town")
    check(!character.journey, "on land with a journey")
  }

  check(
    Object.keys(player.quests ?? {}).length <= MAX_ACTIVE_QUESTS,
    "more quests than allowed"
  )

  check(!JSON.stringify(player).includes("undefined"), "stored 'undefined'")

  return broken
}

/** Log book entries should read well, so placeholders must never leak. */
export const findBadLogText = (log?: GameLog) =>
  log && /undefined|NaN|null|\[object Object\]/.test(log.message)
    ? `log reads badly: ${log.message.replace(/\d+/g, "#")}`
    : undefined
