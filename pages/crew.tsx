import { GetServerSideProps } from "next"
import { FormEvent } from "react"
import { GiCoins } from "react-icons/gi"

import DefaultLayout from "@/components/layouts/default"
import TextField from "@/components/ui/TextField"
import { useCrewMembers } from "@/hooks/queries/useCrewMembers"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Crew = () => {
  const { data: player } = useGetPlayer()
  const { create, creatingIsLoading, remove, removingIsLoading } =
    useCrewMembers()

  const handleCreateCrewMember = async (e: FormEvent) => {
    e.preventDefault()

    create(player?.id || "")
  }

  const handleRemoveCrewMember = async (e: FormEvent) => {
    e.preventDefault()

    remove(player?.id || "")
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text-3xl font-serif text mb-8">Crew members</h1>

        <div className="stats bg-transparent gap-2 mt-4">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Count</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.count}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Health</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.health}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Mood</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.mood}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCreateCrewMember}
          className="flex items-bottom gap-3"
        >
          <TextField
            type="hidden"
            name="playerId"
            id="playerId"
            value={player?.id || ""}
          />

          <button
            type="submit"
            className="btn btn-primary mt-7"
            disabled={creatingIsLoading}
          >
            Create new crew member
          </button>
        </form>
        <form
          onSubmit={handleRemoveCrewMember}
          className="flex items-bottom gap-3"
        >
          <TextField
            type="hidden"
            name="playerId"
            id="playerId"
            value={player?.id || ""}
          />

          <button
            type="submit"
            className="btn btn-primary mt-7"
            disabled={removingIsLoading}
          >
            Remove a crew member
          </button>
        </form>
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
