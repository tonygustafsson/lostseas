import { FormEvent, useState } from "react"

import Button from "@/components/ui/Button"
import { useGetPlayer, usePlayerMutations } from "@/hooks/queries/useUser"

import Select from "./ui/Select"
import Table from "./ui/Table"
import TextField from "./ui/TextField"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Ships = () => {
  const { data: player } = useGetPlayer()
  const { createShip, removeShip } = usePlayerMutations()

  const [shipType, setShipType] = useState(ShipType.FRIGATE)

  const handleCreateShip = async (e: FormEvent) => {
    e.preventDefault()

    const shipData = {
      userId: player?.id || "",
      type: shipType,
    }

    createShip(shipData)

    setShipType(ShipType.FRIGATE)
  }

  const handleRemoveShip = async (id: string) => {
    if (!id) return

    removeShip({ shipId: id, userId: player?.id || "" })
  }

  return (
    <>
      {!!Object.values(player?.ships || [])?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Ships</h3>

          <Table
            headings={["Name", "Type", "Created", ""]}
            rows={Object.values(player?.ships || []).map((ship, idx) => [
              ship.name,
              ship.type,
              `${new Date(ship.createdDate).toLocaleDateString()} ${new Date(
                ship.createdDate
              ).toLocaleTimeString()}`,
              <Button
                key={`ship-remove-${idx}`}
                size="sm"
                className="ml-auto flex"
                onClick={() => handleRemoveShip(ship.id)}
              >
                Delete
              </Button>,
            ])}
          />
        </>
      )}

      <form
        onSubmit={handleCreateShip}
        className="mt-8 flex items-bottom gap-3"
      >
        <TextField
          type="hidden"
          name="userId"
          id="userId"
          value={player?.id || ""}
        />

        <Select
          label="Ship type"
          name="ship_type"
          id="ship_type"
          value={shipType}
          options={Object.values(ShipType)}
          onChange={(e) => setShipType(e.target.value)}
        />

        <Button type="submit" size="sm" className="mt-7">
          Create new ship
        </Button>
      </form>
    </>
  )
}

export default Ships
