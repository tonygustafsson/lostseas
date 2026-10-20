import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { getRelyingParty } from "@/utils/passkey"

vi.mock("server-only", () => ({}))
vi.mock("@/firebase/passkeys-db", () => ({}))

beforeEach(() => vi.stubEnv("WEBAUTHN_ORIGIN", undefined))
afterEach(() => vi.unstubAllEnvs())

describe("getRelyingParty", () => {
  it("uses the request URL when forwarded headers are missing", () => {
    expect(
      getRelyingParty(new Request("http://localhost:8080/api/passkey"))
    ).toEqual({ origin: "http://localhost:8080", rpID: "localhost" })
  })

  it("uses the first trimmed comma-separated header values", () => {
    expect(
      getRelyingParty(
        new Request("http://lostseas.example/api/passkey", {
          headers: {
            "x-forwarded-host": "lostseas.example, proxy.internal",
            "x-forwarded-proto": " https , http",
          },
        })
      )
    ).toEqual({ origin: "https://lostseas.example", rpID: "lostseas.example" })
  })

  it.each([
    ["x-forwarded-host", "attacker.example"],
    ["x-forwarded-host", "lostseas.example/path"],
    ["x-forwarded-host", "user@lostseas.example"],
    ["x-forwarded-host", "lostseas.example#fragment"],
    ["x-forwarded-host", "[broken"],
    ["x-forwarded-proto", "javascript"],
    ["x-forwarded-proto", "https://"],
  ])(
    "ignores spoofed or malformed forwarded headers (%s=%s)",
    (header, value) => {
      expect(
        getRelyingParty(
          new Request("https://lostseas.example/api/passkey", {
            headers: { [header]: value },
          })
        )
      ).toEqual({
        origin: "https://lostseas.example",
        rpID: "lostseas.example",
      })
    }
  )

  it("prefers the configured origin over all request headers", () => {
    vi.stubEnv("WEBAUTHN_ORIGIN", "https://public.example:8443")

    expect(
      getRelyingParty(
        new Request("http://internal/api/passkey", {
          headers: {
            "x-forwarded-host": "attacker.example",
            "x-forwarded-proto": "https,http",
          },
        })
      )
    ).toEqual({ origin: "https://public.example:8443", rpID: "public.example" })
  })

  it.each(["ftp://game.example", "https://game.example/path"])(
    "rejects invalid configured origins (%s)",
    (origin) => {
      vi.stubEnv("WEBAUTHN_ORIGIN", origin)

      expect(() =>
        getRelyingParty(new Request("https://game.example"))
      ).toThrow("Invalid WebAuthn origin")
    }
  )
})
