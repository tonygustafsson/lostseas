"use client"

import { useMemo, useState } from "react"
import { GiBandana } from "react-icons/gi"

import useModal from "@/app/stores/modals"
import MerchandiseCard from "@/components/MerchandiseCard"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"

const DismissCrewMembers = () => {
  const { data: player } = useGetPlayer()
  const { dismiss } = useCrew()

  const setModal = useModal((s) => s.setModal)
  const removeModal = useModal((s) => s.removeModal)

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

  const openDismissModal = () => {
    setModal({
      id: "dismissCrewMembers",
      title: "Are you sure?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to dismiss {quantity} crew members? They can
            be hard to get back.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmit}>
              Yes, dismiss them
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("dismissCrewMembers")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  const handleSubmit = () => {
    dismiss({ count: quantity })
    removeModal("dismissCrewMembers")
  }

  return (
    <MerchandiseCard
      title="Dismiss crew members"
      indicator={player?.crewMembers.count.toString() || "0"}
      icon={<GiBandana className="text-accent h-7 w-7" />}
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

          <Button size="sm" disabled={isDisabled} onClick={openDismissModal}>
            Dismiss
          </Button>
        </>
      }
    />
  )
}

export default DismissCrewMembers
