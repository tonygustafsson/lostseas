import { GiPirateCaptain } from "react-icons/gi"

import TreasureIcon from "@/components/TreasureIcon"
import { TREASURES } from "@/constants/treasures"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getPirateCrime } from "@/utils/createWantedPirate"

import HandOverCard from "./HandOverCard"

const HandOver = () => {
  const { data: player } = useGetPlayer()
  const { handOver, isHandingOver, handOverPirate, isHandingOverPirate } =
    useCityhall()

  // One hand-over at a time, so a double click can't send it twice
  const isBusy = isHandingOver || isHandingOverPirate

  const treasursOfInterest = Object.values(player?.treasures || [])?.filter(
    (treasure) => treasure.rewarder === player?.character.town
  )

  const piratesOfInterest = Object.values(player?.wantedPirates || {}).filter(
    (pirate) => pirate.rewarder === player?.character.town
  )

  if (!treasursOfInterest?.length && !piratesOfInterest.length) {
    return null
  }

  return (
    <div>
      <h2 className="mb-4 font-serif text-3xl">Hand over</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {treasursOfInterest.map((treasure) => {
          const treasureInfo = TREASURES.find(
            (treasureItem) => treasureItem.name === treasure.name
          )

          return (
            <HandOverCard
              key={treasure.id}
              title={treasure.name}
              icon={<TreasureIcon item={treasure.name} />}
              description={treasureInfo?.description}
              rewardLabel="Value"
              reward={treasureInfo?.value}
              onHandOver={() => handOver(treasure.id)}
              disabled={isBusy}
            />
          )
        })}

        {piratesOfInterest.map((pirate) => {
          const crime = getPirateCrime(pirate)

          return (
            <HandOverCard
              key={pirate.id}
              title={pirate.name}
              icon={<GiPirateCaptain />}
              description={crime?.description}
              rewardLabel="Bounty"
              reward={crime?.bounty}
              onHandOver={() => handOverPirate(pirate.id)}
              disabled={isBusy}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HandOver
