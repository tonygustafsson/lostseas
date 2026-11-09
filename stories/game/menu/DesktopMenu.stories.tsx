import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import DesktopMenu from "@/components/menu/DesktopMenu"
import { SidebarProvider } from "@/components/ui/sidebar"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "game/Menu/DesktopMenu",
  component: DesktopMenu,
  args: { className: "" },
  parameters: { layout: "fullscreen", player },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <SidebarProvider>
          <Story />
        </SidebarProvider>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof DesktopMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
