import { GiShoonerSailboat } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

const PostAttackActions = () => {
  const { continueJourney, isContinueingJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <Button
      variant="highlight"
      size="lg"
      className="mt-2 w-full"
      disabled={isContinueingJourney}
      onClick={handleContinueJourney}
    >
      <GiShoonerSailboat />
      Continue journey
    </Button>
  )
}

export default PostAttackActions
