import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GiCoins, GiShoonerSailboat, GiTreasureMap } from "react-icons/gi"

import AttackReportItem from "@/components/location/Sea/AttackReportItem"

const icons = {
  coins: <GiCoins />,
  ship: <GiShoonerSailboat />,
  treasure: <GiTreasureMap />,
}

const meta = {
  title: "game/Ship meetings/AttackReportItem",
  component: AttackReportItem,
  args: {
    title: "Gold",
    change: "+450",
    icon: icons.coins,
    variant: "success",
    children: "Plundered from the captured ship",
    className: "",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["success", "error"] },
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <ul className="max-w-xs">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof AttackReportItem>

export default meta
type Story = StoryObj<typeof meta>

export const AttackReportItemStory: Story = { name: "AttackReportItem" }
