import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { CreateShip } from "@/graphql/ship"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = (await client.request(CreateShip, {
    name: req.body.name,
    type: req.body.type,
    userId: req.body.userId,
  })) as Pick<Ship, "name" | "type" | "id">

  res.status(200).json(data || [])
}

export default createShip
