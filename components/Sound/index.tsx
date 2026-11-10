import { useEffect, useRef } from "react"

import useSound from "@/app/stores/sound"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import {
  continueAfterSong,
  pauseMusic,
  playAmbience,
  playRandomSong,
  resumeAudio,
  resumeMusic,
  stopAmbience,
  syncAudioWithVisibility,
} from "@/utils/audio"
import { getAmbienceSounds } from "@/utils/sound"

const Sound = () => {
  const { data: player } = useGetPlayer()
  const hasPlayer = Boolean(player)
  const location = player?.character?.location
  const { musicOn, ambienceOn, nextTrackRequest, loadSettings } = useSound()

  // Sound stays off until there is a player, so the start page is quiet
  useEffect(() => {
    if (hasPlayer) {
      loadSettings()
    }
  }, [hasPlayer, loadSettings])

  useEffect(() => {
    if (!musicOn) {
      pauseMusic()
      return
    }

    resumeMusic(location)

    return continueAfterSong(location)
  }, [musicOn, location])

  const handledTrackRequest = useRef(nextTrackRequest)

  useEffect(() => {
    if (nextTrackRequest === handledTrackRequest.current) {
      return
    }

    handledTrackRequest.current = nextTrackRequest

    if (musicOn) {
      playRandomSong(location)
    }
  }, [nextTrackRequest, musicOn, location])

  const ambienceSounds = ambienceOn ? getAmbienceSounds(location) : undefined

  useEffect(() => {
    if (!ambienceSounds) {
      return
    }

    playAmbience(ambienceSounds)

    return stopAmbience
  }, [ambienceSounds])

  // Browsers block autoplay until the first click
  useEffect(() => {
    const handleClick = () => resumeAudio(location)
    const handleVisibilityChange = () => syncAudioWithVisibility(location)

    document.addEventListener("click", handleClick)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [location])

  return null
}

export default Sound
