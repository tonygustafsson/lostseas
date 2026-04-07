"use client"

import Image from "next/image"

import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const SECTIONS = [
  "supplies",
  "ships",
  "crew-members",
  "social-status",
  "economy",
  "traveling",
]

type Props = {
  defaultOpen?: boolean
}

const GuideContent = ({ defaultOpen = false }: Props) => (
  <Accordion
    type="multiple"
    defaultValue={defaultOpen ? SECTIONS : []}
    className="my-6"
  >
    <AccordionItem value="supplies">
      <AccordionTrigger className="font-serif text-xl [&>svg]:mt-2">
        Supplies
      </AccordionTrigger>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Buying and selling</h3>

        <p className="mb-4">
          At the shop you can buy and sell everything your crew needs to be
          strong and healthy. For the most part you just want to buy food and
          water, and perhaps sell of some barter goods. You can also buy
          medicine that you can give to your crew members to increase their
          health.
        </p>

        <Image
          src="/img/location/port-royale/shop.webp"
          width={800}
          height={460}
          alt="The shop"
          className="mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          The market is a bit different - here you will get an offers, that is
          often cheaper than the shop. But you cannot control how much of it you
          want, and if you cannot afford it; too bad. It&apos;s a good idea to
          visit sometimes, buy some barter goods and sell it of at the shop.
        </p>

        <Image
          src="/img/location/belize/market.webp"
          width={800}
          height={460}
          alt="The market"
          className="mb-4 aspect-[1.74]"
        />

        <h3 className="mb-2 font-serif text-lg">Food and water</h3>

        <p className="mb-4">
          You and your crew will need both food and water for traveling at sea.
          A half carton of food and a whole barrel of water for every crew
          member per week. You and your crew won&apos;t die however, but they
          will refuse to travel any longer. You&apos;ll be stranded until you
          can buy more food and water.
        </p>

        <h3 className="mb-2 font-serif text-lg">Barter goods</h3>

        <p>
          This includes tobacco, rum, porcelain, spices and silk. You don&apos;t
          have any use of these goods, but you will loot a lot of these at sea.
          You can them sell them at the shop and make some gold.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="ships">
      <AccordionTrigger className="font-serif text-xl">Ships</AccordionTrigger>
      <AccordionContent>
        <p className="mb-4">
          If you lose in battle, one of your ships might be sunk. If you only
          have one ship you are safe. Another reason for having many ships is to
          be able to have more crew members. And more crew members means harder
          enemies - and <em>that</em> means more gold!
        </p>

        <Image
          src="/img/location/san-juan/shipyard.webp"
          width={800}
          height={460}
          alt="The shipyard"
          className="mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          The third reason is that you will only lose part of your goods when
          loosing a battle, if you have more than one ship. If you have three
          ships, you will lose one third of your goods. They will still take all
          your gold though...
        </p>

        <p className="mb-4">
          When you start out as a pirate, you will only be able to own three
          ships. But as your rank get higher, you will be able to own 15 ships.
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

        <h3 className="my-6 font-serif text-lg">Cannons</h3>

        <p>
          Cannons are needed for battles at sea. It&apos;s the amount of manned
          cannons that controls if you win or lose, and also how powerful ships
          you will meet. You will need two crew members to control one cannon,
          which means that if you have 20 cannons, and 30 crew members, you will
          still only be able to use 15 of them.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="crew-members">
      <AccordionTrigger className="font-serif text-xl">
        Crew members
      </AccordionTrigger>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Purpose of crew members</h3>

        <p className="mb-4">
          The only real reason to have crew members is so that they can fight
          battles with you. To fire a cannon, you&apos;ll need two crew members.
        </p>

        <p className="mb-4">
          They demands things in return for their services. They become less
          happy when they do boring stuff, like losing battles and traveling the
          great Caribbean Sea. When they are angry they will refuse to leave
          port with you.
        </p>

        <p className="mb-4">
          In order to fix this you have to please them, with food and drinks.
          You can visit the tavern and buy them some wine perhaps, or give them
          some of your gold.
        </p>

        <p className="mb-4">
          You are also responsible for their health. If the health goes to 0
          they will not die, but they cannot follow you on your next journey.
          You can give them medicine after battles.
        </p>

        <Image
          src="/img/userguide/crew.png"
          width={800}
          height={460}
          alt="Crew stats"
          className="mb-4 aspect-[1.74]"
        />

        <h3 className="mb-2 font-serif text-lg">Getting more crew members</h3>

        <p>
          When you win battles at sea some of their crew will offer to join you.
          The other method is to visit the tavern and speak to the sailors
          there, they often want to offer their services for free.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="social-status">
      <AccordionTrigger className="font-serif text-xl">
        Social status
      </AccordionTrigger>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Nations</h3>
        <p className="mb-4">
          This game takes place at the Spanish Main, in the Caribbean Sea at the
          1600th. There are four nations, battling over the towns. English,
          French, Spanish and Dutch.
        </p>

        <h3 className="mb-2 font-serif text-lg">Levels</h3>

        <p className="mb-4">
          The level system in this game is pretty simple. You belong to a
          nation, and for every ship you win over from that nations enemy will
          raise your level by 1. And if you fight your own nations ships it will
          be lowered by the same amount. Winning over neutral ships doesn&apos;t
          change your level, but it still meaningful to loot some gold from
          them.
        </p>

        <h3 className="mb-2 font-serif text-lg">Titles</h3>

        <Image
          src="/img/location/port-royale/city-hall.webp"
          width={800}
          height={460}
          alt="The City Hall"
          className="mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          Levels doesn&apos;t do anything by itself, but you will be judged by
          the nations governor (At the City Hall) by it. You will get promoted
          if you are doing a good job. You will then get a reward, and higher
          titles will let you own more ships, which in turn give access to more
          crew members, cannons and being able to load more goods. Some would
          say that the main goal of this game (if you need any) is to reach the
          highest title.
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
              <TableCell>0-9</TableCell>
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
          If you are not pleased by your nation you can actually change it. You
          do this by attacking the enemy of the nation you want to be a citizen
          of. So if you want to be English, attack a lot of French ships! When
          you have won over more French ships than over English ships you can
          get yourself a citizenship. The title you receive depends on your
          level (which depends on how many more French ships than English ships
          you have destroyed).
        </p>

        <p>
          Just to make things clear: If you are a Spanish citizen and have
          attacked 50 French ships even though this isn&apos;t your enemy, and
          you have not attacked any English ships, you will be an english
          Admiral at once when you get yourself an english citizenship.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="economy">
      <AccordionTrigger className="font-serif text-xl">
        Economy
      </AccordionTrigger>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Getting some gold</h3>

        <p className="mb-4">
          The currency in this game is gold, for which you can buy and sell
          almost anything. You will mostly get money from looting ships at sea,
          but you can also sell your goods, gamble for it, or fight at the bar.
        </p>

        <p className="mb-4">
          Oh, there is also treasures to be found! Sometimes when you are
          winning a battle you will find these. The value can be really high,
          but they need to be return to the correct Governor.
        </p>

        <h3 className="mb-2 font-serif text-lg">Saving money</h3>

        <p className="mb-4">
          There is a banking system in this game. When you lose a battle at sea,
          you will lose all your gold, no matter how many ships you&apos;ve got.
          It would be impossible to achieve anything if you couldn&apos;t save
          it in a safe place.
        </p>

        <p className="mb-4">
          You have a bank account that you can put your money into and out of no
          matter which nation you are in. If you put in 100 dbl in Panama, you
          can take it out in Port Royale without any trouble.
        </p>

        <p className="mb-4">
          It&apos;s recommended to only have cash when you are in a town, for
          buying and selling. Before you leave, you should put the rest in your
          account. There is however a small tax of 5 %. If you put in 100 dbl,
          you can only get 95 dbl back.
        </p>

        <h3 className="mb-2 font-serif text-lg">Loans</h3>

        <p>
          You can also take a loan if the game are tough on you. You cannot loan
          more than 10 000 gold. The loans are free of charge, but you cannot
          add gold to your account until you have payed off your loan.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="traveling">
      <AccordionTrigger className="font-serif text-xl">
        Traveling
      </AccordionTrigger>
      <AccordionContent>
        <h3 className="mb-2 font-serif text-lg">Towns and nations</h3>

        <Image
          src="/img/userguide/map.png"
          width={800}
          height={460}
          alt="The Spanish Main"
          className="mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          All existing towns actually existed in the 1600th. The towns
          nationality varied from year to year though.
        </p>

        <p>
          <strong>English towns:</strong> Charles Towne, Barbados, Port Royale,
          Belize.
        </p>

        <p>
          <strong>French towns: </strong> Tortuga, Leogane, Martinique, Biloxi.
        </p>

        <p>
          <strong>Spanish towns:</strong> Panama, Havana, Villa Hermosa, San
          Juan.
        </p>

        <p className="mb-4">
          <strong>Dutch towns:</strong> Bonaire, Curacao, St. Martin, St.
          Eustatius.
        </p>

        <p className="mb-4">
          You can visit which of these you want, no matter which nationality you
          belongs to.
        </p>

        <h3 className="mb-2 font-serif text-lg">Time</h3>

        <p className="mb-4">
          Time is measured in weeks in Lost Seas. The time won&apos;t go by
          itself, but depends on your activity in the game. A week will pass
          when you travel from a town to the Caribbean Sea.
        </p>

        <h3 className="mb-2 font-serif text-lg">Weather</h3>

        <p className="mb-4">
          The weather will change by each passing day at sea, however it
          won&apos;t affect anything at the moment.
        </p>

        <h3 className="mb-2 font-serif text-lg">Battles at sea</h3>

        <Image
          src="/img/location/ship-meeting/ship-meeting5.webp"
          width={800}
          height={460}
          alt="Meeting a ship"
          className="mb-4 aspect-[1.74]"
        />

        <p className="mb-4">
          You will find ships from England, France, Spain and Holland. You will
          also find some pirates. If you want to attack a ship from a particular
          nation it is suggested that you travel to a town of that nation.
        </p>

        <p className="mb-4">
          Be careful when attacking ships that have more manned cannons than you
          have. The is a random factor here, so you can win if the gap
          isn&apos;t too big. But it&apos;s really risky! It&apos;s the amount
          of functional cannons that decides if you will lose or not.
        </p>

        <p>
          You will get a report on how much you won or lost during the battle.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default GuideContent
