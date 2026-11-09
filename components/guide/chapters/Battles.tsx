import { BATTLE_MAX_ROUNDS } from "@/utils/seaBattle"

import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Battles = () => (
  <GuideChapter
    id="battles"
    lead="Fire, evade, repeat. The side with more cannons usually wins, but the sea has been known to surprise people."
    image={{
      src: "/img/ship-meeting/pirate-galleon.png",
      alt: "A pirate galleon on the horizon",
    }}
  >
    <p>
      A battle lasts up to {BATTLE_MAX_ROUNDS} rounds. Each round you choose to
      fire or evade. Both sides start at full battle strength, which only counts
      during the fight and has nothing to do with your ships&apos; health.
    </p>

    <ul>
      <li>
        <strong>Fire</strong> and one side wins the exchange. If it&apos;s you,
        the enemy loses strength. If it&apos;s them, you lose strength, your
        ships get hit and your crew gets hurt, more so the worse the fight is
        going. The more manned cannons you have compared with your opponent, the
        more often you win the exchange.
      </li>
      <li>
        <strong>Evade</strong> and it&apos;s a coin toss, whatever your cannons.
        Get it right and nothing hits you. Get it wrong and you take a lighter
        hit than a lost exchange. Evading never hurts the enemy.
      </li>
    </ul>

    <p>
      Whoever runs out of strength loses. If both are still afloat after the
      last round, the side with more strength left wins, and a draw counts as a
      defeat. Harsh, but those are the articles.
    </p>

    <GuideTip>
      Against an equal ship, most of your shots land. Against a ship with more
      cannons than you, it&apos;s a gamble. Count before you shoot.
    </GuideTip>

    <p>
      Every move is saved, so you can close the game mid-battle and come back
      later. You do have to finish it before you can sail on.
    </p>

    <h3>Victory</h3>

    <p>
      The battle report shows your loot, recruits and damage. Gold, recruits and
      treasure go straight to you. For goods, use the sliders to choose how much
      to take. The best fit is picked for you, food and water first and then the
      most valuable goods. Anything left behind sinks with the enemy. Take loot
      and sail on does both in one go.
    </p>

    <h3>Defeat</h3>

    <p>
      Lose and the enemy takes all the gold you carry and every last unit of one
      to three of your goods. Your bank savings, treasures, cannons and repair
      kits are safe. With more than one ship, you might lose one to the sea.
      Your last ship never sinks, it just limps home.
    </p>
  </GuideChapter>
)

export default Battles
