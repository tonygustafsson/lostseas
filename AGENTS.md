# Agent notes

## Way of working

- Keep communication short and concise. Avoid unnecessarily long explanations and code examples.
- Prefer existing project patterns, components, hooks, and utilities before introducing new abstractions.
- When a task is complete, run linting and formatting.
- Never commit, stash or push anything in GIT, that will always be handled by a human.

## Project

- This is a Next.js App Router game written in TypeScript.
- Routes are in `app/`.
- Shared UI is in `components/`.
- Game data and rules live mainly in `constants/`, `hooks/`, and `utils/`.
- Tests use Vitest and live in `__tests__/`.
- Common commands:
  - `npm run dev` — development server on port 8080
  - `npm run lint`
  - `npm test`
  - `npm run build`
- Do not install new NPM packages without approval.
- The project uses React Compiler. Write idiomatic React that the compiler can optimize:
  - Avoid unnecessary `useEffect`.
  - Prefer deriving values during render instead of synchronizing state.
  - Prefer event handlers for user-driven side effects.
  - Avoid manual memoization such as `useMemo` and `useCallback` unless there is a demonstrated need.
  - Keep components and hooks compliant with the Rules of React.

## Components

- Prefer existing shadcn components in `components/ui/` when building interfaces.
- Use icons from `lucide-react` only.
- Use colors defined by the theme in `styles/globals.css`. Do not introduce colors outside the theme.
- Prefer existing theme and Tailwind values over arbitrary values such as `w-[137px]`, `mt-[7px]`, or custom colors.
- Prefer spacing values from this scale where practical: `1`, `2`, `4`, `6`, `8`, `12`, `16`, `32`, `64`.
- Keep Tailwind class lists reasonably simple and readable.
- Avoid overly configurable components. If adding more props or variants makes a component difficult to understand, prefer creating a separate focused component.
- Keep components focused on a clear responsibility rather than combining unrelated UI or behavior.

## Game mechanics

- Before changing gameplay, read [`components/GuideContent.tsx`](components/GuideContent.tsx).
- Treat it as the source of truth for existing game rules and player-facing behavior unless the task explicitly changes those rules.
- Keep gameplay behavior and player-facing guidance consistent.
- When game rules change, update `GuideContent.tsx` when necessary so the guide remains accurate.

## Verification

- Run relevant Vitest tests after changing game logic or behavior.
- Run linting and formatting after code changes.
- Run `npm run build` after significant changes involving routing, rendering, configuration, or production behavior.
- Do not consider a task complete if the changes introduce lint, formatting, TypeScript, build, or test errors.
