import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const meta = {
  component: Accordion,
  args: { type: "single", collapsible: true },
  render: (args) => (
    <Accordion {...args} className="max-w-lg">
      <AccordionItem value="supplies">
        <AccordionTrigger>Preparing your voyage</AccordionTrigger>
        <AccordionContent>
          Buy food and water before setting sail.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="crew">
        <AccordionTrigger>Looking after the crew</AccordionTrigger>
        <AccordionContent>
          Keep an eye on crew health and morale.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Expanded: Story = { args: { defaultValue: "supplies" } }
export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["supplies", "crew"] },
}
export const Toggle: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", {
      name: "Preparing your voyage",
    })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(
      canvas.getByText("Buy food and water before setting sail.")
    ).toBeVisible()
    await userEvent.keyboard("{Enter}")
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  },
}
