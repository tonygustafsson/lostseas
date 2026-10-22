# God mode design

A hidden editor for trying things out. It edits the logged-in player only and is unlocked with a server-side secret.

## Access (server)

- `POST /api/godmode/unlock` takes `{ passphrase }`. It compares it in constant time with the `GOD_MODE_SECRET` env var. On success it sets an httpOnly, sameSite cookie `lostseas-godmode` holding a signed token that expires after 12 hours.
- If `GOD_MODE_SECRET` is not set, every god mode route returns 404, so the feature is off by default.
- `GET /api/godmode/status` returns whether the cookie is valid. The client uses it to skip the passphrase prompt.
- `POST /api/godmode/save` checks the god mode cookie and reads the player id from the normal player cookie. It takes a whole `Player`, validates it with zod, forces `player.id` to the logged-in id, and saves with `savePlayerWithStatistics`. No log entry is written.
- Requests without a valid god mode cookie get 404, not 401, so the routes do not reveal themselves.
- The validation lives in a pure function in `utils/actions/godmode.ts` that returns an `ActionResult`. The routes stay thin (cookie, `getPlayer`, action, `savePlayerWithStatistics`).

## Trigger (client)

- In `components/drawer/drawerContent/Status.tsx`, clicking the "Status" heading 3 times quickly opens the modal. The counter resets after a pause.
- If the cookie is not valid yet, a passphrase prompt shows first. There is no visual feedback before that, and a wrong passphrase shows nothing special.
- The counter is a ref updated in an event handler, with no `useEffect`.

## Editor

`components/godmode/` holds `GodModeModal`, built on the existing `Dialog`, sized close to full screen. It has `Tabs` and a sticky footer with Apply, Revert and Reset to saved.

It edits a local draft copy of the player. Apply sends the whole object, then invalidates the player query so the game UI updates.

Tabs, each a small focused component:

- Character: name, nationality, title, town, location, day, gold, account, loan, battles per nation (won and lost), highest rewarded title.
- Journey: origin, destination, day, total days. Can be cleared.
- Ships: a card per ship with type, name and a health slider. Add and delete ships, with ids from `crypto.randomUUID()`.
- Crew: count, health and mood sliders.
- Inventory: a stepper per merchandise item using the existing icons, with "max out" and "clear" buttons.
- Treasures: add or remove treasures by name and rewarder town.
- World: market items (quantity and price), tavern state, sea state (ship meeting, battle) and harbor state.
- Raw: a JSON editor for the whole player, kept in sync with the draft. Invalid JSON blocks Apply and shows an error.

Controls use existing shadcn components in `components/ui/` and theme colours. No new packages.

## Testing

- Vitest tests for the action in `__tests__/actions/`: valid save, id forced to the logged-in player, invalid shape rejected.
- Tests for the routes in `__tests__/api/`: 404 without the secret env var, 404 without the cookie, wrong passphrase rejected, correct passphrase sets the cookie.
- Stories for the editor tabs where the existing components have stories.

## Out of scope

- Editing other players.
- Editing static game constants (prices, balance).
- Audit logging.
- Hiding god mode edits from the statistics charts. A gold edit shows as a spike.
