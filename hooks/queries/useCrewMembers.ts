import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrewMembers = () => {
  const queryClient = useQueryClient()

  const { mutate: create, isLoading: creatingIsLoading } = useMutation(
    (crewData: CreateCrewMemberClientRequest) =>
      apiRequest("/api/crewMembers/create", crewData, "PUT"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: remove, isLoading: removingIsLoading } = useMutation(
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
    create,
    creatingIsLoading,
    remove,
    removingIsLoading,
  }
}
