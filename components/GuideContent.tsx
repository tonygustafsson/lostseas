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
import { VENTURES } from "@/constants/ventures"
import { cn } from "@/lib/utils"
import { MEDICINE_HEALTH_PER_BOX } from "@/utils/crew"
import { formatGold } from "@/utils/number"
import { BATTLE_MAX_ROUNDS } from "@/utils/seaBattle"
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
  "account",
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
    <h2 className={cn(className, "text-accent px-4 pt-6 text-2xl sm:text-3xl")}>
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
        "bg-card/90 border-border [&_[data-slot=accordion-content]_img]:border-border **:data-[slot=accordion-item]:border-border my-8 **:data-[slot=accordion-content]:text-base **:data-[slot=accordion-content]:leading-7 sm:**:data-[slot=accordion-content]:text-lg [&_[data-slot=accordion-content]_h3]:my-6 [&_[data-slot=accordion-content]_h3]:text-xl [&_[data-slot=accordion-content]_img]:rounded-xl [&_[data-slot=accordion-content]_img]:border [&_[data-slot=accordion-item][data-open]]:bg-transparent"
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
          The shop is where you buy and sell food, water, medicine and barter
          goods. Stock up before a voyage, sell your loot, and pick up medicine
          when your crew is in bad shape.
        </p>

        <p className="mb-4">
          Every crate, barrel, box, bolt or bale takes one slot in your hold.
          Cannons and repair kits take no space at all. Each item tells you how
          much you can own and whether gold or cargo space is holding you back,
          and the trade summary shows how full your hold will be afterwards. You
          can always sell, but you can only buy what fits.
        </p>

        <p className="mb-4">
          Trading works by setting how much of each item you want to own. Set it
          lower than what you have and you sell the rest. Set it higher and you
          buy the difference. You can change several items in one go, so the
          gold from one sale can pay for another purchase. Nothing happens until
          you press Transfer, and then either the whole trade goes through or
          none of it does. The day buttons top up food and water for that many
          days, counting what you already carry.
        </p>

        <Image
          src="/img/location/port-royale/shop.png"
          width={800}
          height={460}
          alt="The shop"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          The market sells fixed batches of goods, often cheaply. You buy the
          whole batch or nothing, so you need gold for all of it. If you plan to
          resell, compare the offer with what the shop pays and check that a
          shop in town actually accepts those goods. Offers can include goods
          the local shop doesn&apos;t trade, and sometimes cannons or repair
          kits, which normally come from the shipyard.
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
          The apothecary in the market sells remedies that heal your whole crew
          at once. Each remedy restores a fixed amount of health and costs{" "}
          {formatGold(APOTHECARY_PRICE_PER_POINT)} per crew member for every
          point it gives. You pay full price even if your crew only needs a
          little, so choose the remedy that matches how hurt they are. Picked
          well, it&apos;s the cheapest way to heal in port. You can&apos;t buy a
          remedy without a crew, or when they&apos;re already in full health.
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
                <TableCell>+{remedy.healthIncrease}</TableCell>
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
          You need enough food and water for every day at sea, so far-off towns
          need bigger stores. Every 10 crew members eat a crate of food a day,
          and every 5 drink a barrel of water, rounded to whole units. Even a
          tiny crew gets through at least one of each. Towns your supplies
          won&apos;t get you to have yellow labels on the map, and your advisor
          warns you when some ports are out of reach. When you pick a town, you
          see the distance and what you need before you confirm.
        </p>

        <p className="mb-4">
          Every day at sea eats into your food and water. If you run out, the
          voyage still carries on, but you&apos;ll have to restock before you
          can sail again.
        </p>

        <h3 className="mb-2 font-serif text-lg">Barter goods</h3>

        <p className="mb-4">
          Barter goods are {BARTER_GOODS.join(", ")}. Loot them in battle or buy
          them at the market, then sell them where a shop wants them. They exist
          to be traded. The tavern charges gold for its food, tobacco and rum,
          so it never touches what&apos;s in your hold.
        </p>

        <p className="mb-4">
          Every shop trades tobacco and rum. The rest only sell in the towns
          listed in the merchandise reference above. Sell all barter goods sells
          everything the local shop accepts and keeps the rest aboard.
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
          Lose a sea battle and one of your ships may go down, though never your
          last one. That one only takes damage. A bigger fleet holds a bigger
          crew, and a bigger crew mans more cannons. The ships you meet grow
          stronger along with you, and stronger ships tend to carry more gold.
        </p>

        <Image
          src="/img/location/san-juan/shipyard.png"
          width={800}
          height={460}
          alt="The shipyard"
          className="mx-auto mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          A Pirate can own {TITLE_INFO.Pirate.maxShips} ships. Every promotion
          raises the limit, and a Duke can command {TITLE_INFO.Duke.maxShips}.
        </p>

        <h3 className="mb-2 font-serif text-lg">Different ship types</h3>

        <Table className="mb-6 rounded-xl bg-black/60">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Min crew members</TableHead>
              <TableHead>Max crew members</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Merchantman</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.cargoCapacity}</TableCell>
              <TableCell>{SHIP_TYPES.Merchantman.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brig</TableCell>
              <TableCell>{SHIP_TYPES.Brig.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Brig.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Brig.cargoCapacity}</TableCell>
              <TableCell>{SHIP_TYPES.Brig.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Galleon</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.cargoCapacity}</TableCell>
              <TableCell>{SHIP_TYPES.Galleon.buy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Frigate</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.minCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.maxCrewMembers}</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.cargoCapacity}</TableCell>
              <TableCell>{SHIP_TYPES.Frigate.buy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="my-6 font-serif text-lg">Cargo</h3>

        <p className="mb-4">
          Your hold is the cargo space of all your ships added together. Food,
          water, medicine and barter goods take one slot each, while cannons and
          repair kits take none. Crew &amp; Fleet shows how full you are. An
          overloaded fleet can&apos;t leave port, so sell some goods or buy
          another ship. You can still sell or remove a ship that leaves you
          overloaded, but the game warns you first.
        </p>

        <h3 className="my-6 font-serif text-lg">Ship health and repairs</h3>

        <p className="mb-4">
          Your ships take damage whenever the enemy lands a hit, whether you win
          the battle or not. A ship with no health left is disabled, and you
          can&apos;t leave port until it&apos;s fixed. The shipyard repairs
          ships for {formatGold(SHIP_REPAIR_COST)} per point of damage. It also
          buys any ship for half what it cost new, however battered it is. You
          need at least one ship to sail. You can remove ships from your fleet,
          just not while at sea and not your last one.
        </p>

        <p className="mb-4">
          Repair kits let you patch up a ship anywhere, even in the middle of a
          voyage. Shipyards sell them for{" "}
          {formatGold(MERCHANDISE.repairKits.buy)} and buy them back for{" "}
          {formatGold(MERCHANDISE.repairKits.sell)}. To use one, open Crew &amp;
          Fleet, click Use under Equipment &gt; Repair kits, and pick a ship and
          how many kits to spend. Each kit restores up to {REPAIR_KIT_HEALTH}{" "}
          health. You can also find kits in market offers and battle loot.
        </p>

        <p className="mb-4">
          A half-wrecked ship needs five kits, and two of them need ten. Fewer
          kits give a partial repair, but a small repair still uses up a whole
          kit. Kits cost a little more than the shipyard does for the same
          repair, so they&apos;re best saved for when you&apos;re at sea.
        </p>

        <h3 className="my-6 font-serif text-lg">Cannons</h3>

        <p>
          Your manned cannons decide how hard you hit, and how strong the ships
          you meet will be. Each cannon needs two crew members, so 20 cannons
          and 30 crew give you 15 manned cannons. Cannons without a crew do
          nothing in battle. The shipyard buys and sells them, and you&apos;re
          allowed to sail without any.
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
          Your crew sails the ships and mans the cannons, two sailors to a gun.
          To leave port, you need at least as many crew as your ships require
          together, and no more than they can hold.
        </p>

        <p className="mb-4">
          Long voyages wear sailors down. Their mood drops a little every day at
          sea, and a win in battle lifts it a lot. If their mood hits rock
          bottom, they refuse to leave port.
        </p>

        <p className="mb-4">
          Cheer them up at the tavern, or hand out gold with Give gold in Manage
          Crew. A bigger crew costs more gold to please.
        </p>

        <p className="mb-4">
          Sea battles and tavern brawls cost your crew health. Nobody dies, but
          an exhausted crew won&apos;t start a new journey. Heal them with Give
          medicine in Manage Crew, a remedy from the apothecary, or Serve supper
          at the tavern. Each box of medicine gives {MEDICINE_HEALTH_PER_BOX}{" "}
          health, shared across the whole crew, so a large crew needs more
          boxes. Give gold and Give medicine need a crew, and do nothing once
          mood or health is full.
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
          After a victory, some of the beaten crew may sign on with you.
          Friendly sailors at the tavern sometimes offer to join for free, too.
          New recruits can push you over what your fleet can hold, so buy
          another ship or dismiss a few before you sail.
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
          A happy crew starts at the tavern. Serve supper, smoke tobacco, pour
          the wine or pass the rum to lift their mood, and supper heals them as
          well. You pay for every crew member. You can&apos;t order a round
          without a crew, or when it wouldn&apos;t make them any happier or
          healthier.
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
                <TableCell>{formatGold(item.price)}</TableCell>
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
          Some sailors at the tavern are happy to join your crew for free.
          Others are spoiling for a fight. Beat them and you pocket a little
          gold, but your crew gets hurt either way. You can always ignore them
          and walk away.
        </p>

        <h3 className="mb-2 font-serif text-lg">Cards</h3>

        <p>
          Pick how much of your gold to bet, then choose one of five cards. Pick
          the right one and you win five times your bet. Pick wrong and you lose
          it. Bet all of 100 gold and you walk away with 600 or nothing. The bet
          is at least 1 gold and only comes from what you carry, never the bank.
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
          Lost Seas takes place in the 17th century Caribbean, where{" "}
          {Object.keys(NATIONS).join(", ")} fight over the islands. England is
          at war with {NATIONS.England.warWith}, and Spain with{" "}
          {NATIONS.Spain.warWith}.
        </p>

        <h3 className="mb-2 font-serif text-lg">Levels</h3>

        <p className="mb-4">
          Your nation rewards you for beating its enemy. Every victory against
          the enemy raises your level by one, and losing to them costs you
          nothing. Attacking your own nation&apos;s ships lowers your level by
          one, win or lose. Neutral nations and pirates don&apos;t affect your
          level at all, but beating them still pays in gold.
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
          The higher your level, the better the title the governor offers you at
          the City Hall. Visit a town of your own nation to accept a promotion.
          Each one pays gold and lets you own more ships, which means more crew,
          more cannons and more cargo. Once you have a title you keep it, even
          if your level drops later. Working your way up to Duke is one goal
          worth chasing.
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
              <TableCell>{formatGold(TITLE_INFO.Pirate.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Pirate.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10-19</TableCell>
              <TableCell>{TITLE_INFO.Ensign.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Ensign.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Ensign.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>20-29</TableCell>
              <TableCell>{TITLE_INFO.Captain.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Captain.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Captain.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>30-39</TableCell>
              <TableCell>{TITLE_INFO.Major.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Major.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Major.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>40-49</TableCell>
              <TableCell>{TITLE_INFO.Colonel.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Colonel.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Colonel.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>50-64</TableCell>
              <TableCell>{TITLE_INFO.Admiral.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Admiral.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Admiral.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>65-79</TableCell>
              <TableCell>{TITLE_INFO.Baron.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Baron.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Baron.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>80-99</TableCell>
              <TableCell>{TITLE_INFO.Count.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Count.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Count.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>100-119</TableCell>
              <TableCell>{TITLE_INFO.Marquis.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Marquis.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Marquis.maxShips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120+</TableCell>
              <TableCell>{TITLE_INFO.Duke.title}</TableCell>
              <TableCell>{formatGold(TITLE_INFO.Duke.reward)}</TableCell>
              <TableCell>{TITLE_INFO.Duke.maxShips}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="mb-2 font-serif text-lg">Changing nation</h3>

        <p className="mb-4">
          You can switch sides at the City Hall of any town belonging to the
          nation you want to join. They&apos;ll take you if you&apos;ve beaten
          their enemy more often than you&apos;ve fought them, counting your
          defeats too. The difference sets your new title, which may be lower
          than the one you have now. Title rewards are only paid once, so you
          only get gold for a title higher than any you&apos;ve been paid for
          before.
        </p>

        <p>
          Say you&apos;re Spanish with 50 wins against French ships and
          you&apos;ve never attacked an English ship. England will welcome you
          as an Admiral.
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
          You earn gold by plundering ships, selling goods or ships, collecting
          title rewards, and winning at cards or in tavern brawls.
        </p>

        <p className="mb-4">
          Now and then a won battle turns up a treasure. Each one belongs to a
          particular town, and that town&apos;s City Hall pays you gold for it.
        </p>

        <p className="mb-4">
          Beat a pirate ship and you might capture a famous wanted pirate. Each
          one is wanted by a particular town, and that town&apos;s City Hall
          pays a bounty that depends on the crimes they committed. You can see
          your prisoners in the Crew & Fleet drawer.
        </p>

        <h3 className="mb-2 font-serif text-lg">Saving money</h3>

        <p className="mb-4">
          Lose a sea battle and the enemy takes every coin you carry, however
          big your fleet. Gold in the bank stays safe.
        </p>

        <p className="mb-4">
          Every bank shares the same account, whatever the town or nation.
          Deposit 100 gold in Panama and you can take it out again in Port
          Royale.
        </p>

        <p className="mb-4">
          Before you sail, keep what you need for shopping and bank the rest. If
          you have a loan, pay it off first, because you can&apos;t deposit
          until you do.
        </p>

        <h3 className="mb-2 font-serif text-lg">Loans</h3>

        <p>
          The bank lends you up to {formatGold(LOAN_LIMIT)} in total, with no
          interest or fees. Until it&apos;s fully repaid you can&apos;t deposit,
          but you can still withdraw your savings. Pay it back bit by bit or all
          at once.
        </p>

        <h3 className="mt-4 mb-2 font-serif text-lg">Ventures</h3>

        <p className="mb-4">
          The bank also sells shares in famous trading voyages. You pay the
          stake from the gold you carry, so withdraw savings or take a loan if
          you&apos;re short. Each voyage comes back after a set number of days,
          your advisor lets you know, and you collect your share at any bank.
        </p>

        <p className="mb-4">
          Bigger stakes pay better, and they&apos;re riskier too. You won&apos;t
          know how the voyage went until you collect. A share can return more
          than you paid, less, or nothing at all. You can hold one share in each
          venture at a time.
        </p>

        <ul className="list-disc pl-6">
          {Object.values(VENTURES).map((venture) => (
            <li key={venture.name}>
              {venture.name}, {venture.origin} to {venture.destination}:{" "}
              {formatGold(venture.stake)} for {venture.days} days,{" "}
              {venture.risk.toLowerCase()} risk.
            </li>
          ))}
        </ul>
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
          Every town flies the flag of one of the four nations.
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
          You arrive at the harbor, with the whole town laid out in front of
          you. Click a building to step inside, and Back to town takes you to
          the harbor again. Every town has its own shop, tavern, bank, market,
          shipyard and city hall. The names differ but they all work the same.
        </p>

        <p className="mb-4">
          Your advisor waits at the harbor. Anything under Before you sail has
          to be sorted out before you can leave. Worth a look is just friendly
          advice. When all is well, the advisor says you&apos;re ready to set
          sail. Open the map with Set sail at the harbor, or Travel in the
          bottom menu on mobile.
        </p>

        <p className="mb-4">
          You&apos;re welcome in every town, whatever your nationality. Pick one
          on the map to set off. If something is stopping you, the advisor pops
          up to explain, and you stay put until it&apos;s fixed. At sea, the map
          follows your ship one day at a time and stops whenever another ship
          comes into view.
        </p>

        <h3 className="mb-2 font-serif text-lg">Time</h3>

        <p className="mb-4">
          Time passes in days. Each day of sailing moves the calendar on by one,
          and so does arriving. Setting off and walking around town take no time
          at all. Your ship sails on by itself until it meets another ship or a
          battle ends. When you meet a ship, choose what to do, fight the battle
          round by round if it comes to that, and press Continue journey
          afterwards. After a victory with goods to plunder, Take loot and sail
          on does both at once.
        </p>

        <p className="mb-4">
          Sailing on after a battle doesn&apos;t cost a day or any supplies. If
          the battle happened on the final day, your ship sails into town next,
          and arriving uses the day and the supplies as usual.
        </p>

        <h3 className="mb-2 font-serif text-lg">Weather</h3>

        <p className="mb-4">
          The weather changes from day to day, but it&apos;s only for show. It
          doesn&apos;t affect sailing, supplies or battles.
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
          You&apos;ll run into ships from every nation, and pirates too. Out on
          the open sea any flag is as likely as the next. On the last day of a
          voyage, most ships come from your destination&apos;s nation, so head
          for one of its towns if you&apos;re hunting its ships.
        </p>

        <p className="mb-4">
          Most ships let you choose: attack, or ignore them and sail on. Some
          come at you instead. Your own nation&apos;s ships never do, but your
          enemy&apos;s ships and pirates often will, and other nations now and
          then. You can&apos;t ignore a ship that&apos;s attacking you. Fight
          back, or try to flee. Fleeing usually works, and when it doesn&apos;t,
          the battle starts anyway.
        </p>

        <p className="mb-4">
          A battle lasts up to {BATTLE_MAX_ROUNDS} rounds, and each round you
          either fire or evade. The more manned cannons you have compared with
          your opponent, the more often your shots hit. Against an equal ship,
          most of them land. Taking on a ship with more cannons than you is a
          gamble.
        </p>

        <ul className="mb-4 list-disc pl-6">
          <li className="mb-2">
            Both sides start at full battle strength. It only counts during the
            fight and has nothing to do with your ships&apos; health.
          </li>
          <li className="mb-2">
            When you fire, one side wins the exchange. If it&apos;s you, the
            enemy loses battle strength. If it&apos;s them, you lose battle
            strength, your ships get hit and your crew gets hurt. The worse the
            battle is going, the more your crew suffers.
          </li>
          <li className="mb-2">
            Evading is a coin toss, however many cannons you have. Get it right
            and nothing hits you. Get it wrong and you take a lighter hit than a
            lost exchange of fire. Evading never hurts the enemy.
          </li>
          <li>
            Whoever runs out of battle strength loses. If both are still afloat
            after the last round, the side with more strength left wins, and a
            draw counts as your defeat.
          </li>
        </ul>

        <p className="mb-4">
          Every move is saved, so you can leave and come back to a battle
          whenever you like. Once it starts, you have to see it through before
          you can sail on.
        </p>

        <p>
          Afterwards, a report shows your loot, recruits, damage and losses.
          Gold, recruits and treasure go straight to you. For goods, use the
          sliders to choose how much of each to take. Whatever fits is picked
          for you, food and water first and then the most valuable goods.
          Anything you leave behind goes down with the enemy ship, and your
          voyage carries on.
        </p>

        <p className="mt-4">
          If you lose, the enemy takes all the gold you carry and every last
          unit of one to three of your goods. Your bank savings, treasures,
          cannons and repair kits are safe. With more than one ship, you might
          also lose one to the sea.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default GuideContent
