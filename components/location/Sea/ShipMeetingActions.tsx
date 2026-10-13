import { GiCrossedSwords, GiShoonerSailboat } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

const ShipMeetingActions = () => {
  const { attackShip, isAttackingShip, ignoreShip, isIgnoringShip } = useSea()
  const isPending = isAttackingShip || isIgnoringShip

  const handleAttack = () => {
    attackShip()
  }

  const handleIgnore = () => {
    ignoreShip()
  }

  return (
    <div className="flex flex-col items-center pt-2">
      <div className="flex w-full flex-wrap justify-center gap-4">
        <Button
          size="lg"
          variant="highlight"
          className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
          disabled={isPending}
          onClick={handleAttack}
        >
          <GiCrossedSwords />
          Attack
        </Button>

        <Button
          size="lg"
          variant="secondary"
          className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
          disabled={isPending}
          onClick={handleIgnore}
        >
          <GiShoonerSailboat />
          Ignore
        </Button>
      </div>
    </div>
  )
}

export default ShipMeetingActions
