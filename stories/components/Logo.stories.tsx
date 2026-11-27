import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Logo, { LogoMark } from "@/components/Logo"

const meta = {
  title: "components/Logo",
  component: Logo,
  args: { className: "" },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MarkOnly: Story = {
  render: (args) => <LogoMark {...args} />,
}
