import { MERCHANDISE } from "@/constants/merchandise"

export const addToInventory = (
  inventory: Inventory | undefined,
  newSupplies: Partial<Inventory>
) =>
  Object.keys(MERCHANDISE).reduce((acc, merchandise) => {
    if (!inventory) {
      acc[merchandise as keyof Inventory] =
        newSupplies[merchandise as keyof Inventory] || 0
      return acc
    }

    if (
      !inventory[merchandise as keyof Inventory] &&
      !newSupplies[merchandise as keyof Inventory]
    ) {
      // Avoid adding 0 inventory items
      return acc
    }

    acc[merchandise as keyof Inventory] =
      (inventory[merchandise as keyof Inventory] || 0) +
      (newSupplies[merchandise as keyof Inventory] || 0)

    return acc
  }, {} as Record<keyof Inventory, number>)

export const removeFromAllInventoryItems = (
  inventory: Inventory | undefined,
  percentage: number
) => {
  if (!inventory) {
    return {}
  }

  return Object.keys(inventory).reduce((acc, merchandise) => {
    if (merchandise === "cannons") {
      // Cannons are not affected by this
      acc[merchandise as keyof Inventory] =
        inventory[merchandise as keyof Inventory] || 0
      return acc
    }

    acc[merchandise as keyof Inventory] =
      (inventory[merchandise as keyof Inventory] || 0) * (1 - percentage / 100)

    return acc
  }, {} as Record<keyof Inventory, number>)
}
