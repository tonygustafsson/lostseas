import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useToasts } from "../app/stores/toasts"

describe("toasts store", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useToasts.setState({ toasts: {} })
  })

  afterEach(() => {
    vi.useRealTimers()
    useToasts.setState({ toasts: {} })
  })

  it("setToast shows, hides, and removes toast on timers", () => {
    useToasts.getState().setToast({ id: "t1", title: "hello" })

    const s0 = useToasts.getState()
    expect(s0.toasts["t1"]).toBeDefined()
    expect(s0.toasts["t1"].visible).toBe(false)

    // show after 25ms
    vi.advanceTimersByTime(25)
    expect(useToasts.getState().toasts["t1"].visible).toBe(true)

    // hide at AUTOHIDE_DURATION - TRANSITION_DURATION (5000 - 300 = 4700)
    vi.advanceTimersByTime(4675)
    expect(useToasts.getState().toasts["t1"].visible).toBe(false)

    // removed at AUTOHIDE_DURATION (5000)
    vi.advanceTimersByTime(300)
    expect(useToasts.getState().toasts["t1"]).toBeUndefined()
  })

  it("hideToast clears scheduled timers and removes after transition", () => {
    useToasts.getState().setToast({ id: "t2", title: "bye" })
    expect(useToasts.getState().toasts["t2"]).toBeDefined()

    useToasts.getState().hideToast("t2")
    expect(useToasts.getState().toasts["t2"].visible).toBe(false)

    vi.advanceTimersByTime(300)
    expect(useToasts.getState().toasts["t2"]).toBeUndefined()
  })
})
