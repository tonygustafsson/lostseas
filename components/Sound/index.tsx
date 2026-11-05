import { getCookie } from "cookies-next"
import { useCallback, useEffect, useRef } from "react"

import useSound from "@/app/stores/sound"
import {
  AMBIENCE_STATE_COOKIE_NAME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLocationAmbienceSounds, SEA_SONGS, TOWN_SONGS } from "@/utils/sound"

const isSongForLocation = (src: string | undefined, location?: string) =>
  Boolean(src?.includes(location === "Sea" ? "/music/sea/" : "/music/town/"))

const MUSIC_VOLUME = 0.8
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
    musicPlayer.current?.play().catch(() => {
      // Autoplay blocked — will resume on first user interaction
    })
  }, [musicPlayer])

  // A newer fade on the same player cancels this one, so its promise never
  // resolves and the request that started it is dropped
  const fadeOutMusic = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve) => {
      if (!audio.src || audio.paused) {
        resolve()
        return
      }

      fadeTo(audio, 0, resolve)
    })

  const latestSongRequest = useRef(0)

  const playRandomSong = useCallback(async () => {
    const audio = musicPlayer.current

    if (!audio) {
      return
    }

    // A newer request (like changing location mid-fade) takes over this one
    const request = ++latestSongRequest.current

    setChangingTrack(true)
    await fadeOutMusic(audio)

    if (request !== latestSongRequest.current) {
      return
    }

    setChangingTrack(false)

    // Music was turned off mid-fade, so leave the song ready to resume audibly
    if (!useSound.getState().musicOn) {
      audio.volume = MUSIC_VOLUME
      return
    }

    const songs = location === "Sea" ? SEA_SONGS : TOWN_SONGS
    const otherSongs = songs.filter((song) => !audio.src.endsWith(song))
    const randomSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]

    audio.src = randomSong
    audio.volume = MUSIC_VOLUME

    playMusic()
  }, [musicPlayer, location, playMusic, setChangingTrack])

  useEffect(() => {
    if (!musicPlayer.current) {
      return
    }

    const player = musicPlayer.current

    player.onended = musicOn ? playRandomSong : null

    return () => {
      player.onended = null
    }
  }, [musicOn, musicPlayer, playRandomSong])

  useEffect(() => {
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
    if (nextTrackRequest === handledTrackRequest.current) {
      return
    }

    handledTrackRequest.current = nextTrackRequest

    if (musicOn) {
      playRandomSong()
    }
  }, [nextTrackRequest, musicOn, playRandomSong])

  useEffect(() => {
    if (!musicOn) {
      return
    }

    const handleClick = () => {
      if (!musicPlayer.current?.paused) {
        return
      }

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
    if (!locationAmbienceSounds) {
      return
    }

    const audio = new Audio(
      locationAmbienceSounds[
        Math.floor(Math.random() * locationAmbienceSounds.length)
      ]
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
      if (audio.paused) {
        play()
      }
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
    if (!hasPlayer) {
      return
    }

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
