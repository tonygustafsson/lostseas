import { useCallback, useEffect, useMemo } from "react"

import { useSound } from "./context"

const songs = Array.from({ length: 4 }, (_, i) => `music/song${i + 1}.opus`)

const Sound = () => {
  const { musicOn, soundEffectsOn, soundEffect, resetSoundEffect } = useSound()

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
    if (!soundEffectsOn) return

    if (soundEffect) {
      const audioFile = `soundfx/${soundEffect}.opus`
      const soundEffectPlayer = new Audio(audioFile)
      soundEffectPlayer.play()

      soundEffectPlayer.addEventListener("ended", resetSoundEffect)
    }
  }, [resetSoundEffect, soundEffect, soundEffectsOn])

  return null
}

export default Sound
