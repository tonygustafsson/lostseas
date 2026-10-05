import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const meta = {
  component: SheetContent,
  args: { side: "right" },
  argTypes: {
    side: { control: "select", options: ["right", "left", "top", "bottom"] },
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open inventory</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Inventory</SheetTitle>
          <SheetDescription>Supplies aboard your fleet.</SheetDescription>
        </SheetHeader>
        <div className="px-4">180 food, 240 water, and 8 cannons.</div>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof SheetContent>
export default meta
type Story = StoryObj<typeof meta>
export const Right: Story = {}
export const Left: Story = { args: { side: "left" } }
export const Bottom: Story = { args: { side: "bottom" } }
export const Top: Story = { args: { side: "top" } }
export const OpenAndClose: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Open inventory" })
    )
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog", { name: "Inventory" })
    await waitFor(() => expect(dialog).toBeVisible())
    await userEvent.click(body.getByRole("button", { name: "Close" }))
    await waitFor(() =>
      expect(body.queryByRole("dialog")).not.toBeInTheDocument()
    )
  },
}
