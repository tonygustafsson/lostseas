"use client"

import { AlertTriangleIcon } from "lucide-react"

import useModal from "@/app/stores/modals"
import { MerchandiseInfo } from "@/components/MerchandiseCrate"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"
import { getShipRemovalCargoWarning } from "@/utils/cargo"
import { formatGold, formatNumber } from "@/utils/number"

import OwnedShip from "./OwnedShip"
import ShipForSale from "./ShipForSale"

const SectionHeading = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => (
  <h2 id={id} className="mb-4 font-serif text-2xl font-semibold">
    {children}
  </h2>
)

// What a ship type is good for, shown behind the info button on your own ships
const ShipTypeInfo = ({ type }: { type: ShipType }) => {
  const { description, cargoCapacity, minCrewMembers, maxCrewMembers } =
    SHIP_TYPES[type]

  return (
    <div className="flex flex-col gap-2">
      <p className="font-serif text-lg font-semibold">{type}</p>
      <p>{description}</p>
      <p className="text-muted-foreground text-sm">
        Cargo {formatNumber(cargoCapacity)}, crew {minCrewMembers}–
        {maxCrewMembers}
      </p>
    </div>
  )
}

/** Repair, buy and sell ships. Damaged ships come first so they're not missed. */
const ShipyardShips = () => {
  const { data: player } = useGetPlayer()
  const { buyShip, isBuyingShip, sellShip, repairShip } = useShipyard()
  const { setModal, removeModal } = useModal()

  if (!player) {
    return null
  }

  // Selling can't be undone, so the player confirms it first
  const confirmSell = (ship: Ship) => {
    const warning = getShipRemovalCargoWarning(player, ship.id)

    setModal({
      id: "sellShip",
      title: `Sell ${ship.name}?`,
      content: (
        <div className="flex flex-col gap-4">
          <p>
            The shipyard pays {formatGold(SHIP_TYPES[ship.type].sell)} for your{" "}
            {ship.type.toLowerCase()} {ship.name}. Once sold, she&apos;s gone
            for good.
          </p>

          {warning && <p className="text-error text-sm">{warning}</p>}

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                sellShip({ id: ship.id })
                removeModal("sellShip")
              }}
            >
              Yes, sell ship
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => removeModal("sellShip")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  const gold = player.character.gold
  const ships = Object.values(player.ships ?? {})
  const damagedShips = ships.filter(({ health }) => health < 100)
  const titleInfo = TITLE_INFO[player.character.title]
  const maxShipsReached = ships.length >= titleInfo.maxShips

  return (
    <div className="flex flex-col gap-12">
      {damagedShips.length > 0 && (
        <section aria-labelledby="shipyard-repair-heading">
          <SectionHeading id="shipyard-repair-heading">
            Ships needing repair
          </SectionHeading>

          <ul className="grid gap-4 lg:grid-cols-2">
            {damagedShips.map((ship) => {
              const repairCost = (100 - ship.health) * SHIP_REPAIR_COST

              return (
                <OwnedShip
                  key={ship.id}
                  ship={ship}
                  note={repairCost > gold ? "You cannot afford this" : null}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => repairShip({ id: ship.id })}
                    disabled={repairCost > gold}
                  >
                    Repair for {formatGold(repairCost)}
                  </Button>
                </OwnedShip>
              )
            })}
          </ul>
        </section>
      )}

      <section aria-labelledby="shipyard-buy-heading">
        <SectionHeading id="shipyard-buy-heading">
          Ships for sale
        </SectionHeading>

        {maxShipsReached && (
          <Alert className="mb-6">
            <AlertTriangleIcon />
            <AlertTitle>Max ships reached</AlertTitle>
            <AlertDescription>
              You can only have {titleInfo.maxShips} ships as long as you have
              the title {titleInfo.title}.
            </AlertDescription>
          </Alert>
        )}

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(Object.keys(SHIP_TYPES) as ShipType[]).map((type) => (
            <ShipForSale
              key={type}
              type={type}
              problem={
                maxShipsReached
                  ? "Your fleet is full"
                  : SHIP_TYPES[type].buy > gold
                    ? "You cannot afford this"
                    : null
              }
              isBuying={isBuyingShip}
              onBuy={() => buyShip({ item: type })}
            />
          ))}
        </ul>
      </section>

      <section aria-labelledby="shipyard-fleet-heading">
        <SectionHeading id="shipyard-fleet-heading">Your fleet</SectionHeading>

        {ships.length === 0 ? (
          <p className="text-muted-foreground">
            You do not own any ships currently.
          </p>
        ) : (
          <ul className="grid gap-4 lg:grid-cols-2">
            {ships.map((ship) => (
              <OwnedShip
                key={ship.id}
                ship={ship}
                info={
                  <MerchandiseInfo
                    title={ship.type}
                    description={<ShipTypeInfo type={ship.type} />}
                  />
                }
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => confirmSell(ship)}
                >
                  Sell for {formatGold(SHIP_TYPES[ship.type].sell)}
                </Button>
              </OwnedShip>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default ShipyardShips
