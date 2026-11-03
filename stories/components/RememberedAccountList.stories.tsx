import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import RememberedAccountList from "@/components/RememberedAccountList"
import type { RememberedAccount } from "@/utils/rememberedAccounts"

const accounts: RememberedAccount[] = [
  {
    id: "account-1",
    name: "Mateo Salazar",
    characterId: "mateo-salazar",
    playerId: "00000000-0000-4000-8000-000000000001",
    lastUsed: 3,
  },
  {
    id: "account-2",
    name: "Silas Harrow",
    characterId: "silas-harrow",
    credentialIds: ["credential-1"],
    lastUsed: 2,
  },
  {
    id: "account-3",
    name: "Kofi Bellamy",
    characterId: "kofi-bellamy",
    playerId: "00000000-0000-4000-8000-000000000003",
    lastUsed: 1,
  },
]

const meta = {
  component: RememberedAccountList,
  args: { accounts, onSelect: fn(), onForget: fn() },
  argTypes: {
    pendingId: {
      control: "select",
      options: [undefined, ...accounts.map(({ id }) => id)],
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
  // Forgetting an account removes it from the accounts control
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()

    return (
      <RememberedAccountList
        {...args}
        onForget={(account) => {
          updateArgs({
            accounts: args.accounts.filter(({ id }) => id !== account.id),
          })
          args.onForget(account)
        }}
      />
    )
  },
} satisfies Meta<typeof RememberedAccountList>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SigningIn: Story = { args: { pendingId: "account-2" } }

export const SingleAccount: Story = { args: { accounts: [accounts[1]] } }

export const LongName: Story = {
  args: {
    accounts: [
      {
        ...accounts[0],
        name: "Captain Bartholomew Montgomery Fitzwilliam the Third",
      },
    ],
  },
}

export const Empty: Story = { args: { accounts: [] } }
