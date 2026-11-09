import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import { GUIDE_CHAPTERS } from "@/components/guide/chapters"
import GuideMenu from "@/components/guide/GuideMenu"

const meta = {
  title: "game/Guide/GuideMenu",
  component: GuideMenu,
  args: { activeId: "welcome", onNavigate: fn() },
  argTypes: {
    activeId: {
      control: "select",
      options: GUIDE_CHAPTERS.map(({ id }) => id),
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GuideMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AppChapterActive: Story = { args: { activeId: "account" } }
export const NothingActive: Story = { args: { activeId: undefined } }
