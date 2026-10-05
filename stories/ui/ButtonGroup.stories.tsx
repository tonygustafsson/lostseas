import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"

const meta = {
  component: ButtonGroup,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: { "aria-label": "Trade actions" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Buy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Sell</Button>
      <Button variant="outline">Sell all</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Horizontal: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
