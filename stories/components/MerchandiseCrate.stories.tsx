import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MerchandiseCrate, {
  MerchandiseInfo,
} from "@/components/MerchandiseCrate"
import { Button } from "@/components/ui/button"

// Every crate image, by the name on its label
const goods: Record<string, string> = {
  Cotton: "/img/cards/shop/cotton.png",
  Food: "/img/cards/shop/food.png",
  Medicine: "/img/cards/shop/medicine.png",
  Porcelain: "/img/cards/shop/porcelain.png",
  Rum: "/img/cards/shop/rum.png",
  Silk: "/img/cards/shop/silk.png",
  Spices: "/img/cards/shop/spices.png",
  Sugar: "/img/cards/shop/sugar.png",
  Tea: "/img/cards/shop/tea.png",
  Tobacco: "/img/cards/shop/tobacco.png",
  Water: "/img/cards/shop/water.png",
  "Comfrey poultice": "/img/cards/market/comfrey-poultice.png",
  "Jesuit's bark tonic": "/img/cards/market/jesuits-bark-tonic.png",
  "Theriac draught": "/img/cards/market/theriac-draught.png",
  "Willow bark tea": "/img/cards/market/willow-bark-tea.png",
}

const meta = {
  component: MerchandiseCrate,
  args: {
    title: "Food",
    image: goods.Food,
    label: "40 crates",
    children: null,
  },
  argTypes: {
    title: { control: "select", options: Object.keys(goods) },
    image: { control: false },
    children: { control: false },
  },
  render: ({ title, image, ...args }) => (
    <ul className="max-w-sm">
      <MerchandiseCrate {...args} title={title} image={goods[title] ?? image}>
        <p className="text-sm">Anything can go in the box on the plank.</p>

        <div className="mt-auto flex items-center gap-1">
          <Button size="sm" variant="secondary" className="flex-1">
            Buy
          </Button>

          <MerchandiseInfo
            title={title}
            description={`About ${title.toLowerCase()}.`}
          />
        </div>
      </MerchandiseCrate>
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
    label: "+75% health",
  },
}

export const Narrow: Story = {
  args: { title: "Jesuit's bark tonic" },
  decorators: [(Story) => <div className="w-64">{Story()}</div>],
}
