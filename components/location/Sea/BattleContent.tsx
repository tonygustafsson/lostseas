import { type BarVariant } from "@/components/ui/bar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { BATTLE_MAX_ROUNDS, getBattleRounds } from "@/utils/seaBattle"

type Props = {
  battle: BattleState
}

const getRoundText = (round: BattleRound) => {
  if (round.action === "fire") {
    return round.hit
      ? `Your broadside struck! The enemy lost ${round.enemyDamage}% battle strength.`
      : `Your shots went wide and their broadside hit. You lost ${round.playerDamage}% battle strength, your ships lost ${round.shipDamage}% health and your crew lost ${round.crewDamage}% health.`
  }

  return round.hit
    ? "You slipped away from their broadside unharmed."
    : `Their shots grazed you. You lost ${round.playerDamage}% battle strength, your ships lost ${round.shipDamage}% health and your crew lost ${round.crewDamage}% health.`
}

const getOpeningText = (battle: BattleState) =>
  battle.failedToFlee
    ? "They caught you before you could escape! Fire your cannons or evade their broadside."
    : "Battle stations! Fire your cannons or evade their broadside."

const BattleContent = ({ battle }: Props) => {
  const rounds = getBattleRounds(battle)
  const lastRound = rounds.at(-1)
  const currentRound = Math.min(rounds.length + 1, BATTLE_MAX_ROUNDS)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-serif text-lg">
        Round {currentRound} of {BATTLE_MAX_ROUNDS}
      </p>

      <div className="flex flex-col gap-2">
        <StrengthBar
          label="Enemy battle strength"
          value={battle.enemyStrength}
          variant="error"
        />

        <StrengthBar
          label="Your battle strength"
          value={battle.playerStrength}
          variant="success"
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "rounded-md border px-4 py-2 text-sm",
          !lastRound
            ? battle.failedToFlee
              ? "border-error/40 bg-error/10 text-error"
              : "border-border bg-muted"
            : lastRound.hit
              ? "border-success/40 bg-success/10 text-success"
              : "border-error/40 bg-error/10 text-error"
        )}
      >
        {lastRound ? getRoundText(lastRound) : getOpeningText(battle)}
      </p>
    </div>
  )
}

type StrengthBarProps = {
  label: string
  value: number
  variant: BarVariant
}

const StrengthBar = ({ label, value, variant }: StrengthBarProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-bold tabular-nums">{value}%</span>
    </div>

    <Progress value={value} variant={variant} aria-label={label} />
  </div>
)

export default BattleContent
