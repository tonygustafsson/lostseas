import { createSeededRandom } from "@/__tests__/helpers/seededRandom"
import { APOTHECARY_REMEDIES, type Remedy } from "@/constants/apothecary"
import { NATIONS, TOWNS } from "@/constants/locations"
import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { getNpcAt, getNpcById } from "@/constants/npcs"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { CARDS_PERCENTAGE_VALUES, TAVERN_ITEMS } from "@/constants/tavern"
import { TITLE_INFO } from "@/constants/title"
import { VENTURE_IDS, VENTURES } from "@/constants/ventures"
import * as bank from "@/utils/actions/bank"
import { moveToLocation } from "@/utils/actions/character"
import * as cityhall from "@/utils/actions/cityhall"
import * as crew from "@/utils/actions/crew"
import * as market from "@/utils/actions/market"
import * as npc from "@/utils/actions/npc"
import * as sea from "@/utils/actions/sea"
import { renameShip, repairShipWithKits } from "@/utils/actions/ship"
import * as shipyard from "@/utils/actions/shipyard"
import * as shop from "@/utils/actions/shop"
import * as tavern from "@/utils/actions/tavern"
import { createNewPlayer, resetGame } from "@/utils/actions/user"
import { getCargo, getLootPreset } from "@/utils/cargo"
import { getMannedCannons } from "@/utils/crew"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"
import { getJourneyLength, getJourneySupplies } from "@/utils/journey"
import { getRandomTown } from "@/utils/location"
import { getNetWorth, getScore } from "@/utils/score"
import { createNewShip } from "@/utils/ship"
import type { TradeChange } from "@/utils/shop"
import { getNewTitle } from "@/utils/title"
import { validateShipCrewRequirements } from "@/utils/validateCrew"

import { act, describeMoment, type Game } from "./game"
import { addIncome, countUp, type Report } from "./report"

const TOWN_NAMES = Object.keys(TOWNS) as Town[]
const NATION_NAMES = Object.keys(NATIONS) as Nation[]
const BARTER_ITEMS = BARTER_GOODS as (keyof Inventory)[]

/** Gold kept in the pocket at sea. The rest goes to the bank, since a defeat takes it all. */
const POCKET_MONEY = 300
/** Days of extra food and water, in case recruits join on the way */
const SPARE_DAYS = 2
/** How many times a departure is retried before the game counts as stuck */
const DEPARTURE_ATTEMPTS = 4
/** Quests older than this are abandoned */
const QUEST_PATIENCE_DAYS = 120
/** Resets allowed in one game before the bot gives up on it */
const MAX_RESETS = 20

// --- Small helpers ---

const gold = (game: Game) => game.player.character.gold

const owned = (game: Game, item: keyof Inventory) =>
  game.player.inventory?.[item] ?? 0

const freeCargo = (game: Game) => getCargo(game.player).free

const goTo = (game: Game, location: Character["location"]) => {
  if (game.player.character.location !== location) {
    act(
      game,
      `move:${location}`,
      (player) => moveToLocation(player, { location }, game.random.int),
      { expectSuccess: true }
    )
  }
}

/**
 * Gold the bot can spend on growth, like ships, cannons, ventures and
 * gambling. It counts savings, subtracts any loan and keeps a reserve for
 * running costs, which grow with the crew.
 */
const spareGold = (game: Game) => {
  const { account = 0, loan = 0 } = game.player.character
  const reserve = 1500 + game.player.crewMembers.count * 40

  return loan ? 0 : gold(game) + account - reserve
}

/**
 * Takes gold from savings to pay for something. Only essentials, like
 * supplies and repairs, may borrow the rest.
 */
const raiseGold = (game: Game, needed: number, { borrow = false } = {}) => {
  let missing = Math.ceil(needed - gold(game))

  if (missing <= 0) {
    return
  }

  goTo(game, "Bank")

  const savings = Math.min(game.player.character.account ?? 0, missing)

  if (savings > 0) {
    act(game, "bank:withdraw", (player) =>
      bank.withdraw(player, { amount: savings })
    )
    missing -= savings
  }

  if (
    borrow &&
    missing > 0 &&
    act(game, "bank:takeLoan", (player) =>
      bank.takeLoan(player, { amount: missing })
    )
  ) {
    game.report.loans++
  }
}

