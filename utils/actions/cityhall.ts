import { TOWNS } from "@/constants/locations"
import type { TitleInfo } from "@/constants/title"
import { TREASURES } from "@/constants/treasures"
import { patchDeep } from "@/utils/patchDeep"
import { getNewTitle, getTitleReward } from "@/utils/title"

import type { ActionResult } from "./types"

const NOT_AT_CITY_HALL = "You must be at City hall to do this."

export const acceptNewTitle = (
  player: Player
): ActionResult<{ titleInfo: TitleInfo; title: Title }> => {
  if (player.character.location !== "City hall") {
    return { error: NOT_AT_CITY_HALL }
  }

  const { isHomeNation, titleInfo, promotionAvailable, townWarWith } =
    getNewTitle(player.character)
  const currentTitle = player.character.title

  if (!isHomeNation) {
    return { error: "Not your home nation." }
  }

  if (!promotionAvailable) {
    return {
      error:
        titleInfo.title === currentTitle
          ? `You already have the title ${currentTitle}.`
          : `You need more victories against ${townWarWith} to be promoted from ${currentTitle}.`,
    }
  }

  const { reward, highestRewardedTitle } = getTitleReward(
    player.character,
    titleInfo
  )

  return {
    player: patchDeep<Player>(player, {
      character: {
        title: titleInfo.title,
        gold: player.character.gold + reward,
        highestRewardedTitle,
      },
    }),
    log: `Accepted new title ${titleInfo.title} from the governor of ${player.character.town}.`,
    // titleInfo.reward is the reward actually paid. title is the previous title.
    data: { titleInfo: { ...titleInfo, reward }, title: currentTitle },
  }
}

export const changeCitizenship = (
  player: Player
): ActionResult<{
  titleInfo: TitleInfo
  title: Title
  newNationality: Nation
}> => {
  if (player.character.location !== "City hall") {
    return { error: NOT_AT_CITY_HALL }
  }

  const { titleInfo, citizenshipChangeAvailable } = getNewTitle(
    player.character
  )
  const town = player.character.town

  if (!citizenshipChangeAvailable || !town) {
    return { error: "You cannot change citizenship here at the moment." }
  }

  const newNationality = TOWNS[town].nation
  const { reward, highestRewardedTitle } = getTitleReward(
    player.character,
    titleInfo
  )

  return {
    player: patchDeep<Player>(player, {
      character: {
        nationality: newNationality,
        title: titleInfo.title,
        gold: player.character.gold + reward,
        highestRewardedTitle,
      },
    }),
    log: `Changed citizenship from ${player.character.nationality} to ${newNationality}.`,
    // titleInfo.reward is the reward actually paid. title is the previous title.
    data: {
      titleInfo: { ...titleInfo, reward },
      title: player.character.title,
      newNationality,
    },
  }
}

export const handOverTreasure = (
  player: Player,
  { id }: { id: Treasure["id"] }
): ActionResult<{
  treasure: Treasure
  treasureInfo: (typeof TREASURES)[number]
}> => {
  if (player.character.location !== "City hall") {
    return { error: NOT_AT_CITY_HALL }
  }

  const town = player.character.town

  // Treasures can only be handed over in the town that rewards them
  const [key, treasure] =
    Object.entries(player.treasures || {}).find(
      ([, treasure]) => treasure.id === id && treasure.rewarder === town
    ) ?? []

  if (!key || !treasure) {
    return { error: "You don't have this treasure" }
  }

  const treasureInfo = TREASURES.find(({ name }) => name === treasure.name)

  if (!treasureInfo) {
    return { error: "This treasure is unknown and cannot be handed over." }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold + treasureInfo.value },
      treasures: { [key]: null },
    }),
    log: `Handed over ${treasure.name} to the town of ${town}.`,
    data: { treasure, treasureInfo },
  }
}
