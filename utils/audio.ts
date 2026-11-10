import useSound from "@/app/stores/sound"
import { stopNpcVoice } from "@/utils/npc/voice"
import { SEA_SONGS, TOWN_SONGS } from "@/utils/sound"

const MUSIC_VOLUME = 0.8
const AMBIENCE_VOLUME = 0.75

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

const play = (audio: HTMLAudioElement) =>
  audio.play().catch(() => {
    // Autoplay blocked, resumeAudio starts it on the next click
  })

// ---------------------------------------------------------------------------
// Music
// ---------------------------------------------------------------------------

// One player for the whole game, so songs can fade into each other
let music: HTMLAudioElement | null = null

const getMusic = () => {
  music ??= new Audio()

  return music
}

const isSongForLocation = (src: string, location?: Character["location"]) =>
  src.includes(location === "Sea" ? "/music/sea/" : "/music/town/")

export const pickRandomSong = (
  location: Character["location"] | undefined,
  currentSrc: string,
  random: () => number = Math.random
) => {
  const songs = location === "Sea" ? SEA_SONGS : TOWN_SONGS
  const otherSongs = songs.filter((song) => !currentSrc.endsWith(song))

  return otherSongs[Math.floor(random() * otherSongs.length)]
}

// A newer fade on the same player cancels this one, so its promise never
// resolves and the request that started it is dropped
const fadeOut = (audio: HTMLAudioElement) =>
  new Promise<void>((resolve) => {
    if (!audio.src || audio.paused) {
      resolve()
      return
    }

    fadeTo(audio, 0, resolve)
  })

let latestSongRequest = 0

export const playRandomSong = async (location?: Character["location"]) => {
  const audio = getMusic()

  // A newer request (like changing location mid-fade) takes over this one
  const request = ++latestSongRequest

  useSound.getState().setChangingTrack(true)
  await fadeOut(audio)

  if (request !== latestSongRequest) {
    return
  }

  useSound.getState().setChangingTrack(false)

  // Music was turned off mid-fade, so leave the song ready to resume audibly
  if (!useSound.getState().musicOn) {
    audio.volume = MUSIC_VOLUME
    return
  }

  audio.src = pickRandomSong(location, audio.src)
  audio.volume = MUSIC_VOLUME

  play(audio)
}

/** Carries on with the current song, or picks a new one when there is none or it belongs to the other location */
export const resumeMusic = (location?: Character["location"]) => {
  const audio = getMusic()

  if (!isSongForLocation(audio.src, location)) {
    playRandomSong(location)
    return
  }

  if (audio.paused) {
    play(audio)
  }
}

export const pauseMusic = () => {
  music?.pause()
}

/** Plays another song when the current one ends, returns a cleanup that stops it */
export const continueAfterSong = (location?: Character["location"]) => {
  const audio = getMusic()

  audio.onended = () => playRandomSong(location)

  return () => {
    audio.onended = null
  }
}

// ---------------------------------------------------------------------------
// Ambience
// ---------------------------------------------------------------------------

let ambience: HTMLAudioElement | null = null

export const playAmbience = (sounds: string[]) => {
  const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)])

  audio.loop = true
  audio.volume = 0
  audio.onplaying = () => fadeTo(audio, AMBIENCE_VOLUME)

  ambience = audio
  play(audio)
}

// Fades out while a new location's sound fades in
export const stopAmbience = () => {
  const audio = ambience

  if (!audio) {
    return
  }

  ambience = null
  audio.onplaying = null
  fadeTo(audio, 0, () => audio.pause())
}

// ---------------------------------------------------------------------------
// All long-running audio
// ---------------------------------------------------------------------------

// Phones and tablets running the installed app treat background audio like a
// music player, so sound stops while the app is hidden. Desktop keeps playing
const shouldPauseWhenHidden = () =>
  document.hidden &&
  window.matchMedia("(display-mode: standalone), (display-mode: fullscreen)")
    .matches &&
  window.matchMedia("(pointer: coarse)").matches

/** Starts whatever is switched on but not playing, like sound blocked by autoplay */
export const resumeAudio = (location?: Character["location"]) => {
  if (useSound.getState().musicOn) {
    resumeMusic(location)
  }

  if (ambience?.paused) {
    play(ambience)
  }
}

export const syncAudioWithVisibility = (location?: Character["location"]) => {
  if (shouldPauseWhenHidden()) {
    music?.pause()
    ambience?.pause()
    stopNpcVoice()
  } else {
    resumeAudio(location)
  }
}
