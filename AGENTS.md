# Agent notes

## Way of working

- Keep communication short and concise. Avoid unnecessarily long explanations and code examples.
- Do not lightly introduce more complexity, instead ask questions to be sure on how to proceed if you predict that the complexity will increase during the task.
- Make code changes small and concise. Bug fixes should be done with a few lines if possible.
- Prefer existing project patterns, components, hooks, and utilities before introducing new abstractions.
- When a task is complete, run linting and formatting.
- Make the smallest change that meets the request, but suggest optimizations and abstractions if you see it would benefit the project.
- Don't forget to create a Storybook story for new features, and see that all properties can be tested in the story.
- The game is live and players must be able to continue their saved games. Keep changes to stored data backward compatible. Prefer migrating existing data in the database (Firebase). If that isn't practical, add a fallback when reading old data, like the defaults in `utils/db/getPlayer.ts`. Ask before deleting or renaming stored fields.
- Never commit, stage, stash or push anything in GIT, that will always be handled by a human.
- Avoid single lines without brackets, such as if (true) return, go for if (true) { return }.

## Project

- This is a Next.js App Router game written in TypeScript.
- Routes are in `app/`.
- Shared UI is in `components/`.
- Game data and rules live mainly in `constants/`, `hooks/`, and `utils/`.
- Tests use Vitest and live in `__tests__/`.
- Game actions are pure functions in `utils/actions/` that return an `ActionResult`. API routes stay thin: cookie → `getPlayer` → action → `savePlayer`. Test actions with `createTestPlayer` and `createSeededRandom` from `__tests__/helpers/`.
- Common commands:
  - `npm run dev` — development server on port 8080
  - `npm run lint`
  - `npm test`
  - `npm run build`
  - `npm run storybook` — Storybook on port 6010 (http://localhost:6010). The port is fixed and the command fails if 6010 is taken. Check whether Storybook is already running before starting another instance, and read story IDs from the stories file instead of guessing them.
  - `npm run storybook:build`
- Do not install new NPM packages without approval.
- The project uses React Compiler. Write idiomatic React that the compiler can optimize:
  - Avoid unnecessary `useEffect`.
  - Prefer deriving values during render instead of synchronizing state.
  - Prefer event handlers for user-driven side effects.
  - Avoid manual memoization such as `useMemo` and `useCallback` unless there is a demonstrated need.
  - Keep components and hooks compliant with the Rules of React.
  - When updating component that changes the UI, also look for Storybook stories and tests and update them as well.
- Code should have enough white space and air - have line breaks between components if it makes sense. Specially if they are visibly separate.
- Feel free to add valuable comments in the codebase, but don't overdo it. A comment should explain behaviour, not the code. Also avoid making the code look AI generated.

## Components

- Prefer existing shadcn components in `components/ui/` when building interfaces.
- Avoid overly configurable components. If adding more props or variants makes a component difficult to understand, prefer creating a separate focused component.
- Keep components focused on a clear responsibility rather than combining unrelated UI or behavior.

## Design

- Use icons from `lucide-react` and `react-icons` only.
- Use color palette defined by the theme in `styles/globals.css`. Do not introduce colors outside the theme. Really try to use tokens instead of specific Tailwind colors.
- The game is dark only. There are no light theme values, so don't add `dark:` overrides for colours.
- See the `design/Colours` Storybook story (`stories/design/Colors.stories.tsx`) for every token, its hex value and a guide on where to use it. Keep that guide in sync when tokens change, and run `npm run scan:colors` to refresh the colour usage data.
- The palette is sea and gold:
  - Sea (`background`, `card`, `secondary`, `muted`, `sea`, `sea-dark`) is the world. Use it for surfaces, secondary buttons and anything that measures, like progress bars, sliders and journey progress.
  - Gold (`primary`, `gold`, `gold-light`, `gold-dark`) is the treasure. Use it only for the one main action on a screen (the default `Button`), money and value, and gilded frames. Use at most one gold button per view.
  - `parchment` is for headings and text on top of scene art. `foreground` is for body text and `muted-foreground` for supporting text.
  - `success`, `error`, `warning` and `info` only mean status, never decoration. Warning is orange so it never reads as gold.
  - Forms are sea: switches, sliders and selected options use sea, inputs stay on `input` and `border`, and only the submit button is gold.
  - `chart-*` and `cargo-*` are only for data series.
- Progress and Slider are always striped. Pick the colour with `variant` (`default` is sea, or `success`, `error`, `warning`, `info`) instead of overriding the indicator with classes.
- Do not add shadows to things if it doesn't really benefit from it, meaning it needs to stand out.
- Prefer existing theme and Tailwind values over arbitrary values such as `w-[137px]`, `mt-[7px]`, or custom colors.
- Prefer spacing values from this scale where practical: `1`, `2`, `4`, `6`, `8`, `12`, `16`, `32`, `64`.

## Game mechanics

- Before changing gameplay, read the player guide chapters in [`components/guide/chapters/`](components/guide/chapters/).
- Treat it as the source of truth for existing game rules and player-facing behavior unless the task explicitly changes those rules.
- Keep the guide about how to play. Leave out exact figures players don't need, like rates per crew member or kilometres per day, so it doesn't go stale when balance changes.
- Keep gameplay behavior and player-facing guidance consistent.
- When game rules change, update the matching chapter in `components/guide/chapters/` when necessary so the guide remains accurate.
- Do not add new town buildings. Each one needs map hotspots and interior art for all 16 towns. Put new features in existing buildings.
- When you change game mechanics, don't forget to see if you also need to change the Log book or Statistics.

### Sea distances

Voyage lengths follow the routes drawn on the sea map, so a town that looks further away is further away.

1. `npm run generate:sea-routes` finds the shortest water path between every pair of harbours (`TOWNS[town].map.harbor`) on the mask `public/img/map/spanish-main-mask.png` and saves them to `constants/seaRoutes.json`. A return trip uses the same route reversed.
2. `getDistanceKm` (`utils/journey.ts`) measures the route in map pixels and multiplies by `KM_PER_PIXEL`, rounded to 10 km.
3. `getJourneyLength` divides by `KM_PER_DAY` (about the speed of a real ship in 1640), rounded, with a minimum of 1 day. `startJourney` stores it as `journey.totalDays`.
4. Each `continueJourney` call sails one day, `SEA_TRAVEL_SPEED` apart in real time. Per-day effects are tuned for realistic voyage lengths: a ship turns up on about one day in six (`MEETING_CHANCE`), and mood drops every other day.

- Change `KM_PER_DAY` (in `constants/locations.ts`) to make every voyage longer or shorter in days. Anything counted per day (food and water, quest gold per day, venture durations) is balanced for it. `KM_PER_PIXEL` is the map scale and mostly changes the kilometres shown.
- After moving a harbour or editing the mask, re-run `generate:sea-routes` and check the voyage length snapshot in `__tests__/journey.test.ts`. Days feed into supplies, quest rewards and the advisor.

### Autoplay bot

`npm run autoplay` plays hundreds of seeded games through the pure actions to find bugs and check balance. Run it before and after balance changes and compare the reports. See [`scripts/autoplay/README.md`](scripts/autoplay/README.md).

## Verification

- Run relevant Vitest tests after changing game logic or behavior.
- Run linting and formatting after code changes on touched files.
- Run `npm run build` after significant changes involving routing, rendering, configuration, or production behavior.
- Do not consider a task complete if the changes introduce lint, formatting, TypeScript, build, or test errors.
