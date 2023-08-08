import React from "react"
import { BiArrowToTop } from "react-icons/bi"

import DefaultLayout from "@/components/layouts/default"

const goToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const Guide = () => (
  <DefaultLayout>
    <h1 className="text-4xl font-serif">Player guide</h1>

    <nav>
      <ul className="flex gap-4 my-8 justify-center">
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("supplies")}
          >
            Supplies
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("ships")}
          >
            Ships
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("crew-members")}
          >
            Crew members
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("social-status")}
          >
            Social status
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("economy")}
          >
            Economy
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => goToSection("traveling")}
          >
            Traveling
          </button>
        </li>
      </ul>
    </nav>

    <div className="divider" />

    <h2 id="supplies" className="text-3xl font-serif mb-4">
      Supplies
    </h2>

    <h3 className="text-2xl font-serif mb-4">Buying and selling</h3>

    <p className="mb-4">
      At the shop you can buy and sell everything your crew needs to be strong
      and healthy. For the most part you just want to buy food and water, and
      maybe sell of some barter goods. There are some goods that have no use but
      trading.
    </p>

    <p className="mb-4">
      The market is a bit different... here you will get an offer, that is
      almost always cheaper than the shop. But you cannot control how much of it
      you want, and if you cannot afford it; it will be a deal breaker.
      It&apos;s a good idea to visit sometimes, buy some barter goods and sell
      it of at the store the moment after.
    </p>

    <h3 className="text-2xl font-serif mb-4">Food and water</h3>

    <p className="mb-4">
      You and your crew will need both food and water for traveling at sea. A
      half carton of food and a whole barrel of water for every crew member,
      including yourself, per week. You and your crew won&apos;t die however,
      but they will refuse to travel any longer. When this happens, you need to
      land your ship at the closest harbor and buy more at the shop.
    </p>

    <h3 className="text-2xl font-serif mb-4">Tobacco and rum</h3>

    <p className="mb-4">
      You won&apos;t <em>need</em> these, but it can come handy. Tobacco will
      raise your crew mood by 1 and rum will raise it by 3. You can give your
      crew these products by clicking in the inventory, choose which users to
      please, and choose which product to use, and click Do it!.
    </p>

    <h3 className="text-2xl font-serif mb-4">Medicine</h3>

    <p className="mb-4">
      The same way you can give your crew members tobacco and rum, you can also
      give them medicine. This will restore their health to 100 % and it can be
      used everywhere. There is a healer at the market, who is cheaper than
      using medicine, but you aren&apos;t always at a town. Besides, you will
      loot medicine from enemy ships anyway.
    </p>

    <h3 className="text-2xl font-serif mb-4">Barter goods</h3>

    <p className="mb-4">
      This includes porcelain, spices and silk. You don&apos;t have any use of
      these goods, but you will loot a lot of these at sea. You can them sell
      them at the shop and make money that way.
    </p>

    <div className="divider" />

    <h2 id="ships" className="text-3xl font-serif mb-4">
      Ships
    </h2>

    <p className="mb-4">
      If you lose in battle, and only have one ship you would have to swim to
      land with nothing at all (if you don&apos;t have any rafts). If you
      don&apos;t have any money at your bank account you will have to take a
      loan, or maybe reset the game and start over. Not fun at all!
    </p>

    <p className="mb-4">
      The second reason is that you will only lose part of your goods when
      loosing, if you have more than one ship. If you have three ships, you will
      lose one third of your goods. They will still take all your money
      though...
    </p>

    <p className="mb-4">
      The third reason is that a ship can only hold so many crew members,
      cannons and load. If you want to get more money, higher titles, you will
      need more crew members and cannons. This is not possible with one ship.
    </p>

    <p className="mb-4">
      When you start out as a pirate, you will only be able to own three ships.
      But as your rank get higher, you will be able to own 15 ships.
    </p>

    <h3 className="text-2xl font-serif mb-4">Different ship types</h3>

    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Min crew</th>
          <th>Max crew</th>
          <th>Max cannons</th>
          <th>Max load</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Brig</td>
          <td>2</td>
          <td>20</td>
          <td>10</td>
          <td>500 cartons</td>
        </tr>
        <tr>
          <td>Merchantman</td>
          <td>1</td>
          <td>10</td>
          <td>0</td>
          <td>1000 cartons</td>
        </tr>
        <tr>
          <td>Galleon</td>
          <td>4</td>
          <td>50</td>
          <td>25</td>
          <td>300 cartons</td>
        </tr>
        <tr>
          <td>Frigate</td>
          <td>8</td>
          <td>100</td>
          <td>50</td>
          <td>600 cartons</td>
        </tr>
      </tbody>
    </table>

    <h3 className="text-2xl font-serif mb-4">Cannons</h3>

    <p className="mb-4">
      Cannons are needed for battles at sea. It&apos;s the amount of cannons
      that controls if you win or lose, and also how powerful ships you will
      meet. You will need two crew members to control one cannon, which means
      that if you have 20 cannons, and 30 crew members, you will still only be
      able to use 15 of them.
    </p>

    <h3 className="text-2xl font-serif mb-4">Rafts</h3>

    <p className="mb-4">
      Rafts are used to save your life when you lose and only had one ship. One
      raft can save 10 crew members.
    </p>

    <div className="divider" />

    <h2 id="crew-members" className="text-3xl font-serif mb-4">
      Crew members
    </h2>

    <h3 className="text-2xl font-serif mb-4">Purpose of crew members</h3>

    <p className="mb-4">
      The only real reason to have crew members is so that they can fight
      battles with you. To fire a cannon, you&apos;ll need two crew members.
    </p>

    <p className="mb-4">
      They demands things in return for their services. They become less happy
      when they do boring stuff, like working, losing battles and traveling the
      great Caribbean Sea. When they are angry they will refuse to work / fight
      for you.
    </p>

    <p className="mb-4">
      In order to fix this you have to please them, with food and drinks. You
      can visit the tavern and buy them some wine perhaps, or give them rum from
      your goods if you have any.
    </p>

    <p className="mb-4">
      You are also responsible for their health. If they lose to much health
      they will die in battle. You can give them medicine after battles, or
      visit the towns healer when you are in land again.
    </p>

    <h3 className="text-2xl font-serif mb-4">Getting more crew members</h3>

    <p className="mb-4">
      When you win battles at sea some of their crew will offer to join you. You
      can then choose how many of them you want to accept. The other method is
      to visit the tavern and speak to the sailors there, they often want to
      offer their services for free. You could also visit the slave market, but
      it&apos;s expansive!
    </p>

    <h3 className="text-2xl font-serif mb-4">Get to know them</h3>

    <p className="mb-4">
      If you check your inventory you will get unnecessary amounts of
      information about your crew. All of them are separate beings, with their
      own name and description. You can also see for how long they have been
      with you, how much money they have gained of being your crew.
    </p>

    <div className="divider" />

    <h2 id="social-status" className="text-3xl font-serif mb-4">
      Social status
    </h2>

    <h3 className="text-2xl font-serif mb-4">Nations</h3>
    <p className="mb-4">
      This game takes place at the Spanish Main, in the Caribbean Sea at the
      1600th. There are four nations, battling over the towns. English, French,
      Spanish and Dutch.
    </p>

    <h3 className="text-2xl font-serif mb-4">Levels</h3>

    <p className="mb-4">
      The level system in this game is pretty simple. You belong to a nation,
      and for every ship you win over from that nations enemy will raise your
      level by 1. And if you fight your own nations ships it will be lowered by
      the same amount. Winning over neutral ships doesn&apos;t change your
      level, but it still meaningful to loot some gold from them.
    </p>

    <h3 className="text-2xl font-serif mb-4">Titles</h3>

    <p className="mb-4">
      Levels doesn&apos;t do anything by itself, but you will be judged by the
      nations governor (At the City Hall) by it. You will get promoted if you
      are doing a good job. You will then get a reward, and higher titles will
      let you own more ships, which in turn give access to more crew members,
      cannons and being able to load more goods. Some would say that the main
      goal of this game (if you need any) is to reach the highest title.
    </p>

    <h3 className="text-2xl font-serif mb-4">The different titles</h3>
    <table>
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
          <td>Pirate</td>
          <td>No reward</td>
          <td>3</td>
        </tr>

        <tr>
          <td>10-19</td>
          <td>Ensign</td>
          <td>1000 dbl</td>
          <td>5</td>
        </tr>

        <tr>
          <td>20-29</td>
          <td>Captain</td>
          <td>2500 dbl</td>
          <td>6</td>
        </tr>

        <tr>
          <td>30-39</td>
          <td>Major</td>
          <td>4000 dbl</td>
          <td>7</td>
        </tr>

        <tr>
          <td>40-49</td>
          <td>Colonel</td>
          <td>6000 dbl</td>
          <td>8</td>
        </tr>

        <tr>
          <td>50-64</td>
          <td>Admiral</td>
          <td>8000 dbl</td>
          <td>10</td>
        </tr>

        <tr>
          <td>65-79</td>
          <td>Baron</td>
          <td>10 000 dbl</td>
          <td>11</td>
        </tr>

        <tr>
          <td>80-99</td>
          <td>Count</td>
          <td>15 000 dbl</td>
          <td>12</td>
        </tr>

        <tr>
          <td>100-119</td>
          <td>Marquis</td>
          <td>20 000 dbl</td>
          <td>13</td>
        </tr>

        <tr>
          <td>120+</td>
          <td>Duke</td>
          <td>35 000 dbl</td>
          <td>15</td>
        </tr>
      </tbody>
    </table>

    <h3 className="text-2xl font-serif my-4">Changing nation</h3>

    <p className="mb-4">
      If you are not pleased by your nation you can actually change it. You do
      this by attacking the enemy of the nation you want to be a citizen of. So
      if you want to be English, attack a lot of French ships! When you have won
      over more French ships than over English ships you can buy yourself a
      citizenship. The title you receive depends on your level (which depends on
      how many more French ships than English ships you have destroyed).
    </p>

    <p className="mb-4">
      Just to make things clear: If you are a Spanish citizen and have attacked
      50 French ships even though this isn&apos;t your enemy, and you have not
      attacked any English ships, you will be an english Admiral at once when
      you buy yourself an english citizenship.
    </p>

    <div className="divider" />

    <h2 id="economy" className="text-3xl font-serif mb-4">
      Economy
    </h2>

    <h3 className="text-2xl font-serif mb-4">Getting some doubloons</h3>

    <p className="mb-4">
      The currency in this game is doubloons (dbl), for which you can buy and
      sell almost anything. You will mostly get money from looting ships at sea,
      but you can also sell your goods, gamble for it, fight at the bar or just
      old plain working.
    </p>

    <h3 className="text-2xl font-serif mb-4">Saving money</h3>

    <p className="mb-4">
      There is a banking system in this game. When you lose a battle at sea, you
      will lose all your doubloons, no matter how many ships you&apos;ve got. It
      would be impossible to achieve anything if you couldn&apos;t save it in a
      safe place.
    </p>

    <p className="mb-4">
      You have a bank account that you can put your money into and out of no
      matter which nation you are in. If you put in 100 dbl in Panama, you can
      take it out in Port Royale without any trouble.
    </p>

    <p className="mb-4">
      It&apos;s recommended to only have cash when you are in a town, for buying
      and selling. Before you leave, you should put the rest in your account.
      There is however a small tax of 5 %. If you put in 100 dbl, you can only
      get 95 dbl back.
    </p>

    <h3 className="text-2xl font-serif mb-4">Loans</h3>

    <p className="mb-4">
      You can also take a loan if the game are tough on you. You have to pay a
      rent of 15 % if you do so, and you cannot loan more than 11 500 dbl. The
      usual reason to take a loan is when you haven&apos;t saved anything in
      your account and loses a fight at sea.
    </p>

    <div className="divider" />

    <h2 id="traveling" className="text-3xl font-serif mb-4">
      Traveling
    </h2>

    <h3 className="text-2xl font-serif mb-4">Towns and nations</h3>

    <p className="mb-4">
      All existing towns actually existed in the 1600th. The towns nationality
      varied from year to year though.
    </p>

    <h5 className="text-xl font-serif">English towns</h5>

    <ul className="list-disc list-inside mt-2 mb-4">
      <li>Charles Towne</li>
      <li>Barbados</li>
      <li>Port Royale</li>
      <li>Belize</li>
    </ul>

    <h5 className="text-xl font-serif">French towns</h5>

    <ul className="list-disc list-inside mt-2 mb-4">
      <li>Tortuga</li>
      <li>Leogane</li>
      <li>Martinique</li>
      <li>Biloxi</li>
    </ul>

    <h5 className="text-xl font-serif">Spanish towns</h5>

    <ul className="list-disc list-inside mt-2 mb-4">
      <li>Panama</li>
      <li>Havana</li>
      <li>Villa Hermosa</li>
      <li>San Juan</li>
    </ul>

    <h5 className="text-xl font-serif">Dutch towns</h5>

    <ul className="list-disc list-inside mt-2 mb-4">
      <li>Bonaire</li>
      <li>Curacao</li>
      <li>St. Martin</li>
      <li>St. Eustatius</li>
    </ul>

    <p className="mb-4">
      You can visit which of these you want, no matter which nationality you
      belongs to.
    </p>

    <h3 className="text-2xl font-serif mb-4">Time</h3>

    <p className="mb-4">
      Time is measured in weeks in Lost Seas. The time won&apos;t go by itself,
      but depends on your activity in the game. A week will pass when you travel
      from a town to the Caribbean Sea, and when you are working.
    </p>

    <p className="mb-4">
      It&apos;s primarily a method of seeing how active a player is, and to
      separate the logs in a logical way.
    </p>

    <h3 className="text-2xl font-serif mb-4">Battles at sea</h3>

    <p className="mb-4">
      You will find ships from England, France, Spain and Holland. You will also
      find some pirates, these will always attack you. Your enemies will
      probably attack you too, and you can always choose to flee. This can fail
      sometimes, and the procedure will be the same as an ordinary attack. So
      you can lose. You will find more English ships around English towns, so if
      you want to get a higher level, travel to your enemies coasts.
    </p>

    <p className="mb-4">
      I would suggest that you don&apos;t attack ships that have more cannons
      than you have. The is a random factor here, so you can win if the gap
      isn&apos;t to big. But it&apos;s really risky! It&apos;s the amount of
      functional cannons that decides if you will lose or not.
    </p>

    <p className="mb-4">
      The fights aren&apos;t interactive yet, so you will directly see if you
      won or lost. You will get a report on how much you won or lost during the
      battle. And if you win, you will be able to chose how much you want to
      loot from the other ship.
    </p>

    <h3 className="text-2xl font-serif mb-4">Trading at sea</h3>

    <p className="mb-4">
      When you meet ships from your own nation, you can trade with them. You
      will trade away your barter goods that you don&apos;t have any use for,
      for food and water, which make it possible to travel for a longer period
      of time.
    </p>

    <p className="mb-4">
      Depending on how much food and water you are choosing to take, you pay
      this of with porcelain, spices and silk first, because you cannot use this
      for anything but trading anyway. If that&apos;s not enough, you will also
      trade away medicine, tobacco and rum which could be used to please your
      crew instead.
    </p>

    <button
      onClick={goToTop}
      className="fixed bottom-5 right-5 rounded-full bg-blue-800 bg-opacity-50 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
    >
      <BiArrowToTop className="w-7 h-7" />
    </button>
  </DefaultLayout>
)

export default Guide
