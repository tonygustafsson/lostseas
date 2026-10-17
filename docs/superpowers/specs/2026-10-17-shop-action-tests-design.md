# Shop action tests (pilot)

## Goal

Test shop gameplay by feeding mocked `Player` objects into pure functions, and test the shop API routes only for their wiring. No real database or HTTP. The shop is the pilot for the same pattern across the other 38 routes.

## Scope

The four routes in `app/api/shop/`: `buy`, `sell`, `buyNecessities`, `sellBarterGoods`.

## Design

### 1. Pure shop actions

New file `utils/actions/shop.ts` with one function per route:

- `buyItem(player, { item, quantity })`
- `sellItem(player, { item, quantity })`
- `buyNecessities(player, { days })`
- `sellBarterGoods(player)`

Each returns a shared result type from `utils/actions/types.ts`:

```ts
type ActionResult<T> =
  | { error: string; data?: Partial<T> }
  | { player: Player; log: string; data: T }
```

All the current validation (location, town availability, gold, quantities, safe integers, valid item) moves into these functions unchanged. They never mutate the input player. `data` holds the extra response fields (like `totalPrice` or `cost`).

### 2. Thin routes

Each route keeps: cookie check → `getPlayer` → call the action → on error return 400 → `savePlayer(player, log)` → same JSON response as today. Response shapes do not change, so the client is not affected.

### 3. Test player factory

`__tests__/helpers/createTestPlayer.ts`: returns a valid default player (in a town, at the Shop, some gold, crew, one ship) and takes deep overrides through the existing `patchDeep`. A small seeded random helper (`__tests__/helpers/seededRandom.ts`, no new package) lives next to it.

### 4. Game logic tests (`__tests__/actions/shop.test.ts`)

- Table-driven cases for every rule and error branch of each action.
- Generated cases over all shop items × all towns: buying and selling succeeds exactly when `isTradeGoodAvailableInTown` says so.
- Economy checks over all items: sell price never exceeds buy price (no free gold from buy then sell), and buy then sell returns the inventory to its start and costs exactly `(buy - sell) × quantity`.
- Seeded random play: a few hundred random shop actions in random towns with random inputs (valid and invalid). After every step: gold ≥ 0, every inventory value is a whole number ≥ 0, gold changes by exactly the reported price, failed actions change nothing, and the input player is never mutated. A failing seed is printed so it can be replayed.

### 5. API wiring tests (`__tests__/api/shop.test.ts`)

Using the existing mock pattern. Only checks what the route itself does:

- 401 without cookie or player
- an action error becomes a 400 with the message, and nothing is saved
- on success `savePlayer` gets the new player and log, and the response has the expected fields
- 500 when `savePlayer` throws

Rules are not tested again here.

### 6. Database safety net

A global Vitest setup file (`__tests__/setup.ts`, registered in `vitest.config.ts` through `setupFiles`) mocks `@/firebase/firebase-admin` so that any access throws. A test that forgets to mock `@/firebase/db` then fails instead of reaching Firebase.

## Bugs

Bugs found while writing the tests are fixed when the correct behaviour is clear from the guide or the surrounding code, with a test that shows the fix. Anything uncertain is listed for the user instead of changed.

Known so far: `buyNecessities` returns status 500 for "Not enough gold". The other routes use 400. The pilot changes it to 400.

## Out of scope

Other API areas, client components, and reusing the factory in existing tests. Those follow after the pilot.
