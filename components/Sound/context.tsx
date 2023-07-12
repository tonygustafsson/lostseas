import { setCookie } from "cookies-next"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

export interface State {
  musicOn: boolean
  soundEffectsOn: boolean
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

      setCookie(MUSIC_STATE_COOKIE_NAME, musicOn)
    },
    [dispatch]
  )

  const setSoundEffects = useCallback(
    (soundEffectsOn: State["soundEffectsOn"]) => {
      dispatch({
        type: "SET_SOUND_EFFECTS",
        soundEffectsOn,
      })

      setCookie(SOUND_EFFECTS_STATE_COOKIE_NAME, soundEffectsOn)
    },
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      setMusic,
      setSoundEffects,
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
  }
}

export const ManagedSoundContext = ({
  children,
}: {
  children: React.ReactNode
}) => <SoundProvider>{children}</SoundProvider>
