type AttackReport = {
  crewHealthLoss: number
  shipHealthLoss: number
}

type AttackSuccessReport = AttackReport & {
  crewMoodIncrease: number
  crewMemberRecruits: number
  lootedGold: number
  lootedMerchandise: Record<InventoryItem, number>
  foundTreasure?: Treasure
}

type AttackFailureReport = AttackReport & {
  sunkShip: string | false
  inventoryPercentageLoss: number
}
