"use client"

import { sendSignal } from "@simplewebauthn/browser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

export const PASSKEYS_QUERY_KEY = "passkeys"

export type PasskeySummary = {
  id: string
  deviceType: string
  backedUp: boolean
  createdAt: number
  lastUsedAt?: number
}

type PasskeyList = {
  rpID: string
  userID: string
  passkeys: PasskeySummary[]
}

export const useGetPasskeys = () =>
  useQuery<PasskeyList>({
    queryKey: [PASSKEYS_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/user/passkey/list", {
        cache: "no-store",
        signal,
      })

      return res.json()
    },
  })

export const useRemovePasskey = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: PasskeySummary["id"]) =>
      apiRequest(`/api/user/passkey/${id}`, {}, "DELETE"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PASSKEYS_QUERY_KEY] })

      const list = queryClient.getQueryData<PasskeyList>([PASSKEYS_QUERY_KEY])

      if (!list) return

      // Lets supporting password managers hide the removed passkey. Browsers
      // without the Signal API throw, which is fine to ignore.
      sendSignal({
        signalName: "allAcceptedCredentials",
        rpID: list.rpID,
        userID: list.userID,
        allAcceptedCredentialIDs: list.passkeys.map(({ id }) => id),
      }).catch(() => {})
    },
  })
}
