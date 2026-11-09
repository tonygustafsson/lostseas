import {
  STARTING_CREW_COUNT,
  STARTING_GOLD,
  STARTING_SHIP_TYPE,
} from "@/constants/player"
import { formatGold } from "@/utils/number"

import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const FirstVoyage = () => (
  <GuideChapter
    id="first-voyage"
    lead="Every legend starts somewhere. Yours starts with a modest boat and a crew you could count on one hand."
    image={{
      src: "/img/location/port-royale/shop.png",
      alt: "The shop in Port Royale",
    }}
  >
    <p>
      You begin as a Pirate with {formatGold(STARTING_GOLD)}, a{" "}
      {STARTING_SHIP_TYPE.toLowerCase()} and {STARTING_CREW_COUNT} crew members.
      It&apos;s not much, but nobody gets a frigate on day one.
    </p>

    <h3>Five steps to the open sea</h3>

    <ul>
      <li>
        <strong>Listen to the parrot.</strong> Your advisor waits at the harbour
        and lists anything that would stop you from sailing. It&apos;s rude, but
        it&apos;s usually right.
      </li>
      <li>
        <strong>Buy food and water.</strong> Go to the shop and use the day
        buttons to stock up for the trip you have in mind. A week&apos;s worth
        is a good start.
      </li>
      <li>
        <strong>Bank what you don&apos;t need.</strong> Lose a battle and the
        enemy takes every coin you carry. Gold in the bank stays put.
      </li>
      <li>
        <strong>Pick a town.</strong> Press Set sail at the harbour and choose a
        destination on the map. Grey towns are out of reach with the supplies
        you have.
      </li>
      <li>
        <strong>Meet some ships.</strong> On the way you&apos;ll run into other
        vessels. Start with the ones that look smaller than you.
      </li>
    </ul>

    <GuideTip>
      A few cannons go a long way. Four crew can man two guns, and a ship with
      no cannons is just a floating snack.
    </GuideTip>

    <h3>What next</h3>

    <p>
      Win battles against your nation&apos;s enemy to earn promotions, sell the
      goods you loot, and grow your crew and fleet as the gold comes in. The
      rest of this guide covers each part in detail, so read it in order or jump
      to whatever just went wrong.
    </p>
  </GuideChapter>
)

export default FirstVoyage
