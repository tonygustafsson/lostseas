import { NATIONS } from "@/constants/locations"

import getDutchFemaleName from "./names/getDutchFemaleName"
import getDutchMaleName from "./names/getDutchMaleName"
import getDutchSurname from "./names/getDutchSurname"
import getEnglishFemaleName from "./names/getEnglishFemaleName"
import getEnglishMaleName from "./names/getEnglishMaleName"
import getEnglishSurname from "./names/getEnglishSurname"
import getFrenchFemaleName from "./names/getFrenchFemaleName"
import getFrenchMaleName from "./names/getFrenchMaleName"
import getFrenchSurname from "./names/getFrenchSurname"
import getSpanishFemaleName from "./names/getSpanishFemaleName"
import getSpanishMaleName from "./names/getSpanishMaleName"
import getSpanishSurname from "./names/getSpanishSurname"
import { getRandomInt } from "./random"

const getRandomName = (
  nationality: Character["nationality"],
  gender: Character["gender"]
) => {
  switch (nationality) {
    case "England":
      return `${
        gender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
      } ${getEnglishSurname()}`
    case "France":
      return `${
        gender === "Male" ? getFrenchMaleName() : getFrenchFemaleName()
      } ${getFrenchSurname()}`
    case "Holland":
      return `${
        gender === "Male" ? getDutchMaleName() : getDutchFemaleName()
      } ${getDutchSurname()}`
    case "Spain":
      return `${
        gender === "Male" ? getSpanishMaleName() : getSpanishFemaleName()
      } ${getSpanishSurname()}`
  }
}

export const getRandomCharacter = () => {
  const gender: Character["gender"] = Math.random() > 0.25 ? "Male" : "Female"
  const age = getRandomInt(14, 70)
  const nationalityIndex = getRandomInt(0, 3)
  const nationality = NATIONS[nationalityIndex]
  const name = getRandomName(nationality, gender)

  return {
    name,
    nationality,
    gender,
    age,
  } as CharacterCreation
}
