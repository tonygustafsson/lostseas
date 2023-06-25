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
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
