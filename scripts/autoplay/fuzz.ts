import { createSeededRandom } from "@/__tests__/helpers/seededRandom"
import { getNpcAt } from "@/constants/npcs"
import * as bank from "@/utils/actions/bank"
import { moveToLocation } from "@/utils/actions/character"
import * as cityhall from "@/utils/actions/cityhall"
import * as crew from "@/utils/actions/crew"
import * as market from "@/utils/actions/market"
import * as npc from "@/utils/actions/npc"
import * as sea from "@/utils/actions/sea"
import * as ship from "@/utils/actions/ship"
import * as shipyard from "@/utils/actions/shipyard"
import * as shop from "@/utils/actions/shop"
import * as tavern from "@/utils/actions/tavern"
import type { ActionResult } from "@/utils/actions/types"
import { createNewPlayer } from "@/utils/actions/user"
import { createNewShip } from "@/utils/ship"

import { act, type Game } from "./game"
import type { Report } from "./report"

/** Input a broken client or a cheater could send to an API route */
const JUNK: unknown[] = [
  -1,
  0,
  1.5,
  NaN,
  Infinity,
  -Infinity,
  1e300,
  Number.MAX_SAFE_INTEGER,
  "5",
  "",
  "abc",
  null,
  undefined,
  {},
  [],
  "__proto__",
  "constructor",
  "toString",
  true,
]

// Junk is cast on purpose, the actions must cope with whatever a request holds
type Junk = never

type FuzzCase = {
  action: string
  location: Character["location"]
  run: (junk: Junk) => (player: Player) => ActionResult | { blocked: true }
  /** Junk that is fine for this input, like selling one item with -1 */
  allowed?: unknown[]
}

