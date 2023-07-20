import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getNewTitle } from "@/utils/title"

const cityhallChangeCitizenship = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const character = await getCharacter(playerId)

  const { titleInfo, citizenshipChangeAvailable } = getNewTitle(character)

  if (!citizenshipChangeAvailable) {
    res.status(500).json({
      error: `You are not having this option at the moment.`,
      titleInfo,
      title: character.title,
    })
    return
  }

  const newNationality = character.town
    ? TOWNS[character.town]?.nation
    : character.nationality

  const characterResult: Character = {
    ...character,
    nationality: newNationality,
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
    newNationality,
  })
}

export default cityhallChangeCitizenship
