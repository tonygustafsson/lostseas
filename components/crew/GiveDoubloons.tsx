import { useMemo, useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TextField from "@/components/ui/TextField"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getDoubloonsEffectiveness } from "@/utils/crew"

const GiveDoubloons = () => {
  const { data: player } = useGetPlayer()
  const { giveDoubloons } = useCrew()

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
      getDoubloonsEffectiveness(
        player?.crewMembers.count || 0,
        player?.crewMembers.mood || 0,
        quantity
      ),
    [player?.crewMembers, quantity]
  )

  const isDisabled = useMemo(
    () => (player?.character.doubloons || 0) < quantity || quantity < 1,
    [player?.character.doubloons, quantity]
  )

  const handleSubmit = () => {
    giveDoubloons({ playerId: player?.id || "", doubloons: quantity })
  }

  return (
    <MerchandiseCard
      title="Give Doubloons"
      indicator={player?.character.doubloons?.toString() || "0"}
      icon={<MerchandiseIcon item="Doubloons" />}
      disabled={isDisabled}
      fullWidth
      body={
        <>
          <p>
            Give some doubloons to your crew members to improve their mood. More
            crew members means more doubloons needed.
          </p>

          <p>
            Your crew will have a mood of <strong>{effectiveness}%</strong> with
            the current amount.
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
            Give doubloons
          </button>
        </>
      }
    />
  )
}

export default GiveDoubloons
