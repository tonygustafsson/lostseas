import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Anchor, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const meta = {
  component: Alert,
  args: { variant: "default" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
  render: (args) => (
    <Alert {...args} className="max-w-lg">
      <Anchor />
      <AlertTitle>Ready to sail</AlertTitle>
      <AlertDescription>
        Your crew has enough food and water for the journey.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args} className="max-w-lg">
      <TriangleAlert />
      <AlertTitle>Supplies are running low</AlertTitle>
      <AlertDescription>Visit the shop before leaving port.</AlertDescription>
    </Alert>
  ),
}
