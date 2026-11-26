"use client"

import { useState } from "react"
import { GiBandana } from "react-icons/gi"

import useModal from "@/app/stores/modals"
import CrewAction, { CrewActionChange } from "@/components/crew/CrewAction"
import CrewQuantity from "@/components/crew/CrewQuantity"
import { Button } from "@/components/ui/button"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const DismissCrewMembers = () => {
  const { data: player } = useGetPlayer()
  const { dismiss } = useCrew()

  const setModal = useModal((s) => s.setModal)
  const removeModal = useModal((s) => s.removeModal)

  const [quantity, setQuantity] = useState(1)

  if (!player) {
    return null
  }

  const { count } = player.crewMembers

  // The crew can shrink after dismissing, so the amount follows it down
  const amount = Math.min(quantity, Math.max(count, 1))

  const isDisabled = count < amount

  const handleSubmit = () => {
    dismiss({ count: amount })
    removeModal("dismissCrewMembers")
  }

  const openDismissModal = () => {
    setModal({
      id: "dismissCrewMembers",
      title: "Are you sure?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to dismiss {amount} crew members? They can be
            hard to get back.
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

  return (
    <CrewAction
      icon={<GiBandana />}
      title="Dismiss crew"
      owned={`${count} aboard`}
      description="Fewer mouths to feed at sea, but good sailors are hard to find again."
      change={
        <CrewActionChange
          label="Crew"
          from={count}
          max={count}
          to={Math.max(0, count - amount)}
        />
      }
    >
      <CrewQuantity
        value={amount}
        max={count}
        label="Crew members to dismiss"
        onChange={setQuantity}
      />

      <Button
        size="sm"
        variant="destructive"
        disabled={isDisabled}
        onClick={openDismissModal}
      >
        Dismiss
      </Button>
    </CrewAction>
  )
}

export default DismissCrewMembers
