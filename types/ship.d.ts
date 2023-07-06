type ShipType = "Brig" | "Merchantman" | "Galleon" | "Frigate"

type Ship = {
  id: string
  name: string
  type: ShipType
  health: number
  createdDay: Character["day"]
}

type CreateShipClientRequest = Omit<
  Ship,
  "id" | "name" | "createdDate" | "health"
>
type CreateShipServerRequest = Ship
