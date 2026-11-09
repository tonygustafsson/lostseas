# Autoplay bot

A bot that plays Lost Seas from start to finish, hundreds of times in a row, to find bugs and check the game balance. It plays through the same pure actions in `utils/actions/` that the API routes call. There's no browser, server or database, so 100 games of 400 days take about 12 seconds.

```bash
npm run autoplay
```

## What it does

Each game starts a new player with a random nationality, like a real sign-up, and plays day by day until the day limit.

In port it goes through every building:

- **City hall:** accepts promotions, hands in treasures and wanted pirates, talks to the governor and now and then changes citizenship.
- **Bank:** collects ventures, repays loans, withdraws shopping money, invests in ventures, and before sailing deposits everything except pocket money (a defeat takes all the gold you carry).
- **Tavern:** recruits friendly sailors, fights or ignores hostile ones, treats a hurt or unhappy crew, plays cards and talks to the regulars.
- **Market:** buys batches it can resell at a profit, supplies that are cheaper than the shop, and cannons and repair kits. It buys a remedy when the crew is hurt.
- **Shipyard:** repairs ships, buys cannons for every two crew members, buys repair kits and new ships, and sometimes sells a ship.
- **Shop:** sells barter goods where they're accepted, buys food and water for the voyage plus two spare days, and buys goods to sell elsewhere.
- **Crew:** dismisses extra crew, gives medicine and gold.

It accepts and declines quests, answers questions and works on its quests: it buys procurement goods, sails to delivery and message targets and searches for missing people. It drops quests that drag on.

It picks a destination in this order: a home-nation town when a promotion is waiting, quest business, and otherwise mostly nearby towns. When the advisor blocks the departure, it tries to fix the cause, borrowing money if it has to, or sails somewhere closer instead. If it's still stuck after a few tries, it resets the game, like a player who gives up.

At sea it hunts the enemy nation, never attacks its own and runs from ships that are too strong. It fires most rounds, takes as much loot as fits and uses repair kits on badly damaged ships.

The bot is meant to be a sensible player, not a perfect one. When the numbers look odd, check whether the bot or the game is to blame.

## What it checks

Every action gets a frozen copy of the player, so an action that changes its input throws. After each action the new state must follow the rules in `checks.ts`:

- Gold, savings, loans and inventory are whole, non-negative amounts.
- Crew health and mood, and ship health, stay between 0 and 100.
- The day never goes backwards, except when the game is reset.
- The hold only becomes overloaded when a ship is sold or sunk.
- A player at sea has a journey and no town, and a player on land has a town and no journey.
- The fleet never grows past the title's ship limit. A lower title after changing nation may leave it over the limit, which is allowed. There are never more than the allowed number of quests.
- Log book entries never show `undefined`, `NaN` or `null`.

The bot also reports an action that refuses something it expected to work (like moving to another building), and any action that throws.

After the games, `fuzz.ts` sends junk to every action: negative numbers, `NaN`, `Infinity`, huge numbers, empty strings, `__proto__`, `null` and so on. Every action must refuse politely. Junk that's accepted is reported, unless it's listed as fine for that input.

## The report

The terminal shows a summary:

- **Problems** are the bugs. Each one shows how often it happened and the seed, day and last few actions of the first time.
- **Progress** shows days, net worth, score, enemy wins and how fast titles are reached.
- **Income per game** shows where the gold came from. Sales are gross, so they include buying and reselling.
- **Gambling and investments** shows how much cards and each venture pay back per gold staked. Anything above 1 makes money in the long run.
- **Sea** and **Town** cover battles, quests, loans, what blocked departures and why games were reset.

The full report, including every error message the actions returned, is saved to `output/autoplay/report.json`. That folder is ignored by git.

## Options

Set these as environment variables:

| Variable         | Default | Meaning                                       |
| ---------------- | ------- | --------------------------------------------- |
| `AUTOPLAY_GAMES` | 100     | Number of games                               |
| `AUTOPLAY_DAYS`  | 400     | Game days each game lasts                     |
| `AUTOPLAY_SEED`  | 1       | Seed of the first game. Game n uses seed + n. |
| `AUTOPLAY_TRACE` | off     | `1` prints every action with the day and gold |

In Git Bash:

```bash
AUTOPLAY_GAMES=500 npm run autoplay
```

In PowerShell:

```powershell
$env:AUTOPLAY_GAMES = 500; npm run autoplay; Remove-Item Env:AUTOPLAY_GAMES
```

## Replaying a problem

Every game is seeded, including the battles and ship meetings that use `Math.random`, so the same seed always plays the same game. To watch the game a problem came from, run only that seed with tracing:

```bash
AUTOPLAY_SEED=327 AUTOPLAY_GAMES=1 AUTOPLAY_TRACE=1 npm run autoplay
```

Changing the game rules or the bot changes the games, so a seed only replays the same game on the same code.

## Testing balance changes

Run a baseline, change a constant like `QUEST_REWARDS` or the title levels, and run the same seeds again. Use at least 500 games so luck evens out, and compare the Progress and Income sections.

## Files

- `bot.ts` is the strategy: what the bot does in each building and at sea.
- `game.ts` runs an action, freezes the input and records problems.
- `checks.ts` holds the state rules.
- `fuzz.ts` holds the junk input cases.
- `report.ts` collects the numbers and formats the summary.
- `autoplay.run.ts` is the entry point. It runs as a single Vitest test so the `@/` paths and test helpers work. `vitest.config.ts` keeps it apart from `npm test`.

## Keeping it up to date

When you add or change an action, add it to the bot so it gets played, and to `fuzz.ts` so junk input is tried. When you add a rule that should always hold, add it to `checks.ts`.
