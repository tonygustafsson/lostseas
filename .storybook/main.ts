import type { StorybookConfig } from "@storybook/nextjs-vite"
import { mergeConfig } from "vite"

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: (config) =>
    mergeConfig(config, {
      server: {
        watch: {
          ignored: ["**/.next/**", "**/storybook-static/**"],
        },
      },
    }),
}

export default config
