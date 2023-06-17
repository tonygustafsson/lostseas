import { GetServerSideProps } from "next"
import { FiTrash2 } from "react-icons/fi"

import DefaultLayout from "@/components/layouts/default"
import Table from "@/components/ui/Table"
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
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Ships
