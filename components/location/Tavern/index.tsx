import { Beer, MessageCircle, Spade } from "lucide-react"
import { useState } from "react"

import LocationNavigation from "@/components/LocationNavigation"
import TownNpc, { getFirstName, useTownNpcTalk } from "@/components/npc/TownNpc"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"

import TavernBuy from "./Buy"
import TavernCards from "./Cards"
import TavernEventDialog from "./TavernEventDialog"

export type TavernTab = "buy" | "cards" | "talk"

const Tavern = () => {
  const { data: player } = useGetPlayer()
  const {
    acceptNewCrewMembers,
    fightSailors,
    isFightingSailors,
    fightResult,
    dismissFightResult,
    ignoreSailors,
  } = useTavern()
  const tavernState = player?.locationStates?.tavern
  const npcTalk = useTownNpcTalk("tavern")
  const { npc, hasQuestBusiness } = npcTalk

  const [tab, setTab] = useState<TavernTab>("buy")

  const handleAcceptNewCrewMembers = () => {
    acceptNewCrewMembers()
  }

  const handleFightSailors = () => {
    fightSailors()
  }

  const handleIgnoreSailors = () => {
    ignoreSailors()
  }

  return (
    <>
      {/* Ignoring the sailors is an answer too, so the dialog cannot be closed */}
      {(!!tavernState?.noOfSailors || fightResult) && (
        <TavernEventDialog
          noOfSailors={tavernState?.noOfSailors ?? 0}
          isHostile={!!tavernState?.isHostile}
          result={fightResult}
          isPending={isFightingSailors}
          onContinue={dismissFightResult}
          onAccept={handleAcceptNewCrewMembers}
          onFight={handleFightSailors}
          onIgnore={handleIgnoreSailors}
        />
      )}

      <LocationNavigation
        items={[
          { id: "buy", label: "Buy", icon: <Beer /> },
          { id: "cards", label: "Play cards", icon: <Spade /> },
          ...(npc
            ? [
                {
                  id: "talk" as const,
                  label: getFirstName(npc),
                  icon: <MessageCircle />,
                  indicator: hasQuestBusiness,
                },
              ]
            : []),
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "buy" && <TavernBuy />}
      {tab === "cards" && <TavernCards />}
      {tab === "talk" && <TownNpc talk={npcTalk} />}
    </>
  )
}

export default Tavern
