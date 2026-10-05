import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import GuideContent from "@/components/GuideContent"

const meta = {
  component: GuideContent,
  args: { appearance: "game", defaultOpen: false },
  argTypes: {
    appearance: { control: "select", options: ["game", "public"] },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <GuideContent key={`${args.appearance}-${args.defaultOpen}`} {...args} />
  ),
} satisfies Meta<typeof GuideContent>

export default meta
type Story = StoryObj<typeof meta>

export const InGame: Story = {}
export const Expanded: Story = { args: { defaultOpen: true } }
export const Public: Story = { args: { appearance: "public" } }
