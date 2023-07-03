import { GiAnchor, GiSmallFishingSailboat } from "react-icons/gi"

import { useCharacter } from "@/hooks/queries/useCharacter"

const HarborActions = () => {
  const { move, explore } = useCharacter()

  const handleMove = (location: SeaLocation | TownLocation) => {
    move({ location })
  }

  const handleExplore = () => explore()

  return (
    <div className="flex flex-wrap mt-4 justify-center join">
      <button
        className="btn text-base bg-gray-800 join-item"
        onClick={() => handleMove("Docks")}
      >
        <GiAnchor className="text-cyan-600 w-5 h-5" />
        Land
      </button>

      <button
        className="btn text-base bg-gray-800 join-item"
        onClick={handleExplore}
      >
        <GiSmallFishingSailboat className="text-cyan-600 w-6 h-6" />
        Sail Out
      </button>
    </div>
  )
}

export default HarborActions
