import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

import Button from "@/components/ui/Button"

import Select from "./ui/Select"
import Table from "./ui/Table"
import TextField from "./ui/TextField"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Ships = () => {
  const { data: session, update, status } = useSession()

  const [shipName, setShipName] = useState("")
  const [shipType, setShipType] = useState(ShipType.GALLEON)

  const handleCreateShip = async (e: FormEvent) => {
    e.preventDefault()

    if (!shipName || !shipType) return

    const shipData = {
      name: shipName,
      type: shipType,
      userId: session?.user?.id,
    }

    await fetch("/api/ship/create", {
      method: "POST",
      body: JSON.stringify(shipData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => update())
  }

  const handleDeleteShip = async (id: string) => {
    if (!id) return

    await fetch(`/api/ship/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => update())
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <>
      {!!session?.user?.ships?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Ships</h3>

          <Table
            headings={["Name", "Type", ""]}
            rows={session?.user?.ships.map((row, idx) => [
              row.name,
              row.type,
              <Button
                key={`ship-remove-${idx}`}
                onClick={() => handleDeleteShip(row.id)}
              >
                Remove
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

        <Button type="submit" className="mt-7">
          Create new ship
        </Button>
      </form>
    </>
  )
}

export default Ships
