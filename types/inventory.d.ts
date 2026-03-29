type Inventory = {
  food?: number
  water?: number
  porcelain?: number
  spices?: number
  medicine?: number
  tobacco?: number
  rum?: number
  cannons?: number
}

type InventoryDB = Partial<{
  "inventory/food"?: number
  "inventory/water"?: number
  "inventory/porcelain"?: number
  "inventory/spices"?: number
  "inventory/medicine"?: number
  "inventory/tobacco"?: number
  "inventory/rum"?: number
  "inventory/cannons"?: number
}>
