import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

const fetchShips = async (userId: string) => {
  const url = `/api/ship/get?userId=${userId}`
  const data = await fetch(url)
  const json = await data.json()

  return json as Ship[]
}

export const useShips = () => {
  const { data: session } = useSession()

  return useQuery(["ships"], () => fetchShips(session?.user?.id || ""), {
    enabled: !!session?.user?.id,
  })
}

export const useShipsMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: create, isLoading: createIsLoading } = useMutation(
    ({ name, type, userId }: Pick<Ship, "name" | "type" | "userId">) => {
      const url = `/api/ship/create`
      const data = fetch(url, {
        method: "POST",
        body: JSON.stringify({ name, type, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      return data
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["ships"]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: remove, isLoading: removeIsLoading } = useMutation(
    (id: string) => {
      const url = `/api/ship/delete/${id}`
      const data = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      return data
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["ships"]),
      onError: (error) => console.error(error),
    }
  )

  return {
    create,
    createIsLoading,
    remove,
    removeIsLoading,
  }
}
