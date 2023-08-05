import TreasureIcon from "@/components/TreasureIcon"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Handover = () => {
  const { data: player } = useGetPlayer()

  const treasursOfInterest = Object.values(player?.treasures || [])?.filter(
    (treasure) => treasure.rewarder === player?.character.town
  )

  if (!treasursOfInterest?.length) {
    return <p>You have nothing to hand over.</p>
  }

  return (
    <div className="flex flex-wrap gap-4">
      {treasursOfInterest.map((treasure, idx) => {
        const treasureInfo = TREASURES.find(
          (treasure) => treasure.name === treasure.name
        )

        return (
          <div
            className="stat shadow-md hover:shadow-lg lg:w-1/3 bg-gray-800 rounded-lg pr-4"
            key={`${treasure.name}-${idx}`}
          >
            <div className="stat-figure text-secondary">
              <TreasureIcon size="lg" item={treasure.name} />
            </div>
            <p className="text-xl">{treasure.name}</p>

            <p className="text-sm">{treasureInfo?.description}</p>

            <div className="badge badge-secondary my-4">
              Value: {treasureInfo?.value} gold
            </div>

            <button className="btn btn-primary btn-sm">Hand over</button>
          </div>
        )
      })}
    </div>
  )
}

export default Handover
