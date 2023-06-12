type LocationState = {
  market?: {
    visited: true | undefined
    items: LocationStateMarketItems
  }
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
