import { NATIONS, TOWNS } from "@/constants/locations"
import { TITLE_INFO, type TitleInfo } from "@/constants/title"

/** The highest title the level qualifies for. */
export const getTitleInfoByScore = (score = 0) =>
  Object.values(TITLE_INFO).findLast(({ minLevel }) => score >= minLevel) ??
  TITLE_INFO.Pirate

export const getNewTitle = (character: Character) => {
  const townNation = character.town ? TOWNS[character.town]?.nation : null
  const townWarWith = townNation ? NATIONS[townNation].warWith : null
  const friendlyAttacks = townNation
    ? (character.battles?.[townNation]?.won || 0) +
      (character.battles?.[townNation]?.lost || 0)
    : 0
  const enemyWins = townWarWith ? character.battles?.[townWarWith]?.won || 0 : 0
  const score = enemyWins - friendlyAttacks

  const isHomeNation = character.nationality === townNation
  const currentTitleInfo = TITLE_INFO[character.title]
  const newTitleInfo = getTitleInfoByScore(score)
  const promotionAvailable =
    isHomeNation &&
    character.title !== newTitleInfo.title &&
    newTitleInfo.higherThan.includes(currentTitleInfo.title) // Avoid demoting
  const citizenshipChangeAvailable =
    !isHomeNation && !!newTitleInfo && score > 0

  return {
    isHomeNation,
    townWarWith,
    titleInfo: newTitleInfo,
    promotionAvailable,
    citizenshipChangeAvailable,
  }
}

/**
 * Title rewards are paid once per title. A title only pays its reward when it is
 * higher than every title rewarded before, so changing citizenship and being
 * promoted again cannot pay the same reward twice.
 */
export const getTitleReward = (
  character: Pick<Character, "title" | "highestRewardedTitle">,
  titleInfo: TitleInfo
) => {
  const highestRewarded = character.highestRewardedTitle ?? character.title
  const isNewHighest = titleInfo.higherThan.includes(highestRewarded)

  return {
    reward: isNewHighest ? titleInfo.reward : 0,
    highestRewardedTitle: isNewHighest ? titleInfo.title : highestRewarded,
  }
}
