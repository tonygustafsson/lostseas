import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import MerchandiseCrate, {
  MerchandiseInfo,
} from "@/components/MerchandiseCrate"
import { Button } from "@/components/ui/button"

const meta = {
  component: MerchandiseCrate,
  args: {
    title: "Food",
    image: "/img/cards/shop/food.png",
    label: "40 crates",
    children: (
      <>
        <p className="text-sm">Anything can go in the box on the plank.</p>

        <div className="mt-auto flex items-center gap-1">
          <Button size="sm" variant="secondary" className="flex-1">
            Buy
          </Button>

          <MerchandiseInfo
            title="Food"
            description="Bread, salted pork and dried fish for the crew."
          />
        </div>
      </>
    ),
  },
  argTypes: { children: { control: false } },
  render: (args) => (
    <ul className="max-w-sm">
      <MerchandiseCrate {...args} />
    </ul>
  ),
} satisfies Meta<typeof MerchandiseCrate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Names over 12 letters get a smaller label so they stay on one line
export const LongTitle: Story = {
  args: {
    title: "Jesuit's bark tonic",
    image: "/img/cards/market/jesuits-bark-tonic.png",
    label: "+75% health",
  },
}

export const Narrow: Story = {
  args: { title: "Jesuit's bark tonic" },
  render: (args) => (
    <ul className="w-64">
      <MerchandiseCrate {...args} />
    </ul>
  ),
}

export const Info: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "About Food" }))

    await expect(
      await screen.findByText("Bread, salted pork and dried fish for the crew.")
    ).toBeVisible()
  },
}
