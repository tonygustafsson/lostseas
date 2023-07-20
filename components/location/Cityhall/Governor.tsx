import { GiQuillInk } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { TOWNS } from "@/constants/locations"
import { TitleInfo } from "@/constants/title"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getNewTitle } from "@/utils/title"

const getGreeting = ({
  isHomeNation,
  currentNation,
  townWarWith,
  promotionAvailable,
  citizenshipChangeAvailable,
  titleInfo,
  enemyWins = 0,
}: {
  isHomeNation: boolean
  currentNation: Nation | undefined
  townWarWith: Nation | null
  promotionAvailable: boolean
  citizenshipChangeAvailable: boolean
  titleInfo: TitleInfo | null
  enemyWins: number
}) => {
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

  if (citizenshipChangeAvailable && titleInfo) {
    return (
      <>
        <p>
          We are at war with {townWarWith}. Thank you for {enemyWins} victories
          over our enemy.
        </p>

        <p className="mt-2">
          I would like to share my appreciation by giving you the chance to be a
          citizen of {currentNation} with the title{" "}
          <strong>{titleInfo.title}</strong>.
          {titleInfo.reward > 0 && (
            <span>You will also get a reward of {titleInfo.reward} gold.</span>
          )}
        </p>
      </>
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
  const { acceptNewTitle, changeCitizenship } = useCityhall()

  const {
    isHomeNation,
    townWarWith,
    titleInfo,
    promotionAvailable,
    citizenshipChangeAvailable,
  } = getNewTitle(player?.character)

  const enemyWins = townWarWith
    ? player?.character.battles?.[townWarWith]?.won || 0
    : 0

  const greeting = getGreeting({
    isHomeNation,
    currentNation: player?.character.town
      ? TOWNS[player?.character.town].nation
      : undefined,
    townWarWith,
    promotionAvailable,
    citizenshipChangeAvailable,
    titleInfo,
    enemyWins,
  })

  const handleAcceptNewTitle = () => {
    acceptNewTitle()
  }

  const handleChangeCitizenship = () => {
    changeCitizenship()
  }

  return (
    <ActionCard
      title={`Welcome ${player?.character.title.toLowerCase()} ${player
        ?.character.name}`}
      message={greeting}
      icon={<GiQuillInk className="w-20 h-20 text-secondary" />}
      {...(promotionAvailable && {
        actions: (
          <button className="btn btn-primary" onClick={handleAcceptNewTitle}>
            Accept new title
          </button>
        ),
      })}
      {...(citizenshipChangeAvailable && {
        actions: (
          <button className="btn btn-primary" onClick={handleChangeCitizenship}>
            Change citizenship
          </button>
        ),
      })}
    />
  )
}

export default Governor
