import { GiBowTieRibbon } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { NATIONS, TOWNS } from "@/constants/locations"
import { getTitleInfoByScore, TitleInfo } from "@/constants/title"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const getGreeting = (
  isHomeNation: boolean,
  townWarWith: Nation | null,
  currentTitle: Title | undefined,
  titleInfo: TitleInfo,
  enemyWins = 0
) => {
  if (!townWarWith) {
    return ""
  }

  if (isHomeNation && enemyWins > 0) {
    return (
      <>
        <p>
          We are at war with {townWarWith}. Thank you for {enemyWins} victories
          over our common enemy.
        </p>

        {currentTitle !== titleInfo.title && (
          <p className="mt-2">
            I would like to share my appreciation by giving you the title{" "}
            <strong>{titleInfo.title}</strong>. You will also get a reward of{" "}
            {titleInfo.reward} gold.
          </p>
        )}
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
      We are at war with {townWarWith}. I might consider making you a citizen if
      you destroy enemy ships.
    </p>
  )
}

const Governor = () => {
  const { data: player } = useGetPlayer()
  const { acceptNewTitle } = useCityhall()

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
  const score = enemyWins - friendlyAttacks
  const titleInfo = getTitleInfoByScore(score)

  const greeting = getGreeting(
    isHomeNation,
    townWarWith,
    player?.character.title,
    titleInfo,
    enemyWins
  )

  const handleAcceptNewTitle = () => {
    acceptNewTitle()
  }

  return (
    <ActionCard
      title={`Welcome ${player?.character.title.toLowerCase()} ${
        player?.character.name
      }`}
      message={greeting}
      icon={<GiBowTieRibbon className="w-20 h-20 text-secondary" />}
      {...(player?.character.title !== titleInfo.title && {
        actions: (
          <button className="btn btn-primary" onClick={handleAcceptNewTitle}>
            Accept new title
          </button>
        ),
      })}
    />
  )
}

export default Governor
