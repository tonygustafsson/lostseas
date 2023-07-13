import { useCallback, useEffect, useMemo } from "react"

import { getRandomInt } from "@/utils/random"

import { useSound } from "./context"

const songs = Array.from({ length: 9 }, (_, i) => `music/song${i + 1}.opus`)

const Sound = () => {
  const { musicOn, soundEffectsOn, soundEffect } = useSound()

  const musicPlayer = useMemo(
    () => typeof Audio !== "undefined" && new Audio(),
    []
  )

  const playRandomSong = useCallback(() => {
    if (!musicPlayer) return

    const otherSongs = songs.filter((song) => song !== musicPlayer.src)
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    musicPlayer.src = randomSong
    musicPlayer.volume = 0.8
    musicPlayer.play()
  }, [musicPlayer])

  useEffect(() => {
    if (!musicPlayer) return

    if (musicOn && !musicPlayer.src) {
      playRandomSong()

      musicPlayer.addEventListener("ended", playRandomSong)
    } else if (musicOn && musicPlayer.src) {
      musicPlayer.play()
    } else {
      musicPlayer.pause()
      musicPlayer.removeEventListener("ended", playRandomSong)
    }
  }, [musicOn, musicPlayer, playRandomSong])

  useEffect(() => {
    if (!soundEffectsOn || !soundEffect) return

    let audioFile: string

    if (soundEffect === "journey") {
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
      audioFile = `soundfx/${soundEffect}.opus`
    }

    const soundEffectPlayer = new Audio(audioFile)
    soundEffectPlayer.play()
  }, [soundEffect, soundEffectsOn])

  return null
}

export default Sound
