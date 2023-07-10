type AttackReport = {
  crewHealthLoss: number
  shipHealthLoss: number
}

type AttackSuccessReport = AttackReport & {
  crewMoodIncrease: number
  crewMemberRecruits: number
  lootedGold: number
  lootedMerchandise: Record<InventoryItem, number>
}

type AttackFailureReport = AttackReport & {
  sinkShip: boolean
  randomShipId: Ship["id"]
  inventoryPercentageLoss: number
}
