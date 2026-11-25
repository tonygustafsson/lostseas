import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { expect, fn, screen } from "storybook/test"

import ShopTradeItem from "@/components/location/Shop/ShopTradeItem"

const meta = {
  title: "game/Shop/ShopTradeItem",
  component: ShopTradeItem,
  args: {
    item: "food",
    owned: 40,
    target: 40,
    max: 196,
    storable: 300,
    limitedBy: "gold",
    crewMembers: 80,
    onChange: fn(),
  },
  render: function Render(args) {
    const [target, setTarget] = useState(args.target)

    return (
      <ul className="max-w-sm">
        <ShopTradeItem
          {...args}
          target={target}
          onChange={(value) => {
            setTarget(value)
            args.onChange(value)
          }}
        />
      </ul>
    )
  },
} satisfies Meta<typeof ShopTradeItem>

export default meta
type Story = StoryObj<typeof meta>

export const NoChange: Story = {}

export const Selling: Story = { args: { target: 15 } }

export const Buying: Story = { args: { target: 65 } }

export const NothingOwned: Story = {
  args: {
    item: "porcelain",
    owned: 0,
    target: 0,
    max: 71,
    crewMembers: undefined,
  },
}

export const Row: Story = {
  render: (args) => (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ShopTradeItem {...args} item="food" />

      <ShopTradeItem {...args} item="spices" owned={0} target={0} />

      <ShopTradeItem {...args} item="silk" owned={12} target={20} />
    </ul>
  ),
}

export const LimitedByCargo: Story = {
  args: { max: 60, storable: 60, limitedBy: "cargo" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Adjust" }))

    await expect(
      await screen.findByText("Up to 60 crates, limited by cargo space")
    ).toBeVisible()

    await userEvent.click(screen.getByRole("button", { name: "+50" }))

    await expect(screen.getByRole("button", { name: "+10" })).toBeDisabled()
    await expect(
      screen.getAllByRole("button", { name: "One more Food" }).at(-1)
    ).toBeDisabled()
  },
}

export const AboveWhatYouCanAfford: Story = {
  args: { max: 45 },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Adjust" }))
    await userEvent.click(await screen.findByRole("button", { name: "+50" }))

    await expect(args.onChange).toHaveBeenLastCalledWith(90)

    await userEvent.click(screen.getByRole("button", { name: "Buy max" }))
    await expect(args.onChange).toHaveBeenLastCalledWith(45)
  },
}

export const AdjustDialog: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Adjust" }))

    await userEvent.click(await screen.findByRole("button", { name: "−50" }))
    await expect(args.onChange).toHaveBeenLastCalledWith(0)

    await userEvent.click(screen.getByRole("button", { name: "Buy max" }))
    await expect(args.onChange).toHaveBeenLastCalledWith(196)
    await expect(screen.getByText("Lasts 49 days at sea")).toBeVisible()

    await userEvent.click(screen.getByRole("button", { name: "Reset" }))
    await expect(args.onChange).toHaveBeenLastCalledWith(40)
  },
}
