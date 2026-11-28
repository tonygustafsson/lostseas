import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BankLoan from "@/components/location/Bank/Loan"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { gold: number; loan: number }

// Loan reads the player from the query cache, so the args build one
const meta = {
  title: "game/Bank/Loan",
  component: BankLoan,
  args: { gold: 2500, loan: 0 },
  argTypes: {
    gold: { control: { type: "number", min: 0 } },
    loan: { control: { type: "number", min: 0 } },
  },
  render: ({ gold, loan }) => (
    <PlayerPreview
      key={`${gold}-${loan}`}
      data={{
        ...player,
        character: { ...player.character, location: "Bank", gold, loan },
      }}
    >
      <BankLoan />
    </PlayerPreview>
  ),
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const LoanStory: Story = { name: "Loan" }
