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
          className="*:bg-destructive"
        />

        <StrengthBar
          label="Your battle strength"
          value={battle.playerStrength}
          className="*:bg-success"
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "rounded-md border px-4 py-2 text-sm",
          !lastRound
            ? battle.failedToFlee
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-border bg-muted"
            : lastRound.hit
              ? "border-success/40 bg-success/10 text-success"
              : "border-destructive/40 bg-destructive/10 text-destructive"
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
  className: string
}

const StrengthBar = ({ label, value, className }: StrengthBarProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-bold tabular-nums">{value}%</span>
    </div>

    <Progress value={value} aria-label={label} className={className} />
  </div>
)

export default BattleContent
