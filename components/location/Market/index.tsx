"use client"
import { FlaskConical, MessageCircle, Store } from "lucide-react"
import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"
import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TownNpc, { getFirstName, useTownNpcTalk } from "@/components/npc/TownNpc"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MERCHANDISE } from "@/constants/merchandise"
import { useMarket } from "@/hooks/queries/useMarket"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { formatGold } from "@/utils/number"
import { capitalize } from "@/utils/string"

import MarketApothecary from "./MarketApothecary"

type MarketTab = "traders" | "apothecary" | "talk"

const Market = () => {
  const { data: player } = useGetPlayer()
  const { acceptMarketBargain, buyRemedy, isBuyingRemedy } = useMarket()
  const npcTalk = useTownNpcTalk("market")
  const { npc, hasQuestBusiness } = npcTalk

  const [tab, setTab] = useState<MarketTab>("traders")

  const items = player?.locationStates?.market?.items
  const hasOffers = Object.keys(items || {}).length > 0

  const handleAccept = (item: keyof LocationStateMarketItems) => {
    acceptMarketBargain({ item })
  }

  return (
    <div className="mb-8">
      <LocationTabs<MarketTab>
        items={[
          { id: "traders", label: "Traders", icon: <Store /> },
          { id: "apothecary", label: "Apothecary", icon: <FlaskConical /> },
          ...(npc
            ? [
                {
                  id: "talk" as const,
                  label: getFirstName(npc),
                  icon: <MessageCircle />,
                  indicator: hasQuestBusiness,
                },
              ]
            : []),
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "traders" && !hasOffers && (
        <p className="text-muted-foreground">
          The traders have packed up for today. Come back on your next visit.
        </p>
      )}

      {tab === "traders" && hasOffers && (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(items || {}).map(([item, { price, quantity }]) => {
            const inventoryItem = item as keyof LocationStateMarketItems
            const canAffortIt =
              price * quantity <= (player?.character.gold || 0)
            const { buy } = MERCHANDISE[inventoryItem]
            const discount = Math.round((1 - price / buy) * 100)

            return (
              <MerchandiseCard
                key={`market-${item}`}
                title={capitalize(item)}
                image={`/img/cards/${MERCHANDISE[inventoryItem].availableAt}/${item}.png`}
                indicator={
                  player?.inventory?.[inventoryItem]?.toString() || "0"
                }
                icon={<MerchandiseIcon item={inventoryItem} />}
                disabled={!canAffortIt}
                body={
                  <>
                    <p>
                      You find <strong>{quantity}</strong>{" "}
                      {quantity === 1
                        ? MERCHANDISE[inventoryItem].singleUnit
                        : MERCHANDISE[inventoryItem].unit}{" "}
                      of {item} for <strong>{formatGold(price)}</strong>.
                    </p>

                    <p>{MERCHANDISE[inventoryItem].description}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">
                        Price: {formatGold(price * quantity)}
                      </Badge>

                      {discount > 0 && (
                        <Badge className="bg-success/10 text-success">
                          {discount}% discount
                        </Badge>
                      )}
                    </div>
                  </>
                }
                actions={
                  <Button
                    size="sm"
                    onClick={() => handleAccept(inventoryItem)}
                    disabled={!canAffortIt}
                  >
                    Buy
                  </Button>
                }
              />
            )
          })}
        </div>
      )}

      {tab === "apothecary" && player && (
        <MarketApothecary
          player={player}
          onBuy={(remedy) => buyRemedy({ remedy })}
          isBuying={isBuyingRemedy}
        />
      )}

      {tab === "talk" && <TownNpc talk={npcTalk} />}
    </div>
  )
}

export default Market
