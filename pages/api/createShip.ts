import { hash } from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { CreateNextUser } from "@/graphql/user"
import { CreateShip } from "@/graphql/ship"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  /*   const requestJson = {
    name: req.body.name,
    email: req.body.email,
    password: await hash(req.body.password || "", 12),

    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  } */

  const { ship } = (await client.request(CreateShip, {
    name: "My new ship ultra",
    type: "Frigate",
  })) as { ship: Pick<Ship, "name" | "type" | "id"> }

  res.status(200).json({ ship })
}

export default createShip
