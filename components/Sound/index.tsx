import { getCookie } from "cookies-next"
import { useCallback, useEffect, useRef } from "react"

import useSound from "@/app/stores/sound"
import {
  AMBIENCE_STATE_COOKIE_NAME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLocationAmbienceSounds } from "@/utils/location"

const townSongs = Array.from(
  { length: 10 },
  (_, i) => `music/town/song${i + 1}.opus`
)
const seaSongs = Array.from(
  { length: 8 },
  (_, i) => `music/sea/song${i + 1}.opus`
)

const isSongForLocation = (src: string | undefined, location?: string) =>
  Boolean(src?.includes(location === "Sea" ? "/music/sea/" : "/music/town/"))

const LOCATION_SOUND_VOLUME = 0.75

const fadeIntervals = new WeakMap<HTMLAudioElement, NodeJS.Timeout>()

const fadeTo = (
  audio: HTMLAudioElement,
  target: number,
  onDone?: () => void
) => {
  clearInterval(fadeIntervals.get(audio))

  const step = target > audio.volume ? 0.05 : -0.05

  const interval = setInterval(() => {
    const next = audio.volume + step

    if (step > 0 ? next >= target : next <= target) {
      audio.volume = target
      clearInterval(interval)
      onDone?.()
    } else {
      audio.volume = next
    }
  }, 100)

  fadeIntervals.set(audio, interval)
}

const Sound = () => {
  const { data: player } = useGetPlayer()
  const location = player?.character?.location
  const {
    musicOn,
    ambienceOn,
    soundEffectsOn,
    soundEffect,
    nextTrackRequest,
    setMusic,
    setAmbience,
    setSoundEffects,
    setChangingTrack,
  } = useSound()

  const musicPlayer = useRef<HTMLAudioElement | null>(null)

  if (musicPlayer.current === null) {
    musicPlayer.current = typeof Audio !== "undefined" ? new Audio() : null
  }
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

    setChangingTrack(true)
    await fadeOutMusic()
    setChangingTrack(false)
    if (!useSound.getState().musicOn) return

    const songs = location === "Sea" ? seaSongs : townSongs
    const otherSongs = songs.filter(
      (song) => !musicPlayer.current?.src.endsWith(song)
    )
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    if (musicPlayer.current) {
      musicPlayer.current.src = randomSong
      musicPlayer.current.volume = 0.8
    }

    playMusic()
  }, [musicPlayer, location, playMusic, setChangingTrack])

  useEffect(() => {
    if (!musicPlayer.current) return

    const player = musicPlayer.current

    player.onended = musicOn ? playRandomSong : null

    return () => {
      player.onended = null
    }
  }, [musicOn, musicPlayer, playRandomSong])

  useEffect(() => {
    if (!musicPlayer) return

    if (!musicOn) {
      musicPlayer.current?.pause()
    } else if (isSongForLocation(musicPlayer.current?.src, location)) {
      playMusic()
    } else {
      // No song yet, or going out to sea / coming in to harbor
      playRandomSong()
    }
  }, [musicOn, musicPlayer, location, playRandomSong, playMusic])

  const handledTrackRequest = useRef(nextTrackRequest)

  useEffect(() => {
    if (nextTrackRequest === handledTrackRequest.current) return

    handledTrackRequest.current = nextTrackRequest

    if (musicOn) playRandomSong()
  }, [nextTrackRequest, musicOn, playRandomSong])

  useEffect(() => {
    if (!soundEffectsOn || !soundEffect) return

    const soundEffectPlayer = new Audio(`soundfx/${soundEffect}.opus`)
    soundEffectPlayer.play().catch(console.error)
  }, [soundEffect, soundEffectsOn])

  useEffect(() => {
    if (!musicPlayer || !musicOn) return

    const handleClick = () => {
      if (!musicPlayer.current?.paused) return

      if (isSongForLocation(musicPlayer.current?.src, location)) {
        playMusic()
      } else {
        playRandomSong()
      }
    }

    document.addEventListener("click", handleClick, { once: true })
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [musicOn, musicPlayer, location, playRandomSong, playMusic])

  const locationAmbienceSounds = ambienceOn
    ? getLocationAmbienceSounds(location)
    : undefined

  // Changing location fades out the old sound while the new one fades in
  useEffect(() => {
    if (!locationAmbienceSounds) return

    const audio = new Audio(
      `/${locationAmbienceSounds[Math.floor(Math.random() * locationAmbienceSounds.length)]}`
    )
    audio.loop = true
    audio.volume = 0
    audio.onplaying = () => {
      fadeTo(audio, LOCATION_SOUND_VOLUME)
      document.removeEventListener("click", handleClick)
    }

    const play = () =>
      audio.play().catch(() => {
        // Autoplay blocked — will resume on first user interaction
      })

    play()

    const handleClick = () => {
      if (audio.paused) play()
    }

    document.addEventListener("click", handleClick)

    return () => {
      audio.onplaying = null
      document.removeEventListener("click", handleClick)
      fadeTo(audio, 0, () => audio.pause())
    }
  }, [locationAmbienceSounds])

  const hasPlayer = Boolean(player)

  useEffect(() => {
    if (!hasPlayer) return

    const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)
    const ambienceCookieValue = getCookie(AMBIENCE_STATE_COOKIE_NAME)
    const soundEffectsCookieValue = getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME)

    setMusic(
      typeof musicCookieValue !== "undefined"
        ? musicCookieValue === "true"
        : true
    )
    setAmbience(
      typeof ambienceCookieValue !== "undefined"
        ? ambienceCookieValue === "true"
        : true
    )
    setSoundEffects(
      typeof soundEffectsCookieValue !== "undefined"
        ? soundEffectsCookieValue === "true"
        : true
    )
  }, [hasPlayer, setMusic, setAmbience, setSoundEffects])

  return null
}

export default Sound
