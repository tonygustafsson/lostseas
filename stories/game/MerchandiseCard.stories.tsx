import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Coins, Wheat } from "lucide-react"
import { expect, fn } from "storybook/test"

import MerchandiseCard from "@/components/MerchandiseCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const onBuy = fn()

const meta = {
  component: MerchandiseCard,
  args: {
    title: "Food",
    icon: <Wheat />,
    image: "/img/cards/shop/food.png",
    indicator: "180",
    body: (
      <>
        <p>Keep your crew supplied during long voyages.</p>
        <Badge variant="outline" className="mt-4">
          <Coins /> 16 gold per crate
        </Badge>
      </>
    ),
    actions: <Button onClick={onBuy}>Buy supplies</Button>,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    icon: { control: false },
    body: { control: false },
    actions: { control: false },
  },
} satisfies Meta<typeof MerchandiseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutImage: Story = { args: { image: undefined } }
export const WithoutIcon: Story = { args: { icon: undefined } }
export const WithoutActions: Story = { args: { actions: undefined } }
export const EmptyInventory: Story = { args: { indicator: "0" } }
export const Disabled: Story = {
  args: { disabled: true, actions: <Button disabled>Not enough gold</Button> },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Not enough gold" })
    ).toBeDisabled()
  },
}
export const FullWidth: Story = { args: { fullWidth: true } }
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
}
export const LongTitle: Story = {
  args: {
    title: "Supplies for the next voyage across the Spanish Main",
    indicator: "1,200",
  },
}
export const BuyAction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Buy supplies" }))
    await expect(onBuy).toHaveBeenCalledOnce()
  },
}
