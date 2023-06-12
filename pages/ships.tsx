import { GetServerSideProps } from "next"
import { FormEvent, useState } from "react"
import { FiTrash2 } from "react-icons/fi"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import Table from "@/components/ui/Table"
import TextField from "@/components/ui/TextField"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShips } from "@/hooks/queries/useShips"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Ships = () => {
  const { data: player } = useGetPlayer()
  const { create, creatingIsLoading, remove, removingIsLoading } = useShips()

  const [shipType, setShipType] = useState(ShipType.FRIGATE)

  const handleCreateShip = async (e: FormEvent) => {
    e.preventDefault()

    const shipData = {
      userId: player?.id || "",
      type: shipType,
    }

    create(shipData)

    setShipType(ShipType.FRIGATE)
  }

  const handleRemoveShip = async (id: string) => {
    if (!id) return

    remove({ shipId: id, userId: player?.id || "" })
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text-3xl font-serif text mb-8">Ships</h1>

        {!!Object.values(player?.ships || [])?.length && (
          <>
            <Table
              headings={["Name", "Type", "Created", ""]}
              rows={Object.values(player?.ships || []).map((ship, idx) => [
                ship.name,
                ship.type,
                `${new Date(ship.createdDate).toLocaleDateString()} ${new Date(
                  ship.createdDate
                ).toLocaleTimeString()}`,
                <button
                  key={`ship-remove-${idx}`}
                  className="btn btn-secondary btn-sm ml-auto flex"
                  onClick={() => handleRemoveShip(ship.id)}
                  disabled={removingIsLoading}
                >
                  <FiTrash2 />
                </button>,
              ])}
            />
          </>
        )}

        <form
          onSubmit={handleCreateShip}
          className="mt-8 flex flex-wrap items-end gap-3"
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

          <button
            type="submit"
            className="btn btn-primary"
            disabled={creatingIsLoading}
          >
            Create new ship
          </button>
        </form>
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Ships
