# Townsfolk and quests

## Goal

Make towns feel inhabited. Every town gets three characters (NPCs) the player can talk to: one in the tavern, one in the market and the governor in City hall. Conversations are random, era-appropriate chatter set in 1640, sometimes with a question the player answers. Now and then a character offers a quest. Active quests are shown in the Status drawer.

Success means talking to townsfolk feels varied and believable over many visits, and quests give players a reason to sail between towns beyond trade and battle.

## Decisions

- 48 fixed NPCs (16 towns × tavern, market, governor), the same for every player.
- Dialogue comes from shared personality pools plus a handful of lines per NPC. The pools should be large and the writing should feel real.
- One portrait per NPC. Placeholder images per placement until the art exists.
- 3 talks per NPC per town visit. The counter resets on arrival.
- About half of the talks are questions with 2 to 4 answers. Each answer has about 5 possible replies. Answers are pure flavour and have no lasting effect.
- About 1 in 10 talks offers a quest, unless the player already has 5 active quests.
- Quest types in v1: delivery, procurement, message chain and find a person.
- Quests are generated from templates. No hand-written story quests in v1, but the data should allow adding them later.
- Rewards are gold, sometimes partly paid in merchandise.
- Quests are offered with accept or decline. Max 5 active. Quests can be abandoned without penalty.
- Titles and citizenship work exactly as today. The governor can also talk and give quests.
- Conversation logic runs on the server as pure actions (approach A).

## Data model

### NPCs

`constants/npcs.ts` holds all 48 NPCs.

```ts
type NpcPlacement = "tavern" | "market" | "governor"

interface Npc {
  id: string // "havana-tavern-lucia-moreno"
  name: string
  gender: "Male" | "Female"
  age: number
  town: Town
  placement: NpcPlacement
  personality: PersonalityId
  description: string
  image?: string // eg "/img/npcs/havana-tavern-lucia-moreno.png", added when the art exists
}
```

- Each NPC's own lines (5 to 10) live in `constants/dialogue/npcLines.ts`, keyed by NPC id, so the roster stays light enough for the client.

- Names match the town's nation and are generated once with `utils/names`, then hardcoded.
- Descriptions follow the style of `constants/characters.ts`: appearance plus a short backstory.
- Without an `image`, the UI shows a placeholder image for the NPC's placement.

### Personalities

One file per personality in `constants/dialogue/`, each with 50 or more entries.

- Commoners (tavern and market): old salt, gossip, shrewd trader, superstitious, braggart, melancholic.
- Governors: pompous, weary veteran, schemer.

```ts
type DialogueEntry =
  | { id: string; text: string }
  | {
      id: string
      text: string
      answers: { text: string; replies: string[] }[] // 2 to 4 answers, about 5 replies each
    }
```

Entry ids are unique across all pools and NPC lines, so a pending question can be stored by id.

### Keeping dialogue out of the browser

All dialogue (personality pools and NPC lines) lives in `constants/dialogue/`, and every file there starts with `import "server-only"`. Only server actions and API routes import it. The client receives the one line each talk returns, so the dialogue never adds to the JavaScript players download.

### Placeholders

Lines, answers, replies and quest texts can contain placeholders. They are filled in on the server when the line is picked, using the seeded random, and the client only receives finished text.

| Placeholder      | Filled with                                |
| ---------------- | ------------------------------------------ |
| `{name}`         | Player name                                |
| `{title}`        | Player title, lower case                   |
| `{town}`         | Current town                               |
| `{nation}`       | Nation of the current town                 |
| `{enemy}`        | The nation the current town is at war with |
| `{playerNation}` | Player nationality                         |
| `{otherTown}`    | A random town other than the current one   |
| `{nationTown}`   | Another town of the same nation, if any    |
| `{enemyTown}`    | A random town of the enemy nation          |
| `{merchandise}`  | A random merchandise name                  |
| `{month}`        | Current in-game month, eg "March"          |
| `{year}`         | Current in-game year                       |

### Era and authenticity

The game starts on 1 January 1640. Dialogue should sound like the 1640s Caribbean and refer to real things of the period, mixed with the game's own world. Examples of real references:

