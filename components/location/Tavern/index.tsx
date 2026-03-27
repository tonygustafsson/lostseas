import { useState } from "react"
import { GiPirateCaptain } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import LocationTabs from "@/components/LocationTabs"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"

import TavernBuy from "./Buy"
import TavernCards from "./Cards"

export type TavernTab = "buy" | "cards"

const Tavern = () => {
  const { data: player } = useGetPlayer()
  const { acceptNewCrewMembers, fightSailors, ignoreSailors } = useTavern()

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
      {!!player?.locationStates?.tavern?.noOfSailors &&
        !player?.locationStates.tavern.isHostile && (
          <ActionCard
            title={`${player?.locationStates?.tavern?.noOfSailors} sailors approach you`}
            message="After a couple of drinks and a few games of cards, it turns out they want to join you on your adventure."
            icon={<GiPirateCaptain className="text-accent h-20 w-20" />}
            actions={
              <>
                <Button onClick={handleAcceptNewCrewMembers}>
                  Take them in
                </Button>
                <Button variant="secondary" onClick={handleIgnoreSailors}>
                  Pass
                </Button>
              </>
            }
          />
        )}

      {!!player?.locationStates?.tavern?.noOfSailors &&
        player?.locationStates.tavern.isHostile && (
          <ActionCard
            title={`${player?.locationStates?.tavern?.noOfSailors} sailors approach you`}
            message="After a couple of drinks they start to get aggressive and want to fight you."
            icon={<GiPirateCaptain className="text-accent h-20 w-20" />}
            actions={
              <>
                <Button onClick={handleFightSailors}>Fight them</Button>
                <Button variant="secondary" onClick={handleIgnoreSailors}>
                  Avoid
                </Button>
              </>
            }
          />
        )}

      <LocationTabs<TavernTab>
        items={[
          { id: "buy", label: "Buy" },
          { id: "cards", label: "Play cards" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "buy" && <TavernBuy />}
      {tab === "cards" && <TavernCards />}
    </>
  )
}

export default Tavern
