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

export const savePlayer = async (playerId: Player["id"], updates: PlayerDB) =>
  await writeValue(playerId, updates, "PATCH")

export const getCharacter = async (playerId: Player["id"]) =>
  readValue<Character>(`${playerId}/character`)

export const saveCharacter = async (
  playerId: Player["id"],
  character: Nullable<Character>
) => {
  await writeValue(`${playerId}/character`, character)
}

export const getCrewMembers = async (playerId: Player["id"]) =>
  readValue<CrewMembers>(`${playerId}/crewMembers`)

export const saveCrewMembers = async (
  playerId: Player["id"],
  crewMembers: CrewMembers
) => {
  await writeValue(`${playerId}/crewMembers`, crewMembers)
}

export const getShip = async (playerId: Player["id"], shipId: Ship["id"]) =>
  readValue<Ship>(`${playerId}/ships/${shipId}`)

export const saveShip = async (playerId: Player["id"], ship: Ship) => {
  await writeValue(`${playerId}/ships/${ship["id"]}`, ship)
}

export const removeShip = async (
  playerId: Player["id"],
  shipId: Ship["id"]
) => {
  await writeValue(`${playerId}/ships/${shipId}`, null, "DELETE")
}

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
