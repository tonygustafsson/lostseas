import { expect, it } from "vitest"

import { adminDb } from "@/firebase/firebase-admin"

it("blocks tests from reaching the real Firebase database", () => {
  expect(() => adminDb.ref("players")).toThrow("Tests must not access Firebase")
})
