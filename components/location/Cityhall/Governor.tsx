import { GiBowTieRibbon } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { NATIONS, TOWNS } from "@/constants/locations"
import { getTitleInfoByScore } from "@/constants/title"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const getGreeting = (
  isHomeNation: boolean,
  townWarWith: Nation | null,
  enemyWins = 0,
  friendlyAttacks = 0
) => {
  if (!townWarWith) {
    return ""
  }

  const score = enemyWins - friendlyAttacks
  const titleInfo = getTitleInfoByScore(score)

  if (isHomeNation && enemyWins > 0) {
    return (
      <>
        <p>
          We are at war with {townWarWith}. Thank you for {enemyWins} victories
          over our common enemy.
        </p>
        <p>New title: {titleInfo.title}</p>
      </>
    )
  }

  if (isHomeNation) {
    return (
      <p>
        We are at war with {townWarWith}. I&apos;m looking forward for your wins
        against our common enemy. You will be rewarded by doing so.
      </p>
    )
  }

  return (
    <p>
      We are at war with {townWarWith}. Even though you are not my citizen, I
      will reward you for your victories against our common enemy.
    </p>
  )
}

const Governor = () => {
  const { data: player } = useGetPlayer()

  const townNation = player?.character.town
    ? TOWNS[player?.character.town]?.nation
    : null
  const townWarWith = townNation ? NATIONS[townNation].warWith : null
  const isHomeNation = player?.character.nationality === townNation
  const friendlyAttacks = townNation
    ? (player?.character.battles?.[townNation]?.won || 0) +
      (player?.character.battles?.[townNation]?.lost || 0)
    : 0
  const enemyWins = townWarWith
    ? player?.character.battles?.[townWarWith]?.won || 0
    : 0

  const greeting = getGreeting(
    isHomeNation,
    townWarWith,
    enemyWins,
    friendlyAttacks
  )

  return (
    <ActionCard
      title={`Welcome ${player?.character.title.toLowerCase()} ${
        player?.character.name
      }`}
      message={greeting}
      icon={<GiBowTieRibbon className="w-20 h-20 text-secondary" />}
      actions={
        <>
          <button className="btn btn-primary">Accept</button>
        </>
      }
    />
  )
}

export default Governor
