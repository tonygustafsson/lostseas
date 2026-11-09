import { TAVERN_ITEMS } from "@/constants/tavern"
import { MEDICINE_HEALTH_PER_BOX } from "@/utils/crew"
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

const Crew = () => (
  <GuideChapter
    id="crew"
    lead="Your crew sails the ships and fires the guns. In return they ask for food, water, rum and the occasional pay rise."
    image={{
      src: "/img/userguide/crew.png",
      alt: "Crew mood and health",
    }}
  >
    <p>
      To leave port you need at least as many crew as your ships require
      together, and no more than they can hold. Beyond that, keep an eye on two
      numbers: mood and health.
    </p>

    <h3>Mood</h3>

    <p>
      Mood drops a little every day at sea and jumps after a win in battle. Let
      it hit rock bottom and your crew refuse to leave port until you make it up
      to them. Buy a round at the tavern, or use Give gold in Manage Crew. The
      bigger the crew, the more it costs to keep them sweet.
    </p>

    <h3>Health</h3>

    <p>
      Sea battles and tavern brawls hurt. Nobody dies, but an exhausted crew
      won&apos;t start a new voyage. Heal them with a remedy from the
      apothecary, supper at the tavern, or Give medicine in Manage Crew. Each
      box of medicine gives {MEDICINE_HEALTH_PER_BOX} health shared across the
      whole crew, so a big crew needs more boxes.
    </p>

    <h3>The tavern</h3>

    <p>
      Every round is paid per crew member. Supper is the only thing on the menu
      that heals, which says a lot about the rum.
    </p>

    <Table className="bg-background/60 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Round</TableHead>
          <TableHead className="text-right">Per sailor</TableHead>
          <TableHead className="text-right">Health</TableHead>
          <TableHead className="text-right">Mood</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(TAVERN_ITEMS).map(([key, item]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{item.label}</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatGold(item.price)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {item.healthIncrease > 0 ? `+${item.healthIncrease}` : "–"}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {item.moodIncrease > 0 ? `+${item.moodIncrease}` : "–"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <h3>Finding more sailors</h3>

    <p>
      After a victory, some of the beaten crew may decide your ship looks nicer
      than theirs and sign on. Sailors at the tavern sometimes offer to join for
      free. Others just want a fight. Beat them and you pocket a little gold,
      but your crew gets hurt either way. You can always ignore them and walk
      off.
    </p>

    <GuideTip>
      New recruits can push you over what your fleet can hold. Buy another ship
      or dismiss a few before you sail.
    </GuideTip>
  </GuideChapter>
)

export default Crew
