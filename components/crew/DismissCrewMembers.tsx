import { useMemo, useState } from "react"
import { GiBandana } from "react-icons/gi"

import MerchandiseCard from "@/components/MerchandiseCard"
import TextField from "@/components/ui/TextField"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const DismissCrewMembers = () => {
  const { data: player } = useGetPlayer()
  const { dismiss } = useCrew()

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

  const isDisabled = useMemo(
    () => (player?.crewMembers.count || 0) < quantity || quantity < 1,
    [player?.crewMembers, quantity]
  )

  const handleSubmit = () => {
    dismiss({ count: quantity })
  }

  return (
    <MerchandiseCard
      title="Dismiss crew members"
      indicator={player?.crewMembers.count.toString() || "0"}
      icon={<GiBandana className="h-7 w-7 text-primary" />}
      disabled={isDisabled}
      fullWidth
      body={
        <p>
          Crew members cost resources when travling, sometimes it can be useful
          to let them go.
        </p>
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
            Dismiss
          </button>
        </>
      }
    />
  )
}

export default DismissCrewMembers
