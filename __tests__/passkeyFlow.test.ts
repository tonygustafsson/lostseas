import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { usePlayer } from "@/hooks/queries/usePlayer"

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
  startAuthentication: vi.fn(),
  startRegistration: vi.fn(),
  useMutation: vi.fn(),
  fetchQuery: vi.fn(),
  updateAccountPasskeys: vi.fn(),
}))

vi.mock("@/utils/apiRequest", () => ({ default: mocks.apiRequest }))
vi.mock("@simplewebauthn/browser", () => ({
  startAuthentication: mocks.startAuthentication,
  startRegistration: mocks.startRegistration,
  sendSignal: vi.fn(),
}))
vi.mock("@tanstack/react-query", () => ({
  useMutation: mocks.useMutation,
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
    fetchQuery: mocks.fetchQuery,
  }),
}))
vi.mock("cookies-next/client", () => ({
  getCookie: () => "player-1",
  deleteCookie: vi.fn(),
}))
vi.mock("@/utils/rememberedAccounts", () => ({
  rememberAccount: vi.fn(),
  updateAccountPasskeys: mocks.updateAccountPasskeys,
}))

const PasskeyFlowTest = () => {
  usePlayer()
  return null
}

beforeEach(() => {
  vi.resetAllMocks()
  mocks.useMutation.mockReturnValue({ mutateAsync: vi.fn(), isPending: false })
})

describe.each([
  {
    name: "sign-in",
    mutationIndex: 1,
    optionsRoute: "/api/user/passkey/login-options",
    verifyRoute: "/api/user/passkey/login-verify",
    start: mocks.startAuthentication,
  },
  {
    name: "registration",
    mutationIndex: 2,
    optionsRoute: "/api/user/passkey/register-options",
    verifyRoute: "/api/user/passkey/register-verify",
    start: mocks.startRegistration,
  },
])("passkey $name", ({ mutationIndex, optionsRoute, verifyRoute, start }) => {
  const getMutation = () => {
    renderToStaticMarkup(createElement(PasskeyFlowTest))
    return mocks.useMutation.mock.calls[mutationIndex][0]
      .mutationFn as () => Promise<unknown>
  }

  it.each([undefined, { status: 500, data: { error: "Try again" } }])(
    "does not prompt for a passkey when options fail (%j)",
    async (failure) => {
      mocks.apiRequest.mockResolvedValue(failure)

      expect(await getMutation()()).toBe(failure)
      expect(mocks.apiRequest).toHaveBeenCalledOnce()
      expect(mocks.apiRequest).toHaveBeenCalledWith(optionsRoute, {}, "POST")
      expect(start).not.toHaveBeenCalled()
    }
  )

  it("prompts with valid options and submits the credential for verification", async () => {
    const options = { challenge: "challenge-value" }
    const credential = { id: "credential-id" }
    const verified = { status: 200, data: { success: true } }
    mocks.apiRequest
      .mockResolvedValueOnce({ status: 200, data: options })
      .mockResolvedValueOnce(verified)
    start.mockResolvedValue(credential)

    expect(await getMutation()()).toBe(verified)
    expect(start).toHaveBeenCalledWith({ optionsJSON: options })
    expect(mocks.apiRequest).toHaveBeenLastCalledWith(
      verifyRoute,
      credential,
      "POST"
    )
  })
})

describe("passkey sign-in for a remembered account", () => {
  it("asks only for that account's passkeys", async () => {
    renderToStaticMarkup(createElement(PasskeyFlowTest))
    const signIn = mocks.useMutation.mock.calls[1][0].mutationFn as (
      credentialIds?: string[]
    ) => Promise<unknown>
    mocks.apiRequest.mockResolvedValue(undefined)

    await signIn(["credential-1"])

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      "/api/user/passkey/login-options",
      { credentialIds: ["credential-1"] },
      "POST"
    )
  })
})

describe("adding a passkey", () => {
  it("switches the remembered account to its passkey even with a cached list", async () => {
    // Mimics the app's query cache, which hands back the list fetched at
    // registration unless a fresh one is asked for
    mocks.fetchQuery.mockImplementation(async ({ staleTime }) => ({
      passkeys: staleTime === 0 ? [{ id: "new-credential" }] : [],
    }))

    renderToStaticMarkup(createElement(PasskeyFlowTest))
    const { onSuccess } = mocks.useMutation.mock.calls[2][0]

    await onSuccess()

    expect(mocks.updateAccountPasskeys).toHaveBeenCalledWith("player-1", [
      "new-credential",
    ])
  })
})
