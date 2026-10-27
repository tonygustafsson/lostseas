import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import HoldChart from "@/components/charts/HoldChart"

const ships: Player["ships"] = {
  "ship-1": {
    id: "ship-1",
    name: "Black Pearl",
    type: "Galleon",
    health: 100,
    createdDay: 1,
  },
}

const meta = {
  component: HoldChart,
  args: {
    ships,
    inventory: {
      food: 40,
      water: 60,
      rum: 25,
      silk: 15,
      spices: 20,
      cannons: 12,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md rounded-md bg-neutral-900 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoldChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllGoods: Story = {
  args: {
    inventory: {
      food: 20,
      water: 20,
      porcelain: 10,
      spices: 10,
      medicine: 5,
      tobacco: 15,
      rum: 15,
      sugar: 20,
      silk: 10,
      tea: 10,
      cotton: 15,
    },
  },
}

export const Full: Story = {
  args: { inventory: { food: 100, water: 150, sugar: 250 } },
}

export const Empty: Story = { args: { inventory: {} } }
