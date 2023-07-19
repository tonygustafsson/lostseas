import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { NATIONS, TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getTitleInfoByScore } from "@/constants/title"
import { getCharacter, saveCharacter } from "@/firebase/db"

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

  const townNation = character.town ? TOWNS[character.town]?.nation : null
  const townWarWith = townNation ? NATIONS[townNation].warWith : null
  const isHomeNation = character.nationality === townNation

  if (!isHomeNation) {
    res.status(500).json({ error: `${townNation} is not your home nation.` })
    return
  }

  const friendlyAttacks = townNation
    ? (character.battles?.[townNation]?.won || 0) +
      (character.battles?.[townNation]?.lost || 0)
    : 0
  const enemyWins = townWarWith ? character.battles?.[townWarWith]?.won || 0 : 0
  const score = enemyWins - friendlyAttacks
  const titleInfo = getTitleInfoByScore(score)

  if (character.title === titleInfo.title) {
    res
      .status(500)
      .json({
        error: `You already have the title ${titleInfo.title}.`,
        titleInfo,
        title: character.title,
      })
    return
  }

  const characterResult: Character = {
    ...character,
    title: titleInfo.title,
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