/** Crew worth paying for: enough to sail and to man the cannons aboard. */
const getWantedCrew = (game: Game) => {
  const { minCrew, maxCrew } = validateShipCrewRequirements(game.player.ships)

  return Math.min(maxCrew, Math.max(minCrew, owned(game, "cannons") * 2 + 4))
}

// --- Buildings ---

const talkToTownsperson = (game: Game, placement: NpcPlacement) => {
  const person = getNpcAt(game.player.character.town!, placement)
  const npcId = person.id
  const talks = game.random.int(1, 4)

  for (let talk = 0; talk < talks; talk++) {
    const goldBefore = gold(game)
    const said = act(game, "npc:talkTo", (player) =>
      npc.talkTo(player, { npcId }, game.random.int)
    )

    if (!said) {
      return
    }

    const { line } = said.data

    if (line.kind === "tired") {
      return
    }

    if (line.kind === "questOffer") {
      game.report.quests.offered++

      if (game.random.next() < 0.7) {
        if (
          act(game, "npc:acceptQuest", (player) =>
            npc.acceptQuest(player, { npcId }, game.random.int)
          )
        ) {
          game.report.quests.accepted++
        }
      } else {
        act(
          game,
          "npc:declineQuest",
          (player) => npc.declineQuest(player, { npcId }, game.random.int),
          { expectSuccess: true }
        )
      }
    }

    if (line.kind === "question") {
      const answerIndex = game.random.int(0, line.answers.length - 1)

      act(
        game,
        "npc:answerNpc",
        (player) =>
          npc.answerNpc(player, { npcId, answerIndex }, game.random.int),
        { expectSuccess: true }
      )
    }

    if (line.kind === "handIn") {
      act(
        game,
        "npc:handInQuest",
        (player) => npc.handInQuest(player, { npcId }, game.random.int),
        { expectSuccess: true }
      )
    }

    if (gold(game) > goldBefore) {
      game.report.quests.completed++
      addIncome(game.report, "quests", gold(game) - goldBefore)
    }
  }
}

const visitCityHall = (game: Game) => {
  goTo(game, "City hall")

  const promotion = act(game, "cityhall:acceptNewTitle", (player) =>
    cityhall.acceptNewTitle(player)
  )

  if (promotion) {
    addIncome(game.report, "titles", promotion.data.titleInfo.reward)
  }

  // Now and then switch sides, to try the citizenship rules
  if (game.random.next() < 0.05) {
    const change = act(game, "cityhall:changeCitizenship", (player) =>
      cityhall.changeCitizenship(player)
    )

    if (change) {
      addIncome(game.report, "titles", change.data.titleInfo.reward)
    }
  }

  const town = game.player.character.town

  for (const { id, rewarder } of Object.values(game.player.treasures ?? {})) {
    const handed =
      rewarder === town &&
      act(
        game,
        "cityhall:handOverTreasure",
        (player) => cityhall.handOverTreasure(player, { id }),
        { expectSuccess: true }
      )

    if (handed) {
      addIncome(game.report, "treasures", handed.data.treasureInfo.value)
    }
  }

  for (const { id, rewarder } of Object.values(
    game.player.wantedPirates ?? {}
  )) {
    const handed =
      rewarder === town &&
      act(
        game,
        "cityhall:handOverPirate",
        (player) => cityhall.handOverPirate(player, { id }),
        { expectSuccess: true }
      )

    if (handed) {
      addIncome(game.report, "bounties", handed.data.crime.bounty)
    }
  }

  talkToTownsperson(game, "governor")
}

