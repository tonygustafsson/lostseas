import { useState } from "react"
import { GiPirateCaptain } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"

import TavernBuy from "./Buy"
import TavernDice from "./Dice"
import TavernTabs from "./Tabs"

export type TavernTab = "Buy" | "Dice"

const Tavern = () => {
  const { data: player } = useGetPlayer()
  const { acceptNewCrewMembers, fightSailors, ignoreSailors } = useTavern()

  const [tab, setTab] = useState<TavernTab>("Buy")

  const handleAcceptNewCrewMembers = () => {
    acceptNewCrewMembers({ playerId: player?.id || "" })
  }

  const handleFightSailors = () => {
    fightSailors({ playerId: player?.id || "" })
  }

  const handleIgnoreSailors = () => {
    ignoreSailors({ playerId: player?.id || "" })
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

      <TavernTabs tab={tab} setTab={setTab} />

      {tab === "Buy" && <TavernBuy />}
      {tab === "Dice" && <TavernDice />}
    </>
  )
}

export default Tavern
