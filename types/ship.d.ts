type Ship = {
  id: string
  name: string
  type: "Brig" | "Merchantman" | "Galleon" | "Frigate"
  health: number
  createdDay: Character["day"]
}

type CreateShipClientRequest = Omit<
  Ship,
  "id" | "name" | "createdDate" | "health"
>
type CreateShipServerRequest = Ship