const visitBank = (game: Game) => {
  goTo(game, "Bank")

  for (const ventureId of VENTURE_IDS) {
    const share = game.player.character.ventures?.[ventureId]

    if (!share || share.returnDay > game.player.character.day) {
      continue
    }

    const collected = act(
      game,
      "bank:collectVenture",
      (player) => bank.collectVenture(player, { ventureId }, game.random.int),
      { expectSuccess: true }
    )

    if (collected) {
      const totals = (game.report.ventures[ventureId] ??= {
        staked: 0,
        paid: 0,
      })

      totals.staked += VENTURES[ventureId].stake
      totals.paid += collected.data.returns
      addIncome(game.report, "ventures", collected.data.returns)
    }
  }

  const loan = game.player.character.loan ?? 0

  if (loan > 0 && gold(game) > POCKET_MONEY) {
    act(
      game,
      "bank:repayLoan",
      (player) =>
        bank.repayLoan(player, {
          amount: Math.min(loan, player.character.gold - POCKET_MONEY),
        }),
      { expectSuccess: true }
    )
  }

  // Pocket money for the small things at this stop, the rest is withdrawn when needed
  raiseGold(game, 500 + game.player.crewMembers.count * 10)

  const ventureId = game.random.pick(VENTURE_IDS)
  const { stake } = VENTURES[ventureId]

  if (
    game.random.next() < 0.3 &&
    !game.player.character.ventures?.[ventureId] &&
    spareGold(game) > stake * 2
  ) {
    raiseGold(game, stake)
    act(
      game,
      "bank:investInVenture",
      (player) => bank.investInVenture(player, { ventureId }),
      { expectSuccess: true }
    )
  }
}

const bankSavings = (game: Game) => {
  const keep = POCKET_MONEY + game.player.crewMembers.count * 10

  if (gold(game) > keep && !game.player.character.loan) {
    goTo(game, "Bank")
    act(
      game,
      "bank:deposit",
      (player) =>
        bank.deposit(player, { amount: player.character.gold - keep }),
      { expectSuccess: true }
    )
  }
}

const visitTavern = (game: Game) => {
  goTo(game, "Tavern")

  const sailors = game.player.locationStates?.tavern

  if (sailors?.noOfSailors && !sailors.isHostile) {
    act(
      game,
      "tavern:acceptSailors",
      (player) => tavern.acceptSailors(player),
      {
        expectSuccess: true,
      }
    )
  }

  if (sailors?.noOfSailors && sailors.isHostile) {
    if (game.random.next() < 0.6) {
      const fight = act(
        game,
        "tavern:fightSailors",
        (player) => tavern.fightSailors(player, game.random.int),
        { expectSuccess: true }
      )

      addIncome(game.report, "brawls", fight?.data.loot ?? 0)
    } else {
      act(
        game,
        "tavern:ignoreSailors",
        (player) => tavern.ignoreSailors(player),
        {
          expectSuccess: true,
        }
      )
    }
  }

  if (game.player.crewMembers.health < 60) {
    act(game, "tavern:treatCrew", (player) =>
      tavern.treatCrew(player, { item: "serve-supper" })
    )
  }

  // Tobacco lifts the most mood per gold
  if (game.player.crewMembers.mood < 40) {
    act(game, "tavern:treatCrew", (player) =>
      tavern.treatCrew(player, { item: "smoke-tobacco" })
    )
  }

  if (game.random.next() < 0.25 && spareGold(game) > 0) {
    const betPercentage = game.random.pick(
      CARDS_PERCENTAGE_VALUES.filter((percentage) => percentage <= 25)
    )
    const cards = act(game, "tavern:playCards", (player) =>
      tavern.playCards(
        player,
        { betPercentage, selectedCard: game.random.int(0, 4) },
        game.random.int
      )
    )

    if (cards) {
      game.report.cards.played++
      game.report.cards.staked += cards.data.bet
      game.report.cards.paidOut += cards.data.bet + cards.data.cardsReturns
      addIncome(game.report, "cards", cards.data.cardsReturns)
    }
  }

  talkToTownsperson(game, "tavern")
}

