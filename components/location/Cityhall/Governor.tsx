import { Award, Handshake } from "lucide-react"
import { useState } from "react"
import { GiQuillInk } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { QuestBadge, TalkButton } from "@/components/npc/NpcCard"
import { useTownNpcTalk } from "@/components/npc/TownNpc"
import { Button } from "@/components/ui/button"
import { TOWNS } from "@/constants/locations"
import { TitleInfo } from "@/constants/title"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { formatGold } from "@/utils/number"
import { getNewTitle, getTitleReward } from "@/utils/title"

const getGreeting = ({
  isHomeNation,
  currentNation,
  townWarWith,
  promotionAvailable,
  citizenshipChangeAvailable,
  titleInfo,
  reward,
  enemyWins = 0,
}: {
  isHomeNation: boolean
  currentNation: Nation | undefined
  townWarWith: Nation | null
  promotionAvailable: boolean
  citizenshipChangeAvailable: boolean
  titleInfo: TitleInfo | null
  reward: number
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
            <strong>{titleInfo.title}</strong>.
            {reward > 0 && (
              <> You will also get a reward of {formatGold(reward)}.</>
            )}
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
          {reward > 0 && (
            <span> You will also get a reward of {formatGold(reward)}.</span>
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

  const [hasClaimed, setHasClaimed] = useState(false)

  const { npc, talksLeft, hasQuestBusiness, isPending, onTalk, dialog } =
    useTownNpcTalk("governor")

  if (!player || !npc) {
    return null
  }

  const {
    isHomeNation,
    townWarWith,
    titleInfo,
    promotionAvailable,
    citizenshipChangeAvailable,
  } = getNewTitle(player.character)

  const { reward } = getTitleReward(player.character, titleInfo)

  const enemyWins = townWarWith
    ? player.character.battles?.[townWarWith]?.won || 0
    : 0

  const greeting = getGreeting({
    isHomeNation,
    currentNation: player.character.town
      ? TOWNS[player.character.town].nation
      : undefined,
    townWarWith,
    promotionAvailable,
    citizenshipChangeAvailable,
    titleInfo,
    reward,
    enemyWins,
  })

  const handleAcceptNewTitle = () => {
    setHasClaimed(true)
    acceptNewTitle(undefined, { onError: () => setHasClaimed(false) })
  }

  const handleChangeCitizenship = () => {
    setHasClaimed(true)
    changeCitizenship(undefined, { onError: () => setHasClaimed(false) })
  }

  const rewardWaiting = promotionAvailable || citizenshipChangeAvailable

  const cardImage = rewardWaiting
    ? "/img/cards/cityhall/governor-excited.png"
    : "/img/cards/cityhall/governor-neutral.png"

  const greetingTitle = `${rewardWaiting ? "Thank you" : "Welcome"} ${player.character.title.toLowerCase()} ${
    player.character.name
  }.`

  return (
    <>
      <ActionCard
        title={`Governor ${npc.name}`}
        message={
          <>
            <p>{greetingTitle}</p>

            {greeting && <div className="mt-2">{greeting}</div>}
          </>
        }
        image={cardImage}
        icon={<GiQuillInk />}
        actions={
          <>
            {/* Hidden while claiming, the Talk button stays for quest business */}
            {promotionAvailable && !hasClaimed && (
              <Button size="lg" onClick={handleAcceptNewTitle}>
                <Award className="size-6" />
                Accept new title
              </Button>
            )}

            {citizenshipChangeAvailable && !hasClaimed && (
              <Button size="lg" onClick={handleChangeCitizenship}>
                <Handshake className="size-6" />
                Change citizenship
              </Button>
            )}

            <div className="flex items-center gap-4">
              <TalkButton
                npc={npc}
                talksLeft={talksLeft}
                hasQuestBusiness={hasQuestBusiness}
                disabled={isPending}
                onTalk={onTalk}
              />

              {hasQuestBusiness && <QuestBadge />}
            </div>
          </>
        }
      />

      {dialog}
    </>
  )
}

export default Governor
