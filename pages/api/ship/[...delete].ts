import { NextApiRequest, NextApiResponse } from "next/types"

import client from "@/graphql/client"
import { DeleteShip } from "@/graphql/ship"

const deleteShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query?.delete?.[1]

  if (!id) return

  const { ship } = (await client.request(DeleteShip, {
    id,
  })) as { ship: Pick<Ship, "id"> }

  res.status(200).json({ ship })
}

export default deleteShip
