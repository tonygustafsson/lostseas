"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie, getCookie } from "cookies-next/client"
import { useRouter } from "next/navigation"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

export const PLAYER_QUERY_KEY = "player"

export const useGetPlayer = () => {
  const router = useRouter()
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME) as Player["id"] | undefined

  const query = useQuery<Player | undefined, Error>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/get", {
          cache: "no-store",
        })

        if (res.status !== 200) {
          deleteCookie(PLAYER_ID_COOKIE_NAME)
          router.refresh()
          return
        }

        const data = (await res.json()) as Player
        return data
      } catch (error) {
        console.error(error)
      }
    },
    enabled: !!playerId,
  })

  return query
}

export const usePlayer = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (playerId: Player["id"]) =>
      apiRequest("/api/user/login", { playerId }, "POST"),
    onError: (error) => console.error(error),
  })

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => apiRequest("/api/user/logout", {}, "POST"),
    onError: (error) => console.error(error),
  })

  const { mutateAsync: register, isPending: registrationIsLoading } =
    useMutation({
      mutationFn: (userData: CreatePlayerClientRequest) =>
        apiRequest("/api/user/register", userData, "POST"),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      },
      onError: (error) => console.error(error),
    })

  return {
    login,
    isLoggingIn,
    logout,
    isLoggingOut,
    register,
    registrationIsLoading,
  }
}
