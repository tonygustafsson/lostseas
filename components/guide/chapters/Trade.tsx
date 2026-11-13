import {
  APOTHECARY_PRICE_PER_POINT,
  APOTHECARY_REMEDIES,
} from "@/constants/apothecary"
import { BARTER_GOODS, MERCHANDISE } from "@/constants/merchandise"
import { formatGold } from "@/utils/number"
import { capitalize, snakeCaseToTitleCase } from "@/utils/string"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Trade = () => (
  <GuideChapter
    id="trade"
    lead="Buy low, sell high, and try not to get sunk with a hold full of silk."
    image={{
      src: "/img/location/belize/market.png",
      alt: "The market in Belize",
    }}
  >
    <h3>The shop</h3>

    <p>
      Trading in the shop works backwards from how you might expect. Instead of
      choosing how much to buy, you choose how much you want to own. Set it
      lower than what you carry and you sell the rest. Set it higher and you buy
      the difference.
    </p>

    <p>
      You can change several goods at once, so the gold from one sale can pay
      for another purchase. Nothing happens until you press Transfer, and then
      the whole trade goes through or none of it does. The day buttons top up
      food and water for that many days at sea, counting what you already have.
    </p>

    <h3>Cargo space</h3>

    <p>
      Every crate, barrel, box, bolt and bale takes one slot in your hold.
      Cannons and repair kits take none, presumably because the crew sleeps on
      them. You can always sell, but you can only buy what fits.
    </p>

    <h3>The market</h3>

    <p>
      The market sells fixed batches of goods, often cheaply. You take the whole
      batch or nothing. Before you buy to resell, check what the shop pays and
      whether a shop in town even wants those goods. Market traders sometimes
      throw in cannons or repair kits too.
    </p>

    <h3>Food and water</h3>

    <p>
      Your crew eats and drinks every day at sea, and a bigger crew gets through
      more. Pick a town on the map and you see the distance and what the trip
      needs before you commit.
    </p>

    <GuideTip variant="warning">
      Run out of food or water at sea and the voyage still carries on, so nobody
      starves. You just can&apos;t leave port again until you restock.
    </GuideTip>

    <h3>Barter goods</h3>

    <p>
      Barter goods exist purely to be traded. There are {BARTER_GOODS.length} of
      them: {BARTER_GOODS.join(", ")}. Loot them in battle or buy them at the
      market, then sell them where a shop wants them. Every shop takes tobacco
      and rum, while the rest only sell in the towns listed below. Sell all
      barter goods sells whatever the local shop accepts and keeps the rest
      aboard.
    </p>

    <h3>The apothecary</h3>

    <p>
      The apothecary at the market heals your whole crew at once. Each remedy
      gives a fixed amount of health and costs{" "}
      {formatGold(APOTHECARY_PRICE_PER_POINT)} per crew member for every point.
      You pay full price however little your crew needs, so match the remedy to
      the bruises. Picked well, it&apos;s the cheapest healing in port.
    </p>

    <Table className="bg-background/60 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Remedy</TableHead>
          <TableHead>Health</TableHead>
          <TableHead>What it is</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(APOTHECARY_REMEDIES).map(([key, remedy]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{remedy.label}</TableCell>
            <TableCell>+{remedy.healthIncrease}</TableCell>
            <TableCell className="min-w-64 whitespace-normal">
              {remedy.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <h3>Price list</h3>

    <Table className="bg-background/60 rounded-xl">
      <TableCaption>
        Gold per unit in the shop. Market offers have their own prices.
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Goods</TableHead>
          <TableHead className="text-right">Buy</TableHead>
          <TableHead className="text-right">Sell</TableHead>
          <TableHead>Where</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(MERCHANDISE).map(([item, merchandise]) => (
          <TableRow key={item}>
            <TableCell className="min-w-48 whitespace-normal">
              <div className="font-medium">{snakeCaseToTitleCase(item)}</div>
              <div className="text-muted-foreground">
                Per {merchandise.singleUnit}
              </div>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {merchandise.buy}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {merchandise.sell}
            </TableCell>
            <TableCell className="min-w-48 whitespace-normal">
              <div>{capitalize(merchandise.availableAt)}</div>
              <div className="text-muted-foreground">
                {merchandise.towns?.join(", ") ?? "All towns"}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </GuideChapter>
)

export default Trade
