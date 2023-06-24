import { NextApiRequest, NextApiResponse } from "next/types"

import { getRandomCharacter as getRandomCharacterUtil } from "@/utils/getRandomCharacter"

const getRandomCharacter = async (_: NextApiRequest, res: NextApiResponse) => {
  const randomCharacter = getRandomCharacterUtil()

  res.status(200).json(randomCharacter)
}

export default getRandomCharacter
