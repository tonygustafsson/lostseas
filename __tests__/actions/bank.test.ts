import { describe, expect, it } from "vitest"

import { LOAN_LIMIT } from "@/constants/bank"
import { VENTURE_IDS, VENTURES } from "@/constants/ventures"
import {
  collectVenture,
  deposit,
  investInVenture,
  repayLoan,
  takeLoan,
  withdraw,
} from "@/utils/actions/bank"
import type { ActionResult } from "@/utils/actions/types"
import { formatGold } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const atBank = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({ character: { location: "Bank" } }),
      overrides
    )
  )

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

const ACTIONS = { deposit, withdraw, takeLoan, repayLoan }

const INVALID_AMOUNTS: unknown[] = [
  0,
  -1,
  1.5,
  "5",
  "abc",
  null,
  undefined,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_SAFE_INTEGER + 1,
]

describe("all bank actions", () => {
  const cases = Object.entries(ACTIONS).flatMap(([name, action]) =>
    INVALID_AMOUNTS.map((amount) => ({ name, action, amount }))
  )

  it.each(cases)("$name rejects amount $amount", ({ action, amount }) => {
    const player = atBank({
      character: { gold: 1000, account: 1000, loan: 1000 },
    })

    expectError(
      action(player, { amount } as never),
      "Amount must be a positive whole number"
    )
  })

  it.each(Object.entries(ACTIONS))("%s only works at the bank", (_, action) => {
    const player = createTestPlayer({
      character: { location: "Shop", account: 1000, loan: 1000 },
    })

    expectError(
      action(player, { amount: 10 }),
      "You must be at Bank to do this."
    )
  })
})

describe("deposit", () => {
  it("moves gold into the account", () => {
    const result = expectSuccess(deposit(atBank(), { amount: 400 }))

    expect(result.player.character).toMatchObject({ gold: 600, account: 400 })
    expect(result.data).toEqual({ amount: 400, gold: 600 })
    expect(result.log).toMatchObject({
      type: "bank",
      message:
        "Deposited 400 gold into the bank. Current account balance: 400 gold.",
    })
  })

  it("adds to existing savings", () => {
    const result = expectSuccess(
      deposit(atBank({ character: { account: 50 } }), { amount: 1000 })
    )

    expect(result.player.character).toMatchObject({ gold: 0, account: 1050 })
  })

  it("is allowed once the loan is repaid to 0", () => {
    expectSuccess(deposit(atBank({ character: { loan: 0 } }), { amount: 1 }))
  })

  it("rejects deposits while a loan is outstanding, as the guide says", () => {
    expectError(
      deposit(atBank({ character: { loan: 1 } }), { amount: 10 }),
      "You cannot add funds until your loan is fully repaid."
    )
  })

  it("rejects depositing more gold than carried", () => {
    expectError(deposit(atBank(), { amount: 1001 }), "Not enough gold")
  })
})

describe("withdraw", () => {
  it("moves gold out of the account", () => {
    const result = expectSuccess(
      withdraw(atBank({ character: { account: 500 } }), { amount: 200 })
    )

    expect(result.player.character).toMatchObject({ gold: 1200, account: 300 })
    expect(result.data).toEqual({ amount: 200, gold: 1200 })
  })

  it("works while a loan is outstanding, as the guide says", () => {
    expectSuccess(
      withdraw(atBank({ character: { account: 500, loan: 100 } }), {
        amount: 500,
      })
    )
  })

  it("rejects withdrawing more than the account holds", () => {
    expectError(
      withdraw(atBank({ character: { account: 99 } }), { amount: 100 }),
      "Not enough gold in bank account"
    )
    expectError(
      withdraw(atBank(), { amount: 1 }),
      "Not enough gold in bank account"
    )
  })
})

