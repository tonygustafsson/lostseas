import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import RadialProgressBar from "@/components/RadialProgressBar"

const meta = {
  component: RadialProgressBar,
  args: { percentage: 75, className: "size-24" },
  argTypes: {
    percentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
    autoStrokeColor: { control: "boolean" },
    showLabel: { control: "boolean" },
    startPercentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof RadialProgressBar>
export default meta
type Story = StoryObj<typeof meta>
export const Healthy: Story = {}
export const Warning: Story = { args: { percentage: 50 } }
export const Critical: Story = { args: { percentage: 20 } }
export const Empty: Story = { args: { percentage: 0 } }
export const Complete: Story = { args: { percentage: 100 } }
export const WithoutLabel: Story = { args: { showLabel: false } }
export const ThemeColor: Story = {
  args: { autoStrokeColor: false, className: "size-24 text-primary" },
}

export const FromStartPercentage: Story = {
  args: {
    startPercentage: 40,
    percentage: 60,
    showLabel: false,
    autoStrokeColor: false,
    className: "size-24 text-info",
  },
}
