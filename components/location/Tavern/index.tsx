import { useState } from "react"
import { GiPirateCaptain } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import LocationTabs from "@/components/LocationTabs"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"

import TavernBuy from "./Buy"
import TavernCards from "./Cards"
import TavernDice from "./Dice"

export type TavernTab = "buy" | "dice" | "cards"

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
            icon={<GiPirateCaptain className="w-20 h-20 text-secondary" />}
            actions={
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleAcceptNewCrewMembers}
                >
                  Take them in
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleIgnoreSailors}
                >
                  Pass
                </button>
              </>
            }
          />
        )}

      {!!player?.locationStates?.tavern?.noOfSailors &&
        player?.locationStates.tavern.isHostile && (
          <ActionCard
            title={`${player?.locationStates?.tavern?.noOfSailors} sailors approach you`}
            message="After a couple of drinks they start to get aggressive and want to fight you."
            icon={<GiPirateCaptain className="w-20 h-20 text-secondary" />}
            actions={
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleFightSailors}
                >
                  Fight them
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleIgnoreSailors}
                >
                  Avoid
                </button>
              </>
            }
          />
        )}

      <LocationTabs<TavernTab>
        items={[
          { id: "buy", label: "Buy" },
          { id: "dice", label: "Play dice" },
          { id: "cards", label: "Play cards" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "buy" && <TavernBuy />}
      {tab === "dice" && <TavernDice />}
      {tab === "cards" && <TavernCards />}
    </>
  )
}

export default Tavern
