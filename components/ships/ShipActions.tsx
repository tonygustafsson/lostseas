"use client"

import useModal from "@/app/stores/modals"
import RenameShipForm from "@/components/RenameShipForm"
import { useShips } from "@/hooks/queries/useShips"

import { Button } from "../ui/button"

type Props = {
  shipId: Ship["id"]
  shipName: Ship["name"]
  shipType: Ship["type"]
}

const ShipActions = ({ shipId, shipName, shipType }: Props) => {
  const { remove, isRemoving } = useShips()
  const { setModal, removeModal } = useModal()

  const handleRemoveShip = () => {
    if (!shipId) {
      return
    }

    remove({ shipId })
    removeModal("removeShip")
  }

  const openRenameModal = () => {
    setModal({
      id: "renameShip",
      title: "Rename ship",
      content: <RenameShipForm id={shipId} name={shipName} />,
    })
  }

  const openRemoveShipModal = () => {
    setModal({
      id: "removeShip",
      title: "Are you sure?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Do you really want to remove your {shipType.toLowerCase()}{" "}
            {shipName}?
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleRemoveShip} disabled={isRemoving}>
              Yes, remove ship
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("removeShip")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="flex w-full justify-end gap-2">
      <Button
        variant="secondary"
        size="xs"
        onClick={openRemoveShipModal}
        disabled={isRemoving}
      >
        Remove
      </Button>

      <Button variant="secondary" size="xs" onClick={openRenameModal}>
        Rename
      </Button>
    </div>
  )
}

export default ShipActions
