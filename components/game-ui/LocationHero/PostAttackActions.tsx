import { GiShoonerSailboat } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

const PostAttackActions = () => {
  const { continueJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <div className="flex flex-col items-center px-4 py-5 sm:px-6 sm:py-6">
      <div className="mt-1 flex flex-wrap justify-center gap-3">
        <Button
          className="min-w-40 rounded-full px-5 text-base"
          onClick={handleContinueJourney}
        >
          <GiShoonerSailboat />
          Continue journey
        </Button>
      </div>
    </div>
  )
}

export default PostAttackActions
