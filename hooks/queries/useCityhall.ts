import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { TOWNS } from "@/constants/locations"
import { TREASURES } from "@/constants/treasures"
import apiRequest from "@/utils/apiRequest"
import { dbPatchToObj } from "@/utils/dbUpdateToObj"
import { getNewTitle } from "@/utils/title"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCityhall = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const setToast = useToasts((s) => s.setToast)

  const handleError = (
    title: string,
    message: string,
    previousState?: Player
  ) => {
    if (previousState) {
      queryClient.setQueryData([PLAYER_QUERY_KEY], previousState)
    }

    setToast({ title, message, variant: "error" })
  }

  const { mutate: acceptNewTitle, isPending: isAcceptingNewTitle } =
    useMutation({
      mutationFn: () =>
        apiRequest("/api/cityhall/acceptNewTitle", null, "POST"),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const titleInfo = getNewTitle(previous.character).titleInfo

          const playerUpdates = {
            "character/title": titleInfo?.title,
            "character/gold":
              previous.character.gold + (titleInfo?.reward || 0),
          } satisfies PlayerDB

          const newPlayer = dbPatchToObj(previous, playerUpdates)

          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onError: (err, _, context) => {
        handleError(
          `Could not accept new title`,
          err?.message,
          context?.previous
        )
      },
      onSuccess: (response, _, context) => {
        const { error, titleInfo } = response?.data

        if (error) {
          handleError(
            `Could not accept new title ${titleInfo.title}`,
            error,
            context?.previous
          )
          return
        }

        playSoundEffect("fanfare")

        setToast({
          title: `You are now a ${titleInfo.title}`,
          message: `You also got a reward of ${titleInfo.reward} gold.`,
          variant: "success",
        })
      },
    })

  const { mutate: changeCitizenship, isPending: isChangingCitizenship } =
    useMutation({
      mutationFn: () =>
        apiRequest("/api/cityhall/changeCitizenship", null, "POST"),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const { titleInfo } = getNewTitle(previous.character)

          const newNationality = previous.character.town
            ? TOWNS[previous.character.town]?.nation
            : previous.character.nationality

          const playerUpdates = {
            "character/nationality": newNationality,
            "character/title": titleInfo?.title,
            "character/gold":
              previous.character.gold + (titleInfo?.reward || 0),
          } satisfies PlayerDB

          const newPlayer = dbPatchToObj(previous, playerUpdates)
          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onError: (err, _, context) => {
        handleError(
          `Could not change citizenship`,
          (err as any)?.message,
          context?.previous
        )
      },
      onSuccess: (response, _, context) => {
        const { error, titleInfo, newNationality } = response?.data

        if (error) {
          handleError(
            `Could not change citizenship to ${newNationality}`,
            error,
            context?.previous
          )
          return
        }

        playSoundEffect("fanfare")

        setToast({
          title: `You are now a ${titleInfo.title} from ${newNationality}`,
          message: `You also got a reward of ${titleInfo.reward} gold.`,
          variant: "success",
        })
      },
    })

  const { mutate: handOver, isPending: isHandingOver } = useMutation({
    mutationFn: (id: Treasure["id"]) =>
      apiRequest("/api/cityhall/handover", { id }, "POST"),
    onMutate: async (id: Treasure["id"]) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const matchingTreasure = Object.values(previous.treasures || {}).find(
          (treasure: Treasure) => treasure.id === id
        )
        const treasureInfo = TREASURES.find(
          (treasure) => treasure.name === matchingTreasure?.name
        )
        const treasureVal = treasureInfo?.value || 0

        const playerUpdates = {
          "character/gold": previous.character.gold + treasureVal,
          [`treasures/${id}`]: null,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _, context) => {
      handleError(
        `Could not handover treasure`,
        (err as any)?.message,
        context?.previous
      )
    },
    onSuccess: (response, _, context) => {
      const { error, treasure, treasureInfo } = response?.data

      if (error) {
        handleError(
          `Could not handover treasure ${treasure.name}`,
          error,
          context?.previous
        )
        return
      }

      playSoundEffect("coins")

      setToast({
        title: `You handed over the ${treasure.name} to the cityhall`,
        message: `You got a reward of ${treasureInfo.value} gold.`,
        variant: "success",
      })
    },
  })

  return {
    acceptNewTitle,
    isAcceptingNewTitle,
    changeCitizenship,
    isChangingCitizenship,
    handOver,
    isHandingOver,
  }
}
