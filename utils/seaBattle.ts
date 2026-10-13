import { decreaseCrewHealth } from "./crew"
import { getRandomInt } from "./random"
import { reduceShipsHealth } from "./ship"
import { calculateAttackSuccess } from "./shipMeeting"

export const BATTLE_MAX_ROUNDS = 5
export const BATTLE_STRENGTH = 100
export const EVADE_CHANCE = 50

export const startBattle = (): BattleState => ({
  enemyStrength: BATTLE_STRENGTH,
  playerStrength: BATTLE_STRENGTH,
  rounds: [],
})

export const getBattleRounds = (battle: BattleState) => battle.rounds ?? []

export const getBattleLosses = (battle: BattleState) =>
  getBattleRounds(battle).reduce(
    (losses, round) => ({
      shipHealthLoss: losses.shipHealthLoss + round.shipDamage,
      crewHealthLoss: losses.crewHealthLoss + round.crewDamage,
    }),
    { shipHealthLoss: 0, crewHealthLoss: 0 }
  )

// A lost move costs battle strength and a little ship and crew health.
// Evading halves all of it.
const getPlayerDamage = (action: BattleAction, hit: boolean) => {
  if (hit) return { playerDamage: 0, shipDamage: 0, crewDamage: 0 }

  return action === "fire"
    ? {
        playerDamage: getRandomInt(10, 25),
        shipDamage: getRandomInt(3, 8),
        crewDamage: getRandomInt(2, 6),
      }
    : {
        playerDamage: getRandomInt(5, 12),
        shipDamage: getRandomInt(1, 4),
        crewDamage: getRandomInt(1, 3),
      }
}

const getOutcome = (
  enemyStrength: number,
  playerStrength: number,
  round: number
): BattleOutcome => {
  if (enemyStrength <= 0) return "victory"
  if (playerStrength <= 0) return "defeat"
  if (round < BATTLE_MAX_ROUNDS) return "ongoing"

  return playerStrength > enemyStrength ? "victory" : "defeat"
}

export const resolveBattleRound = (
  battle: BattleState,
  action: BattleAction,
  player: Pick<Player, "crewMembers" | "inventory" | "ships">,
  opponentCannons: number
) => {
  // Firing depends on firepower, evading is pure chance
  const hit =
    action === "fire"
      ? calculateAttackSuccess(
          player.crewMembers.count,
          player.inventory?.cannons,
          opponentCannons
        )
      : getRandomInt(1, 100) <= EVADE_CHANCE

  const enemyDamage = action === "fire" && hit ? getRandomInt(30, 50) : 0
  const { playerDamage, shipDamage, crewDamage } = getPlayerDamage(action, hit)

  const ships = shipDamage
    ? reduceShipsHealth(player.ships, shipDamage)
    : player.ships
  const crewHealth = decreaseCrewHealth(player.crewMembers.health, crewDamage)
  const enemyStrength = Math.max(0, battle.enemyStrength - enemyDamage)
  const playerStrength = Math.max(0, battle.playerStrength - playerDamage)
  const rounds = [
    ...getBattleRounds(battle),
    { action, hit, enemyDamage, playerDamage, shipDamage, crewDamage },
  ]

  return {
    battle: { enemyStrength, playerStrength, rounds },
    ships,
    crewHealth,
    outcome: getOutcome(enemyStrength, playerStrength, rounds.length),
  }
}
