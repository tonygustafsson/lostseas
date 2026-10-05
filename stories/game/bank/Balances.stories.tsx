import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Balances from "@/components/location/Bank/Balances"

const meta = {
  component: Balances,
  args: { gold: 2500, account: 1200, loan: 0 },
} satisfies Meta<typeof Balances>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithDebt: Story = { args: { gold: 500, account: 0, loan: 2000 } }
export const Empty: Story = { args: { gold: 0, account: 0, loan: 0 } }
export const Wealthy: Story = { args: { gold: 1200000, account: 3500000 } }
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