const visitMarket = (game: Game) => {
  goTo(game, "Market")

  const town = game.player.character.town
  const offers = Object.entries(
    game.player.locationStates?.market?.items ?? {}
  ) as [keyof Inventory, { price: number; quantity: number }][]

  for (const [item, { price, quantity }] of offers) {
    const { buy, sell, availableAt } = MERCHANDISE[item]
    const isResellable =
      availableAt === "shop" &&
      isTradeGoodAvailableInTown(item, town) &&
      sell > price
    const isCheapSupply =
      ["food", "water", "medicine"].includes(item) &&
      price < buy &&
      quantity <= freeCargo(game) - 10
    const isFitting = item === "cannons" || item === "repairKits"

    if (
      (isResellable || isCheapSupply || isFitting) &&
      gold(game) > price * quantity + 200
    ) {
      act(game, "market:acceptMarketOffer", (player) =>
        market.acceptMarketOffer(player, { item })
      )
    }
  }

  const { health, count } = game.player.crewMembers

  if (health < 70 && count > 0) {
    // The cheapest remedy that heals the crew fully
    const remedy =
      (Object.keys(APOTHECARY_REMEDIES) as Remedy[]).find(
        (name) => APOTHECARY_REMEDIES[name].healthIncrease >= 100 - health
      ) ?? "theriac-draught"

    act(game, "market:buyRemedy", (player) =>
      market.buyRemedy(player, { remedy })
    )
  }

  talkToTownsperson(game, "market")
}

const visitShipyard = (game: Game) => {
  goTo(game, "Shipyard")

  for (const { id, health } of Object.values(game.player.ships)) {
    if (health < 100) {
      // A disabled ship has to be fixed, other damage can wait for money
      raiseGold(game, (100 - health) * SHIP_REPAIR_COST, {
        borrow: health <= 0,
      })
      goTo(game, "Shipyard")
      act(game, "shipyard:repairShip", (player) =>
        shipyard.repairShip(player, { id })
      )
    }
  }

  const shipCount = Object.keys(game.player.ships).length
  const { maxShips } = TITLE_INFO[game.player.character.title]
  const type = game.random.pick(Object.keys(SHIP_TYPES) as ShipType[])
  const price = SHIP_TYPES[type].buy

  // A new ship also needs crew, cannons and supplies, so only buy with plenty to spare
  if (
    shipCount < maxShips &&
    game.random.next() < 0.4 &&
    spareGold(game) > price * 2
  ) {
    raiseGold(game, price)
    goTo(game, "Shipyard")
    act(
      game,
      "shipyard:buyShip",
      (player) => shipyard.buyShip(player, { item: type }),
      { expectSuccess: true }
    )
  }

  if (shipCount > 1 && game.random.next() < 0.05) {
    const id = game.random.pick(Object.keys(game.player.ships))

    act(
      game,
      "shipyard:sellShip",
      (player) => shipyard.sellShip(player, { id }),
      {
        expectSuccess: true,
      }
    )
  }

  // Two crew members man each cannon, as far as the fleet holds them
  const { maxCrew } = validateShipCrewRequirements(game.player.ships)
  const missingCannons =
    Math.floor(Math.min(game.player.crewMembers.count, maxCrew) / 2) -
    owned(game, "cannons")
  const affordableCannons = Math.floor(
    spareGold(game) / MERCHANDISE.cannons.buy
  )
  const cannons = Math.min(missingCannons, affordableCannons)

  if (cannons > 0) {
    raiseGold(game, cannons * MERCHANDISE.cannons.buy)
    goTo(game, "Shipyard")
    act(
      game,
      "shipyard:buyFittings",
      (player) =>
        shipyard.buyFittings(player, { item: "cannons", quantity: cannons }),
      { expectSuccess: true }
    )
  }

  if (owned(game, "repairKits") < 3 && gold(game) > 1500) {
    act(
      game,
      "shipyard:buyFittings",
      (player) =>
        shipyard.buyFittings(player, { item: "repairKits", quantity: 3 }),
      { expectSuccess: true }
    )
  }
}

