import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"

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

export const usePlayerMutations = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: register, isLoading: registrationIsLoading } = useMutation(
    async (userData: CreatePlayerClientRequest) => {
      const data = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const userId = await data.json()

      return userId
    },
    {
      onSuccess: (userId: string) => {
        window.localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, userId)

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        router.push("/")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: changeSettings, isLoading: changeSettingsIsLoading } =
    useMutation(
      async (userData: UpdatePlayerClientRequest) => {
        const userId = window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY)

        const data = await fetch("/api/user/settings", {
          method: "POST",
          body: JSON.stringify({ userId, ...userData }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (data.status !== 200) {
          throw new Error("User not found")
        }

        const json = await data.json()

        return json
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
          router.push("/")
        },
        onError: (error) => console.error(error),
      }
    )

  return {
    register,
    registrationIsLoading,
    changeSettings,
    changeSettingsIsLoading,
  }
}
