import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { expect, userEvent, within } from "storybook/test"

import useModal from "@/app/stores/modals"
import Modal from "@/components/Modal"
import SignInOptions from "@/components/SignInOptions"
import {
  REMEMBERED_ACCOUNTS_STORAGE_KEY,
  type RememberedAccount,
} from "@/utils/rememberedAccounts"

const accounts: RememberedAccount[] = [
  {
    id: "account-1",
    name: "Mateo Salazar",
    characterId: "mateo-salazar",
    playerId: "00000000-0000-4000-8000-000000000001",
    lastUsed: 2,
  },
  {
    id: "account-2",
    name: "Silas Harrow",
    characterId: "silas-harrow",
    credentialIds: ["credential-1"],
    lastUsed: 1,
  },
]

const meta = {
  component: SignInOptions,
  parameters: { rememberedAccounts: accounts },
  // Seeds this browser's remembered accounts and restores them afterwards
  beforeEach: ({ parameters }) => {
    const previous = localStorage.getItem(REMEMBERED_ACCOUNTS_STORAGE_KEY)

    localStorage.setItem(
      REMEMBERED_ACCOUNTS_STORAGE_KEY,
      JSON.stringify(parameters.rememberedAccounts)
    )
    useModal.setState({ modals: {} })

    return () => {
      if (previous === null) {
        localStorage.removeItem(REMEMBERED_ACCOUNTS_STORAGE_KEY)
      } else {
        localStorage.setItem(REMEMBERED_ACCOUNTS_STORAGE_KEY, previous)
      }

      useModal.getState().removeAllModals()
    }
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <div className="max-w-md">
          <Story />
        </div>
        <Modal />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof SignInOptions>

export default meta
type Story = StoryObj<typeof meta>

export const WithRememberedAccounts: Story = {}

export const OtherLoginsOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole("button", { name: /use another character/i })
    )

    await expect(
      canvas.getByRole("button", { name: "Sign in with passkey" })
    ).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Scan QR code" })
    ).toBeVisible()
  },
}

export const NoRememberedAccounts: Story = {
  parameters: { rememberedAccounts: [] },
}
