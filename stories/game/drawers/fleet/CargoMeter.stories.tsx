import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import CargoMeter from "@/components/CargoMeter"

const meta = {
  title: "game/Drawers/Fleet/CargoMeter",
  component: CargoMeter,
  args: { load: 60, capacity: 300, label: "Cargo" },
} satisfies Meta<typeof CargoMeter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "CargoMeter" }
