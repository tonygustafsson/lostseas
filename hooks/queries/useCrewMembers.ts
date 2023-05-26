import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrewMembersMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: createCrewMember, isLoading: creatingCrewMemberIsLoading } =
    useMutation(
      async (crewData: CreateCrewMemberClientRequest) => {
        const data = await fetch("/api/crewMembers/create", {
          method: "PUT",
          body: JSON.stringify(crewData),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const crewMemberId = await data.json()

        return crewMemberId
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: removeCrewMember, isLoading: removingCrewMemberIsLoading } =
    useMutation(
      async ({
        userId,
        crewMemberId,
      }: {
        crewMemberId: CrewMember["id"]
        userId: Player["id"]
      }) => {
        const url = `/api/crewMembers/remove/${userId}/${crewMemberId}`

        const data = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const response = await data.json()

        return response
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        },
        onError: (error) => console.error(error),
      }
    )

  return {
    createCrewMember,
    creatingCrewMemberIsLoading,
    removeCrewMember,
    removingCrewMemberIsLoading,
  }
}
