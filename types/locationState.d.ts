type LocationState = {
  market?: {
    visited: true | undefined | null
    items: LocationStateMarketItems
  }
  tavern?: {
    visited: true | undefined | null
    noOfSailors: number
    isHostile: boolean
  }
  docks?: {
    leaveErrors: true | undefined | null
  }
  sea?: {
    shipMeeting: {
      nation: Nation | "Pirate"
      shipType: ShipType
      crewMembers: number
      cannons: number
    }
  }
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
