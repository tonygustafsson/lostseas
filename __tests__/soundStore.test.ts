import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("cookies-next", () => ({ setCookie: vi.fn() }))

import { setCookie } from "cookies-next"

import useSound from "@/app/stores/sound"
import {
  AMBIENCE_STATE_COOKIE_NAME,
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

describe("sound store", () => {
  beforeEach(() => {
    // reset store state
    useSound.setState({
      musicOn: false,
      ambienceOn: false,
      soundEffectsOn: false,
      soundEffect: undefined,
      nextTrackRequest: 0,
      changingTrack: false,
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

  it("sets ambience and writes cookie", () => {
    useSound.getState().setAmbience(true)

    const state = useSound.getState()
    expect(state.ambienceOn).toBe(true)
    expect(setCookie).toHaveBeenCalledWith(AMBIENCE_STATE_COOKIE_NAME, true, {
      expires: COOKIE_EXPIRE_TIME,
    })
  })

  it("requests the next track", () => {
    useSound.getState().nextTrack()
    useSound.getState().nextTrack()

    expect(useSound.getState().nextTrackRequest).toBe(2)
  })

  it("tracks when the music is changing track", () => {
    useSound.getState().setChangingTrack(true)
    expect(useSound.getState().changingTrack).toBe(true)

    useSound.getState().setChangingTrack(false)
    expect(useSound.getState().changingTrack).toBe(false)
  })

  it("plays and then resets soundEffect", () => {
    useSound.getState().playSoundEffect("coins")
    expect(useSound.getState().soundEffect).toBe("coins")

    vi.advanceTimersByTime(150)
    expect(useSound.getState().soundEffect).toBeUndefined()
  })
})
