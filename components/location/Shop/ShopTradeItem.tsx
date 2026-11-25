import MerchandiseCrate, {
  MerchandiseInfo,
} from "@/components/MerchandiseCrate"
import { MERCHANDISE } from "@/constants/merchandise"
import { formatQuantity } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

import { type BuyLimit } from "./ShopBuyLimit"
import ShopQuantityDialog from "./ShopQuantityDialog"
import ShopTradeChange from "./ShopTradeChange"
import ShopTradeControls from "./ShopTradeControls"

type Props = {
  item: keyof Inventory
  owned: number
  target: number
  max: number
  /** The most that fits in the hold. Planning above max is allowed, the summary stops a trade the player can't pay for. */
  storable: number
  limitedBy: BuyLimit
  /** Crew to feed, for food and water only */
  crewMembers?: number
  onChange: (target: number) => void
}

const ShopTradeItem = ({
  item,
  owned,
  target,
  max,
  storable,
  limitedBy,
  crewMembers,
  onChange,
}: Props) => {
  const title = snakeCaseToTitleCase(item)

  return (
    <MerchandiseCrate
      title={title}
      // Shop goods and shipyard equipment, file names all lower case
      image={`/img/cards/${MERCHANDISE[item].availableAt}/${item.toLowerCase()}.png`}
      // What the player will have once the trade goes through
      label={formatQuantity(item, target)}
    >
      <div className="flex items-start justify-between gap-2 text-xs">
        {target !== owned && (
          <ShopTradeChange item={item} owned={owned} target={target} />
        )}

        {/* Gold per unit */}
        <dl className="ml-auto flex gap-3 whitespace-nowrap">
          <div className="flex gap-1">
            <dt className="text-muted-foreground">Buy</dt>
            <dd className="text-gold font-semibold tabular-nums">
              {MERCHANDISE[item].buy}
            </dd>
          </div>

          <div className="flex gap-1">
            <dt className="text-muted-foreground">Sell</dt>
            <dd className="text-gold font-semibold tabular-nums">
              {MERCHANDISE[item].sell}
            </dd>
          </div>
        </dl>
      </div>

      {/* On a narrow card the picker gets its own full row, with Adjust
          and info below it */}
      <div className="mt-auto flex flex-col gap-2 @3xs:flex-row @3xs:items-center @3xs:justify-between">
        <ShopTradeControls
          item={item}
          target={target}
          max={storable}
          onChange={onChange}
          className="w-full @3xs:w-auto"
        />

        <div className="flex items-center gap-1">
          <ShopQuantityDialog
            className="flex-1 @3xs:flex-none"
            item={item}
            owned={owned}
            target={target}
            max={max}
            storable={storable}
            limitedBy={limitedBy}
            crewMembers={crewMembers}
            onChange={onChange}
          />

          <MerchandiseInfo
            title={title}
            description={MERCHANDISE[item].description}
          />
        </div>
      </div>
    </MerchandiseCrate>
  )
}

export default ShopTradeItem
