import { useSea } from "@/hooks/queries/useSea"

import { Button } from "../ui/button"

const PostAttackActions = () => {
  const { continueJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <div className="flex flex-col items-center rounded-b-lg bg-gray-900 pt-4 pb-8">
      <div className="lg:join mt-4 flex flex-wrap justify-center gap-2 lg:gap-0">
        <Button className="join-item text-base" onClick={handleContinueJourney}>
          Continue journey
        </Button>
      </div>
    </div>
  )
}

export default PostAttackActions