- Rulers: King Charles I, Louis XIII and Cardinal Richelieu, Philip IV, Stadtholder Frederick Henry.
- Wars and politics: the Thirty Years' War, the Eighty Years' War between Spain and the Dutch, rising trouble between King Charles and Parliament, unrest in Portugal and Catalonia.
- Trade: the Dutch West India Company, the Spanish treasure fleet (flota), Piet Heyn's capture of the silver fleet in 1628, Barbados turning from tobacco to sugar, pieces of eight, doubloons, guilders, livres.
- Sea life: buccaneers on Hispaniola and Tortuga, hurricanes, scurvy, ship's biscuit, careening hulls, privateering letters of marque.
- Daily life: the Inquisition, saints' days, plague rumours from Europe, tobacco pipes, candles, tallow, salt pork.

Rules for writing:

- No references to events after 1640.
- The game's towns and their nations are the truth in the game, even where history differs (for example, Charles Towne was founded later). Lines must not contradict the game's map.
- Use placeholders so many lines mention the current town, its nation, its enemy or another real town in the game.
- Keep text readable for players: period flavour, not archaic spelling.
- Be funny now and then. Roughly a third of lines and replies should raise a smile: dry wit, absurd sailor logic, petty grudges, comic exaggeration. Each personality is funny in its own way, and the rest stays sincere so the humour lands. Tone reference: classic point-and-click pirate adventure comedy. Most questions offer at least one cheeky or absurd answer for the player (a deadpan non sequitur, a sarcastic jab, a ridiculous boast), and NPCs react to it in character. Write only original jokes, never lines, names, insults or running gags from existing games.

### Quests

Stored as `player.quests?: Record<string, Quest>` (a record, because Firebase drops empty arrays).

```ts
type QuestReward = {
  gold: number
  item?: { name: keyof Inventory; quantity: number }
}

type Quest = {
  id: string
  giverId: string
  acceptedDay: number
  pitch: string // the resolved pitch text, shown again in the Status drawer
  reward: QuestReward
} & (
  | { type: "delivery"; parcel: string; targetNpcId: string }
  | { type: "procurement"; item: keyof Inventory; quantity: number } // bring to the giver
  | { type: "messageChain"; stepNpcIds: string[]; step: number } // last step is the giver
  | {
      type: "findPerson"
      personName: string
      nation: Nation
      hiddenTown: Town
      ruledOut?: Town[]
      found?: boolean
    }
)
```

`constants/quests.ts` holds:

- About 10 pitch templates per quest type.
- Pools for parcels ("a sealed letter", "a locked chest"), missing person backstories ("my son", "a debtor") and names per nation.
- Lines for accepting, declining, reminders, progress and completion.
- Reward tuning values and type weights per placement (market favours delivery and procurement, tavern favours message chain and find a person, the governor can give any type).

### Per visit state

```ts
type ConversationState = {
  talks: number
  saidIds?: string[]
  pendingQuestionId?: string
  questOffer?: Quest
}

type LocationStates = {
  // ...existing
  conversations?: Record<string, ConversationState> // keyed by NPC id
}
```

`locationStates` is already cleared on arrival in `utils/actions/sea.ts`, so talks reset for free.

## Actions and flow

Pure actions in `utils/actions/npc.ts`, thin routes in `app/api/npc/<action>/route.ts` and a `useNpc` hook in `hooks/queries/`.

### `talkTo(player, { npcId })`

Validates that the player is in the NPC's town and building. Then the first matching case wins:

1. Quest business with this NPC: hand over a parcel, deliver procurement goods (only when the player has the full amount, otherwise no quest business arises), advance a message chain, ask about a missing person, or report back to the giver. Does not use a talk. If several quests involve this NPC, the oldest one is handled.
2. 3 talks used: error with a "not now" line.
3. Quest offer: 1 in 10, only with fewer than 5 active quests. Stored in `questOffer`, the line is the pitch.
4. Question: 50%. Stored as `pendingQuestionId`.
5. Statement.

Cases 3 to 5 use a talk. Lines come from the personality pool plus the NPC's own lines, avoiding ids already said this visit.

The response data includes the line, the kind of line (statement, question with answer texts, quest offer, quest progress with any reward), and the talks left.

### Other actions

- `answerNpc(player, { npcId, answerIndex })`: returns one random reply for that answer and clears the pending question.
- `acceptQuest(player, { npcId })`: adds the stored offer to `player.quests` and writes a log entry.
- `declineQuest(player, { npcId })`: clears the offer.
- `abandonQuest(player, { questId })`: removes the quest, works anywhere, writes a log entry.

