import { NextApiRequest, NextApiResponse } from "next/types"

import { highPerformanceClient } from "@/graphql/client"
import { GetUserShips } from "@/graphql/ship"

const getShips = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = (await highPerformanceClient.request(GetUserShips, {
    userId: req.query.userId,
  })) as { ships: Ship[] }

  if (!data?.ships) {
    res.status(404).json({ message: "No ships found" })
    return
  }

  res.status(200).json(data.ships)
}

export default getShips
