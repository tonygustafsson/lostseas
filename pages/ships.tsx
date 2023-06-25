import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShips } from "@/hooks/queries/useShips"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Ships = () => {
  const { data: player } = useGetPlayer()
  const { remove, removingIsLoading } = useShips()

  const handleRemoveShip = async (id: string) => {
    if (!id) return

    remove({ shipId: id, playerId: player?.id || "" })
  }

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-8">Ships</h1>

      {!!Object.values(player?.ships || [])?.length && (
        <div className="flex flex-wrap gap-4">
          {Object.values(player?.ships || []).map((ship) => {
            const shipInfo = SHIP_TYPES[ship.type]

            if (!shipInfo) return null

            return (
              <MerchandiseCard
                key={`ships-${ship.name}`}
                title={`${ship.name} (${ship.type})`}
                icon={<MerchandiseIcon item={ship.type} />}
                body={
                  <>
                    <p>{shipInfo.description}</p>

                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(ship.createdDate).toLocaleDateString()}{" "}
                      {new Date(ship.createdDate).toLocaleTimeString()}
                    </p>
                  </>
                }
                actions={
                  <div className="flex gap-2">
                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleRemoveShip(ship.id)}
                      disabled={removingIsLoading}
                    >
                      Remove
                    </button>

                    <button className="btn btn-secondary btn-xs">Rename</button>
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
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Ships
