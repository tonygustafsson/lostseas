import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("cookies-next", () => ({ setCookie: vi.fn() }))

import { setCookie } from "cookies-next"

import useSound from "@/app/stores/useSound"
import {
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

describe("sound store", () => {
  beforeEach(() => {
    // reset store state
    useSound.setState({
      musicOn: false,
      soundEffectsOn: false,
      soundEffect: undefined,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it("sets music and writes cookie", () => {
    const before = useSound.getState()
    expect(before.musicOn).toBe(false)

    useSound.getState().setMusic(true)

    const state = useSound.getState()
    expect(state.musicOn).toBe(true)
    expect(setCookie).toHaveBeenCalledWith(MUSIC_STATE_COOKIE_NAME, true, {
      expires: COOKIE_EXPIRE_TIME,
    })
  })

  it("sets sound effects and writes cookie", () => {
    useSound.getState().setSoundEffects(true)

    const state = useSound.getState()
    expect(state.soundEffectsOn).toBe(true)
    expect(setCookie).toHaveBeenCalledWith(
      SOUND_EFFECTS_STATE_COOKIE_NAME,
      true,
      { expires: COOKIE_EXPIRE_TIME }
    )
  })

  it("plays and then resets soundEffect", () => {
    useSound.getState().playSoundEffect("coins")
    expect(useSound.getState().soundEffect).toBe("coins")

    vi.advanceTimersByTime(150)
    expect(useSound.getState().soundEffect).toBeUndefined()
  })
})
