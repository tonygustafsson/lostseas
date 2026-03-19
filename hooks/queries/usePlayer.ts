import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie, getCookie } from "cookies-next"
import { useEffect } from "react"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

export const PLAYER_QUERY_KEY = "player"

const playerId = getCookie(PLAYER_ID_COOKIE_NAME) as Player["id"] | undefined

export const useGetPlayer = () => {
  const query = useQuery<Player | undefined, Error>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: async () => {
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
    enabled: !!playerId,
  })

  useEffect(() => {
    if (query.data) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      )
    }
  }, [query.data])

  return query
}

export const usePlayer = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (playerId: Player["id"]) =>
      apiRequest("/api/user/login", { playerId }, "POST"),
    onSuccess: (response) => {
      if (response?.status === 200) {
        window.location.href = "/"
      } else {
        return response
      }
    },
    onError: (error) => console.error(error),
  })

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => apiRequest("/api/user/logout", {}, "POST"),
    onSuccess: () => {
      window.location.href = "/"
    },
    onError: (error) => console.error(error),
  })

  const { mutate: register, isPending: registrationIsLoading } = useMutation({
    mutationFn: (userData: CreatePlayerClientRequest) =>
      apiRequest("/api/user/register", userData, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      window.location.href = "/"
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
