import Image from "next/image"
import { BiArrowToTop } from "react-icons/bi"

import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"

const GuideContent = () => {
  const goToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <nav>
        <ul className="flex flex-wrap gap-2 md:gap-4 my-8 justify-around md:justify-center">
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("supplies")}
            >
              Supplies
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("ships")}
            >
              Ships
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("crew-members")}
            >
              Crew members
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("social-status")}
            >
              Social status
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("economy")}
            >
              Economy
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-sm md:btn-md"
              onClick={() => goToSection("traveling")}
            >
              Traveling
            </button>
          </li>
        </ul>
      </nav>

      <div className="divider my-8" />

      <div className="max-w-2xl mx-auto">
        <h2 id="supplies" className="text-3xl font-serif mb-4">
          Supplies
        </h2>

        <h3 className="text-2xl font-serif mb-2">Buying and selling</h3>

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
        />

        <p className="my-4">
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
        />

        <h3 className="text-2xl font-serif mt-4 mb-2">Food and water</h3>

        <p className="mb-4">
          You and your crew will need both food and water for traveling at sea.
          A half carton of food and a whole barrel of water for every crew
          member per week. You and your crew won&apos;t die however, but they
          will refuse to travel any longer. You&apos;ll be stranded until you
          can buy more food and water.
        </p>

        <h3 className="text-2xl font-serif mb-2">Barter goods</h3>

        <p className="mb-4">
          This includes tobacco, rum, porcelain, spices and silk. You don&apos;t
          have any use of these goods, but you will loot a lot of these at sea.
          You can them sell them at the shop and make some gold.
        </p>

        <div className="divider my-8" />

        <h2 id="ships" className="text-3xl font-serif mb-2">
          Ships
        </h2>

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
        />

        <p className="my-4">
          The third reason is that you will only lose part of your goods when
          loosing a battle, if you have more than one ship. If you have three
          ships, you will lose one third of your goods. They will still take all
          your gold though...
        </p>

        <p className="mb-4">
          When you start out as a pirate, you will only be able to own three
          ships. But as your rank get higher, you will be able to own 15 ships.
        </p>

        <h3 className="text-2xl font-serif mb-2">Different ship types</h3>

        <div className="overflow-x-auto">
          <table className="table bg-gray-950 bg-opacity-50 my-4">
            <thead>
              <tr>
                <th>Type</th>
                <th>Min crew members</th>
                <th>Max crew members</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Merchantman</td>
                <td>{SHIP_TYPES.Merchantman.minCrewMembers}</td>
                <td>{SHIP_TYPES.Merchantman.maxCrewMembers}</td>
                <td>{SHIP_TYPES.Merchantman.buy}</td>
              </tr>
              <tr>
                <td>Brig</td>
                <td>{SHIP_TYPES.Brig.minCrewMembers}</td>
                <td>{SHIP_TYPES.Brig.maxCrewMembers}</td>
                <td>{SHIP_TYPES.Brig.buy}</td>
              </tr>
              <tr>
                <td>Galleon</td>
                <td>{SHIP_TYPES.Galleon.minCrewMembers}</td>
                <td>{SHIP_TYPES.Galleon.maxCrewMembers}</td>
                <td>{SHIP_TYPES.Galleon.buy}</td>
              </tr>
              <tr>
                <td>Frigate</td>
                <td>{SHIP_TYPES.Frigate.minCrewMembers}</td>
                <td>{SHIP_TYPES.Frigate.maxCrewMembers}</td>
                <td>{SHIP_TYPES.Frigate.buy}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-serif mb-2">Cannons</h3>

        <p className="mb-4">
          Cannons are needed for battles at sea. It&apos;s the amount of manned
          cannons that controls if you win or lose, and also how powerful ships
          you will meet. You will need two crew members to control one cannon,
          which means that if you have 20 cannons, and 30 crew members, you will
          still only be able to use 15 of them.
        </p>

        <div className="divider my-8" />

        <h2 id="crew-members" className="text-3xl font-serif mb-2">
          Crew members
        </h2>

        <h3 className="text-2xl font-serif mb-2">Purpose of crew members</h3>

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
        />

        <h3 className="text-2xl font-serif my-4 mb-2">
          Getting more crew members
        </h3>

        <p className="mb-4">
          When you win battles at sea some of their crew will offer to join you.
          The other method is to visit the tavern and speak to the sailors
          there, they often want to offer their services for free.
        </p>

        <div className="divider my-8" />

        <h2 id="social-status" className="text-3xl font-serif mb-2">
          Social status
        </h2>

        <h3 className="text-2xl font-serif mb-2">Nations</h3>
        <p className="mb-4">
          This game takes place at the Spanish Main, in the Caribbean Sea at the
          1600th. There are four nations, battling over the towns. English,
          French, Spanish and Dutch.
        </p>

        <h3 className="text-2xl font-serif mb-2">Levels</h3>

        <p className="mb-4">
          The level system in this game is pretty simple. You belong to a
          nation, and for every ship you win over from that nations enemy will
          raise your level by 1. And if you fight your own nations ships it will
          be lowered by the same amount. Winning over neutral ships doesn&apos;t
          change your level, but it still meaningful to loot some gold from
          them.
        </p>

        <h3 className="text-2xl font-serif mb-2">Titles</h3>

        <Image
          src="/img/location/port-royale/city-hall.webp"
          width={800}
          height={460}
          alt="The City Hall"
        />

        <p className="my-4">
          Levels doesn&apos;t do anything by itself, but you will be judged by
          the nations governor (At the City Hall) by it. You will get promoted
          if you are doing a good job. You will then get a reward, and higher
          titles will let you own more ships, which in turn give access to more
          crew members, cannons and being able to load more goods. Some would
          say that the main goal of this game (if you need any) is to reach the
          highest title.
        </p>

        <h3 className="text-2xl font-serif mb-2">The different titles</h3>

        <div className="overflow-x-auto">
          <table className="table bg-gray-950 bg-opacity-50 my-4">
            <thead>
              <tr>
                <th>Level</th>
                <th>Title</th>
                <th>Reward</th>
                <th>Max ships</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>0-9</td>
                <td>{TITLE_INFO.Pirate.title}</td>
                <td>{TITLE_INFO.Pirate.reward} gold</td>
                <td>{TITLE_INFO.Pirate.maxShips}</td>
              </tr>

              <tr>
                <td>10-19</td>
                <td>{TITLE_INFO.Ensign.title}</td>
                <td>{TITLE_INFO.Ensign.reward} gold</td>
                <td>{TITLE_INFO.Ensign.maxShips}</td>
              </tr>

              <tr>
                <td>20-29</td>
                <td>{TITLE_INFO.Captain.title}</td>
                <td>{TITLE_INFO.Captain.reward} gold</td>
                <td>{TITLE_INFO.Captain.maxShips}</td>
              </tr>

              <tr>
                <td>30-39</td>
                <td>{TITLE_INFO.Major.title}</td>
                <td>{TITLE_INFO.Major.reward} gold</td>
                <td>{TITLE_INFO.Major.maxShips}</td>
              </tr>

              <tr>
                <td>40-49</td>
                <td>{TITLE_INFO.Colonel.title}</td>
                <td>{TITLE_INFO.Colonel.reward} gold</td>
                <td>{TITLE_INFO.Colonel.maxShips}</td>
              </tr>

              <tr>
                <td>50-64</td>
                <td>{TITLE_INFO.Admiral.title}</td>
                <td>{TITLE_INFO.Admiral.reward} gold</td>
                <td>{TITLE_INFO.Admiral.maxShips}</td>
              </tr>

              <tr>
                <td>65-79</td>
                <td>{TITLE_INFO.Baron.title}</td>
                <td>{TITLE_INFO.Baron.reward} gold</td>
                <td>{TITLE_INFO.Baron.maxShips}</td>
              </tr>

              <tr>
                <td>80-99</td>
                <td>{TITLE_INFO.Count.title}</td>
                <td>{TITLE_INFO.Count.reward} gold</td>
                <td>{TITLE_INFO.Count.maxShips}</td>
              </tr>

              <tr>
                <td>100-119</td>
                <td>{TITLE_INFO.Marquis.title}</td>
                <td>{TITLE_INFO.Marquis.reward} gold</td>
                <td>{TITLE_INFO.Marquis.maxShips}</td>
              </tr>

              <tr>
                <td>120+</td>
                <td>{TITLE_INFO.Duke.title}</td>
                <td>{TITLE_INFO.Duke.reward} gold</td>
                <td>{TITLE_INFO.Duke.maxShips}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-serif my-2">Changing nation</h3>

        <p className="mb-4">
          If you are not pleased by your nation you can actually change it. You
          do this by attacking the enemy of the nation you want to be a citizen
          of. So if you want to be English, attack a lot of French ships! When
          you have won over more French ships than over English ships you can
          get yourself a citizenship. The title you receive depends on your
          level (which depends on how many more French ships than English ships
          you have destroyed).
        </p>

        <p className="mb-4">
          Just to make things clear: If you are a Spanish citizen and have
          attacked 50 French ships even though this isn&apos;t your enemy, and
          you have not attacked any English ships, you will be an english
          Admiral at once when you get yourself an english citizenship.
        </p>

        <div className="divider my-8" />

        <h2 id="economy" className="text-3xl font-serif mb-4">
          Economy
        </h2>

        <h3 className="text-2xl font-serif mb-2">Getting some gold</h3>

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

        <h3 className="text-2xl font-serif mb-2">Saving money</h3>

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

        <h3 className="text-2xl font-serif mb-2">Loans</h3>

        <p className="mb-4">
          You can also take a loan if the game are tough on you. You cannot loan
          more than 10 000 gold. The loans are free of charge, but you cannot
          add gold to your account until you have payed off your loan.
        </p>

        <div className="divider my-8" />

        <h2 id="traveling" className="text-3xl font-serif mb-2">
          Traveling
        </h2>

        <h3 className="text-2xl font-serif mb-2">Towns and nations</h3>

        <Image
          src="/img/userguide/map.png"
          width={800}
          height={460}
          alt="The Spanish Main"
        />

        <p className="my-4">
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

        <h3 className="text-2xl font-serif mb-2">Time</h3>

        <p className="mb-4">
          Time is measured in weeks in Lost Seas. The time won&apos;t go by
          itself, but depends on your activity in the game. A week will pass
          when you travel from a town to the Caribbean Sea.
        </p>

        <h3 className="text-2xl font-serif mb-2">Weather</h3>

        <p className="mb-4">
          The weather will change by each passing day at sea, however it
          won&apos;t affect anything at the moment.
        </p>

        <h3 className="text-2xl font-serif mb-2">Battles at sea</h3>

        <Image
          src="/img/location/ship-meeting/ship-meeting5.webp"
          width={800}
          height={460}
          alt="Meeting a ship"
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

        <p className="mb-4">
          You will get a report on how much you won or lost during the battle.
        </p>
      </div>

      <button
        onClick={goToTop}
        className="fixed bottom-5 right-5 rounded-full bg-info bg-opacity-50 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-opacity-100 hover:shadow-lg focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-500 active:shadow-lg"
      >
        <BiArrowToTop className="w-7 h-7" />
      </button>
    </>
  )
}

export default GuideContent
