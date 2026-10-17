import { describe, expect, it } from "vitest"

import { LOAN_LIMIT } from "@/constants/bank"
import { deposit, repayLoan, takeLoan, withdraw } from "@/utils/actions/bank"
import type { ActionResult } from "@/utils/actions/types"
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
    expect(result.log).toBe(
      "Deposited 400 gold into the bank. Current account balance: 400 gold."
    )
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
      `You cannot loan more than a total of ${LOAN_LIMIT} gold.`
    )
  })

  it("rejects a single loan above the limit", () => {
    expectError(
      takeLoan(atBank(), { amount: LOAN_LIMIT + 1 }),
      `You cannot loan more than a total of ${LOAN_LIMIT} gold.`
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
    expect(result.log).toBe(
      "Repaid 600 gold to the bank. Remaining loan: 0 gold."
    )
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