const manageCrew = (game: Game) => {
  const { count, health, mood } = game.player.crewMembers
  const wantedCrew = getWantedCrew(game)

  // Every sailor eats, drinks and wants rum, so idle hands are let go
  if (count > wantedCrew) {
    act(
      game,
      "crew:dismissCrew",
      (player) => crew.dismissCrew(player, { count: count - wantedCrew }),
      { expectSuccess: true }
    )
  }

  if (health < 80 && owned(game, "medicine") > 0) {
    act(
      game,
      "crew:giveMedicine",
      (player) =>
        crew.giveMedicine(player, {
          medicine: Math.min(owned(game, "medicine"), 5),
        }),
      { expectSuccess: true }
    )
  }

  if (mood < 30 && gold(game) > 100) {
    act(
      game,
      "crew:giveGold",
      (player) =>
        crew.giveGold(player, {
          gold: Math.min(player.character.gold - 50, 50 * count),
        }),
      { expectSuccess: true }
    )
  }

  if (game.random.next() < 0.02) {
    act(game, "ship:renameShip", (player) =>
      renameShip(player, { id: Object.keys(player.ships)[0], name: "Sea Wolf" })
    )
  }
}

const sellBarterGoods = (game: Game) => {
  const town = game.player.character.town
  const changes: TradeChange[] = BARTER_ITEMS.filter(
    (item) => owned(game, item) > 0 && isTradeGoodAvailableInTown(item, town)
  ).map((item) => ({ item, quantity: -owned(game, item) }))

  if (!changes.length) {
    return
  }

  goTo(game, "Shop")

  const trade = act(game, "shop:tradeItems", (player) =>
    shop.tradeItems(player, { changes })
  )

  addIncome(game.report, "sales", trade?.data.gold ?? 0)
}

/** Food and water for the voyage, borrowing when short. */
const buySupplies = (game: Game, destination: Town) => {
  const days =
    getJourneyLength(game.player.character.town!, destination) + SPARE_DAYS
  const needed = getJourneySupplies(game.player, days)
  const food = Math.max(needed.food - owned(game, "food"), 0)
  const water = Math.max(needed.water - owned(game, "water"), 0)
  const changes: TradeChange[] = [
    ...(food ? [{ item: "food" as const, quantity: food }] : []),
    ...(water ? [{ item: "water" as const, quantity: water }] : []),
    ...(owned(game, "medicine") < 2 && gold(game) > 1000
      ? [{ item: "medicine" as const, quantity: 3 }]
      : []),
  ]

  if (!changes.length) {
    return
  }

  raiseGold(
    game,
    food * MERCHANDISE.food.buy + water * MERCHANDISE.water.buy + 100,
    { borrow: true }
  )
  goTo(game, "Shop")
  act(game, "shop:tradeItems", (player) => shop.tradeItems(player, { changes }))
}

const visitShop = (game: Game, destination: Town) => {
  sellBarterGoods(game)
  buySupplies(game, destination)

  // Buy goods to sell somewhere else
  const town = game.player.character.town
  const item = game.random.pick(
    BARTER_ITEMS.filter((good) => isTradeGoodAvailableInTown(good, town))
  )
  const quantity = Math.min(
    freeCargo(game) - 20,
    Math.floor((gold(game) - 1000) / MERCHANDISE[item].buy)
  )

  if (game.random.next() < 0.3 && quantity > 0 && spareGold(game) > 0) {
    goTo(game, "Shop")
    act(game, "shop:buyItem", (player) =>
      shop.buyItem(player, { item, quantity })
    )
  }
}

/** Buys quest goods where they are sold, and drops quests that drag on. */
const runQuestErrands = (game: Game) => {
  for (const quest of Object.values(game.player.quests ?? {})) {
    if (game.player.character.day - quest.acceptedDay > QUEST_PATIENCE_DAYS) {
      if (
        act(game, "npc:abandonQuest", (player) =>
          npc.abandonQuest(player, { questId: quest.id })
        )
      ) {
        game.report.quests.abandoned++
      }

      continue
    }

    if (quest.type !== "procurement") {
      continue
    }

    const quantity = quest.quantity - owned(game, quest.item)

    if (
      quantity > 0 &&
      isTradeGoodAvailableInTown(quest.item, game.player.character.town)
    ) {
      goTo(game, "Shop")
      act(game, "shop:buyItem", (player) =>
        shop.buyItem(player, { item: quest.item, quantity })
      )
    }
  }
}

