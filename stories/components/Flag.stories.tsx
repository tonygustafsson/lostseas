import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import FlagIcon from "@/components/icons/Flag"

const nations = ["England", "France", "Spain", "Holland", "Pirate"] as const
const meta = {
  component: FlagIcon,
  args: { nation: "England", size: 48, decorative: false },
  argTypes: { nation: { control: "select", options: nations } },
} satisfies Meta<typeof FlagIcon>
export default meta
type Story = StoryObj<typeof meta>
export const Flag: Story = {}
