type AttackReport = {
  crewHealthLoss: number
  shipHealthLoss: number
}

type BattleAction = "fire" | "evade"

type BattleRound = {
  action: BattleAction
  hit: boolean
  enemyDamage: number
  playerDamage: number
  shipDamage: number
  crewDamage: number
}

// Battle strength only exists during a battle and is separate from ship health
type BattleState = {
  enemyStrength: number
  playerStrength: number
  // Firebase drops empty arrays, so a fresh battle has no rounds stored
  rounds?: BattleRound[]
  // Set when the battle started because fleeing from an aggressive ship failed
  failedToFlee?: boolean
}

type BattleOutcome = "ongoing" | "victory" | "defeat"

type AttackSuccessReport = AttackReport & {
  crewMoodIncrease: number
  crewMemberRecruits: number
  lootedGold: number
  lootedMerchandise: Record<InventoryItem, number>
  foundTreasure?: Treasure | false
}

type AttackFailureReport = AttackReport & {
  sunkShip: string | false
  lostMerchandise: Partial<Record<keyof Inventory, number>>
}
