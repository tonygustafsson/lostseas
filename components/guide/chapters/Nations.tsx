import { NATIONS } from "@/constants/locations"
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

const Nations = () => (
  <GuideChapter
    id="nations"
    lead="Sink your nation's enemies and the governor will find you a nicer hat. Sink your own and he'll find you a smaller one."
    image={{
      src: "/img/location/port-royale/city-hall.png",
      alt: "The city hall in Port Royale",
    }}
  >
    <p>
      {Object.keys(NATIONS).join(", ")} are fighting over the islands. England
      is at war with {NATIONS.England.warWith}, and Spain with{" "}
      {NATIONS.Spain.warWith}. Whoever you sail for, their enemy is your enemy.
    </p>

    <h3>Levels</h3>

    <p>
      Every victory against your nation&apos;s enemy raises your level by one,
      and losing to them costs nothing. Attacking your own nation&apos;s ships
      lowers it by one, win or lose. Neutral nations and pirates don&apos;t
      touch your level, but beating them still pays.
    </p>

    <h3>Titles</h3>

    <p>
      When your level is high enough, visit the city hall in a town of your own
      nation to accept a promotion. Each title pays a reward and lets you own
      more ships. Once you have a title you keep it, even if your level drops
      later.
    </p>

    <Table className="bg-background/60 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Level</TableHead>
          <TableHead className="text-right">Reward</TableHead>
          <TableHead className="text-right">Max ships</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.values(TITLE_INFO).map(
          ({ title, minLevel, reward, maxShips }) => (
            <TableRow key={title}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell className="text-right tabular-nums">
                {minLevel}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {reward ? formatGold(reward) : "–"}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {maxShips}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>

    <h3>Changing sides</h3>

    <p>
      Loyalty is negotiable. You can join another nation at the city hall of any
      of its towns, as long as you&apos;ve beaten its enemy more often than
      you&apos;ve fought against it, defeats included. The difference sets your
      new title, which may be lower than the one you have.
    </p>

    <p>
      Say you&apos;re Spanish, you&apos;ve beaten 25 French ships and never
      touched an English one. England will happily welcome you as an Admiral.
    </p>

    <GuideTip variant="warning">
      Title rewards are only paid once, so switching back and forth won&apos;t
      make you rich. If the new title allows fewer ships than you own, you keep
      them, but you can&apos;t buy another until you&apos;re under the limit.
    </GuideTip>
  </GuideChapter>
)

export default Nations
