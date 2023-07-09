type AttackReport = {
  won: boolean
  crewHealthLoss: number
  newCrewHealth: number
  shipHealthLoss: number
}

type AttackSuccessReport = AttackReport & {
  crewMoodIncrease: number
  newCrewMood: number
  crewMemberRecruits: number
  lootedGold: number
  lootedMerchandise: Record<InventoryItem, number>
}

type AttackFailureReport = AttackReport & {
  sinkShip: boolean
  randomShipId: Ship["id"]
  newGold: number
  inventoryPercentageLoss: number
}
