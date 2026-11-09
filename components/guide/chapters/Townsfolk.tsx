import { MAX_ACTIVE_QUESTS, QUEST_CHANCE } from "@/constants/quests"

import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Townsfolk = () => (
  <GuideChapter
    id="townsfolk"
    lead="Every town has people with opinions, gossip and errands they'd rather you ran for them."
    image={{
      src: "/img/location/curacao/tavern.png",
      alt: "The tavern in Curaçao",
    }}
  >
    <p>
      In every town, a regular at the tavern, a trader at the market and the
      governor at the city hall are happy to chat. Talk as long as you like.
      Eventually they tire of you and make it clear you&apos;ve run out of
      things to say. They stay that way until you sail off and come back.
    </p>

    <p>
      About half the time they ask you something. Answer however you like, it
      only changes how they reply. There are no wrong answers, just a little
      colour.
    </p>

    <h3>Quests</h3>

    <p>
      About 1 visit in {QUEST_CHANCE}, someone has a favour to ask and brings it
      up the first time you talk. Asking again won&apos;t change their mind, so
      try another day. People with quest business are marked with a scroll, and
      quest business can always be settled, however tired of you they are.
    </p>

    <ul>
      <li>Deliver a parcel to someone in another town.</li>
      <li>Bring back a quantity of a barter good.</li>
      <li>
        Carry a message along a chain of two or three people, ending with
        whoever sent you.
      </li>
      <li>
        Find a missing person somewhere in a named nation&apos;s towns by asking
        around taverns and markets, then report back.
      </li>
    </ul>

    <p>
      Rewards are paid in gold, sometimes partly in goods. Goods only fill the
      free space in your hold, and whatever doesn&apos;t fit is left on the
      quay.
    </p>

    <GuideTip>
      You can hold {MAX_ACTIVE_QUESTS} quests at a time, and nobody offers you a
      new one while you&apos;re at the limit. Abandon a quest from the Status
      drawer, no hard feelings.
    </GuideTip>
  </GuideChapter>
)

export default Townsfolk
