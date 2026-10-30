import { GiCrossedSwords, GiShoonerSailboat, GiWindSlap } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

type Props = {
  isAggressive?: boolean
  isAllied?: boolean
}

const BUTTON_CLASS = "w-full min-w-32 rounded-full px-6 text-base md:w-auto"

const ShipMeetingActions = ({
  isAggressive = false,
  isAllied = false,
}: Props) => {
  const {
    attackShip,
    isAttackingShip,
    ignoreShip,
    isIgnoringShip,
    fleeShip,
    isFleeingShip,
  } = useSea()
  const isPending = isAttackingShip || isIgnoringShip || isFleeingShip

  const handleAttack = () => {
    attackShip()
  }

  const handleIgnore = () => {
    ignoreShip()
  }

  const handleFlee = () => {
    fleeShip()
  }

  const attackButton = (
    <Button
      size="lg"
      variant={isAllied ? "secondary" : "highlight"}
      className={BUTTON_CLASS}
      disabled={isPending}
      onClick={handleAttack}
    >
      <GiCrossedSwords />
      Attack
    </Button>
  )

  const passButton = isAggressive ? (
    <Button
      size="lg"
      variant="secondary"
      className={BUTTON_CLASS}
      disabled={isPending}
      onClick={handleFlee}
    >
      <GiWindSlap />
      Flee
    </Button>
  ) : (
    <Button
      size="lg"
      variant={isAllied ? "highlight" : "secondary"}
      className={BUTTON_CLASS}
      disabled={isPending}
      onClick={handleIgnore}
    >
      <GiShoonerSailboat />
      Ignore
    </Button>
  )

  // Attacking your own nation lowers your level, so Ignore comes first for allies
  return (
    <div className="flex flex-col items-center pt-2">
      <div className="flex w-full flex-wrap justify-center gap-4">
        {isAllied ? (
          <>
            {passButton}
            {attackButton}
          </>
        ) : (
          <>
            {attackButton}
            {passButton}
          </>
        )}
      </div>
    </div>
  )
}

export default ShipMeetingActions
