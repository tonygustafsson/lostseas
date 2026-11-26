import { afterEach, describe, expect, it, vi } from "vitest"

vi.mock("@/utils/sound", () => ({ playSoundEffect: vi.fn() }))

import useDrawer from "@/app/stores/drawer"
import { playSoundEffect } from "@/utils/sound"

describe("drawer store", () => {
  afterEach(() => {
    useDrawer.setState({ active: null })
    vi.clearAllMocks()
  })

  it("plays a parrot sound when the advisor opens", () => {
    useDrawer.getState().open("advisor")

    expect(useDrawer.getState().active).toBe("advisor")
    expect(playSoundEffect).toHaveBeenCalledWith("parrot")
  })

  it("stays quiet when other drawers open", () => {
    useDrawer.getState().open("logs")

    expect(playSoundEffect).not.toHaveBeenCalled()
  })

  it("switches straight to another drawer", () => {
    useDrawer.getState().open("fleet")
    useDrawer.getState().open("logs")

    expect(useDrawer.getState().active).toBe("logs")
  })

  it("closes", () => {
    useDrawer.getState().open("fleet")
    useDrawer.getState().close()

    expect(useDrawer.getState().active).toBeNull()
  })
})
