import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/router"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

export const PLAYER_QUERY_KEY = "player"

const playerCookieValue = getCookie(PLAYER_ID_COOKIE_NAME)

export const useGetPlayer = () =>
  useQuery(
    [PLAYER_QUERY_KEY],
    async () => {
      const playerId = getCookie(PLAYER_ID_COOKIE_NAME)

      try {
        const res = await fetch(`/api/user/get/${playerId}`)

        if (res.status !== 200) {
          deleteCookie(PLAYER_ID_COOKIE_NAME)
          window.location.href = "/"
          return
        }

        const data = (await res.json()) as Player
        return data
      } catch (error) {
        console.error(error)
      }
    },
    {
      enabled: !!playerCookieValue,
      select: (user) =>
        user
          ? {
              ...user,
              id: playerCookieValue as Player["id"],
            }
          : undefined,
    }
  )

export const usePlayer = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: login, isLoading: isLoggingIn } = useMutation(
    (playerId: Player["id"]) =>
      apiRequest("/api/user/login", { playerId }, "POST"),
    {
      onSuccess: () => {
        window.location.href = "/"
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: logout, isLoading: isLoggingOut } = useMutation(
    () => apiRequest("/api/user/logout", {}, "POST"),
    {
      onSuccess: () => {
        window.location.href = "/"
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: register, isLoading: registrationIsLoading } = useMutation(
    (userData: CreatePlayerClientRequest) =>
      apiRequest("/api/user/register", userData, "PUT"),
    {
      onSuccess: (playerId: string) => {
        setCookie(PLAYER_ID_COOKIE_NAME, playerId)

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        router.push("/")
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    login,
    isLoggingIn,
    logout,
    isLoggingOut,
    register,
    registrationIsLoading,
  }
}
