import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

export const PLAYER_QUERY_KEY = "player"

export const useGetPlayer = () =>
  useQuery(
    [PLAYER_QUERY_KEY],
    async () => {
      const userId = window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY)

      try {
        const res = await fetch(`/api/user/get/${userId}`)

        if (res.status !== 200) {
          window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
          window.location.href = "/"
          return null
        }

        const data = (await res.json()) as Player
        return data
      } catch (error) {
        console.error(error)
        return null
      }
    },
    {
      enabled:
        typeof window !== "undefined" &&
        !!window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY),
      select: (user) =>
        user
          ? {
              ...user,
              id: window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY),
            }
          : null,
    }
  )

export const usePlayer = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: register, isLoading: registrationIsLoading } = useMutation(
    (userData: CreatePlayerClientRequest) =>
      apiRequest("/api/user/register", userData, "PUT"),
    {
      onSuccess: (userId: string) => {
        window.localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, userId)

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        router.push("/")
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    register,
    registrationIsLoading,
  }
}
