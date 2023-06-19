type LocationState = {
  market?: {
    visited: true | undefined
    items: LocationStateMarketItems
  }
  tavern?: {
    visited: true | undefined
    noOfSailors: number
    isHostile: boolean
  }
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
