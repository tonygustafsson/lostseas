type Ship = {
  id: string
  name: string
  type: "Frigate" | "Sloop" | "Galleon"
  createdDate: number
}

type CreateShipClientRequest = Omit<Ship, "id" | "createdDate">
type CreateShipServerRequest = Ship
