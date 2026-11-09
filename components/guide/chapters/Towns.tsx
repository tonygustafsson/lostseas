import { NATIONS, TOWNS } from "@/constants/locations"

import GuideChapter from "../GuideChapter"

const BUILDINGS = [
  {
    name: "Shop",
    text: "Food, water, medicine and barter goods. Buy before you sail, sell after you plunder.",
  },
  {
    name: "Market",
    text: "Bargain batches of goods and the apothecary, who heals your whole crew in one go.",
  },
  {
    name: "Tavern",
    text: "Food and drink for the crew, sailors looking for work or a fight, and a game of cards.",
  },
  {
    name: "Shipyard",
    text: "Ships, cannons, repairs and repair kits.",
  },
  {
    name: "Bank",
    text: "Savings, loans and shares in trading ventures.",
  },
  {
    name: "City hall",
    text: "Promotions, changing nation, and rewards for treasures and wanted pirates.",
  },
]

const Towns = () => (
  <GuideChapter
    id="towns"
    lead="Sixteen ports, four flags, and a shopkeeper in every one of them who thinks your boots are muddy."
    image={{
      src: "/img/userguide/map.png",
      alt: "Map of the Caribbean",
    }}
  >
    <p>
      You arrive at the harbour with the whole town laid out in front of you.
      Click a building to step inside, and Back to town takes you to the harbour
      again. Every town has the same six buildings. The names on the signs
      differ, but they all work the same.
    </p>

    <dl className="grid gap-4 sm:grid-cols-2">
      {BUILDINGS.map(({ name, text }) => (
        <div
          key={name}
          className="bg-background/60 border-border rounded-2xl border p-4"
        >
          <dt className="text-parchment font-serif text-lg">{name}</dt>
          <dd className="text-foreground/75 text-base leading-7">{text}</dd>
        </div>
      ))}
    </dl>

    <h3>The advisor</h3>

    <p>
      The parrot at the harbour is your advisor. Anything under Before you sail
      has to be sorted before you can leave. Worth a look is friendly advice you
      can ignore at your own risk. When everything is in order, it tells you
      you&apos;re ready to set sail.
    </p>

    <h3>Who owns what</h3>

    <p>
      Every town flies one of four flags. You&apos;re welcome in all of them,
      whatever your nationality. The flag decides where you can be promoted and
      which ships tend to hang around on the way in.
    </p>

    <ul>
      {Object.keys(NATIONS).map((nation) => (
        <li key={nation}>
          <strong>{nation}:</strong>{" "}
          {(Object.keys(TOWNS) as Town[])
            .filter((town) => TOWNS[town].nation === nation)
            .join(", ")}
        </li>
      ))}
    </ul>
  </GuideChapter>
)

export default Towns
