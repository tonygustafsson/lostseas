import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import Button from "@/components/ui/Button"

import TextField from "./ui/TextField"
import Select from "./ui/Select"
import Table from "./ui/Table"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Ships = () => {
  const { data: session, update } = useSession()

  const [shipName, setShipName] = useState("")
  const [shipType, setShipType] = useState(ShipType.GALLEON)

  const handleCreateShip = async () => {
    if (!shipName || !shipType) return

    const shipData = {
      name: shipName,
      type: shipType,
      userId: session?.user?.id,
    }

    console.log({ shipData })

    await fetch("/api/ship/create", {
      method: "POST",
      body: JSON.stringify(shipData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    update()
  }

  return (
    <>
      {!!session?.user?.ships?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Ships</h3>

          <Table
            headings={["Name", "Type"]}
            rows={session?.user?.ships.map((row) => [row.name, row.type])}
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
