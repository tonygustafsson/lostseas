import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
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
    <h2 className="mb-4 font-serif text-xl">Apothecary</h2>

    <p className="mb-6">
      These remedies can help restore your crew&apos;s health. They will be used
      immediately upon purchase and will not be part of your inventory.
    </p>

    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {(Object.keys(APOTHECARY_REMEDIES) as Remedy[]).map((remedy) => {
        const { label, description, healthIncrease } =
          APOTHECARY_REMEDIES[remedy]
        const { hasCrew, healed, newHealth, price } = getRemedyResult(
          player.crewMembers,
          remedy
        )

        const disabled =
          !hasCrew || healed <= 0 || price > player.character.gold || !!isBuying

        return (
          <MerchandiseCard
            key={`apothecary-${remedy}`}
            title={label}
            image={`/img/cards/market/${remedy}.png`}
            icon={<MerchandiseIcon item={remedy} />}
            disabled={disabled}
            body={
              <>
                <p>{description}</p>

                <p className="mt-4">
                  This option would increase your crew&apos;s health to{" "}
                  {newHealth}%
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Price: {formatGold(price)}</Badge>

                  <Badge variant="secondary">+{healthIncrease}% health</Badge>
                </div>
              </>
            }
            actions={
              <Button
                size="sm"
                onClick={() => onBuy(remedy)}
                disabled={disabled}
              >
                Buy
              </Button>
            }
          />
        )
      })}
    </div>
  </>
)

export default MarketApothecary
