import useSound, { type SoundEffect } from "@/app/stores/sound"

export const TOWN_SONGS = Array.from(
  { length: 10 },
  (_, i) => `music/town/song${i + 1}.opus`
)

export const SEA_SONGS = Array.from(
  { length: 8 },
  (_, i) => `music/sea/song${i + 1}.opus`
)

// Effects with several recordings, one is picked at random each time
export const SOUND_EFFECT_VARIANTS: Partial<Record<SoundEffect, number>> = {
  "arrive-port": 18,
  "leave-port": 21,
  "ship-meeting": 16,
  "cannons-firing": 8,
  transaction: 8,
  frustration: 8,
  drinking: 8,
  hammer: 9,
  fanfare: 8,
  parrot: 6,
  "building-entry": 1,
  "open-map": 1,
  victory: 14,
  "victory-speech": 14,
  defeat: 11,
  "defeat-speech": 14,
}

export const getSoundEffectFiles = (soundEffect: SoundEffect) => {
  const variants = SOUND_EFFECT_VARIANTS[soundEffect]

  if (!variants) {
    return [`soundfx/${soundEffect}.opus`]
  }

  return Array.from(
    { length: variants },
    (_, i) => `soundfx/${soundEffect}/${soundEffect}${i + 1}.opus`
  )
}

const pickFile = (soundEffect: SoundEffect, random: () => number) => {
  const files = getSoundEffectFiles(soundEffect)

  return files[Math.floor(random() * files.length)]
}

// Every file in the result is meant to play at the same time
export const getSoundEffectSrcs = (
  soundEffect: SoundEffect,
  random: () => number = Math.random
) => {
  // The crew's reaction with the captain speaking on top
  if (soundEffect === "victory-with-speech") {
    return [pickFile("victory", random), pickFile("victory-speech", random)]
  }

  if (soundEffect === "defeat-with-speech") {
    return [pickFile("defeat", random), pickFile("defeat-speech", random)]
  }

  return [pickFile(soundEffect, random)]
}

export const playSoundEffect = (soundEffect: SoundEffect) => {
  if (!useSound.getState().soundEffectsOn) {
    return
  }

  getSoundEffectSrcs(soundEffect).forEach((src) => {
    new Audio(src).play().catch(console.error)
  })
}
