"use client"

import { useMemo, useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TextField from "@/components/TextField"
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
          <div className="join">
            <Button onClick={decrease} className="join-item btn-sm">
              -
            </Button>

            <TextField
              value={quantity.toString()}
              onChange={changeQuantity}
              type="number"
              name={""}
              size="sm"
              fullWidth={false}
              className={`join-item ${quantity < 10 && "w-9"} ${
                quantity < 100 && "w-11"
              } ${quantity < 1000 && "w-14"} hide-number-arrows`}
            />

            <Button onClick={increase} className="join-item btn-sm">
              +
            </Button>
          </div>

          <Button size="sm" disabled={isDisabled} onClick={handleSubmit}>
            Give medicine
          </Button>
        </>
      }
    />
  )
}

export default GiveMedicine
