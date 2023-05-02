import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { UpdateNextUser } from "@/graphql/user"

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestJson = {
    id: req.body.id,
    name: req.body.name,
    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  }

  const { user } = (await client.request(UpdateNextUser, requestJson)) as {
    user: User
  }

  res.status(200).json({ id: user.id })
}

export default settings
