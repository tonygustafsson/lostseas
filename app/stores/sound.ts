import { setCookie } from "cookies-next"
import { create } from "zustand"

import {
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
  | "journey"
  | "sailho"
  | "landho"
  | "cannons"
  | "fanfare"

export interface SoundState {
  musicOn: boolean
  soundEffectsOn: boolean
  soundEffect?: SoundEffect
  setMusic: (musicOn: boolean) => void
  setSoundEffects: (soundEffectsOn: boolean) => void
  playSoundEffect: (soundEffect?: SoundEffect) => void
}

export const useSound = create<SoundState>((set) => ({
  musicOn: false,
  soundEffectsOn: false,
  soundEffect: undefined,

  setMusic: (musicOn: boolean) => {
    set({ musicOn })
    setCookie(MUSIC_STATE_COOKIE_NAME, musicOn, { expires: COOKIE_EXPIRE_TIME })
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
}))

export default useSound
