import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Welcome = () => (
  <GuideChapter
    id="welcome"
    lead="The year is 1640. Four nations are squabbling over the Caribbean, and you have a small ship, a smaller crew and big ideas."
    image={{
      src: "/img/location/tortuga/tavern.png",
      alt: "A busy tavern in Tortuga",
    }}
  >
    <p>
      Lost Seas is a trading and privateering game you play in the browser. Haul
      goods between ports, sink the ships of your nation&apos;s enemies, keep
      your crew fed and only slightly drunk, and climb from humble Pirate all
      the way to Duke.
    </p>

    <h3>Free, and it doesn&apos;t want your details</h3>

    <p>
      Lost Seas is free. Not &quot;free until the good bit&quot;, not &quot;free
      with a tiny shop of shiny hats&quot;. There are no ads, no purchases and
      no premium currency. The only thing you spend here is gold you plundered
      fair and square.
    </p>

    <p>
      You don&apos;t need an email address, a password or your real name to
      play. Pick a portrait, pick a name (Captain Bootstraps is a perfectly
      respectable choice) and you&apos;re at sea. Nobody will send you a
      newsletter, and nobody can, because we never asked who you are.
    </p>

    <GuideTip>
      Your browser remembers your captain, but browsers forget things too. Add a
      passkey or write down your user ID early, so a cleared cache doesn&apos;t
      send your fleet to the bottom. See{" "}
      <a href="#account" className="text-parchment underline">
        Your account
      </a>
      .
    </GuideTip>

    <h3>How to win</h3>

    <p>
      There&apos;s no final boss and no ending. You set your own goals. Some
      captains chase the Duke title, some hoard gold, some just like the sound
      of cannons. Your score adds up your title, your wealth, your ships and
      your manned cannons, and the best captains make it onto the leaderboard on
      the start page.
    </p>
  </GuideChapter>
)

export default Welcome
