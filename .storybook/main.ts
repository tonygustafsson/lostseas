import type { StorybookConfig } from "@storybook/nextjs-vite"
import { mergeConfig } from "vite"

import { maskEditorServer } from "./maskEditorServer"

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [maskEditorServer()],
      server: {
        watch: {
          ignored: ["**/.next/**", "**/storybook-static/**"],
        },
      },
    }),
}

export default config