describe("takeLoan", () => {
  it("adds the loan and the gold", () => {
    const result = expectSuccess(takeLoan(atBank(), { amount: 2500 }))

    expect(result.player.character).toMatchObject({ gold: 3500, loan: 2500 })
    expect(result.data).toEqual({ amount: 2500, gold: 3500, loan: 2500 })
  })

  it("allows borrowing up to the limit in several loans", () => {
    const first = expectSuccess(takeLoan(atBank(), { amount: LOAN_LIMIT - 1 }))
    const second = expectSuccess(takeLoan(first.player, { amount: 1 }))

    expect(second.player.character.loan).toBe(LOAN_LIMIT)
    expectError(
      takeLoan(second.player, { amount: 1 }),
      `You cannot loan more than a total of ${formatGold(LOAN_LIMIT)}.`
    )
  })

  it("rejects a single loan above the limit", () => {
    expectError(
      takeLoan(atBank(), { amount: LOAN_LIMIT + 1 }),
      `You cannot loan more than a total of ${formatGold(LOAN_LIMIT)}.`
    )
  })
})

describe("repayLoan", () => {
  it("repays part of the loan", () => {
    const result = expectSuccess(
      repayLoan(atBank({ character: { loan: 600 } }), { amount: 200 })
    )

    expect(result.player.character).toMatchObject({ gold: 800, loan: 400 })
    expect(result.data).toEqual({ amount: 200, gold: 800, loan: 400 })
  })

  it("repays the whole loan", () => {
    const result = expectSuccess(
      repayLoan(atBank({ character: { loan: 600 } }), { amount: 600 })
    )

    expect(result.player.character.loan).toBe(0)
    expect(result.data.loan).toBeNull()
    expect(result.log).toMatchObject({
      type: "bank",
      message: "Repaid 600 gold to the bank. Remaining loan: 0 gold.",
    })
  })

  it("rejects repaying more than owed", () => {
    expectError(
      repayLoan(atBank({ character: { loan: 100 } }), { amount: 101 }),
      "You cannot repay more than you owe the bank."
    )
    expectError(
      repayLoan(atBank(), { amount: 1 }),
      "You cannot repay more than you owe the bank."
    )
  })

  it("rejects repaying with gold the player does not have", () => {
    expectError(
      repayLoan(atBank({ character: { gold: 50, loan: 500 } }), {
        amount: 100,
      }),
      "Not enough gold"
    )
  })
})

describe("random bank play", () => {
  const AMOUNTS: unknown[] = [1, 10, 100, 500, 2000, 9000, 0, -5, 2.5, "10"]
  const LOCATIONS: TownLocation[] = ["Bank", "Bank", "Bank", "Shop", "Tavern"]
  const actions = Object.values(ACTIONS)

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      const succeededActions = new Set<number>()

      let player = createTestPlayer({
        character: { gold: random.int(0, 5000) },
      })

      for (let step = 0; step < 1000; step++) {
        player = {
          ...player,
          character: {
            ...player.character,
            location: random.pick(LOCATIONS),
          },
        }

        const before = deepFreeze(structuredClone(player))
        const actionIndex = random.int(0, actions.length - 1)
        // Sometimes use the full loan, so loans get repaid and deposits unlock
        const amount = (
          random.int(0, 3) === 0 && before.character.loan
            ? before.character.loan
            : random.pick(AMOUNTS)
        ) as number
        const context = `seed ${seed}, step ${step}, action ${actionIndex}, amount ${String(amount)}`

        const result = actions[actionIndex](before, { amount })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(actionIndex)

        const { character } = result.player
        const netWorth = (c: Character) =>
          c.gold + (c.account || 0) - (c.loan || 0)

        expect(character.gold, context).toBeGreaterThanOrEqual(0)
        expect(character.account ?? 0, context).toBeGreaterThanOrEqual(0)
        expect(character.loan ?? 0, context).toBeGreaterThanOrEqual(0)
        expect(character.loan ?? 0, context).toBeLessThanOrEqual(LOAN_LIMIT)
        expect(Number.isSafeInteger(character.gold), context).toBe(true)

        // Moving gold around the bank never creates or destroys wealth
        expect(netWorth(character), context).toBe(netWorth(before.character))
        expect(result.player.inventory, context).toEqual(before.inventory)

        player = result.player
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(actions.length)
    }
  )
})

