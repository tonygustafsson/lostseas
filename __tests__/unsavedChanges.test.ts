import { beforeEach, describe, expect, it } from "vitest"

import useUnsavedChanges from "@/app/stores/unsavedChanges"

describe("unsaved changes store", () => {
  beforeEach(() => {
    useUnsavedChanges.setState({ hasUnsavedChanges: false })
  })

  it("starts without unsaved changes", () => {
    expect(useUnsavedChanges.getState().hasUnsavedChanges).toBe(false)
  })

  it("flags and clears unsaved changes", () => {
    useUnsavedChanges.getState().setHasUnsavedChanges(true)
    expect(useUnsavedChanges.getState().hasUnsavedChanges).toBe(true)

    useUnsavedChanges.getState().setHasUnsavedChanges(false)
    expect(useUnsavedChanges.getState().hasUnsavedChanges).toBe(false)
  })
})
