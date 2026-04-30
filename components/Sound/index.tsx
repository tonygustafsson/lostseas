import { getCookie } from "cookies-next"
import { useCallback, useEffect, useRef } from "react"

import useSound from "@/app/stores/sound"
import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"

const townSongs = Array.from(
  { length: 10 },
  (_, i) => `music/town/song${i + 1}.opus`
)
const seaSongs = Array.from(
  { length: 8 },
  (_, i) => `music/sea/song${i + 1}.opus`
)

const Sound = () => {
  const { data: player } = useGetPlayer()
  const { musicOn, soundEffectsOn, soundEffect, setMusic, setSoundEffects } =
    useSound()

  const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)
  const soundEffectsCookieValue = getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME)

  const musicPlayer = useRef(typeof Audio !== "undefined" ? new Audio() : null)

  const playMusic = useCallback(() => {
    if (!musicPlayer) return

    musicPlayer.current?.play().catch(() => {
      // Autoplay blocked — will resume on first user interaction
    })
  }, [musicPlayer])

  const fadeOutMusic = () =>
    new Promise((resolve) => {
      if (!musicPlayer) {
        resolve(true)
        return
      }

      if (musicPlayer.current?.src && !musicPlayer.current.paused) {
        const fadeOutInterval = setInterval(() => {
          const currentVolume = musicPlayer.current?.volume ?? 0

          if (musicPlayer.current && currentVolume >= 0.05) {
            musicPlayer.current.volume -= 0.05
          } else {
            if (musicPlayer.current) {
              musicPlayer.current.volume = 0
            }
            clearInterval(fadeOutInterval)
            resolve(true)
          }
        }, 100)
      } else {
        resolve(true)
      }
    })

  const playRandomSong = useCallback(async () => {
    if (!musicPlayer.current) return

    await fadeOutMusic()

    const songs = player?.character?.location === "Sea" ? seaSongs : townSongs
    const otherSongs = songs.filter((song) => song !== musicPlayer.current?.src)
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    if (musicPlayer.current) {
      musicPlayer.current.src = randomSong
      musicPlayer.current.volume = 0.8
    }

    playMusic()
  }, [musicPlayer, player?.character?.location, playMusic])

  useEffect(() => {
    if (!musicPlayer.current) return

    const player = musicPlayer.current

    player.onended = musicOn ? playRandomSong : null

    return () => {
      player.onended = null
    }
  }, [musicOn, musicPlayer, playRandomSong])

  useEffect(() => {
    // Change music track if you are going out to sea or coming in to harbor
    if (!musicPlayer || !musicOn) return

    if (
      (player?.character?.location === "Sea" &&
        musicPlayer.current?.src.includes("town")) ||
      (player?.character?.location !== "Sea" &&
        musicPlayer.current?.src.includes("sea"))
    ) {
      playRandomSong()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.character?.location])

  useEffect(() => {
    if (!musicPlayer) return

    if (musicOn && !musicPlayer.current?.src) {
      playRandomSong()
    } else if (musicOn && musicPlayer.current?.src) {
      playMusic()
    } else {
      musicPlayer.current?.pause()
    }
  }, [musicOn, musicPlayer, playRandomSong, playMusic])

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

  useEffect(() => {
    if (!musicPlayer || !musicOn) return

    const handleClick = () => {
      if (!musicPlayer.current?.paused) return

      if (musicPlayer.current?.src) {
        playMusic()
      } else {
        playRandomSong()
      }
    }

    document.addEventListener("click", handleClick, { once: true })
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [musicOn, musicPlayer, playRandomSong, playMusic])

  useEffect(() => {
    if (!player) {
      return
    }

    setMusic(
      typeof musicCookieValue !== "undefined"
        ? musicCookieValue === "true"
        : true
    )
    setSoundEffects(
      typeof soundEffectsCookieValue !== "undefined"
        ? soundEffectsCookieValue === "true"
        : true
    )
  }, [
    player,
    setMusic,
    setSoundEffects,
    musicCookieValue,
    soundEffectsCookieValue,
  ])

  return null
}

export default Sound