describe("venture chances", () => {
  it.each(VENTURE_IDS)("%s chances add up to 100", (ventureId) => {
    const total = VENTURES[ventureId].outcomes.reduce(
      (sum, { chance }) => sum + chance,
      0
    )

    expect(total).toBe(100)
  })
})

describe("investInVenture", () => {
  it("pays the stake from the purse and records the return day", () => {
    const player = atBank({ character: { gold: 2000, day: 7 } })
    const result = expectSuccess(
      investInVenture(player, { ventureId: "tobaccoRun" })
    )

    expect(result.player.character.gold).toBe(500)
    expect(result.player.character.ventures).toEqual({
      tobaccoRun: { investedDay: 7, returnDay: 28 },
    })
    expect(result.data).toEqual({
      ventureId: "tobaccoRun",
      gold: 500,
      returnDay: 28,
    })
    expect(result.log).toMatchObject({
      type: "bank",
      message:
        "Invested 1500 gold in The Havana tobacco run. Expected back on day 28.",
    })
  })

  it("never touches the bank account", () => {
    const result = expectSuccess(
      investInVenture(atBank({ character: { gold: 500, account: 3000 } }), {
        ventureId: "sugarConvoy",
      })
    )

    expect(result.player.character).toMatchObject({ gold: 0, account: 3000 })
  })

  it("is allowed while a loan is outstanding", () => {
    expectSuccess(
      investInVenture(atBank({ character: { loan: 5000 } }), {
        ventureId: "sugarConvoy",
      })
    )
  })

  it("allows one share in each venture at the same time", () => {
    let player = atBank({ character: { gold: 20000 } })

    for (const ventureId of VENTURE_IDS) {
      player = expectSuccess(investInVenture(player, { ventureId })).player
    }

    expect(Object.keys(player.character.ventures ?? {})).toEqual(VENTURE_IDS)
  })

  it("rejects a second share in the same venture", () => {
    const { player } = expectSuccess(
      investInVenture(atBank({ character: { gold: 5000 } }), {
        ventureId: "sugarConvoy",
      })
    )

    expectError(
      investInVenture(player, { ventureId: "sugarConvoy" }),
      "You already hold a share in this venture."
    )
  })

  it("rejects a stake larger than the purse", () => {
    expectError(
      investInVenture(atBank({ character: { gold: 499, account: 10000 } }), {
        ventureId: "sugarConvoy",
      }),
      "Not enough gold"
    )
  })

  it("rejects unknown ventures", () => {
    expectError(
      investInVenture(atBank(), { ventureId: "toString" as VentureId }),
      "Unknown venture"
    )
  })

  it("only works at the bank", () => {
    expectError(
      investInVenture(createTestPlayer({ character: { location: "Shop" } }), {
        ventureId: "sugarConvoy",
      }),
      "You must be at Bank to do this."
    )
  })
})

