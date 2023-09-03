export const validateShipCrewRequirements = (ships: Record<string, Ship>) => {
  let minCrew = 0
  let maxCrew = 0

  Object.values(ships).forEach((ship) => {
    switch (ship.type) {
      case "Brig":
        minCrew += 2
        maxCrew += 20
        break
      case "Merchantman":
        minCrew += 1
        maxCrew += 10
        break
      case "Galleon":
        minCrew += 4
        maxCrew += 50
        break
      case "Frigate":
        minCrew += 8
        maxCrew += 100
        break
    }
  })

  return {
    minCrew,
    maxCrew,
  }
}
