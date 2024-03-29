import { setCookie } from "cookies-next"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

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

export interface State {
  musicOn: boolean
  soundEffectsOn: boolean
  soundEffect?: SoundEffect
}

type Action =
  | {
      type: "SET_MUSIC"
      musicOn: State["musicOn"]
    }
  | {
      type: "SET_SOUND_EFFECTS"
      soundEffectsOn: State["soundEffectsOn"]
    }
  | {
      type: "PLAY_SOUND_EFFECT"
      soundEffect: State["soundEffect"]
    }
  | {
      type: "RESET_SOUND_EFFECT"
    }

const initialState: State = {
  musicOn: false,
  soundEffectsOn: false,
}

export const SoundContext = createContext<State | any>(initialState)

SoundContext.displayName = "SoundContext"

const soundReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MUSIC": {
      return {
        ...state,
        musicOn: action.musicOn,
      }
    }

    case "SET_SOUND_EFFECTS": {
      return {
        ...state,
        soundEffectsOn: action.soundEffectsOn,
      }
    }

    case "PLAY_SOUND_EFFECT": {
      return {
        ...state,
        soundEffect: action.soundEffect,
      }
    }

    case "RESET_SOUND_EFFECT": {
      return {
        ...state,
        soundEffect: undefined,
      }
    }
  }
}

export const SoundProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(soundReducer, initialState)

  const setMusic = useCallback(
    (musicOn: State["musicOn"]) => {
      dispatch({
        type: "SET_MUSIC",
        musicOn,
      })

      setCookie(MUSIC_STATE_COOKIE_NAME, musicOn, {
        expires: COOKIE_EXPIRE_TIME,
      })
    },
    [dispatch]
  )

  const setSoundEffects = useCallback(
    (soundEffectsOn: State["soundEffectsOn"]) => {
      dispatch({
        type: "SET_SOUND_EFFECTS",
        soundEffectsOn,
      })

      setCookie(SOUND_EFFECTS_STATE_COOKIE_NAME, soundEffectsOn, {
        expires: COOKIE_EXPIRE_TIME,
      })
    },
    [dispatch]
  )

  const playSoundEffect = useCallback(
    (soundEffect: State["soundEffect"]) => {
      dispatch({
        type: "PLAY_SOUND_EFFECT",
        soundEffect,
      })

      // We just need to trigger the Audio, then we can safely remove the state again
      // to allow for two or more sounds to be played in quick succession
      setTimeout(() => dispatch({ type: "RESET_SOUND_EFFECT" }), 100)
    },
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      setMusic,
      setSoundEffects,
      playSoundEffect,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <SoundContext.Provider value={value} {...props} />
}

export const useSound = () => {
  const context = useContext(SoundContext)

  if (context === undefined) {
    throw new Error(`useSound must be used within a SoundProvider`)
  }

  return context as State & {
    setMusic: (setMusicOn: State["musicOn"]) => void
    setSoundEffects: (soundEffectsOn: State["soundEffectsOn"]) => void
    playSoundEffect: (soundEffect: State["soundEffect"]) => void
  }
}

export const ManagedSoundContext = ({
  children,
}: {
  children: React.ReactNode
}) => <SoundProvider>{children}</SoundProvider>
