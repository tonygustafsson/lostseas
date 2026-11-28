import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import ShopTradeControls from "@/components/location/Shop/ShopTradeControls"
import { MERCHANDISE } from "@/constants/merchandise"

const meta = {
  title: "game/Shop/ShopTradeControls",
  component: ShopTradeControls,
  args: { item: "food", target: 40, max: 300, onChange: fn() },
  argTypes: {
    item: { control: "select", options: Object.keys(MERCHANDISE) },
    target: { control: "number" },
    max: { control: "number" },
  },
  render: function Render(args) {
    const [target, setTarget] = useState(args.target)

    return (
      <ShopTradeControls
        {...args}
        target={target}
        onChange={(value) => {
          setTarget(value)
          args.onChange(value)
        }}
      />
    )
  },
} satisfies Meta<typeof ShopTradeControls>

export default meta
type Story = StoryObj<typeof meta>

export const ShopTradeControlsStory: Story = { name: "ShopTradeControls" }
