import { GiCannon, GiShoonerSailboat } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

const BattleActions = () => {
  const { battleMove, isMakingBattleMove } = useSea()

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 pt-2">
      <Button
        size="lg"
        variant="highlight"
        className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
        disabled={isMakingBattleMove}
        onClick={() => battleMove("fire")}
      >
        <GiCannon />
        Fire
      </Button>

      <Button
        size="lg"
        variant="secondary"
        className="w-full min-w-32 rounded-full px-5 text-base md:w-auto"
        disabled={isMakingBattleMove}
        onClick={() => battleMove("evade")}
      >
        <GiShoonerSailboat />
        Evade
      </Button>
    </div>
  )
}

export default BattleActions