/** Promotions first, then quest business, otherwise somewhere near. */
const chooseDestination = (game: Game): Town => {
  const here = game.player.character.town!
  const byDistance = (a: Town, b: Town) =>
    getJourneyLength(here, a) - getJourneyLength(here, b)
  const homeTowns = TOWN_NAMES.filter(
    (town) =>
      TOWNS[town].nation === game.player.character.nationality && town !== here
  ).sort(byDistance)

  if (
    getNewTitle({ ...game.player.character, town: homeTowns[0] })
      .promotionAvailable
  ) {
    return homeTowns[0]
  }

  const questTowns = Object.values(game.player.quests ?? {})
    .flatMap((quest) => {
      switch (quest.type) {
        case "delivery":
          return [getNpcById(quest.targetNpcId)!.town]
        case "messageChain":
          return [getNpcById(quest.stepNpcIds[quest.step])!.town]
        case "procurement":
          return owned(game, quest.item) >= quest.quantity
            ? [getNpcById(quest.giverId)!.town]
            : []
        case "findPerson":
          return quest.found
            ? [getNpcById(quest.giverId)!.town]
            : TOWN_NAMES.filter(
                (town) =>
                  TOWNS[town].nation === quest.nation &&
                  !quest.ruledOut?.includes(town)
              )
      }
    })
    .filter((town) => town !== here)

  if (questTowns.length && game.random.next() < 0.7) {
    return game.random.pick(questTowns)
  }

  const otherTowns = TOWN_NAMES.filter((town) => town !== here)
  // The closer half of the map, so it holds whatever the voyage lengths are
  const nearTowns = [...otherTowns]
    .sort((a, b) => getJourneyLength(here, a) - getJourneyLength(here, b))
    .slice(0, Math.ceil(otherTowns.length / 2))

  return game.random.pick(
    nearTowns.length && game.random.next() < 0.7 ? nearTowns : otherTowns
  )
}

/** Deals with whatever the advisor says is stopping the voyage. */
const fixBlockers = (
  game: Game,
  blockers: AdvisorWarning[],
  destination: Town
) => {
  if (blockers.includes("TOO_MANY_CREW")) {
    manageCrew(game)
  }

  if (blockers.includes("NOT_ENOUGH_CREW")) {
    visitTavern(game)
  }

  if (blockers.includes("CARGO_OVERLOADED")) {
    sellBarterGoods(game)

    if (getCargo(game.player).overload > 0) {
      raiseGold(game, SHIP_TYPES.Merchantman.buy)
      goTo(game, "Shipyard")
      act(game, "shipyard:buyShip", (player) =>
        shipyard.buyShip(player, { item: "Merchantman" })
      )
    }
  }

  if (blockers.includes("DAMAGED_SHIPS")) {
    visitShipyard(game)
  }

  if (blockers.includes("ANGRY_CREW") || blockers.includes("CREW_IS_ILL")) {
    raiseGold(
      game,
      game.player.crewMembers.count * TAVERN_ITEMS["serve-supper"].price,
      { borrow: true }
    )
    visitTavern(game)
  }

  if (
    blockers.includes("NEED_MORE_FOOD") ||
    blockers.includes("NEED_MORE_WATER")
  ) {
    buySupplies(game, destination)
  }
}

/**
 * What a broke captain does before giving up: sells the most valuable
 * spare ship and keeps only the crew needed to sail, since every sailor
 * needs food and water.
 */
