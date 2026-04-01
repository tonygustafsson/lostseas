import "server-only"

const databaseUrl = process.env.FIREBASE_DATABASE_URL

if (!databaseUrl) {
  throw new Error("FIREBASE_DATABASE_URL is not configured")
}

const buildDatabaseUrl = (path: string) => {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "")

  return `${databaseUrl.replace(/\/$/, "")}/${normalizedPath}.json`
}

const readValue = async <T>(path: string) => {
  const response = await fetch(buildDatabaseUrl(path), {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to read Firebase path: ${path}`)
  }

  return (await response.json()) as T
}

const writeValue = async (path: string, value: unknown, method = "PUT") => {
  const response = await fetch(buildDatabaseUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to write Firebase path: ${path}`)
  }

  const updatedPlayer = await getPlayer(path)

  return updatedPlayer
}

export const getPlayer = async (playerId: Player["id"]) =>
  readValue<Player>(playerId)

export const savePlayer = async (newPlayer: Player) =>
  await writeValue(newPlayer.id, newPlayer)

export const getCrewMembers = async (playerId: Player["id"]) =>
  readValue<CrewMembers>(`${playerId}/crewMembers`)

export const getLocationState = async <T>(
  playerId: Player["id"],
  state: keyof LocationStates
) => readValue<T>(`${playerId}/locationStates/${state}`)

export const saveLocationState = async <T>(
  playerId: Player["id"],
  stateKey: keyof LocationStates,
  state: T
) => {
  await writeValue(`${playerId}/locationStates/${stateKey}`, state)
}
