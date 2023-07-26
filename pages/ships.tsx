import { GetServerSideProps } from "next"
import Head from "next/head"

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
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Ships = () => {
  const { data: player } = useGetPlayer()
  const { remove, isRemoving } = useShips()
  const { setModal } = useModal()

  const openRenameModal = (id: Ship["id"], name: Ship["name"]) => {
    setModal({
      id: "renameship",
      title: "Rename ship",
      content: <RenameShipForm id={id} name={name} />,
    })
  }

  const handleRemoveShip = async (id: Ship["id"]) => {
    if (!id) return

    remove({ shipId: id })
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <>
      <Head>
        <title>Ships - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <h1 className="text-3xl font-serif text mb-8">Ships</h1>

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

                      <div className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col w-fit items-center gap-1">
                          <p className="text-xs font-bold">Health</p>

                          <RadialProgressBar
                            percentage={ship.health}
                            className="w-14 h-14"
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
                        onClick={() => handleRemoveShip(ship.id)}
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

        <h2 className="text-2xl font-serif mt-8 mb-4">Ship fittings</h2>

        <div className="stat shadow-md hover:shadow-lg lg:w-52 bg-gray-800 rounded-lg pr-4">
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Ships
