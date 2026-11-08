/** Personalities that sound alike share a voice, so there are fewer recordings to make */
export const NPC_VOICE_TYPES: Record<PersonalityId, string> = {
  oldSalt: "gruff",
  wearyVeteran: "gruff",
  gossip: "lively",
  braggart: "lively",
  shrewdTrader: "smooth",
  schemer: "smooth",
  pompous: "smooth",
  melancholic: "hushed",
  superstitious: "hushed",
}

/**
 * The 4 clips of each voice in `public/soundfx/npc/`, as the volume to play them at.
 * The recordings differ in loudness, so the louder ones are turned down to match the quiet ones.
 */
export const NPC_VOICE_VOLUMES: Record<string, number[]> = {
  "gruff-female-holland": [0.78, 0.76, 0.84, 0.8],
  "gruff-female-spain": [0.8, 1, 0.84, 0.83],
  "gruff-male-england": [0.95, 0.94, 0.82, 0.88],
  "gruff-male-france": [0.99, 1, 0.89, 0.85],
  "gruff-male-holland": [0.89, 0.87, 0.88, 0.95],
  "gruff-male-spain": [0.73, 0.93, 0.84, 1],
  "hushed-female-england": [0.63, 0.82, 0.7, 0.79],
  "hushed-female-france": [0.68, 0.69, 0.7, 0.81],
  "hushed-female-holland": [0.7, 0.72, 0.6, 0.76],
  "hushed-male-england": [0.73, 0.69, 0.74, 0.67],
  "hushed-male-france": [0.78, 0.82, 0.9, 0.82],
  "hushed-male-spain": [0.79, 0.77, 0.82, 0.76],
  "lively-female-england": [0.67, 0.72, 0.79, 0.82],
  "lively-female-france": [0.73, 0.8, 0.89, 0.76],
  "lively-female-spain": [0.98, 0.86, 1, 1],
  "lively-male-france": [0.76, 0.71, 0.68, 0.68],
  "lively-male-holland": [0.74, 0.88, 0.83, 0.76],
  "lively-male-spain": [0.86, 0.81, 0.85, 0.72],
  "smooth-female-england": [0.93, 0.81, 0.79, 0.9],
  "smooth-female-holland": [0.81, 0.79, 0.81, 0.93],
  "smooth-female-spain": [0.99, 0.81, 1, 0.92],
  "smooth-male-england": [0.7, 0.7, 0.91, 0.8],
  "smooth-male-france": [0.84, 0.8, 0.71, 0.75],
  "smooth-male-holland": [0.86, 0.75, 0.89, 0.77],
  "smooth-male-spain": [0.7, 0.81, 0.9, 0.8],
}
