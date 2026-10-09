import { GiCrossedSwords, GiShoonerSailboat } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

const ShipMeetingActions = () => {
  const { attackShip, ignoreShip } = useSea()

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
          className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
          onClick={handleAttack}
        >
          <GiCrossedSwords />
          Attack
        </Button>

        <Button
          variant="secondary"
          className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
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
