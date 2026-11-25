import MerchandiseCrate from "@/components/MerchandiseCrate"
import { Button } from "@/components/ui/button"
import { APOTHECARY_REMEDIES, type Remedy } from "@/constants/apothecary"
import { getRemedyResult } from "@/utils/apothecary"
import { formatGold } from "@/utils/number"

type Props = {
  player: Player
  onBuy: (remedy: Remedy) => void
  isBuying?: boolean
}

const MarketApothecary = ({ player, onBuy, isBuying }: Props) => (
  <>
    <p className="mb-6">
      These remedies can help restore your crew&apos;s health. They will be used
      immediately upon purchase and will not be part of your inventory.
    </p>

    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {(Object.keys(APOTHECARY_REMEDIES) as Remedy[]).map((remedy) => {
        const { label, description, healthIncrease } =
          APOTHECARY_REMEDIES[remedy]
        const { hasCrew, healed, newHealth, price } = getRemedyResult(
          player.crewMembers,
          remedy
        )

        // Why the remedy can't be bought, shown above the button
        const problem = !hasCrew
          ? "You have no crew to heal"
          : healed <= 0
            ? "Your crew is already healthy"
            : price > player.character.gold
              ? "You cannot afford this"
              : null

        return (
          <MerchandiseCrate
            key={remedy}
            title={label}
            image={`/img/cards/market/${remedy}.png`}
            label={`+${healthIncrease}% health`}
          >
            <p className="text-sm">{description}</p>

            {hasCrew && healed > 0 && (
              <p className="text-muted-foreground text-xs">
                Your crew&apos;s health goes up to {newHealth}%
              </p>
            )}

            <div className="mt-auto flex flex-col gap-2">
              {problem && <p className="text-error text-xs">{problem}</p>}

              <Button
                size="sm"
                variant="secondary"
                onClick={() => onBuy(remedy)}
                disabled={!!problem || !!isBuying}
              >
                Buy for {formatGold(price)}
              </Button>
            </div>
          </MerchandiseCrate>
        )
      })}
    </ul>
  </>
)

export default MarketApothecary
