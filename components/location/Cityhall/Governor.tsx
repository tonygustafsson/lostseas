import { GiBowTieRibbon } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { TitleInfo } from "@/constants/title"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getNewTitle } from "@/utils/title"

const getGreeting = (
  isHomeNation: boolean,
  townWarWith: Nation | null,
  promotionAvailable: boolean,
  titleInfo: TitleInfo | null,
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

        {promotionAvailable && titleInfo && (
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

  const { isHomeNation, townWarWith, titleInfo, promotionAvailable } =
    getNewTitle(player?.character)

  const enemyWins = townWarWith
    ? player?.character.battles?.[townWarWith]?.won || 0
    : 0

  const greeting = getGreeting(
    isHomeNation,
    townWarWith,
    promotionAvailable,
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
      {...(promotionAvailable && {
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
