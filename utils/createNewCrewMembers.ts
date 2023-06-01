import crypto from "crypto"

import getEnglishFemaleName from "./getEnglishFemaleName"
import getEnglishMaleName from "./getEnglishMaleName"
import getEnglishSurname from "./getEnglishSurname"

const createNewCrewMembers = (count = 1) => {
  const crewMembers = {} as Record<string, CrewMember>

  Array.from({ length: count }).forEach(() => {
    const id = crypto.randomUUID()
    const createdDate = new Date().getTime()
    const gender: CrewMember["gender"] =
      Math.random() > 0.25 ? "Male" : "Female"
    const name = `${
      gender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
    } ${getEnglishSurname()}`
    const age = Math.floor(Math.random() * (70 - 14 + 1) + 14)

    crewMembers[id] = {
      id,
      name,
      gender,
      age,
      createdDate,
    }
  })

  return crewMembers
}

export default createNewCrewMembers
