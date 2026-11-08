import useSound from "@/app/stores/sound"
import { TOWNS } from "@/constants/locations"
import { NPC_VOICE_TYPES, NPC_VOICE_VOLUMES } from "@/constants/npcVoices"

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
  const voice = getNpcVoice(npc)
  const volumes = NPC_VOICE_VOLUMES[voice]
  const index = Math.floor(random() * volumes.length)

  return {
    src: `/soundfx/npc/${voice}${index + 1}.opus`,
    volume: volumes[index],
  }
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

  const { src, volume } = getNpcVoiceClip(npc)
  playing = new Audio(src)
  playing.volume = volume
  playing.play().catch(console.error)
}
