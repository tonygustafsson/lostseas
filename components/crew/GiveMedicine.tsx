"use client"

import { useState } from "react"

import CrewAction, { CrewActionChange } from "@/components/crew/CrewAction"
import CrewQuantity from "@/components/crew/CrewQuantity"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Button } from "@/components/ui/button"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getMedicineEffectiveness } from "@/utils/crew"

const GiveMedicine = () => {
  const { data: player } = useGetPlayer()
  const { giveMedicine } = useCrew()

  const [quantity, setQuantity] = useState(1)

  if (!player) {
    return null
  }

  const owned = player.inventory?.medicine || 0
  const { count, health } = player.crewMembers

  // The stock can shrink after giving, so the amount follows it down
  const amount = Math.min(quantity, Math.max(owned, 1))

  const isDisabled = owned < amount || !count || health >= 100

  return (
    <CrewAction
      icon={<MerchandiseIcon item="medicine" />}
      title="Medicine"
      owned={owned ? `${owned} in the hold` : "None in the hold"}
      description="Brings your crew's health back up. A larger crew needs more bottles."
      change={
        <CrewActionChange
          label="Health"
          from={health}
          to={getMedicineEffectiveness(count, health, amount)}
          suffix="%"
        />
      }
    >
      <CrewQuantity
        value={amount}
        max={owned}
        label="Bottles of medicine"
        onChange={setQuantity}
      />

      <Button
        size="sm"
        variant="secondary"
        disabled={isDisabled}
        onClick={() => giveMedicine({ medicine: amount })}
      >
        Give
      </Button>
    </CrewAction>
  )
}

export default GiveMedicine
