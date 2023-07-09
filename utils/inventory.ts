import { MERCHANDISE } from "@/constants/merchandise"

export const addToInventory = (
  inventory: Inventory,
  newSupplies: Partial<Inventory>
) =>
  Object.keys(MERCHANDISE).reduce((acc, merchandise) => {
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
