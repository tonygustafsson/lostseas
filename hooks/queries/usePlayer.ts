"use client"

import {
  sendSignal,
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCookie, getCookie } from "cookies-next/client"
import { useRouter } from "next/navigation"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"

import { PASSKEYS_QUERY_KEY } from "./usePasskeys"

export const PLAYER_QUERY_KEY = "player"

export const useGetPlayer = () => {
  const router = useRouter()
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME) as Player["id"] | undefined

  const query = useQuery<Player | undefined, Error>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch("/api/user/get", {
          cache: "no-store",
          signal,
        })

        if (res.status !== 200) {
          deleteCookie(PLAYER_ID_COOKIE_NAME)
          router.refresh()
          return
        }

        const data = (await res.json()) as Player
        return data
      } catch (error) {
        if (!signal.aborted) console.error(error)
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

  const { mutateAsync: loginWithPasskey, isPending: isLoggingInWithPasskey } =
    useMutation({
      mutationFn: async () => {
        const options = await apiRequest(
          "/api/user/passkey/login-options",
          {},
          "POST"
        )

        if (options?.status !== 200) return options

        const response = await startAuthentication({
          optionsJSON: options?.data,
        })

        const result = await apiRequest(
          "/api/user/passkey/login-verify",
          response,
          "POST"
        )

        // The passkey was removed on the server, so ask the password manager
        // to stop offering it. Unsupported browsers throw, which is ignored.
        if (result?.data?.credentialID) {
          sendSignal({
            signalName: "unknownCredential",
            rpID: result.data.rpID,
            credentialID: result.data.credentialID,
          }).catch(() => {})
        }

        return result
      },
    })

  const { mutateAsync: addPasskey, isPending: isAddingPasskey } = useMutation({
    mutationFn: async () => {
      const options = await apiRequest(
        "/api/user/passkey/register-options",
        {},
        "POST"
      )

      if (options?.status !== 200) return options

      const response = await startRegistration({ optionsJSON: options?.data })

      return apiRequest("/api/user/passkey/register-verify", response, "POST")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PASSKEYS_QUERY_KEY] })
    },
  })

  const { mutateAsync: resetGame, isPending: isResettingGame } = useMutation({
    mutationFn: () => apiRequest("/api/user/reset", {}, "POST"),
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
    loginWithPasskey,
    isLoggingInWithPasskey,
    addPasskey,
    isAddingPasskey,
    resetGame,
    isResettingGame,
    logout,
    isLoggingOut,
    register,
    registrationIsLoading,
  }
}
