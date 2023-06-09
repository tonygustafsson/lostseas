import { z } from "zod"

const validationRules = {
  userId: z
    .string()
    .refine(
      (value) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
          value
        ),
      "User GUID is malformatet"
    ),
  character: {
    name: z.string().min(3).max(50),
    gender: z.enum(["Male", "Female"]),
    age: z.number().min(15).max(80),
  },
}

export default validationRules
