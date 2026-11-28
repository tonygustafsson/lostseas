import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import ShopQuantityDialog from "@/components/location/Shop/ShopQuantityDialog"
import { MERCHANDISE } from "@/constants/merchandise"

const meta = {
  title: "game/Shop/ShopQuantityDialog",
  component: ShopQuantityDialog,
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
  argTypes: {
    item: { control: "select", options: Object.keys(MERCHANDISE) },
    owned: { control: "number" },
    target: { control: "number" },
    max: { control: "number" },
    storable: { control: "number" },
    limitedBy: { control: "inline-radio", options: ["gold", "cargo"] },
    crewMembers: { control: "number" },
  },
  render: function Render(args) {
    const [target, setTarget] = useState(args.target)

    return (
      <ShopQuantityDialog
        {...args}
        target={target}
        onChange={(value) => {
          setTarget(value)
          args.onChange(value)
        }}
      />
    )
  },
} satisfies Meta<typeof ShopQuantityDialog>

export default meta
type Story = StoryObj<typeof meta>

export const ShopQuantityDialogStory: Story = { name: "ShopQuantityDialog" }
