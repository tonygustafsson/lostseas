import { z } from "zod"

import { NATIONS } from "@/constants/locations"

const validationRules = {
  userId: z.string().uuid(),
  character: {
    name: z.string().min(3).max(50),
    nationality: z.enum(NATIONS as any), // TODO: Fix any, const works but an array cannot be typed as const
    gender: z.enum(["Male", "Female"]),
    age: z.number().min(15).max(80),
  },
}

const registrationValidationSchema = z.object({
  name: validationRules.character.name,
  nationality: validationRules.character.nationality,
  gender: validationRules.character.gender,
  age: validationRules.character.age,
})

export { registrationValidationSchema }

export default validationRules
