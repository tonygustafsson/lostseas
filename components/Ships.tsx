import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

import Button from "@/components/ui/Button"
import { useShips, useShipsMutations } from "@/hooks/queries/useShips"

import Select from "./ui/Select"
import Table from "./ui/Table"
import TextField from "./ui/TextField"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Ships = () => {
  const { data: session } = useSession()
  const { data: ships } = useShips()
  const { create, remove } = useShipsMutations()

  const [shipName, setShipName] = useState("")
  const [shipType, setShipType] = useState(ShipType.GALLEON)

  const handleCreateShip = async (e: FormEvent) => {
    e.preventDefault()

    if (!shipName || !shipType || !session?.user?.id) return

    const shipData = {
      name: shipName,
      type: shipType,
      userId: session.user?.id,
    }

    create(shipData)

    setShipName("")
    setShipType(ShipType.FRIGATE)
  }

  const handleDeleteShip = async (id: string) => {
    if (!id) return

    await remove(id)
  }

  return (
    <>
      {!!ships?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Ships</h3>

          <Table
            headings={["Name", "Type", ""]}
            rows={ships.map((row, idx) => [
              row.name,
              row.type,
              <Button
                key={`ship-remove-${idx}`}
                size="sm"
                className="ml-auto flex"
                onClick={() => handleDeleteShip(row.id)}
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
          label="Ship name"
          name="ship_name"
          id="ship_name"
          value={shipName}
          onChange={setShipName}
        />

        <Select
          label="Ship type"
          name="ship_type"
          id="ship_type"
          options={Object.values(ShipType)}
          onChange={setShipType}
        />

        <Button type="submit" size="sm" className="mt-7">
          Create new ship
        </Button>
      </form>
    </>
  )
}

export default Ships
