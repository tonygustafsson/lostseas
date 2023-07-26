import { useCallback, useEffect } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"

import { sound$ } from "./state"

const musicPlayer = typeof Audio !== "undefined" && new Audio()
const songs = Array.from({ length: 9 }, (_, i) => `music/song${i + 1}.opus`)

const Sound = () => {
  const { data: player } = useGetPlayer()

  const playRandomSong = useCallback(() => {
    if (!player || !musicPlayer || !musicPlayer.paused) return

    const otherSongs = songs.filter((song) => song !== musicPlayer.src)
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    musicPlayer.src = randomSong
    musicPlayer.volume = 0.8
    musicPlayer.play()
  }, [player])

  const disposeMusicPlayListener = sound$.musicPlay.onChange(
    ({ value: musicPlay }) => {
      if (!musicPlayer || !player) return

      if (!musicPlay) {
        musicPlayer.pause()
        musicPlayer.removeEventListener("ended", playRandomSong)
        return
      }

      if (!musicPlayer.src) {
        playRandomSong()
        musicPlayer.addEventListener("ended", playRandomSong)
      } else if (musicPlayer.src) {
        musicPlayer.play()
      }
    }
  )

  const disposeSoundEffectListener = sound$.soundEffect.onChange(
    ({ value: soundEffect }) => {
      if (!sound$.soundEffectsOn.get() || !soundEffect) return

      let audioFile: string

      if (soundEffect === "journey") {
        const wavesSoundEffects = ["soundfx/waves1.opus", "soundfx/waves2.opus"]

        audioFile =
          wavesSoundEffects[
            Math.floor(Math.random() * wavesSoundEffects.length)
          ]

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
        audioFile = `soundfx/${soundEffect}.opus`
      }

      const soundEffectPlayer = new Audio(audioFile)
      soundEffectPlayer.play()

      soundEffectPlayer.onended = () => {
        soundEffectPlayer.remove()
      }
    }
  )

  useEffect(() => () => {
    disposeMusicPlayListener()
    disposeSoundEffectListener()
  })

  return null
}

export default Sound
