import { CHARACTERS } from "@/constants/characters"

import { getRandomInt } from "./random"

/** A random portrait, with its name and nationality taken from the character. */
export const getRandomCharacter = (
  excludedCharacterId?: string
): CharacterCreation => {
  const availableCharacters = CHARACTERS.filter(
    ({ id }) => id !== excludedCharacterId
  )
  const character =
    availableCharacters[getRandomInt(0, availableCharacters.length - 1)]

  if (!character) {
    throw new Error("No alternative character is available")
  }

  return {
    characterId: character.id,
    name: character.name,
    nationality: character.nationality,
  }
}
