import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta = {
  component: Tabs,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: { defaultValue: "buy" },
  render: (args) => (
    <Tabs {...args} className="max-w-lg">
      <TabsList aria-label="Trading">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
        <TabsTrigger value="unavailable" disabled>
          Unavailable
        </TabsTrigger>
      </TabsList>
      <TabsContent value="buy">Buy supplies for your next voyage.</TabsContent>
      <TabsContent value="sell">
        Sell merchandise from your inventory.
      </TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
export const ChangeTab: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Sell" }))
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      "Sell merchandise from your inventory."
    )
    await expect(canvas.getByRole("tab", { name: "Sell" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    await expect(
      canvas.getByRole("tab", { name: "Unavailable" })
    ).toBeDisabled()
  },
}
