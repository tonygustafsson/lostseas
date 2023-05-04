import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { CreateShip } from "@/graphql/ship"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ship } = (await client.request(CreateShip, {
    name: req.body.name,
    type: req.body.type,
    userId: req.body.userId,
  })) as { ship: Pick<Ship, "name" | "type" | "id"> }

  res.status(200).json({ ship })
}

export default createShip
