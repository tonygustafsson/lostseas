import { NATIONS } from "@/constants/locations"

import getEnglishFemaleName from "./getEnglishFemaleName"
import getEnglishMaleName from "./getEnglishMaleName"
import getEnglishSurname from "./getEnglishSurname"
import { getRandomInt } from "./random"

export const getRandomCharacter = () => {
  const gender: Character["gender"] = Math.random() > 0.25 ? "Male" : "Female"
  const name = `${
    gender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
  } ${getEnglishSurname()}`
  const age = getRandomInt(14, 70)
  const nationalityIndex = getRandomInt(0, 3)
  const nationality = NATIONS[nationalityIndex]

  return {
    name,
    nationality,
    gender,
    age,
  } as CharacterCreation
}
