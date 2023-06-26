import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie, getCookie } from "cookies-next"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

export const PLAYER_QUERY_KEY = "player"

const playerId = getCookie(PLAYER_ID_COOKIE_NAME) as Player["id"] | undefined

export const useGetPlayer = () =>
  useQuery(
    [PLAYER_QUERY_KEY],
    async () => {
      try {
        const res = await fetch("/api/user/get")

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
      enabled: !!playerId,
    }
  )

export const usePlayer = () => {
  const queryClient = useQueryClient()

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
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        window.location.href = "/"
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
