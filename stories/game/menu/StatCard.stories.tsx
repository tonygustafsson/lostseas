import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Coins, Users } from "lucide-react"

import { StatCard } from "@/components/menu/StatCard"

const meta = {
  component: StatCard,
  args: { title: "Gold", value: 2500, Icon: <Coins /> },
  argTypes: { Icon: { control: false } },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Empty: Story = { args: { value: 0 } }
export const Crew: Story = {
  args: { title: "Crew", value: 40, Icon: <Users /> },
}
export const Text: Story = { args: { title: "Title", value: "Captain" } }
