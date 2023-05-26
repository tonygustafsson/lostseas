import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo } from "react"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"

const PLAYER_QUERY_KEY = "player"

const fetchPlayer = async () => {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY)

  try {
    const res = await fetch(`/api/user/get/${userId}`)

    if (res.status !== 200) {
      window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
      window.location.href = "/"
      return null
    }

    const data = (await res.json()) as Player
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const handleRegisterUser = async (userData: CreatePlayerClientRequest) => {
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

const handleTravel = async (input: { userId: Player["id"]; town: Town }) => {
  const data = await fetch("/api/character/travel", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const result = await data.json()

  return result
}

const handleCreateShip = async (
  shipData: CreateShipClientRequest & { userId: Player["id"] }
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
  userId: Player["id"]
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

const handleCreateCrewMember = async (
  crewData: CreateCrewMemberClientRequest
) => {
  const data = await fetch("/api/crewMembers/create", {
    method: "PUT",
    body: JSON.stringify(crewData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const crewMemberId = await data.json()

  return crewMemberId
}

const handleRemoveCrewMember = async ({
  userId,
  crewMemberId,
}: {
  crewMemberId: CrewMember["id"]
  userId: Player["id"]
}) => {
  const url = `/api/crewMembers/remove/${userId}/${crewMemberId}`

  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const response = await data.json()

  return response
}

const handleChangeSettings = async (userData: UpdatePlayerClientRequest) => {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY)

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

export const useGetPlayer = () =>
  useQuery([PLAYER_QUERY_KEY], fetchPlayer, {
    enabled:
      typeof window !== "undefined" &&
      !!window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY),
    select: (user) =>
      user
        ? {
            ...user,
            id: window.localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY),
          }
        : null,
  })

export const usePlayerMutations = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: register, isLoading: registrationIsLoading } = useMutation(
    (userData: CreatePlayerClientRequest) => handleRegisterUser(userData),
    {
      onSuccess: (userId: string) => {
        window.localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, userId)

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        router.push("/")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: changeSettings, isLoading: changeSettingsIsLoading } =
    useMutation(
      (userData: UpdatePlayerClientRequest) => handleChangeSettings(userData),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
          router.push("/")
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: travel, isLoading: travelIsLoading } = useMutation(
    (data: { userId: Player["id"]; town: Town }) => handleTravel(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: createShip, isLoading: creatingShipIsLoading } = useMutation(
    (shipData: CreateShipClientRequest & { userId: Player["id"] }) =>
      handleCreateShip(shipData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: removeShip, isLoading: removingShipIsLoading } = useMutation(
    ({ userId, shipId }: { shipId: Ship["id"]; userId: Player["id"] }) =>
      handleRemoveShip({ userId, shipId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: createCrewMember, isLoading: creatingCrewMemberIsLoading } =
    useMutation(
      (crewData: CreateCrewMemberClientRequest) =>
        handleCreateCrewMember(crewData),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: removeCrewMember, isLoading: removingCrewMemberIsLoading } =
    useMutation(
      ({
        userId,
        crewMemberId,
      }: {
        crewMemberId: CrewMember["id"]
        userId: Player["id"]
      }) => handleRemoveCrewMember({ userId, crewMemberId }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        },
        onError: (error) => console.error(error),
      }
    )

  const isLoading = useMemo(
    () =>
      registrationIsLoading ||
      changeSettingsIsLoading ||
      creatingShipIsLoading ||
      removingShipIsLoading ||
      creatingCrewMemberIsLoading ||
      removingCrewMemberIsLoading ||
      travelIsLoading,
    [
      registrationIsLoading,
      changeSettingsIsLoading,
      creatingShipIsLoading,
      removingShipIsLoading,
      creatingCrewMemberIsLoading,
      removingCrewMemberIsLoading,
      travelIsLoading,
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
    createCrewMember,
    creatingCrewMemberIsLoading,
    removeCrewMember,
    removingCrewMemberIsLoading,
    travel,
    travelIsLoading,
    isLoading,
  }
}
