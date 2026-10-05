# Storybook

Run `npm run storybook` and open http://localhost:6006. Build a static catalog with `npm run storybook:build` (output: `storybook-static/`). Run `npm test` for the game's Vitest tests.

Stories live in the root `stories/` folder as `*.stories.tsx`. Storybook derives its navigation from folder and file names, so omit `meta.title`:

- `stories/ui/` — shadcn UI components.
- `stories/components/` — shared custom components.
- `stories/game/` — game widgets, with `bank/` and `menu/` subfolders.

Name each story file after its component, for example `stories/ui/Button.stories.tsx`. Import components through `@/components/...`. Use typed CSF 3 (`satisfies Meta<typeof Component>` and `StoryObj<typeof meta>`), args for controls, and `fn()` from `storybook/test` for callbacks. `play` functions run local interactions directly in Storybook without a separate browser test runner.

The catalog includes all installed shadcn UI components and reusable components that render without API requests. ActionCard and MerchandiseCard cover image, icon, disabled, narrow, and action states. GuideContent covers the in-game, expanded, and public guide views. Stories that accept player data as props share the static fixture in `stories/fixtures.ts`. Components requiring live player queries or network mocks are excluded.

The preview imports the application's Tailwind styles and fonts and provides a dark/light toolbar, viewports, motion features, and tooltips. Next.js image and navigation mocks come from `@storybook/nextjs-vite`. The Accessibility panel checks stories with axe.
