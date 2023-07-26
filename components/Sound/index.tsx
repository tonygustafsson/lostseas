import { observer } from "@legendapp/state/react"
import { useCallback } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"

import { soundState$ } from "./context"

const musicPlayer = typeof Audio !== "undefined" && new Audio()
const songs = Array.from({ length: 9 }, (_, i) => `music/song${i + 1}.opus`)

const Sound = observer(() => {
  const { data: player } = useGetPlayer()

  const playRandomSong = useCallback(() => {
    if (!player || !musicPlayer || !musicPlayer.paused) return

    const otherSongs = songs.filter((song) => song !== musicPlayer.src)
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    musicPlayer.src = randomSong
    musicPlayer.volume = 0.8
    musicPlayer.play()
  }, [player])

  if (!musicPlayer || !player) return

  if (soundState$.musicPlay.get() && !musicPlayer.src) {
    playRandomSong()

    musicPlayer.addEventListener("ended", playRandomSong)
  } else if (soundState$.musicPlay.get() && musicPlayer.src) {
    musicPlayer.play()
  } else if (musicPlayer.src && !musicPlayer.paused) {
    musicPlayer.pause()
    musicPlayer.removeEventListener("ended", playRandomSong)
  }

  if (!soundState$.soundEffectsOn.get() || !soundState$.soundEffect.get())
    return

  let audioFile: string

  if (soundState$.soundEffect.get() === "journey") {
    const wavesSoundEffects = ["soundfx/waves1.opus", "soundfx/waves2.opus"]

    audioFile =
      wavesSoundEffects[Math.floor(Math.random() * wavesSoundEffects.length)]

    if (getRandomInt(1, 2) === 1) {
      const journeyAdditionalSoundEffects = [
        "soundfx/creak.opus",
        "soundfx/seagulls.opus",
      ]

      const additionalAudioFile =
        journeyAdditionalSoundEffects[
          Math.floor(Math.random() * journeyAdditionalSoundEffects.length)
        ]

      const soundEffectPlayer = new Audio(additionalAudioFile)
      soundEffectPlayer.play()
    }
  } else {
    audioFile = `soundfx/${soundState$.soundEffect.get()}.opus`
  }

  const soundEffectPlayer = new Audio(audioFile)
  soundEffectPlayer.play()

  return null
})

export default Sound
