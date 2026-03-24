"use client"

import { useMemo, useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "@/components/ui/button-group"
import { MERCHANDISE } from "@/constants/merchandise"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getMedicineEffectiveness } from "@/utils/crew"

import { Button } from "../ui/button"

const GiveMedicine = () => {
  const { data: player } = useGetPlayer()
  const { giveMedicine } = useCrew()

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
      getMedicineEffectiveness(
        player?.crewMembers.count || 0,
        player?.crewMembers.health || 0,
        quantity
      ),
    [player?.crewMembers, quantity]
  )

  const isDisabled = useMemo(
    () => (player?.inventory?.medicine || 0) < quantity || quantity < 1,
    [player?.inventory?.medicine, quantity]
  )

  const handleSubmit = () => {
    giveMedicine({ medicine: quantity })
  }

  return (
    <MerchandiseCard
      title="Give medicine"
      indicator={player?.inventory?.medicine?.toString() || "0"}
      icon={<MerchandiseIcon item="medicine" />}
      disabled={isDisabled}
      fullWidth
      body={
        <>
          <p>{MERCHANDISE.medicine.description}</p>
          <p>
            Your crew will have a health of <strong>{effectiveness}%</strong>{" "}
            with the current amount.
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
            Give medicine
          </Button>
        </>
      }
    />
  )
}

export default GiveMedicine
