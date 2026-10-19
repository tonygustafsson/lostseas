"use client"

import Image from "next/image"

import {
  APOTHECARY_PRICE_PER_POINT,
  APOTHECARY_REMEDIES,
} from "@/constants/apothecary"
import { LOAN_LIMIT } from "@/constants/bank"
import { NATIONS, TOWNS } from "@/constants/locations"
import { BARTER_GOODS, MERCHANDISE } from "@/constants/merchandise"
import {
  REPAIR_KIT_HEALTH,
  SHIP_REPAIR_COST,
  SHIP_TYPES,
} from "@/constants/ship"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { TITLE_INFO } from "@/constants/title"
import { cn } from "@/lib/utils"
import { MEDICINE_HEALTH_PER_BOX } from "@/utils/crew"
import {
  BATTLE_MAX_ROUNDS,
  CREW_DAMAGE_STRENGTH_STEP,
  EVADE_CHANCE,
} from "@/utils/seaBattle"
import { BASE_HIT_CHANCE } from "@/utils/shipMeeting"
import { capitalize, snakeCaseToTitleCase } from "@/utils/string"

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
    <h2 className={cn(className, "text-accent px-5 pt-6 text-2xl sm:text-3xl")}>
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
        "bg-card/90 border-border [&_[data-slot=accordion-content]_img]:border-border [&_[data-slot=accordion-item]]:border-border my-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl [&_[data-slot=accordion-content]]:text-base [&_[data-slot=accordion-content]]:leading-7 sm:[&_[data-slot=accordion-content]]:text-lg [&_[data-slot=accordion-content]_h3]:my-6 [&_[data-slot=accordion-content]_h3]:text-xl [&_[data-slot=accordion-content]_img]:rounded-xl [&_[data-slot=accordion-content]_img]:border [&_[data-slot=accordion-item][data-open]]:bg-transparent"
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
          gold, and buy medicine to restore your crew&apos;s health.
        </p>

        <p className="mb-4">
          For each item, set how much you want to own. Going below what you have
          sells the difference at the selling price, and going above it buys at
          the buying price. You can change several items at once, so gold from
          selling one item can pay for another. Nothing is traded until you
          press Transfer, and the whole trade either goes through or nothing
          changes. The day buttons top up food and water to last that many days,
          taking your existing supplies into account.
        </p>

        <Image
          src="/img/location/port-royale/shop.png"
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
          not trade, as well as cannons and repair kits, which are traded at the
          shipyard.
        </p>

        <Image
          src="/img/location/belize/market.png"
          width={800}
          height={460}
          alt="The market"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <h3 className="mt-8 mb-4 font-serif text-lg">Apothecary</h3>

        <p className="mb-4">
          The market also has an apothecary that sells remedies for your whole
          crew. Each remedy raises crew health by a fixed number of points,
          capped at 100%. The price is {APOTHECARY_PRICE_PER_POINT} gold per
          crew member for every point the remedy gives. You always pay the full
          price, so any healing past 100% is wasted. Pick the remedy that best
          fits your crew&apos;s health to get the most for your gold. Used well,
          the apothecary is the cheapest way to heal your crew in port. A remedy
          cannot be bought when you have no crew or their health is already at
          100%.
        </p>

        <Table className="mb-6 rounded-xl bg-black/60">
          <TableHeader>
            <TableRow>
              <TableHead>Remedy</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(APOTHECARY_REMEDIES).map(([key, remedy]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{remedy.label}</TableCell>
                <TableCell>+{remedy.healthIncrease}%</TableCell>
                <TableCell className="whitespace-normal">
                  {remedy.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
                  <div>{snakeCaseToTitleCase(item)}</div>
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
          Before leaving port, you need enough food and water for 5 days at sea.
          Every 10 crew members eat 1 crate of food a day and every 5 crew
          members drink 1 barrel of water a day, rounded to the nearest whole
          unit. Any crew uses at least 1 crate and 1 barrel a day. This
          departure requirement is the same for every destination.
        </p>

        <p className="mb-4">
          Each time your journey continues, one day of food and water is
          subtracted from your supplies, using the same daily amounts. Supplies
          stop at zero. Running out does not interrupt a journey already
          underway, but you will need to restock before your next departure.
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
          merchandise reference above. Sell all barter goods sets every barter
          good the local shop accepts to zero and leaves the rest in your
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
          src="/img/location/san-juan/shipyard.png"
          width={800}
          height={460}
          alt="The shipyard"
          className="mx-auto mb-4 aspect-[1.74]"
        />

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
          Every ship has a health rating. Your ships take damage every time the
          enemy hits them during a battle, win or lose. A ship at 0% health is
          completely disabled and will block you from leaving port. You can
          repair ships at the shipyard for {SHIP_REPAIR_COST} gold per 1% of
          damage. You can also sell any ship you own at the shipyard for half
          its purchase price, regardless of its health. You must own at least
          one ship to leave port. You can remove a ship from your fleet, but not
          while at sea and not if it is your last ship.
        </p>

        <p className="mb-4">
          Buy repair kits at any shipyard for {MERCHANDISE.repairKits.buy} gold
          each, or sell them there for {MERCHANDISE.repairKits.sell} gold each.
          In Crew &amp; Fleet, click Use under Equipment &gt; Repair kits, then
          choose a damaged ship and how many kits to use. You can use them
          anywhere, including at sea, without paying additional gold. Each kit
          restores up to {REPAIR_KIT_HEALTH} percentage points of health to one
          ship, capped at 100%. Kits can also be found in market offers or
          battle loot and are lost like other supplies when you lose a battle,
          with remaining kits rounded down to a whole number.
        </p>

        <p className="mb-4">
          A ship at 50% health needs five kits; two such ships need ten. Use
          fewer kits for a partial repair. At normal prices, kits cost 20% more
          than shipyard repairs for ten points of health. Smaller repairs still
          consume a whole kit.
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
          100. Mood never drops below 0. If their mood is 0, they will refuse to
          leave port.
        </p>

        <p className="mb-4">
          Improve their mood with tavern actions or use Give gold in Manage
          Crew. The more crew members you have, the more gold you need for the
          same improvement.
        </p>

        <p className="mb-4">
          Sea battles and tavern fights reduce your crew&apos;s health. At 0%
          health, they do not die, but you cannot start another journey. Use
          Give medicine in Manage Crew to restore health, buy a remedy at the
          apothecary in the market, or Serve supper at the tavern. Each box of
          medicine restores {MEDICINE_HEALTH_PER_BOX} health points spread
          across the crew, so larger crews need more medicine for the same
          improvement. Health and mood increases are capped at 100%. Give gold
          and Give medicine need at least one crew member, and cannot be used
          when mood or health is already at 100%.
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
          points, capped at 100% health or mood. You need at least one crew
          member, and an action is unavailable when it would not raise your
          crew&apos;s health or mood any further.
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
          src="/img/location/port-royale/city-hall.png"
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
          difference. Changing citizenship can give you a lower title than the
          one you previously held. Each title&apos;s gold reward is only paid
          once: you only receive a reward for a title higher than any you have
          been rewarded for before, whether through promotion or a change of
          citizenship.
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
          When you arrive in a town you start at the harbor, where you can see
          the whole town. Click a building to go inside, and choose Back to town
          to return to the harbor. Each town has its own named shop, tavern,
          bank, market, shipyard and city hall, but they all offer the same
          services.
        </p>

        <p className="mb-4">
          The harbor also shows your advisor. Problems listed under Before you
          sail stop you from leaving port, while those under Worth a look are
          only advice. When nothing needs your attention, the advisor tells you
          that you are ready to set sail. Open the map with the Set sail button
          at the harbor, or with Travel in the bottom menu on mobile.
        </p>

        <p className="mb-4">
          You can visit any town regardless of your nationality. Choose another
          town on the map to start a journey. If you cannot leave port, the
          advisor explains which problems you need to resolve in a popup. You
          stay at your current location until you are ready to sail. While at
          sea, the map shows your ship sailing one day at a time along its
          route, stopping whenever you encounter another ship.
        </p>

        <h3 className="mb-2 font-serif text-lg">Time</h3>

        <p className="mb-4">
          Time is measured in days in Lost Seas. Each normal journey step
          advances one day, including arrival at your destination. Starting a
          journey and visiting locations in town do not advance the calendar.
          Journeys continue automatically between ship encounters. Sailing
          pauses at an encounter or battle report. Choose Attack or Ignore when
          you meet a ship, fight the battle round by round, and choose Continue
          journey after the battle to resume sailing.
        </p>

        <p className="mb-4">
          Continuing after a battle report does not advance the date. It uses
          supplies unless you are on the final travel day. On that day, your
          ship finishes sailing to town before arrival advances the date and
          uses supplies.
        </p>

        <h3 className="mb-2 font-serif text-lg">Weather</h3>

        <p className="mb-4">
          The weather shown depends on the current game day. It does not affect
          travel, supply consumption or battles.
        </p>

        <h3 className="mb-2 font-serif text-lg">Battles at sea</h3>

        <Image
          src="/img/ship-meeting/pirate-galleon.png"
          width={800}
          height={600}
          alt="Meeting a ship"
          className="mx-auto mb-4"
        />

        <p className="mb-4">
          You can encounter ships from any nation, as well as pirates. Ships
          from your destination&apos;s nation are more common, so sail towards
          one of its towns if you want to find that nation&apos;s ships.
        </p>

        <p className="mb-4">
          You can ignore an encounter to continue sailing without fighting. If
          you attack, the battle is fought over up to {BATTLE_MAX_ROUNDS}{" "}
          rounds. Each round, choose to fire or evade. Firing hits more often
          the more manned cannons you have compared with the opponent. Against a
          ship with as many cannons as you have manned, about{" "}
          {Math.round(BASE_HIT_CHANCE * 100)}% of your shots hit. Attacking a
          ship with more cannons is risky.
        </p>

        <ul className="mb-4 list-disc pl-6">
          <li className="mb-2">
            Both sides start the battle with 100% battle strength. It only
            exists during the battle and is separate from your ships&apos;
            health.
          </li>
          <li className="mb-2">
            When you fire and win the move, the enemy loses 30–50% battle
            strength. When you lose it, you lose 10–25% battle strength and each
            of your ships loses 3–8% health. Your crew loses 1–2% health, plus
            1% for every {CREW_DAMAGE_STRENGTH_STEP}% battle strength you have
            already lost, so missed shots hurt more when the battle is going
            badly.
          </li>
          <li className="mb-2">
            Evading succeeds {EVADE_CHANCE}% of the time, whatever your cannons.
            If it succeeds, you take no damage. If it fails, you lose 5–12%
            battle strength, each of your ships loses 1–4% health and your crew
            loses 1–3% health. Evading never damages the enemy.
          </li>
          <li>
            The side whose battle strength reaches 0% loses. After the last
            round, the side with the most battle strength left wins, and a draw
            counts as a defeat.
          </li>
        </ul>

        <p className="mb-4">
          Each move is saved as you make it, so you can come back to a battle at
          any time. You cannot ignore the ship or sail on until the battle is
          over.
        </p>

        <p>
          After a battle, a report shows your loot, recruits, damage and any
          losses. Your crew only loses health during the rounds, not when the
          battle ends.
        </p>

        <p className="mt-4">
          If you lose, the enemy takes all the gold you carry and everything of
          1–3 goods in your hold. Gold in the bank, treasures, cannons and
          repair kits are safe. If you have more than one ship, there is a 1 in
          3 chance that one of them sinks.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default GuideContent
