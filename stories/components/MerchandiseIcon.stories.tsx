import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"

const items = Object.keys(MERCHANDISE) as (keyof Inventory)[]
const meta = {
  component: MerchandiseIcon,
  args: { item: "food", size: "lg" },
  argTypes: { item: { control: "select", options: items } },
} satisfies Meta<typeof MerchandiseIcon>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const AllItems: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      {items.map((item) => (
        <div key={item} className="flex flex-col items-center gap-2">
          <MerchandiseIcon {...args} item={item} />
          <span className="text-sm">{item}</span>
        </div>
      ))}
    </div>
  ),
}
