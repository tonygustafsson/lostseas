import type { SoundEffect } from "@/app/stores/sound"

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
  victory: 14,
  "victory-talk": 14,
  defeat: 11,
  "defeat-talk": 14,
}

// The captain sometimes says something on top of the crew's reaction
const SOUND_EFFECT_COMPANIONS: Partial<Record<SoundEffect, SoundEffect>> = {
  victory: "victory-talk",
  defeat: "defeat-talk",
}

const COMPANION_CHANCE = 1 / 3

export const getSoundEffectFiles = (soundEffect: SoundEffect) => {
  const variants = SOUND_EFFECT_VARIANTS[soundEffect]

  if (!variants) return [`soundfx/${soundEffect}.opus`]

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
  const srcs = [pickFile(soundEffect, random)]
  const companion = SOUND_EFFECT_COMPANIONS[soundEffect]

  if (companion && random() < COMPANION_CHANCE) {
    srcs.push(pickFile(companion, random))
  }

  return srcs
}
