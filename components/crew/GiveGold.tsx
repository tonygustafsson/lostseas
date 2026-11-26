"use client"

import { useState } from "react"
import { FaCoins } from "react-icons/fa"

import CrewAction, { CrewActionChange } from "@/components/crew/CrewAction"
import CrewQuantity from "@/components/crew/CrewQuantity"
import { Button } from "@/components/ui/button"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getGoldEffectiveness } from "@/utils/crew"
import { formatGold } from "@/utils/number"

const GiveGold = () => {
  const { data: player } = useGetPlayer()
  const { giveGold } = useCrew()

  const [quantity, setQuantity] = useState(1)

  if (!player) {
    return null
  }

  const owned = player.character.gold || 0
  const { count, mood } = player.crewMembers

  // The stock can shrink after giving, so the amount follows it down
  const amount = Math.min(quantity, Math.max(owned, 1))

  const isDisabled = owned < amount || !count || mood >= 100

  return (
    <CrewAction
      icon={<FaCoins />}
      title="Gold"
      owned={<span className="text-gold">{formatGold(owned)}</span>}
      description="Lifts your crew's mood. A larger crew needs more gold."
      change={
        <CrewActionChange
          label="Mood"
          from={mood}
          to={getGoldEffectiveness(count, mood, amount)}
          suffix="%"
        />
      }
    >
      <CrewQuantity
        value={amount}
        max={owned}
        label="Gold"
        onChange={setQuantity}
      />

      <Button
        size="sm"
        variant="secondary"
        disabled={isDisabled}
        onClick={() => giveGold({ gold: amount })}
      >
        Give
      </Button>
    </CrewAction>
  )
}

export default GiveGold
