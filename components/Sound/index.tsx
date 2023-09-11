import { useCallback, useEffect, useMemo } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"

import { useSound } from "./context"

const townSongs = Array.from(
  { length: 6 },
  (_, i) => `music/town/song${i + 1}.opus`
)
const seaSongs = Array.from(
  { length: 7 },
  (_, i) => `music/sea/song${i + 1}.opus`
)

const Sound = () => {
  const { data: player } = useGetPlayer()
  const { musicOn, soundEffectsOn, soundEffect } = useSound()

  const musicPlayer = useMemo(
    () => typeof Audio !== "undefined" && new Audio(),
    []
  )

  const fadeOutMusic = () =>
    new Promise((resolve) => {
      if (!musicPlayer) {
        resolve(true)
        return
      }

      if (musicPlayer.src && !musicPlayer.paused) {
        const fadeOutInterval = setInterval(() => {
          if (musicPlayer.volume >= 0.05) {
            musicPlayer.volume -= 0.05
          } else {
            musicPlayer.volume = 0
            clearInterval(fadeOutInterval)
            resolve(true)
          }
        }, 100)
      } else {
        resolve(true)
      }
    })

  const playRandomSong = useCallback(async () => {
    if (!musicPlayer) return

    await fadeOutMusic()

    const songs = player?.character?.location === "Sea" ? seaSongs : townSongs
    const otherSongs = songs.filter((song) => song !== musicPlayer.src)
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    musicPlayer.src = randomSong
    musicPlayer.volume = 0.8
    musicPlayer.play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicPlayer, player?.character?.location])

  useEffect(() => {
    // Change music track if you are going out to sea or coming in to harbor
    if (!musicPlayer || !musicOn) return

    if (
      (player?.character?.location === "Sea" &&
        musicPlayer.src.includes("town")) ||
      (player?.character?.location !== "Sea" && musicPlayer.src.includes("sea"))
    ) {
      playRandomSong()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.character?.location])

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
