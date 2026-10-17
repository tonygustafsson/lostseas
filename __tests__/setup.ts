import { vi } from "vitest"

// Safety net: tests must never reach the real Firebase database.
// Any test that forgets to mock "@/firebase/db" fails here instead.
vi.mock("@/firebase/firebase-admin", () => ({
  adminDb: new Proxy(
    {},
    {
      get: () => {
        throw new Error(
          'Tests must not access Firebase. Mock "@/firebase/db" in the test.'
        )
      },
    }
  ),
}))
