import { FormEvent } from "react"

import { useCrewMembers } from "@/hooks/queries/useCrewMembers"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Table from "./ui/Table"
import TextField from "./ui/TextField"

const CrewMembers = () => {
  const { data: player } = useGetPlayer()
  const { create, creatingIsLoading, remove, removingIsLoading } =
    useCrewMembers()

  const handleCreateCrewMember = async (e: FormEvent) => {
    e.preventDefault()

    const crewData: CreateCrewMemberClientRequest = {
      userId: player?.id || "",
    }

    create(crewData)
  }

  const handleRemoveCrewMember = async (id: string) => {
    if (!id) return

    remove({ crewMemberId: id, userId: player?.id || "" })
  }

  return (
    <>
      {!!Object.values(player?.crewMembers || [])?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Crew members</h3>

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
                  Delete
                </button>,
              ]
            )}
          />
        </>
      )}

      <form
        onSubmit={handleCreateCrewMember}
        className="mt-8 flex items-bottom gap-3"
      >
        <TextField
          type="hidden"
          name="userId"
          id="userId"
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
  )
}

export default CrewMembers
