import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo } from "react"

const fetchUser = async () => {
  const userId = window.localStorage.getItem("userId")

  try {
    const res = await fetch(`/api/user/get/${userId}`)

    if (res.status !== 200) {
      window.localStorage.removeItem("userId")
      window.location.href = "/"
      return null
    }

    const data = (await res.json()) as User
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const handleRegisterUser = async (userData: CreateUserClientRequest) => {
  const data = await fetch("/api/user/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const userId = await data.json()

  return userId
}

const handleCreateShip = async (
  shipData: CreateShipClientRequest & { userId: User["id"] }
) => {
  const data = await fetch("/api/ship/create", {
    method: "PUT",
    body: JSON.stringify(shipData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const shipId = await data.json()

  return shipId
}

const handleRemoveShip = async ({
  userId,
  shipId,
}: {
  shipId: Ship["id"]
  userId: User["id"]
}) => {
  const url = `/api/ship/remove/${userId}/${shipId}`

  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const response = await data.json()

  return response
}

const handleChangeSettings = async (userData: CreateUserClientRequest) => {
  const userId = window.localStorage.getItem("userId")

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
}

export const useGetUser = () =>
  useQuery(["user"], fetchUser, {
    enabled:
      typeof window !== "undefined" && !!window.localStorage.getItem("userId"),
    select: (user) =>
      user ? { ...user, id: window.localStorage.getItem("userId") } : null,
  })

export const useUserMutations = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: register, isLoading: registrationIsLoading } = useMutation(
    (userData: CreateUserClientRequest) => handleRegisterUser(userData),
    {
      onSuccess: (userId: string) => {
        window.localStorage.setItem("userId", userId)

        queryClient.invalidateQueries(["user"])
        router.push("/")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: changeSettings, isLoading: changeSettingsIsLoading } =
    useMutation(
      (userData: CreateUserClientRequest) => handleChangeSettings(userData),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"])
          router.push("/")
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: createShip, isLoading: creatingShipIsLoading } = useMutation(
    (shipData: CreateShipClientRequest & { userId: User["id"] }) =>
      handleCreateShip(shipData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: removeShip, isLoading: removingShipIsLoading } = useMutation(
    ({ userId, shipId }: { shipId: Ship["id"]; userId: User["id"] }) =>
      handleRemoveShip({ userId, shipId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"])
      },
      onError: (error) => console.error(error),
    }
  )

  const isLoading = useMemo(
    () =>
      registrationIsLoading ||
      changeSettingsIsLoading ||
      creatingShipIsLoading ||
      removingShipIsLoading,
    [
      registrationIsLoading,
      changeSettingsIsLoading,
      creatingShipIsLoading,
      removingShipIsLoading,
    ]
  )

  return {
    register,
    registrationIsLoading,
    changeSettings,
    changeSettingsIsLoading,
    createShip,
    creatingShipIsLoading,
    removeShip,
    removingShipIsLoading,
    isLoading,
  }
}
