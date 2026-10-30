import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import CargoMeter from "@/components/CargoMeter"

const meta = {
  component: CargoMeter,
  args: { load: 60, capacity: 300, label: "Cargo" },
} satisfies Meta<typeof CargoMeter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { load: 0 } }

export const NearlyFull: Story = { args: { load: 285 } }

export const Overloaded: Story = { args: { load: 345 } }

export const CustomLabel: Story = { args: { label: "Hold after trade" } }
