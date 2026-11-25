import MerchandiseCrate, {
  MerchandiseInfo,
} from "@/components/MerchandiseCrate"
import { Button } from "@/components/ui/button"
import { MERCHANDISE } from "@/constants/merchandise"
import { isCargo } from "@/utils/cargo"
import { formatGold } from "@/utils/number"
import { formatQuantity } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

type Props = {
  item: keyof LocationStateMarketItems
  /** Gold per unit */
  price: number
  quantity: number
  owned: number
  gold: number
  /** Free space in the hold. Cannons and repair kits don't use it. */
  cargoFree: number
  onBuy: () => void
}

/** A trader's one-off bargain: the whole lot at a fixed price. */
const MarketOffer = ({
  item,
  price,
  quantity,
  owned,
  gold,
  cargoFree,
  onBuy,
}: Props) => {
  const title = snakeCaseToTitleCase(item)
  const total = price * quantity
  const discount = Math.round((1 - price / MERCHANDISE[item].buy) * 100)

  // Why the lot can't be bought, shown above the button. The same checks as
  // the server, so the button is never enabled for a refused trade.
  const problem =
    total > gold
      ? "You cannot afford this"
      : isCargo(item) && quantity > cargoFree
        ? "You cannot buy this, there is not enough space in your hold"
        : null

  return (
    <MerchandiseCrate
      title={title}
      // Image files are all lower case, like repairkits.png
      image={`/img/cards/${MERCHANDISE[item].availableAt}/${item.toLowerCase()}.png`}
      label={formatQuantity(item, owned)}
    >
      <div className="flex items-start justify-between gap-2 text-xs">
        {discount > 0 && (
          <p className="text-success font-semibold">{discount}% discount</p>
        )}

        <dl className="ml-auto flex gap-1 whitespace-nowrap">
          <dt className="text-muted-foreground">Each</dt>
          <dd className="text-gold font-semibold tabular-nums">{price}</dd>
        </dl>
      </div>

      <p className="text-sm">
        A trader offers {formatQuantity(item, quantity)} of{" "}
        {title.toLowerCase()}.
      </p>

      <div className="mt-auto flex flex-col gap-2">
        {problem && <p className="text-error text-xs">{problem}</p>}

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={onBuy}
            disabled={!!problem}
          >
            Buy for {formatGold(total)}
          </Button>

          <MerchandiseInfo
            title={title}
            description={MERCHANDISE[item].description}
          />
        </div>
      </div>
    </MerchandiseCrate>
  )
}

export default MarketOffer
