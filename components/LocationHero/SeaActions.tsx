import { GiSmallFishingSailboat } from "react-icons/gi"

import { useCharacter } from "@/hooks/queries/useCharacter"

const SeaActions = () => {
  const { explore } = useCharacter()

  const handleExplore = () => explore()

  return (
    <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
      <button
        className="btn text-base bg-gray-800 join-item"
        onClick={handleExplore}
      >
        <GiSmallFishingSailboat className="text-cyan-600 w-7 h-7" />
        Explore
      </button>
    </div>
  )
}

export default SeaActions
