import { observable } from "@legendapp/state"
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist"
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage"

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

export type State = {
  musicPlay: boolean
  musicOn: boolean
  soundEffectsOn: boolean
  soundEffect?: SoundEffect
}

const initialState: State = {
  musicPlay: false, // Actually playing, playing needs user interaction
  musicOn: false, // Turned on, but not necessarily playing
  soundEffectsOn: false,
}

export const soundState$ = observable(initialState)

soundState$.onChange((state) => {
  console.log(state)
})

configureObservablePersistence({
  persistLocal: ObservablePersistLocalStorage,
})

persistObservable(soundState$.musicOn, {
  local: "music",
})

persistObservable(soundState$.soundEffectsOn, {
  local: "soundEffects",
})

export const playSoundEffect = (soundEffect: SoundEffect) => {
  soundState$.soundEffect.set(soundEffect)

  setTimeout(() => {
    soundState$.soundEffect.set(undefined)
  }, 100)
}

export const toggleMusic = () => {
  const newValue = !soundState$.musicPlay.get()

  soundState$.musicPlay.set(newValue)
  soundState$.musicOn.set(newValue)
}

export const toggleSoundEffects = () => {
  soundState$.soundEffectsOn.set(!soundState$.soundEffectsOn.get())
}
