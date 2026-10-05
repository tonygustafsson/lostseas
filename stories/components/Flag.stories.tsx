import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Flag from "@/components/icons/Flag"

const nations = ["England", "France", "Spain", "Holland", "Pirate"] as const
const meta = {
  component: Flag,
  args: { nation: "England", size: 48 },
  argTypes: { nation: { control: "select", options: nations } },
} satisfies Meta<typeof Flag>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const AllNations: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      {nations.map((nation) => (
        <div key={nation} className="flex flex-col items-center gap-2">
          <Flag {...args} nation={nation} />
          <span>{nation}</span>
        </div>
      ))}
    </div>
  ),
}
export const NoNation: Story = { args: { nation: undefined } }
