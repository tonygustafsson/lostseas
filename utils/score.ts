import { getMannedCannons } from "./crew"

export const getScore = (player: Player) => {
  let score = 0

  if (player.character.title === "Ensign") {
    score += 50
  }
  if (player.character.title === "Captain") {
    score += 100
  }
  if (player.character.title === "Major") {
    score += 150
  }
  if (player.character.title === "Colonel") {
    score += 200
  }
  if (player.character.title === "Admiral") {
    score += 250
  }
  if (player.character.title === "Baron") {
    score += 300
  }
  if (player.character.title === "Count") {
    score += 350
  }
  if (player.character.title === "Marquis") {
    score += 400
  }
  if (player.character.title === "Duke") {
    score += 450
  }

  const totalGold =
    player.character.gold +
    (player.character.account || 0) -
    (player.character.loan || 0)

  score += Math.floor(totalGold / 500)
  score += Math.floor(Object.keys(player.ships).length * 10)

  const mannedCannons = getMannedCannons(
    player.crewMembers.count,
    player.inventory?.cannons || 0
  )
  score += mannedCannons * 10

  return score
}
