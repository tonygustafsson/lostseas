"use client"
import { FlaskConical, MessageCircle, Store } from "lucide-react"
import { useState } from "react"

import LocationNavigation from "@/components/LocationNavigation"
import TownNpc, { getFirstName, useTownNpcTalk } from "@/components/npc/TownNpc"
import { useMarket } from "@/hooks/queries/useMarket"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getCargo } from "@/utils/cargo"

import MarketApothecary from "./MarketApothecary"
import MarketOffer from "./MarketOffer"

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
      <LocationNavigation
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
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(
            Object.entries(items || {}) as [
              keyof LocationStateMarketItems,
              { price: number; quantity: number },
            ][]
          ).map(([item, { price, quantity }]) => (
            <MarketOffer
              key={item}
              item={item}
              price={price}
              quantity={quantity}
              owned={player?.inventory?.[item] ?? 0}
              gold={player?.character.gold ?? 0}
              cargoFree={player ? getCargo(player).free : 0}
              onBuy={() => handleAccept(item)}
            />
          ))}
        </ul>
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