### Quest rules

- A quest target is never the giver and never in the giver's town.
- Delivery: talk to the target NPC to hand over the parcel and receive the reward. Parcels take no cargo space.
- Procurement: talk to the giver with the full amount in inventory and they ask whether to hand the goods over ("Hand over" or "Not yet", which carries on with a normal chat). Only on "Hand over" (`handInQuest`) are the goods removed and the reward paid. No partial hand-ins.
- An open quest offer (eg the dialog was closed) is shown again on the next talk without using a talk.
- Message chain: 2 or 3 steps across other towns, ending with the giver. Each step's NPC gives a progress line.
- Find a person: the hidden town is one of the 4 towns of the named nation, never the giver's town. Tavern and market NPCs in that nation's towns respond. In a wrong town, that town is added to `ruledOut`, and with a 50% chance one more wrong town is ruled out as a hint. In the right town, `found` becomes true and the player reports back to the giver.
- Rewards:
  - Delivery and message chain: gold based on sailing days (`distanceTo`).
  - Procurement: value of the goods times a premium.
  - Find a person: a fixed amount (every nation has 4 towns, so the search size is the same).
  - About 25% of rewards pay part of the value as merchandise instead of gold.
- Goods rewards may overload cargo. The existing advisor warning handles that.

### Log book and statistics

- New `quest` log type with its own icon and colour, used for accepted, completed and abandoned quests.
- Quests completed count in Statistics.

## UI

### `NpcCard`

Built on `ActionCard`: portrait (placeholder for now), name, description and a secondary "Talk" button, disabled when out of talks. A "Quest" badge shows when the player has quest business with this NPC, and talking is then always possible.

- Tavern and Market: in a tab of its own, labelled with the character's first name (eg "Pieter"), with a small dot when they have quest business. The Market is split into Traders, Apothecary and the character's tab.
- City hall: the existing governor card keeps its greeting and title actions, uses the governor's name, and gets the same secondary "Talk" button. Gold stays reserved for title or citizenship.

### `TalkDialog`

Built on `components/ui/dialog`. Portrait and name at the top, a speech box below.

- `TypewriterText` reveals text at about 100 characters per second. Click or tap skips to the full line. Instant with reduced motion. Buttons keep their space while the text types and become visible when the line is complete, so nothing jumps.
- Footer per state:
  - Statement: "Leave". To talk again, the player closes the dialog and clicks "Talk" on the card.
  - Question: 2 to 4 answer buttons, then the reply types out, then "Leave".
  - Quest offer: "Accept" (gold) and "Decline".
  - Quest progress: the reward is shown, then "Leave".
- Rewards and accepted quests also show a toast.

### Status drawer

A "Quests" section, hidden when there are none, with a grid of `QuestCard`s: type icon, giver (name and town), objective ("Deliver a sealed letter to Catalina Ruiz, market in Havana"), progress (chain step, towns ruled out), reward, and an "Abandon" button with a confirmation.

### Storybook

- `NpcCard`: talks left, no talks left, quest badge.
- `TalkDialog`: every footer state.
- `QuestCard`: each type and its progress states.
- `TypewriterText`: speed and skip.

## Testing

Vitest with `createTestPlayer` and `createSeededRandom`:

- Talk limit and reset on arrival, wrong town or building.
- Question and answer, invalid answer index.
- Quest roll and the 5 quest cap.
- Accept, decline and abandon.
- Each quest type's progress and completion, rewards, procurement removing goods.
- Placeholders resolve and none are left unresolved.

Content validation test:

- Every town has exactly one NPC per placement. NPC ids are unique and NPC names fit the nation.
- Every personality has 50 or more entries. Entry ids are unique.
- Every question has 2 to 4 answers with 5 or more replies each.
- Only known placeholders are used.

## Guide

New "Townsfolk and quests" section in `GuideContent.tsx`: who to talk to, the 3 talks per visit, quest types, the 5 quest limit and abandoning.

## Content production

The writing is the largest part of the work: 9 personalities with 50+ entries each, 48 NPCs with descriptions and their own lines, and the quest templates and pools. The plan should produce it in batches, one personality per file, starting with one personality for a tone review before the rest is written.

## Out of scope for v1

- Rise in rank and privateer quests.
- Deadlines and failed quests.
- Friendship or reputation from answers.
- Hand-written story quests.
- Real NPC portraits (placeholders until supplied).
