import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MobileTopBar from "@/components/menu/MobileTopBar"

const meta = {
  title: "game/Menu/MobileTopBar",
  component: MobileTopBar,
  args: { className: "" },
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof MobileTopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