describe("collectVenture", () => {
  const withShare = (day: number, overrides: DeepPartial<Player> = {}) =>
    atBank(
      patchDeep<DeepPartial<Player>>(
        {
          character: {
            day,
            ventures: { tobaccoRun: { investedDay: 1, returnDay: 22 } },
          },
        },
        overrides
      )
    )

  it.each([
    { roll: 1, returns: 2400 },
    { roll: 70, returns: 2400 },
    { roll: 71, returns: 1500 },
    { roll: 90, returns: 1500 },
    { roll: 91, returns: 0 },
    { roll: 100, returns: 0 },
  ])("pays $returns gold on a roll of $roll", ({ roll, returns }) => {
    const result = expectSuccess(
      collectVenture(withShare(22), { ventureId: "tobaccoRun" }, () => roll)
    )

    expect(result.player.character.gold).toBe(1000 + returns)
    expect(result.player.character.ventures).toEqual({})
    expect(result.data).toMatchObject({ ventureId: "tobaccoRun", returns })
  })

  it("rolls between 1 and 100", () => {
    const calls: [number, number][] = []

    collectVenture(withShare(30), { ventureId: "tobaccoRun" }, (min, max) => {
      calls.push([min, max])
      return min
    })

    expect(calls).toEqual([[1, 100]])
  })

  it("returns the outcome message and logs the result", () => {
    const result = expectSuccess(
      collectVenture(withShare(22), { ventureId: "tobaccoRun" }, () => 100)
    )

    expect(result.data.message).toBe(VENTURES.tobaccoRun.outcomes[2].message)
    expect(result.log).toMatchObject({
      type: "bank",
      message:
        "The Havana tobacco run returned 0 gold on a stake of 1500 gold.",
    })
  })

  it("keeps the other ventures", () => {
    const player = withShare(22, {
      character: {
        ventures: { silverFleet: { investedDay: 1, returnDay: 43 } },
      },
    })
    const result = expectSuccess(
      collectVenture(player, { ventureId: "tobaccoRun" }, () => 1)
    )

    expect(result.player.character.ventures).toEqual({
      silverFleet: { investedDay: 1, returnDay: 43 },
    })
  })

  it("works in any town", () => {
    expectSuccess(
      collectVenture(
        withShare(22, { character: { town: "Tortuga" } }),
        { ventureId: "tobaccoRun" },
        () => 1
      )
    )
  })

  it("rejects collecting before the party returns", () => {
    expectError(
      collectVenture(withShare(21), { ventureId: "tobaccoRun" }, () => 1),
      "The party has not yet returned."
    )
  })

  it("rejects collecting a venture without a share", () => {
    expectError(
      collectVenture(withShare(50), { ventureId: "silverFleet" }, () => 1),
      "You hold no share in this venture."
    )
  })

  it("only works at the bank", () => {
    expectError(
      collectVenture(
        withShare(22, { character: { location: "Tavern" } }),
        { ventureId: "tobaccoRun" },
        () => 1
      ),
      "You must be at Bank to do this."
    )
  })
})

describe("random venture play", () => {
  const LOCATIONS: TownLocation[] = ["Bank", "Bank", "Bank", "Shop"]

  it.each([1, 2, 3, 4, 5])("keeps the game consistent with seed %i", (seed) => {
    const random = createSeededRandom(seed)
    let invested = 0
    let collected = 0

    let player = createTestPlayer({
      character: { gold: random.int(0, 20000), day: 1 },
    })

    for (let step = 0; step < 1000; step++) {
      player = {
        ...player,
        character: {
          ...player.character,
          location: random.pick(LOCATIONS),
          day: player.character.day + random.int(0, 3),
        },
      }

      const before = deepFreeze(structuredClone(player))
      const ventureId = random.pick(VENTURE_IDS)
      const isInvest = random.int(0, 1) === 0
      const context = `seed ${seed}, step ${step}, ${isInvest ? "invest" : "collect"} ${ventureId}`

      const result = isInvest
        ? investInVenture(before, { ventureId })
        : collectVenture(before, { ventureId }, random.int)

      if ("error" in result) {
        expect(result.error, context).toBeTruthy()
        continue
      }

      const { character } = result.player
      const { stake, outcomes } = VENTURES[ventureId]

      expect(character.gold, context).toBeGreaterThanOrEqual(0)
      expect(Number.isSafeInteger(character.gold), context).toBe(true)
      expect(character.account, context).toBe(before.character.account)

      if (isInvest) {
        invested++
        expect(character.gold, context).toBe(before.character.gold - stake)
        expect(character.ventures?.[ventureId], context).toBeDefined()
      } else {
        collected++
        const returns = character.gold - before.character.gold

        expect(
          outcomes.map((outcome) => outcome.returns),
          context
        ).toContain(returns)
        expect(character.ventures?.[ventureId], context).toBeUndefined()
      }

      player = result.player
    }

    // Guards against random play that only ever hits errors
    expect(invested).toBeGreaterThan(0)
    expect(collected).toBeGreaterThan(0)
  })
})
