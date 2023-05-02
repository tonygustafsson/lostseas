import { hash } from "bcrypt"

import client from "@/graphql/client"
import { CreateNextUser } from "@/graphql/user"

const register = async (req: any, res: any) => {
  const requestJson = {
    name: req.body.name,
    email: req.body.email,
    password: await hash(req.body.password || "", 12),

    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  }

  const { user } = (await client.request(CreateNextUser, requestJson)) as {
    user: User
  }

  res.status(200).json({ id: user.id })
}

export default register
