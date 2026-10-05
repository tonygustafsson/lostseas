import "@/styles/globals.css"

import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/nextjs-vite"
import { INITIAL_VIEWPORTS } from "storybook/viewport"

import useDrawer from "@/app/stores/drawer"
import MotionProvider from "@/components/MotionProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { almendra, crimsonText } from "@/fonts"

const preview: Preview = {
  initialGlobals: { theme: "dark" },
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    controls: {
      matchers: { color: /^(backgroundColor|color)$/i, date: /Date$/i },
    },
    viewport: { options: INITIAL_VIEWPORTS },
    options: { storySort: { order: ["game", "components", "ui"] } },
  },
  beforeEach() {
    useDrawer.setState(useDrawer.getInitialState(), true)
    document.documentElement.classList.add(
      almendra.variable,
      crimsonText.variable
    )
    return () => {
      document.documentElement.classList.remove(
        almendra.variable,
        crimsonText.variable
      )
    }
  },
  decorators: [
    withThemeByClassName({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
    }),
    (Story) => (
      <MotionProvider>
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </MotionProvider>
    ),
  ],
}

export default preview
