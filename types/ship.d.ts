type Ship = {
  id: string
  name: string
  type: "Brig" | "Merchantman" | "Galleon" | "Frigate"
  createdDate: number
}

type CreateShipClientRequest = Omit<Ship, "id" | "name" | "createdDate">
type CreateShipServerRequest = Ship
