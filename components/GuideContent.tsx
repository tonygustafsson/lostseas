"use client"

import Image from "next/image"

import { LOAN_LIMIT } from "@/constants/bank"
import { NATIONS, TOWNS } from "@/constants/locations"
import { BARTER_GOODS, MERCHANDISE } from "@/constants/merchandise"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { TITLE_INFO } from "@/constants/title"
import { cn } from "@/lib/utils"
import { capitalize } from "@/utils/string"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Badge } from "./ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const SECTIONS = [
  "supplies",
  "ships",
  "crew-members",
  "tavern",
  "social-status",
  "economy",
  "traveling",
]

type Props = {
  defaultOpen?: boolean
  appearance?: "game" | "public"
}

const GuideSectionHeading = ({
  appearance,
  className,
  children,
}: {
  appearance: Props["appearance"]
  className?: string
  children: React.ReactNode
}) =>
  appearance === "public" ? (
    <h2
      className={cn(className, "px-5 pt-6 text-2xl text-amber-200 sm:text-3xl")}
    >
      {children}
    </h2>
  ) : (
    <AccordionTrigger className={className}>{children}</AccordionTrigger>
  )

const GuideContent = ({ defaultOpen = false, appearance = "game" }: Props) => (
  <Accordion
    type="multiple"
    defaultValue={defaultOpen || appearance === "public" ? SECTIONS : []}
    className={cn(
      "my-6",
      appearance === "public" &&
        "bg-card/90 my-8 border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl [&_[data-slot=accordion-content]]:text-base [&_[data-slot=accordion-content]]:leading-7 sm:[&_[data-slot=accordion-content]]:text-lg [&_[data-slot=accordion-content]_h3]:my-6 [&_[data-slot=accordion-content]_h3]:text-xl [&_[data-slot=accordion-content]_img]:rounded-xl [&_[data-slot=accordion-content]_img]:border [&_[data-slot=accordion-content]_img]:border-white/10 [&_[data-slot=accordion-item]]:border-white/10 [&_[data-slot=accordion-item][data-open]]:bg-transparent"
    )}
  >
    <AccordionItem
      value="supplies"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl [&>svg]:mt-2"
      >
        Supplies
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Buying and selling</h3>

        <p className="mb-4">
          At the shop you can buy and sell food, water, medicine and barter
          goods. Stock up on food and water for your journeys, sell loot for
          gold, and buy medicine to restore your crew&apos;s health. The Buy
          necessities action lets you choose how many days of food and water to
          buy, taking your existing supplies into account.
        </p>

        <Image
          src="/img/location/port-royale/shop.webp"
          width={800}
          height={460}
          alt="The shop"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          The market offers fixed batches of goods, often at a discount. You
          must buy the whole batch and have enough gold to cover its total
          price. Compare the offer with the shop&apos;s selling price before
          buying goods to resell, and check that a shop in your current town
          accepts them. Market offers can include goods that the local shop does
          not trade, as well as cannons, which are traded at the shipyard.
        </p>

        <Image
          src="/img/location/belize/market.webp"
          width={800}
          height={460}
          alt="The market"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <h3 className="mt-8 mb-4 font-serif text-lg">Merchandise reference</h3>

        <Table
          aria-label="Merchandise reference"
          className="rounded-xl bg-black/60 [&_td]:align-top"
        >
          <TableCaption>
            Buy and sell prices are in gold per unit at the listed location.
            Market offers may have different prices.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Item and description</TableHead>
              <TableHead scope="col">Category</TableHead>
              <TableHead scope="col">Unit / units</TableHead>
              <TableHead scope="col" className="text-right">
                Buy
              </TableHead>
              <TableHead scope="col" className="text-right">
                Sell
              </TableHead>
              <TableHead scope="col">Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(MERCHANDISE).map(([item, merchandise]) => (
              <TableRow key={item}>
                <TableHead
                  scope="row"
                  className="h-auto max-w-64 min-w-48 py-4 align-top whitespace-normal"
                >
                  <div>{capitalize(item)}</div>
                  <div className="text-muted-foreground mt-1 leading-relaxed font-normal">
                    {merchandise.description}
                  </div>
                </TableHead>
                <TableCell>
                  <div className="flex flex-col items-start gap-1">
                    {merchandise.isNecessity && (
                      <Badge variant="secondary">Necessity</Badge>
                    )}
                    {merchandise.isUtility && (
                      <Badge variant="secondary">Utility</Badge>
                    )}
                    {merchandise.isBarterGoods && (
                      <Badge variant="secondary">Barter goods</Badge>
                    )}
                    {!merchandise.isNecessity &&
                      !merchandise.isUtility &&
                      !merchandise.isBarterGoods && (
                        <span className="text-muted-foreground">None</span>
                      )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-normal">
                  {merchandise.singleUnit} / {merchandise.unit}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {merchandise.buy}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {merchandise.sell}
                </TableCell>
                <TableCell className="max-w-64 min-w-48 whitespace-normal">
                  <div className="font-medium">
                    {capitalize(merchandise.availableAt)}
                  </div>
                  <div className="text-muted-foreground mt-1 leading-relaxed">
                    {merchandise.towns?.join(", ") ?? "All towns"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="mt-4 mb-2 font-serif text-lg">Food and water</h3>

        <p className="mb-4">
          Before leaving port, you need at least 0.5 crates of food and 1 barrel
          of water per crew member, with each total rounded to the nearest whole
          unit. This departure requirement is the same for every destination.
        </p>

        <p className="mb-4">
          Each time your journey continues, 0.1 crates of food and 0.2 barrels
          of water per crew member are subtracted from your supplies. The
          remaining totals are rounded to the nearest whole unit and stop at
          zero. Running out does not interrupt a journey already underway, but
          you will need to restock before your next departure.
        </p>

        <h3 className="mb-2 font-serif text-lg">Barter goods</h3>

        <p className="mb-4">
          Barter goods include {BARTER_GOODS.join(", ")}. You can loot them in
          sea battles or buy them at the market, then sell them at a shop that
          accepts them. They are used for trading; tavern actions cost gold and
          do not consume the food, tobacco or rum in your inventory.
        </p>

        <p className="mb-4">
          Shops trade tobacco and rum in every town. The other barter goods can
          only be bought and sold at shops in the towns listed in the
          merchandise reference above. Sell tradable goods sells all barter
          goods accepted by the local shop and leaves the rest in your
          inventory.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="ships"
      className={appearance === "public" ? "py-8" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Ships
      </GuideSectionHeading>
      <AccordionContent>
        <p className="mb-4">
          If you lose a sea battle, one of your ships may sink. Your last ship
          cannot be sunk in battle, but it can still be damaged. A larger fleet
          lets you support more crew members, who can man more cannons. The
          number of manned cannons determines the strength of the ships you
          encounter; stronger opponents can carry more gold.
        </p>

        <Image
          src="/img/location/san-juan/shipyard.webp"
          width={800}
          height={460}
          alt="The shipyard"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          Losing a sea battle also costs you a share of every inventory item
          except cannons, based on how many ships you had before the battle.
          With three ships, you lose one third of those goods; with one ship,
          you lose all of them. You lose all gold you carry, but your bank
          balance and treasures are safe.
        </p>

        <p className="mb-4">
          As a Pirate, you can own up to {TITLE_INFO.Pirate.maxShips} ships.
          Higher titles increase this limit, up to {TITLE_INFO.Duke.maxShips}{" "}
          ships as a Duke.
        </p>

        <h3 className="mb-2 font-serif text-lg">Different ship types</h3>

        <Table className="mb-6 rounded-xl bg-black/60">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Min crew members</TableHead>
              <TableHead>Max crew members</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Merchantman</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brig</TableCell>
              <TableCell>{SHIP_TYPES.Brig.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Brig.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Brig.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Galleon</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Frigate</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.buy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="my-6 font-serif text-lg">Ship health and repairs</h3>

        <p className="mb-4">
          Every ship has a health rating. You will take damage in every battle,
          win or lose. A ship at 0% health is completely disabled and will block
          you from leaving port. You can repair ships at the shipyard for{" "}
          {SHIP_REPAIR_COST} gold per 1% of damage. You can also sell any ship
          you own at the shipyard for half its purchase price, regardless of its
          health. You must own at least one ship to leave port.
        </p>

        <h3 className="my-6 font-serif text-lg">Cannons</h3>

        <p>
          Manned cannons determine your fighting strength and the strength of
          the ships you encounter. Each cannon needs two crew members, so 20
          cannons and 30 crew members give you 15 manned cannons. Unmanned
          cannons do not help in battle. You can buy and sell cannons at the
          shipyard; owning cannons is not required to leave port.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="crew-members"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Crew members
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Purpose of crew members</h3>

        <p className="mb-4">
          Crew members sail your ships and man your cannons. To leave port, your
          crew count must be between the combined minimum and maximum
          requirements of all your ships. You need two crew members to fire one
          cannon.
        </p>

        <p className="mb-4">
          Your crew loses 1 mood each time you continue a journey, except on
          arrival. Winning a sea battle increases mood by 20, up to a maximum of
          100. If their mood is 0 or below, they will refuse to leave port.
        </p>

        <p className="mb-4">
          Improve their mood with tavern actions or use Give gold in Manage
          Crew. The more crew members you have, the more gold you need for the
          same improvement.
        </p>

        <p className="mb-4">
          Sea battles and tavern fights reduce your crew&apos;s health. At 0%
          health, they do not die, but you cannot start another journey. Use
          Give medicine in Manage Crew to restore health, or Serve supper at the
          tavern. Larger crews need more medicine for the same improvement.
          Health and mood increases are capped at 100%.
        </p>

        <Image
          src="/img/userguide/crew.png"
          width={800}
          height={460}
          alt="Crew stats"
          className="mx-auto mb-4"
        />

        <h3 className="mb-2 font-serif text-lg">Getting more crew members</h3>

        <p>
          Winning sea battles can automatically add recruits from the opposing
          crew. Friendly sailors at the tavern may also join for free if you
          accept their offer. New recruits can take you above your fleet&apos;s
          maximum crew size, so buy more ships or dismiss crew members before
          your next departure if needed.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="tavern"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Tavern
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">
          Keeping your crew happy and healthy
        </h3>

        <p className="mb-4">
          The tavern is one of the most important stops in any town. You can
          serve supper, smoke tobacco, pour the wine or pass the rum to improve
          your crew&apos;s mood. Serve supper also restores health. Each action
          costs gold for every crew member. The increases below are percentage
          points, capped at 100% health or mood.
        </p>

        <Table className="mb-6 rounded-xl bg-black/60">
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Price (per crew member)</TableHead>
              <TableHead>Health increase</TableHead>
              <TableHead>Mood increase</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(TAVERN_ITEMS).map(([key, item]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell>{item.price} gold</TableCell>
                <TableCell>
                  {item.healthIncrease > 0 ? `+${item.healthIncrease}` : "–"}
                </TableCell>
                <TableCell>
                  {item.moodIncrease > 0 ? `+${item.moodIncrease}` : "–"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="mb-2 font-serif text-lg">Sailors</h3>

        <p className="mb-4">
          Sometimes you will find sailors at the tavern willing to join your
          crew for free. On other occasions the sailors you meet are hostile. If
          you fight them and win, you gain a small amount of gold. Your crew
          loses health whether you win or lose. You can also ignore the sailors
          to avoid the fight.
        </p>

        <h3 className="mb-2 font-serif text-lg">Cards</h3>

        <p>
          Choose a percentage of your gold to bet, then pick one of five cards.
          A correct choice adds five times your bet to your gold; a wrong choice
          costs your bet. For example, if you have 100 gold and bet all of it, a
          win leaves you with 600 gold and a loss leaves you with 0. You have a
          one-in-five chance of winning. Your bet must be at least 1 gold, and
          bank savings are not used.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="social-status"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Social status
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Nations</h3>
        <p className="mb-4">
          Lost Seas is set in the Caribbean in the 17th century. Its nations are{" "}
          {Object.keys(NATIONS).join(", ")}. England is at war with{" "}
          {NATIONS.England.warWith}, and Spain is at war with{" "}
          {NATIONS.Spain.warWith}.
        </p>

        <h3 className="mb-2 font-serif text-lg">Levels</h3>

        <p className="mb-4">
          Your level for a nation is your number of victories against its enemy,
          minus all battles you fought against that nation, whether you won or
          lost. Each enemy victory adds 1 level, and each battle against your
          own nation subtracts 1. Battles against neutral nations and pirates
          leave this level unchanged, but victories can still reward you with
          gold. Losing a battle against your nation&apos;s enemy does not lower
          your level.
        </p>

        <h3 className="mb-2 font-serif text-lg">Titles</h3>

        <Image
          src="/img/location/port-royale/city-hall.webp"
          width={800}
          height={460}
          alt="The City Hall"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          Your level determines the title the governor can offer you at the City
          Hall. Promotions reward you with gold and let you own more ships. More
          ships let you carry more crew members and man more cannons. Cargo has
          no capacity limit. Reaching the highest title is one goal you can
          choose to pursue. Accept promotions in a town belonging to your
          nation. Your title does not automatically fall if your level drops.
        </p>

        <h3 className="mb-2 font-serif text-lg">The different titles</h3>

        <Table className="mb-6 rounded-xl bg-black/60">
          <TableHeader>
            <TableRow>
              <TableHead>Level</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Max ships</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Below 10</TableCell>
              <TableCell>{TITLE_INFO.Pirate.title}</TableCell>
              <TableCell>{TITLE_INFO.Pirate.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Pirate.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10-19</TableCell>
              <TableCell>{TITLE_INFO.Ensign.title}</TableCell>
              <TableCell>{TITLE_INFO.Ensign.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Ensign.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>20-29</TableCell>
              <TableCell>{TITLE_INFO.Captain.title}</TableCell>
              <TableCell>{TITLE_INFO.Captain.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Captain.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>30-39</TableCell>
              <TableCell>{TITLE_INFO.Major.title}</TableCell>
              <TableCell>{TITLE_INFO.Major.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Major.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>40-49</TableCell>
              <TableCell>{TITLE_INFO.Colonel.title}</TableCell>
              <TableCell>{TITLE_INFO.Colonel.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Colonel.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>50-64</TableCell>
              <TableCell>{TITLE_INFO.Admiral.title}</TableCell>
              <TableCell>{TITLE_INFO.Admiral.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Admiral.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>65-79</TableCell>
              <TableCell>{TITLE_INFO.Baron.title}</TableCell>
              <TableCell>{TITLE_INFO.Baron.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Baron.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>80-99</TableCell>
              <TableCell>{TITLE_INFO.Count.title}</TableCell>
              <TableCell>{TITLE_INFO.Count.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Count.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>100-119</TableCell>
              <TableCell>{TITLE_INFO.Marquis.title}</TableCell>
              <TableCell>{TITLE_INFO.Marquis.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Marquis.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120+</TableCell>
              <TableCell>{TITLE_INFO.Duke.title}</TableCell>
              <TableCell>{TITLE_INFO.Duke.reward} gold</TableCell>
              <TableCell>{TITLE_INFO.Duke.maxShips}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="mb-2 font-serif text-lg">Changing nation</h3>

        <p className="mb-4">
          You can change nationality at the City Hall of a town belonging to
          your desired nation. You qualify when your victories against that
          nation&apos;s enemy outnumber all battles you have fought against the
          desired nation, including defeats. Your new title depends on this
          difference, and you receive that title&apos;s gold reward. Changing
          citizenship can give you a lower title than the one you previously
          held.
        </p>

        <p>
          For example, if you are a Spanish citizen with 50 victories against
          French ships and have never attacked an English ship, you qualify for
          English citizenship with the title of Admiral.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="economy"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Economy
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Getting some gold</h3>

        <p className="mb-4">
          Gold is the game&apos;s currency. You earn it by looting ships at sea,
          selling goods or ships, collecting title rewards, winning at cards, or
          winning tavern fights.
        </p>

        <p className="mb-4">
          Winning a sea battle can also reveal a valuable treasure. Each
          treasure is tied to a specific town — you must bring it to that
          town&apos;s City Hall to collect the reward. The reward is paid
          directly in gold.
        </p>

        <h3 className="mb-2 font-serif text-lg">Saving money</h3>

        <p className="mb-4">
          The bank keeps your savings safe. Losing a sea battle takes all gold
          you carry, regardless of the size of your fleet, but does not affect
          your bank balance.
        </p>

        <p className="mb-4">
          Your bank account is shared across all towns and nations. Deposit 100
          gold at the bank in Panama, and you can withdraw it at the bank in
          Port Royale.
        </p>

        <p className="mb-4">
          Keep enough gold for purchases in town and deposit the rest before
          leaving port. Repay any outstanding loan first so you can make
          deposits.
        </p>

        <h3 className="mb-2 font-serif text-lg">Loans</h3>

        <p>
          You can borrow gold at the bank, up to a total outstanding loan of{" "}
          {LOAN_LIMIT.toLocaleString("en-US")} gold. Loans have no interest or
          fees. You cannot deposit gold until the loan is fully repaid, but you
          can still withdraw existing savings. You can repay the loan in smaller
          amounts or all at once.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="traveling"
      className={appearance === "public" ? "py-4" : undefined}
    >
      <GuideSectionHeading
        appearance={appearance}
        className="font-serif text-xl"
      >
        Traveling
      </GuideSectionHeading>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Towns and nations</h3>

        <Image
          src="/img/userguide/map.png"
          width={800}
          height={460}
          alt="The Spanish Main"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          Each town belongs to one of the game&apos;s four nations. The list
          below shows their nationalities in Lost Seas.
        </p>

        {Object.keys(NATIONS).map((nation, i, arr) => (
          <p key={nation} className={i === arr.length - 1 ? "mb-4" : undefined}>
            <strong>Towns of {nation}:</strong>{" "}
            {(Object.keys(TOWNS) as Town[])
              .filter((town) => TOWNS[town].nation === nation)
              .join(", ")}
            .
          </p>
        ))}

        <p className="mb-4">
          You can visit any town regardless of your nationality. Choose another
          town on the map to start a journey. If you cannot leave port, the
          advisor at the harbor explains which problems you need to resolve.
        </p>

        <h3 className="mb-2 font-serif text-lg">Time</h3>

        <p className="mb-4">
          Time is measured in days in Lost Seas. Each normal journey step
          advances one day, including arrival at your destination. Starting a
          journey and visiting locations in town do not advance the calendar.
          Journeys continue automatically between ship encounters. Sailing
          pauses at an encounter or battle report. Choose Attack or Ignore when
          you meet a ship, and Continue journey after a battle to resume
          sailing.
        </p>

        <p className="mb-4">
          Continuing after a battle report uses supplies but does not advance
          the date, except when that step is your arrival.
        </p>

        <h3 className="mb-2 font-serif text-lg">Weather</h3>

        <p className="mb-4">
          The weather shown depends on the current game day. It does not affect
          travel, supply consumption or battles.
        </p>

        <h3 className="mb-2 font-serif text-lg">Battles at sea</h3>

        <Image
          src="/img/location/ship-meeting/ship-meeting5.webp"
          width={800}
          height={460}
          alt="Meeting a ship"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          You can encounter ships from any nation, as well as pirates. Ships
          from your destination&apos;s nation are more common, so sail towards
          one of its towns if you want to find that nation&apos;s ships.
        </p>

        <p className="mb-4">
          Battle outcomes compare your manned cannons with the opponent&apos;s
          cannons, with a random bonus for both sides. You can sometimes beat a
          slightly stronger ship, but attacking one with more cannons is risky.
          You can ignore an encounter to continue sailing without fighting.
        </p>

        <p>
          After a battle, a report shows your loot, recruits, damage and any
          losses. Both victories and defeats damage your crew and ships.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default GuideContent
