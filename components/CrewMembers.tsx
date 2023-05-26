import { FormEvent } from "react"

import Button from "@/components/ui/Button"
import { useGetUser, useUserMutations } from "@/hooks/queries/useUser"

import Table from "./ui/Table"
import TextField from "./ui/TextField"

const CrewMembers = () => {
  const { data: user } = useGetUser()
  const { createCrewMember, removeCrewMember } = useUserMutations()

  const handleCreateCrewMember = async (e: FormEvent) => {
    e.preventDefault()

    const crewData: CreateCrewMemberClientRequest = {
      userId: user?.id || "",
    }

    createCrewMember(crewData)
  }

  const handleRemoveCrewMember = async (id: string) => {
    if (!id) return

    removeCrewMember({ crewMemberId: id, userId: user?.id || "" })
  }

  return (
    <>
      {!!Object.values(user?.crewMembers || [])?.length && (
        <>
          <h3 className="text-xl text mt-8 mb-2">Crew members</h3>

          <Table
            headings={["Name", "Age", "Gender", "Created", ""]}
            rows={Object.values(user?.crewMembers || []).map(
              (crewMember, idx) => [
                crewMember.name,
                crewMember.age,
                crewMember.gender,
                `${new Date(
                  crewMember.createdDate
                ).toLocaleDateString()} ${new Date(
                  crewMember.createdDate
                ).toLocaleTimeString()}`,
                <Button
                  key={`crew-member-remove-${idx}`}
                  size="sm"
                  className="ml-auto flex"
                  onClick={() => handleRemoveCrewMember(crewMember.id)}
                >
                  Delete
                </Button>,
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
          value={user?.id || ""}
        />

        <Button type="submit" size="sm" className="mt-7">
          Create new crew member
        </Button>
      </form>
    </>
  )
}

export default CrewMembers