const cutBack = (game: Game) => {
  const ships = Object.values(game.player.ships)

  if (ships.length > 1) {
    const { id } = ships.sort(
      (a, b) => SHIP_TYPES[b.type].sell - SHIP_TYPES[a.type].sell
    )[0]

    goTo(game, "Shipyard")
    act(
      game,
      "shipyard:sellShip",
      (player) => shipyard.sellShip(player, { id }),
      { expectSuccess: true }
    )
  }

  const { minCrew } = validateShipCrewRequirements(game.player.ships)
  const extraCrew = game.player.crewMembers.count - minCrew

  if (extraCrew > 0) {
    act(
      game,
      "crew:dismissCrew",
      (player) => crew.dismissCrew(player, { count: extraCrew }),
      { expectSuccess: true }
    )
  }
}

/** One stop in port: every building, then off to sea. Returns false when stuck. */
const playTown = (game: Game) => {
  let destination = chooseDestination(game)

  visitCityHall(game)
  visitBank(game)
  visitTavern(game)
  visitMarket(game)
  runQuestErrands(game)
  visitShipyard(game)
  manageCrew(game)
  visitShop(game, destination)
  bankSavings(game)

  for (let attempt = 0; attempt < DEPARTURE_ATTEMPTS; attempt++) {
    goTo(game, "Harbor")

    if (
      act(game, "sea:startJourney", (player) =>
        sea.startJourney(player, { town: destination })
      )
    ) {
      return true
    }

    const blockers = getAdvisorWarnings(game.player, destination)
      .filter(({ blocksTravel }) => blocksTravel)
      .map(({ tip }) => tip)

    blockers.forEach((tip) => countUp(game.report.blockedDepartures, tip))

    if (attempt > 1) {
      cutBack(game)
    }

    fixBlockers(game, blockers, destination)

    // Short of supplies, a nearer town might do
    if (attempt > 0) {
      const here = game.player.character.town!

      destination = TOWN_NAMES.filter((town) => town !== here).sort(
        (a, b) => getJourneyLength(here, a) - getJourneyLength(here, b)
      )[0]
    }
  }

  return false
}

// --- At sea ---

const fight = (game: Game) => {
  const { battle } = game.player.locationStates!.sea!
  const action: BattleAction = game.random.next() < 0.8 ? "fire" : "evade"
  const goldBefore = gold(game)
  const shipsBefore = Object.keys(game.player.ships).length
  const move = act(
    game,
    "sea:battleMove",
    (player) => sea.battleMove(player, { action }),
    { expectSuccess: true }
  )

  if (!move || move.data.outcome === "ongoing" || !battle) {
    return
  }

  if (move.data.outcome === "victory") {
    game.report.battles.won++
    addIncome(
      game.report,
      "plunder",
      "lootedGold" in move.data ? (move.data.lootedGold ?? 0) : 0
    )
  } else {
    game.report.battles.lost++
    game.report.goldLostInDefeats += goldBefore
    game.report.sunkShips += shipsBefore - Object.keys(game.player.ships).length
  }
}

/** Hunts the enemy nation, spares its own and runs from anything too strong. */
const meetShip = (game: Game, meeting: ShipMeetingState) => {
  const { nationality } = game.player.character
  const isEnemy = meeting.nation === NATIONS[nationality].warWith
  const isOwnNation = meeting.nation === nationality
  const firepower = getMannedCannons(
    game.player.crewMembers.count,
    game.player.inventory?.cannons
  )
  const courage = isEnemy ? 0.6 : 0.8
  const willAttack =
    !isOwnNation &&
    (firepower >= meeting.cannons * courage || game.random.next() < 0.1) &&
    (meeting.isAggressive || isEnemy || game.random.next() < 0.7)

  if (willAttack) {
    game.report.attacks[isEnemy ? "enemy" : "neutral"]++
    act(game, "sea:attackShip", (player) => sea.attackShip(player), {
      expectSuccess: true,
    })

    return
  }

  if (meeting.isAggressive) {
    const flight = act(game, "sea:fleeShip", (player) => sea.fleeShip(player), {
      expectSuccess: true,
    })

    if (flight) {
      game.report.battles[flight.data.escaped ? "fled" : "failedToFlee"]++
    }

    return
  }

  game.report.battles.ignored++
  act(game, "sea:ignoreShip", (player) => sea.ignoreShip(player), {
    expectSuccess: true,
  })
}

