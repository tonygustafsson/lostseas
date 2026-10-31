import { setCookie } from "cookies-next"
import { create } from "zustand"

import {
  AMBIENCE_STATE_COOKIE_NAME,
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

export type SoundEffect =
  | "coins"
  | "cheers"
  | "hurt"
  | "frustration"
  | "drink"
  | "tools"
  | "sailho"
  | "landho"
  | "cannons"
  | "fanfare"

export interface SoundState {
  musicOn: boolean
  ambienceOn: boolean
  soundEffectsOn: boolean
  soundEffect?: SoundEffect
  /** Increases every time the player asks for the next music track */
  nextTrackRequest: number
  /** True while the current track fades out before the next one starts */
  changingTrack: boolean
  setMusic: (musicOn: boolean) => void
  setAmbience: (ambienceOn: boolean) => void
  setSoundEffects: (soundEffectsOn: boolean) => void
  playSoundEffect: (soundEffect?: SoundEffect) => void
  nextTrack: () => void
  setChangingTrack: (changingTrack: boolean) => void
}

const useSound = create<SoundState>((set) => ({
  musicOn: false,
  ambienceOn: false,
  soundEffectsOn: false,
  soundEffect: undefined,
  nextTrackRequest: 0,
  changingTrack: false,

  setMusic: (musicOn: boolean) => {
    set({ musicOn })
    setCookie(MUSIC_STATE_COOKIE_NAME, musicOn, { expires: COOKIE_EXPIRE_TIME })
  },

  setAmbience: (ambienceOn: boolean) => {
    set({ ambienceOn })
    setCookie(AMBIENCE_STATE_COOKIE_NAME, ambienceOn, {
      expires: COOKIE_EXPIRE_TIME,
    })
  },

  setSoundEffects: (soundEffectsOn: boolean) => {
    set({ soundEffectsOn })
    setCookie(SOUND_EFFECTS_STATE_COOKIE_NAME, soundEffectsOn, {
      expires: COOKIE_EXPIRE_TIME,
    })
  },

  playSoundEffect: (soundEffect?: SoundEffect) => {
    set({ soundEffect })

    // Reset so the same sound can be played again shortly after
    setTimeout(() => set({ soundEffect: undefined }), 100)
  },

  nextTrack: () =>
    set((state) => ({ nextTrackRequest: state.nextTrackRequest + 1 })),

  setChangingTrack: (changingTrack: boolean) => set({ changingTrack }),
}))

export default useSound
