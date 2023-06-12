import { GetServerSideProps } from "next"
import { FormEvent } from "react"
import { FiTrash2 } from "react-icons/fi"

import DefaultLayout from "@/components/layouts/default"
import Table from "@/components/ui/Table"
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

  const handleRemoveCrewMember = async (id: string) => {
    if (!id) return

    remove({ crewMemberId: id, playerId: player?.id || "" })
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text-3xl font-serif text mb-8">Crew members</h1>

        {!!Object.values(player?.crewMembers || [])?.length && (
          <>
            <Table
              headings={["Name", "Age", "Gender", "Created", ""]}
              rows={Object.values(player?.crewMembers || []).map(
                (crewMember, idx) => [
                  crewMember.name,
                  crewMember.age,
                  crewMember.gender,
                  `${new Date(
                    crewMember.createdDate
                  ).toLocaleDateString()} ${new Date(
                    crewMember.createdDate
                  ).toLocaleTimeString()}`,
                  <button
                    key={`crew-member-remove-${idx}`}
                    className="btn btn-secondary btn-sm ml-auto flex"
                    onClick={() => handleRemoveCrewMember(crewMember.id)}
                    disabled={removingIsLoading}
                  >
                    <FiTrash2 />
                  </button>,
                ]
              )}
            />
          </>
        )}

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
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
