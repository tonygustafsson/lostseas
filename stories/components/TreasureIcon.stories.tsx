import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import TreasureIcon from "@/components/TreasureIcon"
import { TREASURES } from "@/constants/treasures"

const items = TREASURES.map(({ name }) => name as TreasureName)
const meta = {
  component: TreasureIcon,
  args: { item: "Inca mask", size: "lg" },
  argTypes: { item: { control: "select", options: items } },
} satisfies Meta<typeof TreasureIcon>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const AllTreasures: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      {items.map((item) => (
        <div key={item} className="flex flex-col items-center gap-2">
          <TreasureIcon {...args} item={item} />
          <span className="text-sm">{item}</span>
        </div>
      ))}
    </div>
  ),
}
