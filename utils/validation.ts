import { z } from "zod"

import { NATIONS } from "@/constants/locations"

const validationRules = {
  playerId: z.string().uuid(),
  character: {
    name: z.string().min(3).max(50),
    nationality: z.enum(NATIONS as any), // TODO: Fix any, const works but an array cannot be typed as const
    gender: z.enum(["Male", "Female"]),
    age: z.number().min(15).max(80),
  },
  ship: {
    id: z.string().uuid(),
    name: z.string().min(2).max(30),
  },
}

const registrationValidationSchema = z.object({
  name: validationRules.character.name,
  nationality: validationRules.character.nationality,
  gender: validationRules.character.gender,
  age: validationRules.character.age,
})

const loginValidationSchema = z.object({
  playerId: validationRules.playerId,
})

const changeCharacterValidationSchema = z.object({
  name: validationRules.character.name,
  gender: validationRules.character.gender,
  age: validationRules.character.age,
})

const renameShipValidationSchema = z.object({
  id: validationRules.ship.id,
  name: validationRules.ship.name,
})

export {
  changeCharacterValidationSchema,
  loginValidationSchema,
  registrationValidationSchema,
  renameShipValidationSchema,
}

export default validationRules
