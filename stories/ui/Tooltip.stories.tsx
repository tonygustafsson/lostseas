import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const meta = {
  component: Tooltip,
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Crew morale</Button>
      </TooltipTrigger>
      <TooltipContent>Keep your crew happy to avoid mutiny.</TooltipContent>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Open: Story = { args: { defaultOpen: true } }
export const Hover: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Crew morale" }))
    await expect(
      await within(canvasElement.ownerDocument.body).findByRole("tooltip")
    ).toHaveTextContent("Keep your crew happy to avoid mutiny.")
    await userEvent.unhover(canvas.getByRole("button", { name: "Crew morale" }))
  },
}
