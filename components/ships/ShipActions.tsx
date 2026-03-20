"use client"

import RenameShipForm from "@/components/RenameShipForm"
import { useModal } from "@/components/ui/Modal/context"
import { useShips } from "@/hooks/queries/useShips"

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
            <button
              className="btn btn-primary btn-sm"
              onClick={handleRemoveShip}
              disabled={isRemoving}
            >
              Yes, remove ship
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => removeModal("removeShip")}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-secondary btn-xs"
        onClick={openRemoveShipModal}
        disabled={isRemoving}
      >
        Remove
      </button>

      <button className="btn btn-secondary btn-xs" onClick={openRenameModal}>
        Rename
      </button>
    </div>
  )
}

export default ShipActions
