"use client"

import { type Character, CHARACTERS } from "@/constants/characters"

import CharacterOption from "./CharacterOption"

type Props = {
  nationality: Nation
  selectedId?: string
  onSelect: (character: Character) => void
}

const CharacterGrid = ({ nationality, selectedId, onSelect }: Props) => (
  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
    {CHARACTERS.filter((c) => c.nationality === nationality).map(
      (character) => (
        <CharacterOption
          key={character.id}
          character={character}
          selected={character.id === selectedId}
          onSelect={onSelect}
        />
      )
    )}
  </div>
)

export default CharacterGrid