const playSeaDay = (game: Game) => {
  const seaState = game.player.locationStates?.sea

  if (seaState?.battle) {
    fight(game)

    return
  }

  if (seaState?.shipMeeting) {
    meetShip(game, seaState.shipMeeting)

    return
  }

  for (const { id, health } of Object.values(game.player.ships)) {
    const quantity = Math.min(
      owned(game, "repairKits"),
      Math.ceil((100 - health) / 10)
    )

    if (health < 50 && quantity > 0) {
      act(
        game,
        "ship:repairShipWithKits",
        (player) => repairShipWithKits(player, { id, quantity }),
        { expectSuccess: true }
      )
    }
  }

  if (seaState?.lootOffer) {
    const loot = getLootPreset(seaState.lootOffer, freeCargo(game))

    if (game.random.next() < 0.5) {
      act(
        game,
        "sea:takeLootAndSail",
        (player) => sea.takeLootAndSail(player, { loot }),
        {
          expectSuccess: true,
        }
      )
    } else {
      act(game, "sea:takeLoot", (player) => sea.takeLoot(player, { loot }), {
        expectSuccess: true,
      })
    }

    return
  }

  act(game, "sea:continueJourney", (player) => sea.continueJourney(player), {
    expectSuccess: true,
  })
}

// --- A whole game ---

const startOver = (game: Game) => {
  const { character, crewMembers, ships } = game.player

  game.report.resets.push(
    `${describeMoment(game)}: stuck in ${character.town} with ${character.gold} gold, ${character.account ?? 0} saved, ${character.loan ?? 0} owed, ${crewMembers.count} crew, ships ${Object.values(
      ships
    )
      .map(({ type, health }) => `${type} ${health}%`)
      .join(", ")}`
  )

  act(
    game,
    "user:resetGame",
    (player) =>
      resetGame(player, {
        startingTown: getRandomTown(player.character.nationality),
        ship: createNewShip("Brig", 1),
      }),
    { expectSuccess: true }
  )
}

const recordTitle = (game: Game, title: Title) => {
  const reached = (game.report.titleDays[title] ??= [])

  reached.push(game.player.character.day)
}

export const playGame = (
  seed: number,
  maxDays: number,
  report: Report,
  trace?: Game["trace"]
) => {
  const random = createSeededRandom(seed)
  const realRandom = Math.random

  // Battles and ship meetings roll Math.random, so it is seeded too
  Math.random = random.next

  const nationality = random.pick(NATION_NAMES)
  const game: Game = {
    seed,
    random,
    report,
    trace,
    steps: 0,
    recent: [],
    player: createNewPlayer(
      { name: "Autoplay", nationality, characterId: "mateo-salazar" },
      {
        id: `autoplay-${seed}`,
        createdDate: 0,
        startingTown: getRandomTown(nationality),
        ship: createNewShip("Brig", 1),
      }
    ),
  }
  const titlesReached = new Set<Title>()
  let resets = 0

  // A bot that resets again and again would never see the end, so it gives up
  while (game.player.character.day < maxDays && resets <= MAX_RESETS) {
    const { title } = game.player.character

    if (!titlesReached.has(title)) {
      titlesReached.add(title)
      recordTitle(game, title)
    }

    if (game.player.character.location === "Sea") {
      playSeaDay(game)
    } else if (!playTown(game)) {
      startOver(game)
      resets++
    }
  }

  Math.random = realRandom

  const { character } = game.player

  report.games++
  report.daysPlayed.push(character.day)
  report.netWorth.push(getNetWorth(game.player))
  report.scores.push(getScore(game.player))
  report.enemyWins.push(
    character.battles?.[NATIONS[character.nationality].warWith]?.won ?? 0
  )
  report.finalTitles[character.title] =
    (report.finalTitles[character.title] ?? 0) + 1
}
