import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getNewTitle } from "@/utils/title"

const cityhallAcceptNewTitle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const character = await getCharacter(playerId)

  const { isHomeNation, titleInfo, promotionAvailable } = getNewTitle(character)

  if (!isHomeNation) {
    res.status(500).json({ error: "Not your home nation." })
    return
  }

  if (!promotionAvailable) {
    res.status(500).json({
      error: `You already have the title ${titleInfo?.title}.`,
      titleInfo,
      title: character.title,
    })
    return
  }

  const characterResult: Character = {
    ...character,
    title: titleInfo?.title,
    gold: character.gold + titleInfo.reward,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error, titleInfo, title: character.title })
    return
  })

  res.status(200).json({
    success: true,
    titleInfo,
    title: character.title,
  })
}

export default cityhallAcceptNewTitle
