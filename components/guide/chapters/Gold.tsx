import { LOAN_LIMIT } from "@/constants/bank"
import { VENTURES } from "@/constants/ventures"
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

const Gold = () => (
  <GuideChapter
    id="gold"
    lead="Gold buys ships, cannons and rum, roughly in that order of importance. Here's how to get it and how to keep it."
    image={{
      src: "/img/location/port-royale/bank.png",
      alt: "The bank in Port Royale",
    }}
  >
    <h3>Making money</h3>

    <ul>
      <li>Plunder the ships you beat.</li>
      <li>Sell goods, especially barter goods in towns that want them.</li>
      <li>Collect title rewards at the city hall.</li>
      <li>Finish quests for the townsfolk.</li>
      <li>Win tavern brawls, or get lucky at cards.</li>
    </ul>

    <p>
      Now and then a won battle turns up a treasure. Each one belongs to a
      particular town, and that town&apos;s city hall pays well to get it back.
      Beat a pirate ship and you might capture a famous wanted pirate too. Each
      one is wanted in a particular town, and the bounty depends on how naughty
      they&apos;ve been. Your prisoners wait in Crew &amp; Fleet.
    </p>

    <h3>Cards</h3>

    <p>
      Bet some of the gold you carry and pick one of five cards. Pick right and
      you win five times your bet on top of it. Pick wrong and it&apos;s gone.
      Bet 100 and you walk away with 600 or nothing. The bank won&apos;t fund
      your gambling, so only carried gold counts.
    </p>

    <h3>The bank</h3>

    <p>
      Lose a battle and the enemy takes every coin you carry. Gold in the bank
      is safe. Every bank shares the same account, so deposit in Panama and
      withdraw in Port Royale. Keep what you need for shopping and bank the rest
      before you sail.
    </p>

    <p>
      The bank lends up to {formatGold(LOAN_LIMIT)} with no interest and no
      fees, which is suspiciously generous for 1640. Pay it back bit by bit or
      all at once. Until it&apos;s repaid you can&apos;t deposit, but you can
      still withdraw.
    </p>

    <GuideTip variant="warning">
      Carrying a loan? Pay it off before a voyage, or you can&apos;t put your
      gold somewhere safe.
    </GuideTip>

    <h3>Ventures</h3>

    <p>
      The bank also sells shares in famous trading voyages. You pay the stake
      from the gold you carry. After a set number of days the voyage returns,
      your advisor lets you know, and you collect at any bank. A share can pay
      back more than you put in, less, or nothing at all, and you only find out
      when you collect. Bigger stakes pay better and are riskier. You can hold
      one share in each venture at a time.
    </p>

    <Table className="bg-background/60 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Venture</TableHead>
          <TableHead className="text-right">Stake</TableHead>
          <TableHead className="text-right">Days</TableHead>
          <TableHead>Risk</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.values(VENTURES).map((venture) => (
          <TableRow key={venture.name}>
            <TableCell className="min-w-48 whitespace-normal">
              <div className="font-medium">{venture.name}</div>
              <div className="text-muted-foreground">
                {venture.origin} to {venture.destination}
              </div>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatGold(venture.stake)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {venture.days}
            </TableCell>
            <TableCell>{venture.risk}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </GuideChapter>
)

export default Gold
