import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useModal } from "../app/stores/modals"

describe("modals store", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useModal.setState({ modals: {} })
  })

  afterEach(() => {
    vi.useRealTimers()
    useModal.setState({ modals: {} })
  })

  it("setModal shows then can be removed after hide transition", () => {
    useModal
      .getState()
      .setModal({ id: "welcome", title: "hello", content: null })

    const s0 = useModal.getState()
    expect(s0.modals["welcome"]).toBeDefined()
    expect(s0.modals["welcome"].open).toBe(false)

    // open scheduled on next tick
    vi.advanceTimersByTime(0)
    expect(useModal.getState().modals["welcome"].open).toBe(true)

    // remove via removeModal should hide and remove after transition
    useModal.getState().removeModal("welcome")
    expect(useModal.getState().modals["welcome"].open).toBe(false)

    vi.advanceTimersByTime(300)
    expect(useModal.getState().modals["welcome"]).toBeUndefined()
  })

  it("removeAllModals hides all and removes after transition", () => {
    useModal.getState().setModal({ id: "map", title: "a", content: null })
    useModal
      .getState()
      .setModal({ id: "editCharacter", title: "b", content: null })

    vi.advanceTimersByTime(0)
    expect(Object.keys(useModal.getState().modals).length).toBe(2)

    useModal.getState().removeAllModals()
    expect(
      Object.values(useModal.getState().modals).every((m) => m.open === false)
    ).toBe(true)

    vi.advanceTimersByTime(300)
    expect(Object.keys(useModal.getState().modals).length).toBe(0)
  })
})
