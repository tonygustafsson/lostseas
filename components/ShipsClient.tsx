"use client"

import DefaultLayout from "@/components/layouts/default"
import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import RadialProgressBar from "@/components/RadialProgressBar"
import RenameShipForm from "@/components/RenameShipForm"
import { useModal } from "@/components/ui/Modal/context"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShips } from "@/hooks/queries/useShips"
import { getCurrentDate } from "@/utils/date"

const ShipsClient = () => {
  const { data: player } = useGetPlayer()
  const { remove, isRemoving } = useShips()
  const { setModal, removeModal } = useModal()

  const openRenameModal = (id: Ship["id"], name: Ship["name"]) => {
    setModal({
      id: "renameShip",
      title: "Rename ship",
      content: <RenameShipForm id={id} name={name} />,
    })
  }

  const openRemoveShipModal = (id: Ship["id"]) => {
    setModal({
      id: "removeShip",
      title: `Are you sure?`,
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Do you really want to remove your{" "}
            {player?.ships[id].type.toLowerCase()} {player?.ships[id].name}?
          </p>

          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleRemoveShip(id)}
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

  const handleRemoveShip = async (id: Ship["id"]) => {
    if (!id) return

    remove({ shipId: id })
    removeModal("removeShip")
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-8 font-serif text-3xl">Ships</h1>

      {!!Object.values(player?.ships || [])?.length && (
        <div className="flex flex-wrap gap-4">
          {Object.values(player?.ships || []).map((ship) => {
            const shipInfo = SHIP_TYPES[ship.type]
            const createdDate = getCurrentDate(ship.createdDay)

            if (!shipInfo) return null

            return (
              <MerchandiseCard
                key={`ships-${ship.name}`}
                title={`${ship.name} (${ship.type})`}
                icon={<MerchandiseIcon item={ship.type} />}
                body={
                  <>
                    <p>{shipInfo.description}</p>

                    <div className="mt-2 flex flex-col gap-4">
                      <div className="flex w-fit flex-col items-center gap-1">
                        <p className="text-xs font-bold">Health</p>

                        <RadialProgressBar
                          percentage={ship.health}
                          className="h-14 w-14"
                        />
                      </div>

                      <div className="badge badge-secondary">
                        Created: {createdDate}
                      </div>
                    </div>
                  </>
                }
                actions={
                  <div className="flex gap-2">
                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={() => openRemoveShipModal(ship.id)}
                      disabled={isRemoving}
                    >
                      Remove
                    </button>

                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={() => openRenameModal(ship.id, ship.name)}
                    >
                      Rename
                    </button>
                  </div>
                }
              />
            )
          })}
        </div>
      )}

      {!Object.values(player?.ships || [])?.length && (
        <p>You do not have any ships currently.</p>
      )}

      <h2 className="mb-4 mt-8 font-serif text-2xl">Ship fittings</h2>

      <div className="stat rounded-lg bg-gray-800 pr-4 shadow-md hover:shadow-lg lg:w-52">
        <div className="stat-figure text-secondary">
          <MerchandiseIcon size="lg" item="cannons" />
        </div>
        <div className="stat-title">Cannons</div>
        <div className="stat-value text-2xl">
          {player?.inventory?.cannons}{" "}
          <span className="text-sm">
            {player?.inventory?.cannons === 1
              ? MERCHANDISE["cannons"].singleUnit
              : MERCHANDISE["cannons"].unit}
          </span>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default ShipsClient
