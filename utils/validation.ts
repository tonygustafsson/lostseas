import { z } from "zod"

import { CHARACTER_IDS } from "@/constants/characters"

const validationRules = {
  playerId: z.string().uuid(),
  character: {
    name: z.string().min(3).max(50),
  },
  ship: {
    id: z.string().uuid(),
    name: z.string().min(2).max(30),
  },
}

const registrationValidationSchema = z.object({
  name: validationRules.character.name,
  characterId: z.enum(CHARACTER_IDS),
  musicOn: z.boolean(),
  soundEffectsOn: z.boolean(),
})

const loginValidationSchema = z.object({
  playerId: validationRules.playerId,
})

const renameShipValidationSchema = z.object({
  id: validationRules.ship.id,
  name: validationRules.ship.name,
})

export {
  loginValidationSchema,
  registrationValidationSchema,
  renameShipValidationSchema,
}

export default validationRules
