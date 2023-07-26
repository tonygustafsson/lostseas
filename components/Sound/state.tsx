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

export const sound$ = observable(initialState)

sound$.onChange((state) => {
  console.log(state)
})

configureObservablePersistence({
  persistLocal: ObservablePersistLocalStorage,
})

persistObservable(sound$.musicOn, {
  local: "music",
})

persistObservable(sound$.soundEffectsOn, {
  local: "soundEffects",
})

export const playSoundEffect = (soundEffect: SoundEffect) => {
  sound$.soundEffect.set(soundEffect)

  setTimeout(() => {
    sound$.soundEffect.set(undefined)
  }, 100)
}

export const toggleMusic = () => {
  const newValue = !sound$.musicPlay.get()

  sound$.musicPlay.set(newValue)
  sound$.musicOn.set(newValue)
}

export const toggleSoundEffects = () => {
  sound$.soundEffectsOn.set(!sound$.soundEffectsOn.get())
}
