import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { usePlayer } from "@/hooks/queries/usePlayer"

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
  startAuthentication: vi.fn(),
  startRegistration: vi.fn(),
  useMutation: vi.fn(),
}))

vi.mock("@/utils/apiRequest", () => ({ default: mocks.apiRequest }))
vi.mock("@simplewebauthn/browser", () => ({
  startAuthentication: mocks.startAuthentication,
  startRegistration: mocks.startRegistration,
  sendSignal: vi.fn(),
}))
vi.mock("@tanstack/react-query", () => ({
  useMutation: mocks.useMutation,
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
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
