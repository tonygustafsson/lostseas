import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrewMembersMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: createCrewMember, isLoading: creatingCrewMemberIsLoading } =
    useMutation(
      (crewData: CreateCrewMemberClientRequest) =>
        apiRequest("/api/crewMembers/create", crewData, "PUT"),
      {
        onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
        onError: (error) => console.error(error),
      }
    )

  const { mutate: removeCrewMember, isLoading: removingCrewMemberIsLoading } =
    useMutation(
      ({
        userId,
        crewMemberId,
      }: {
        crewMemberId: CrewMember["id"]
        userId: Player["id"]
      }) =>
        apiRequest(
          `/api/crewMembers/remove/${userId}/${crewMemberId}`,
          { userId, crewMemberId },
          "DELETE"
        ),
      {
        onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
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
