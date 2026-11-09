import useSound from "@/app/stores/sound"
import { TOWNS } from "@/constants/locations"
import { NPC_VOICE_CLIPS, NPC_VOICE_TYPES } from "@/constants/npcs"

/** Voices are shared by personality type, gender and the nation of their town, like "gruff-female-holland" */
export const getNpcVoice = (npc: Npc) =>
  [
    NPC_VOICE_TYPES[npc.personality],
    npc.gender.toLowerCase(),
    TOWNS[npc.town].nation.toLowerCase(),
  ].join("-")

export const getNpcVoiceClip = (
  npc: Npc,
  random: () => number = Math.random
) => {
  const index = Math.floor(random() * NPC_VOICE_CLIPS)

  return `/soundfx/npc/${getNpcVoice(npc)}${index + 1}.opus`
}

// Only one NPC talks at a time, so the playing clip lives outside React
let playing: HTMLAudioElement | null = null

export const stopNpcVoice = () => {
  playing?.pause()
  playing = null
}

/** Plays a random clip of the NPC's voice in full, replacing any clip still playing */
export const playNpcVoice = (npc: Npc) => {
  stopNpcVoice()

  if (!useSound.getState().soundEffectsOn) {
    return
  }

  playing = new Audio(getNpcVoiceClip(npc))
  playing.play().catch(console.error)
}
