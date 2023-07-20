import { NATIONS, TOWNS } from "@/constants/locations"
import { TITLE_INFO } from "@/constants/title"

export const getTitleInfoByScore = (score = 0) => {
  let titleInfo = TITLE_INFO.Pirate

  if (score >= 10 && score < 20) {
    titleInfo = TITLE_INFO.Ensign
  }

  if (score >= 20 && score < 30) {
    titleInfo = TITLE_INFO.Captain
  }

  if (score >= 30 && score < 40) {
    titleInfo = TITLE_INFO.Major
  }

  if (score >= 40 && score < 50) {
    titleInfo = TITLE_INFO.Colonel
  }

  if (score >= 50 && score < 65) {
    titleInfo = TITLE_INFO.Admiral
  }

  if (score >= 65 && score < 80) {
    titleInfo = TITLE_INFO.Baron
  }

  if (score >= 80 && score < 100) {
    titleInfo = TITLE_INFO.Count
  }

  if (score >= 100 && score < 120) {
    titleInfo = TITLE_INFO.Marquis
  }

  if (score >= 120) {
    titleInfo = TITLE_INFO.Duke
  }

  return titleInfo
}

export const getNewTitle = (character: Character | undefined) => {
  if (!character) {
    // TODO: Should never happen, just handling character that can be undefined, make better solution
    return {
      isHomeNation: false,
      townWarWith: null,
      titleInfo: TITLE_INFO.Pirate,
      promotionAvailable: false,
      citizenshipChangeAvailable: false,
    }
  }

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
