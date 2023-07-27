import { useMemo, useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TextField from "@/components/ui/TextField"
import { MERCHANDISE } from "@/constants/merchandise"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getMedicineEffectiveness } from "@/utils/crew"

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
            <button
              onClick={decrease}
              className="btn btn-sm btn-primary join-item"
            >
              -
            </button>

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

            <button
              onClick={increase}
              className="btn btn-sm btn-primary join-item"
            >
              +
            </button>
          </div>

          <button
            className="btn btn-primary btn-sm"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Give medicine
          </button>
        </>
      }
    />
  )
}

export default GiveMedicine
