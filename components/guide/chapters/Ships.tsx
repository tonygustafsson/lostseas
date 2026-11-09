import { MERCHANDISE } from "@/constants/merchandise"
import {
  REPAIR_KIT_HEALTH,
  SHIP_REPAIR_COST,
  SHIP_TYPES,
} from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { formatGold } from "@/utils/number"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Ships = () => (
  <GuideChapter
    id="ships"
    lead="A bigger fleet means a bigger crew, more cannons and more room for loot. It also means more to repair."
    image={{
      src: "/img/location/san-juan/shipyard.png",
      alt: "The shipyard in San Juan",
    }}
  >
    <p>
      The shipyard sells four kinds of ship. Each needs a minimum crew to sail
      and has room for a maximum. Your hold is the cargo space of every ship
      added together.
    </p>

    <Table className="bg-background/60 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Ship</TableHead>
          <TableHead className="text-right">Crew</TableHead>
          <TableHead className="text-right">Cargo</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(SHIP_TYPES).map(([type, ship]) => (
          <TableRow key={type}>
            <TableCell className="min-w-48 whitespace-normal">
              <div className="font-medium">{type}</div>
              <div className="text-muted-foreground">{ship.description}</div>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {ship.minCrewMembers}–{ship.maxCrewMembers}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {ship.cargoCapacity}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatGold(ship.buy)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <p>
      A Pirate can own {TITLE_INFO.Pirate.maxShips} ships. Every promotion
      raises the limit, up to {TITLE_INFO.Duke.maxShips} for a Duke. The
      shipyard buys any ship back for half its new price, however battered it
      is. You can also remove ships from your fleet, just not at sea and never
      your last one.
    </p>

    <GuideTip variant="warning">
      An overloaded fleet can&apos;t leave port. Sell some goods or buy another
      ship. The game warns you before you sell a ship that would leave you
      overloaded.
    </GuideTip>

    <h3>Damage and repairs</h3>

    <p>
      Ships take damage every time the enemy lands a hit, win or lose. A ship
      with no health left is disabled and you&apos;re stuck in port until
      it&apos;s fixed. The shipyard repairs ships for{" "}
      {formatGold(SHIP_REPAIR_COST)} per point of damage.
    </p>

    <p>
      Repair kits let you patch up a ship anywhere, even halfway through a
      voyage. They cost {formatGold(MERCHANDISE.repairKits.buy)} at the shipyard
      and each restores up to {REPAIR_KIT_HEALTH} health to one ship. Open Crew
      &amp; Fleet and press Use next to your repair kits to pick a ship and how
      many to spend. A small repair still uses a whole kit, and kits cost a
      little more than the shipyard, so save them for the open sea.
    </p>

    <h3>Cannons</h3>

    <p>
      Cannons decide how hard you hit, and also how strong the ships you meet
      will be. Each cannon needs two crew to fire it, so 20 cannons and 30 crew
      give you 15 manned cannons. The other five are very heavy decorations.
      Cannons take no cargo space, and you&apos;re allowed to sail with none at
      all, if you&apos;re feeling brave.
    </p>
  </GuideChapter>
)

export default Ships
