type LocationState = {
  market?: Record<"items", LocationStateMarketItems>
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
