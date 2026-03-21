import DefaultLayout from "@/components/layouts/default"
import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import RadialProgressBar from "@/components/RadialProgressBar"
import ShipActions from "@/components/ships/ShipActions"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"
import { getCurrentDate } from "@/utils/date"

export const metadata = {
  title: "Ships",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-8 font-serif text-3xl">Ships</h1>

      {!!Object.values(player.ships || []).length && (
        <div className="flex flex-wrap gap-4">
          {Object.values(player.ships || []).map((ship) => {
            const shipInfo = SHIP_TYPES[ship.type]
            const createdDate = getCurrentDate(ship.createdDay)

            if (!shipInfo) {
              return null
            }

            return (
              <MerchandiseCard
                key={`ships-${ship.id}`}
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
                  <ShipActions
                    shipId={ship.id}
                    shipName={ship.name}
                    shipType={ship.type}
                  />
                }
              />
            )
          })}
        </div>
      )}

      {!Object.values(player.ships || []).length && (
        <p>You do not have any ships currently.</p>
      )}

      <h2 className="mt-8 mb-4 font-serif text-2xl">Ship fittings</h2>

      <div className="stat rounded-lg bg-gray-800 pr-4 shadow-md hover:shadow-lg lg:w-52">
        <div className="stat-figure text-accent">
          <MerchandiseIcon size="lg" item="cannons" />
        </div>
        <div className="stat-title">Cannons</div>
        <div className="stat-value text-2xl">
          {player.inventory?.cannons}{" "}
          <span className="text-sm">
            {player.inventory?.cannons === 1
              ? MERCHANDISE.cannons.singleUnit
              : MERCHANDISE.cannons.unit}
          </span>
        </div>
      </div>
    </DefaultLayout>
  )
}
