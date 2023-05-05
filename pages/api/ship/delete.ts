import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { DeleteShip } from "@/graphql/ship"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ship } = (await client.request(DeleteShip, {
    id: req.body.id,
  })) as { ship: Pick<Ship, "id"> }

  res.status(200).json({ ship })
}

export default createShip
