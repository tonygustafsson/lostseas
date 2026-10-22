import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"
import { STATISTICS_QUERY_KEY } from "./useStatistics"

export const GOD_MODE_QUERY_KEY = "godMode"

export const useGodMode = (enabled: boolean) => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

  const { data: isUnlocked, isPending: isCheckingAccess } = useQuery({
    queryKey: [GOD_MODE_QUERY_KEY],
    queryFn: async () => {
      const res = await fetch("/api/godmode/status", { cache: "no-store" })

      return res.ok
    },
    enabled,
  })

  const { mutateAsync: unlock, isPending: isUnlocking } = useMutation({
    mutationFn: async (passphrase: string) => {
      const response = await apiRequest(
        "/api/godmode/unlock",
        { passphrase },
        "POST"
      )

      return response?.status === 200
    },
    onSuccess: (unlocked) => {
      if (unlocked) queryClient.setQueryData([GOD_MODE_QUERY_KEY], true)
    },
  })

  const { mutateAsync: save, isPending: isSaving } = useMutation({
    mutationFn: async (player: Player) => {
      const response = await apiRequest("/api/godmode/save", player, "POST")

      if (response?.status !== 200) {
        throw new Error(response?.data?.error ?? "Could not save")
      }

      return response.data.updatedPlayer as Player
    },
    onSuccess: (updatedPlayer) => {
      queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      queryClient.invalidateQueries({ queryKey: [STATISTICS_QUERY_KEY] })
      setToast({ title: "God mode", message: "Saved", variant: "success" })
    },
  })

  return {
    isUnlocked: !!isUnlocked,
    isCheckingAccess: enabled && isCheckingAccess,
    unlock,
    isUnlocking,
    save,
    isSaving,
  }
}
