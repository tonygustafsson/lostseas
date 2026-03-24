"use client"

import { useMemo, useState } from "react"
import { FaCoins } from "react-icons/fa"

import MerchandiseCard from "@/components/MerchandiseCard"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "@/components/ui/button-group"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getGoldEffectiveness } from "@/utils/crew"

import { Button } from "../ui/button"

const GiveGold = () => {
  const { data: player } = useGetPlayer()
  const { giveGold } = useCrew()

  const [quantity, setQuantity] = useState(1)

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }

  const increase = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const effectiveness = useMemo(
    () =>
      getGoldEffectiveness(
        player?.crewMembers.count || 0,
        player?.crewMembers.mood || 0,
        quantity
      ),
    [player?.crewMembers, quantity]
  )

  const isDisabled = useMemo(
    () => (player?.character.gold || 0) < quantity || quantity < 1,
    [player?.character.gold, quantity]
  )

  const handleSubmit = () => {
    giveGold({ gold: quantity })
  }

  return (
    <MerchandiseCard
      title="Give gold"
      indicator={player?.character.gold?.toString() || "0"}
      icon={<FaCoins className="text-accent h-7 w-7" />}
      disabled={isDisabled}
      fullWidth
      body={
        <>
          <p>
            Give some gold to your crew members to improve their mood. More crew
            members means more gold needed.
          </p>

          <p>
            Your crew will have a mood of <strong>{effectiveness}%</strong> with
            the current amount.
          </p>
        </>
      }
      actions={
        <>
          <ButtonGroup className="w-fit">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={decrease}
            >
              -
            </Button>

            <Input
              value={quantity.toString()}
              onChange={changeQuantity}
              type="number"
              className={`border-border bg-input/30 h-8 w-12 [appearance:textfield] rounded-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                quantity < 10 ? "w-10" : ""
              } ${quantity < 100 ? "w-12" : ""} ${quantity < 1000 ? "w-14" : ""}`}
            />

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={increase}
            >
              +
            </Button>
          </ButtonGroup>

          <Button size="sm" disabled={isDisabled} onClick={handleSubmit}>
            Give gold
          </Button>
        </>
      }
    />
  )
}

export default GiveGold