const CASES: FuzzCase[] = [
  {
    action: "shop:buyItem quantity",
    location: "Shop",
    run: (junk) => (p) => shop.buyItem(p, { item: "food", quantity: junk }),
  },
  {
    action: "shop:buyItem item",
    location: "Shop",
    run: (junk) => (p) => shop.buyItem(p, { item: junk, quantity: 1 }),
  },
  {
    action: "shop:sellItem quantity",
    location: "Shop",
    run: (junk) => (p) => shop.sellItem(p, { item: "food", quantity: junk }),
  },
  {
    action: "shop:tradeItems changes",
    location: "Shop",
    run: (junk) => (p) => shop.tradeItems(p, { changes: junk }),
  },
  {
    action: "shop:tradeItems item",
    location: "Shop",
    run: (junk) => (p) =>
      shop.tradeItems(p, { changes: [{ item: junk, quantity: 1 }] }),
  },
  {
    action: "shop:tradeItems quantity",
    location: "Shop",
    run: (junk) => (p) =>
      shop.tradeItems(p, { changes: [{ item: "food", quantity: junk }] }),
    allowed: [-1],
  },
  {
    action: "bank:deposit",
    location: "Bank",
    run: (junk) => (p) => bank.deposit(p, { amount: junk }),
  },
  {
    action: "bank:withdraw",
    location: "Bank",
    run: (junk) => (p) => bank.withdraw(p, { amount: junk }),
  },
  {
    action: "bank:takeLoan",
    location: "Bank",
    run: (junk) => (p) => bank.takeLoan(p, { amount: junk }),
  },
  {
    action: "bank:repayLoan",
    location: "Bank",
    run: (junk) => (p) => bank.repayLoan(p, { amount: junk }),
  },
  {
    action: "bank:investInVenture",
    location: "Bank",
    run: (junk) => (p) => bank.investInVenture(p, { ventureId: junk }),
  },
  {
    action: "bank:collectVenture",
    location: "Bank",
    run: (junk) => (p) => bank.collectVenture(p, { ventureId: junk }),
  },
  {
    action: "character:moveToLocation",
    location: "Harbor",
    run: (junk) => (p) => moveToLocation(p, { location: junk }),
  },
  {
    action: "crew:dismissCrew",
    location: "Harbor",
    run: (junk) => (p) => crew.dismissCrew(p, { count: junk }),
  },
  {
    action: "crew:giveGold",
    location: "Harbor",
    run: (junk) => (p) => crew.giveGold(p, { gold: junk }),
  },
  {
    action: "crew:giveMedicine",
    location: "Harbor",
    run: (junk) => (p) => crew.giveMedicine(p, { medicine: junk }),
  },
  {
    action: "market:acceptMarketOffer",
    location: "Market",
    run: (junk) => (p) => market.acceptMarketOffer(p, { item: junk }),
  },
  {
    action: "market:buyRemedy",
    location: "Market",
    run: (junk) => (p) => market.buyRemedy(p, { remedy: junk }),
  },
  {
    action: "shipyard:buyFittings quantity",
    location: "Shipyard",
    run: (junk) => (p) =>
      shipyard.buyFittings(p, { item: "cannons", quantity: junk }),
  },
  {
    action: "shipyard:buyFittings item",
    location: "Shipyard",
    run: (junk) => (p) => shipyard.buyFittings(p, { item: junk, quantity: 1 }),
  },
  {
    action: "shipyard:sellFittings",
    location: "Shipyard",
    run: (junk) => (p) =>
      shipyard.sellFittings(p, { item: "cannons", quantity: junk }),
  },
  {
    action: "shipyard:buyShip",
    location: "Shipyard",
    run: (junk) => (p) => shipyard.buyShip(p, { item: junk }),
  },
  {
    action: "shipyard:sellShip",
    location: "Shipyard",
    run: (junk) => (p) => shipyard.sellShip(p, { id: junk }),
  },
  {
    action: "shipyard:repairShip",
    location: "Shipyard",
    run: (junk) => (p) => shipyard.repairShip(p, { id: junk }),
  },
  {
    action: "ship:removeShip",
    location: "Harbor",
    run: (junk) => (p) => ship.removeShip(p, { id: junk }),
  },
  {
    action: "ship:renameShip",
    location: "Harbor",
    run: (junk) => (p) =>
      ship.renameShip(p, { id: Object.keys(p.ships)[0], name: junk }),
    allowed: ["abc", "__proto__", "constructor", "toString"],
  },
  {
    action: "ship:repairShipWithKits",
    location: "Harbor",
    run: (junk) => (p) =>
      ship.repairShipWithKits(p, {
        id: Object.keys(p.ships)[0],
        quantity: junk,
      }),
  },
  {
    action: "tavern:treatCrew",
    location: "Tavern",
    run: (junk) => (p) => tavern.treatCrew(p, { item: junk }),
  },
  {
    action: "tavern:playCards bet",
    location: "Tavern",
    run: (junk) => (p) =>
      tavern.playCards(p, { betPercentage: junk, selectedCard: 1 }),
  },
  {
    action: "tavern:playCards card",
    location: "Tavern",
    run: (junk) => (p) =>
      tavern.playCards(p, { betPercentage: 10, selectedCard: junk }),
    allowed: [0],
  },
  {
    action: "sea:startJourney",
    location: "Harbor",
    run: (junk) => (p) => sea.startJourney(p, { town: junk }),
  },
  {
    action: "sea:battleMove",
    location: "Harbor",
    run: (junk) => (p) => sea.battleMove(p, { action: junk }),
  },
  {
    action: "sea:takeLoot",
    location: "Harbor",
    run: (junk) => (p) => sea.takeLoot(p, { loot: junk }),
  },
  {
    action: "npc:talkTo",
    location: "Tavern",
    run: (junk) => (p) => npc.talkTo(p, { npcId: junk }),
  },
  {
    action: "npc:answerNpc",
    location: "Tavern",
    run: (junk) => (p) =>
      npc.answerNpc(p, {
        npcId: getNpcAt("Port Royale", "tavern").id,
        answerIndex: junk,
      }),
  },
  {
    action: "npc:abandonQuest",
    location: "Harbor",
    run: (junk) => (p) => npc.abandonQuest(p, { questId: junk }),
  },
  {
    action: "cityhall:handOverTreasure",
    location: "City hall",
    run: (junk) => (p) => cityhall.handOverTreasure(p, { id: junk }),
  },
  {
    action: "cityhall:handOverPirate",
    location: "City hall",
    run: (junk) => (p) => cityhall.handOverPirate(p, { id: junk }),
  },
]

const describeJunk = (junk: unknown) =>
  typeof junk === "number" || junk === undefined
    ? String(junk)
    : JSON.stringify(junk)

/**
 * Sends junk to every action, in the building where it works. Each action
 * should refuse politely. Throwing or accepting the junk is reported.
 */
export const fuzzActions = (report: Report) => {
  const random = createSeededRandom(0)
  const player = createNewPlayer(
    { name: "Fuzz", nationality: "England", characterId: "mateo-salazar" },
    {
      id: "fuzz",
      createdDate: 0,
      startingTown: "Port Royale",
      ship: createNewShip("Brig", 1),
    }
  )

  for (const { action, location, run, allowed = [] } of CASES) {
    for (const junk of JUNK) {
      const game: Game = {
        seed: 0,
        steps: 0,
        recent: [],
        random,
        report,
        player: {
          ...player,
          character: { ...player.character, location, gold: 5000 },
        },
      }

      const accepted = act(game, `fuzz ${action}`, run(junk as Junk))

      if (accepted && !allowed.includes(junk)) {
        report.acceptedJunk.push(`${action} took ${describeJunk(junk)}`)
      }
    }
  }
}
