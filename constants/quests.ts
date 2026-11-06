export const QUEST_TYPE_WEIGHTS: Record<
  NpcPlacement,
  Record<QuestType, number>
> = {
  market: { delivery: 4, procurement: 4, messageChain: 1, findPerson: 1 },
  tavern: { delivery: 1, procurement: 1, messageChain: 4, findPerson: 4 },
  governor: { delivery: 1, procurement: 1, messageChain: 1, findPerson: 1 },
}

export const QUEST_REWARDS = {
  goldPerDay: 150,
  baseGold: 200,
  /** Procurement pays the shop price of the goods times this */
  procurementPremium: 1.5,
  findPersonGold: 1200,
  /** Chance that part of the reward is paid in merchandise */
  itemChance: 0.25,
  /** Share of the reward value paid in merchandise when it happens */
  itemShare: 0.3,
}

export const PROCUREMENT_QUANTITY = { min: 20, max: 60, step: 5 }

/** Talks per NPC per town visit, reset on arrival */
export const TALKS_PER_VISIT = 3

export const MAX_ACTIVE_QUESTS = 5

/** Quest-only placeholders, filled by generateQuest and the quest actions */
export const QUEST_PLACEHOLDERS = [
  "target",
  "targetTown",
  "targetPlace",
  "parcel",
  "quantity",
  "item",
  "person",
  "backstory",
  "questNation",
  "hintTown",
] as const

export const QUEST_PITCHES: Record<QuestType, string[]> = {
  delivery: [
    "I need {parcel} taken to {target} at {targetPlace}. It must arrive unopened, and yes, I will know.",
    "Would you carry {parcel} to {target} in {targetTown}? Try {targetPlace} first.",
    "There is {parcel} here that belongs with {target}, at {targetPlace}. I would go myself, but the sea and I are not on speaking terms.",
    "A favour, {title}. Take {parcel} to {target} at {targetPlace}. They will be glad of it, or at least less cross with me.",
    "{target} at {targetPlace} has been waiting weeks for {parcel}. The last captain I trusted with it sailed to the wrong island.",
    "I have {parcel} for {target} in {targetTown}. Ask at {targetPlace} and hand it over with my compliments.",
    "Take {parcel} to {target} at {targetPlace}, and do not let the customs men in {targetTown} get their fingers on it.",
    "Could you see {parcel} safely to {target}, at {targetPlace}? It is a matter of some delicacy, so please do not sit on it.",
    "Every ship I ask is bound the wrong way. Are you? I need {parcel} carried to {target} at {targetPlace}.",
    "Here is {parcel} for {target}, at {targetPlace}. Do not shake it, do not drop it and, above all, do not ask me what is inside.",
  ],
  procurement: [
    "I need {quantity} {item}, and the shop here charges like a Spanish bishop. Bring them to me and I will pay well above the price.",
    "Find me {quantity} {item}, {title}. I have a buyer waiting and a ship that sailed without the cargo.",
    "Bring me {quantity} {item} and I will make it worth your while. The last lot was eaten by rats, or so the rats claim.",
    "My stores are bare. {quantity} {item} would set me right, and I pay better than any shop in {town}.",
    "I have promised {quantity} {item} to a gentleman with a short temper and a long sword. Help me keep that promise.",
    "Could you fetch me {quantity} {item}? Buy them wherever they are cheap and bring them here. I will pay half again on top.",
    "A wedding feast, {title}, and not a scrap of {item} in {town}. {quantity} would save the day, and possibly the marriage.",
    "Bring {quantity} {item} to me here in {town}. No more, no less, and none of them damp.",
    "I am short {quantity} {item} for a contract with {nation}. Find them and the profit is yours.",
    "If you can lay hands on {quantity} {item}, bring them to me. I would not ask if every captain in port were not suddenly busy.",
  ],
  messageChain: [
    "Carry word to {target} at {targetPlace}. They will have something to send back, and the answer must return to me.",
    "I need a message taken to {target} in {targetTown}, and whatever they say carried onward until it finds its way back here.",
    "Speak to {target} at {targetPlace} for me. It is a long story with several people in it, and you are now one of them.",
    "Tell {target} at {targetPlace} that the matter we discussed is ready. They will know what to do, and so, eventually, will you.",
    "A delicate errand, {title}. Find {target} in {targetTown}, pass on my words, and follow the answer wherever it leads. It leads back to me.",
    "Letters go astray, but captains rarely do. Take my word to {target} at {targetPlace} and bring the reply home.",
    "I owe {target} at {targetPlace} an answer, and they owe someone else one. Be a good soul and untangle the lot.",
    "Go to {target} in {targetTown} and say the name of my mother's parrot. Do not ask. Then bring back what they give you.",
    "Start with {target} at {targetPlace}. From there, follow the trail until it ends with me. Simple, if nobody lies.",
    "Will you carry a few words to {target} at {targetPlace}? They will pass you along, and in the end you come back to me with the answer.",
  ],
  findPerson: [
    "I am looking for {person}, {backstory}. Last I heard, they were somewhere in the towns of {questNation}.",
    "Have you heard of {person}, {backstory}? Gone without a word. Someone in a port held by {questNation} must know where.",
    "Find {person} for me, {title}. That is {backstory}, and I believe hiding in one of the towns of {questNation}.",
    "{person}, {backstory}, vanished last season. The tavern talk says a port held by {questNation}, but tavern talk says a great many things.",
    "Ask after {person} in the towns of {questNation}. That is {backstory}, and I would very much like a word.",
    "Somewhere among the colonies of {questNation} is {person}, {backstory}. Find them and come back to tell me where.",
    "I have not slept since {person} left, {backstory} of all people. Try the taverns and markets of {questNation}.",
    "{person} owes me an explanation, and possibly a goat. That is {backstory}. Look in the towns of {questNation}.",
    "If you sail among the ports of {questNation}, ask for {person}, {backstory}. The trail went cold there.",
    "Find {person}, {backstory}. The last letter came from a town held by {questNation}, and then nothing at all.",
  ],
}

export const PARCELS = [
  "a sealed letter",
  "a locked chest",
  "a small wrapped bundle",
  "a roll of maps",
  "a bottle of very old brandy",
  "a pair of silver candlesticks",
  "a lacquered snuff box",
  "a bundle of contracts tied with ribbon",
  "a prayer book with pressed flowers inside",
  "a portrait in a heavy frame",
  "a jar of pickled limes",
  "a velvet pouch that clinks",
  "a ledger with a broken lock",
  "a love letter that smells faintly of rum",
  "a cage with a sleeping parrot",
  "a crate marked 'do not open'",
]

export const MISSING_PERSON_BACKSTORIES = [
  "my son",
  "my daughter",
  "my brother",
  "my sister",
  "a debtor",
  "an old shipmate",
  "my business partner, along with my money",
  "a runaway apprentice",
  "my betrothed",
  "a cook who still owes me a recipe",
  "a witness to a quarrel",
  "a deserter from the garrison",
  "my long lost cousin",
  "a carpenter who took my best tools",
]

export const QUEST_LINES = {
  accept: [
    "Splendid. I knew you had an honest face, or at least a busy one.",
    "Good. Fair winds, and come back with good news.",
    "Thank you, {title}. I shall sleep better tonight.",
    "Excellent. Do try not to get sunk before it is done.",
    "Then it is agreed. I will hold you to it.",
  ],
  decline: [
    "Pity. Perhaps another time.",
    "As you wish. Someone else will be glad of the coin.",
    "Hm. I had you down as more adventurous.",
    "No? Well, I shall ask the next captain through the door.",
    "Very well. I will pretend I never asked.",
  ],
  deliveryComplete: [
    "Ah, {parcel}! I had given up hope. Here, take this for your trouble.",
    "You brought it all this way? Thank you, {title}. This is for you.",
    "Finally. I was beginning to think it had been eaten by sea monsters. Your payment.",
    "And unopened too. A rare captain indeed. Here is your pay.",
    "That is the one. Here is what was promised, and a little gratitude on top.",
  ],
  procurementAsk: [
    "Is that {quantity} {item} I see in your hold? Hand them over and the pay is yours.",
    "You brought the {item}! All {quantity}? Then let us settle up.",
    "Ah, {quantity} {item}, just as I asked. Shall we trade, or did you only come to gloat?",
    "Those {item} would look much happier in my storeroom than on your ship. Hand over {quantity}?",
    "I can smell the {item} from here. {quantity} of them, I hope?",
  ],
  procurementComplete: [
    "{quantity} {item}, all present. A pleasure doing business, {title}.",
    "Just what I needed. Here is your money, counted twice.",
    "Wonderful. Now I can stop hiding from my customers.",
    "Every last one. You have saved my reputation, such as it is.",
    "Good, good. Stack them over there and take your pay.",
  ],
  chainStep: [
    "So they sent you. Very well, take this to {target} at {targetPlace}.",
    "I have been expecting word. Here is my answer. Carry it on to {target} in {targetTown}.",
    "Typical. Nobody can deliver their own news. Take this to {target} at {targetPlace}.",
    "Interesting. Tell {target} at {targetPlace} that I agree, but only on Tuesdays.",
    "Thank you. Now hurry this on to {target} in {targetTown} before I change my mind.",
  ],
  chainComplete: [
    "At last, the answer. You have done well, {title}. Here is your reward.",
    "So it all went round and came back. Thank you. This is for you.",
    "Is that all they said? Two months for that? Well, you earned your pay.",
    "Perfect. The matter is settled, and so is your payment.",
    "You found everyone? Remarkable. Most captains get lost after the first stop.",
  ],
  findNotHere: [
    "{person}? Never heard of them, and I hear of everyone.",
    "Nobody by that name in {town}, I am sure of it.",
    "If {person} had come through {town}, I would know. Try elsewhere.",
    "No, not here. People only come to {town} to leave it.",
    "Not a soul by that name. You have the wrong port, {title}.",
  ],
  findHint: [
    "I did hear {person} was not in {hintTown} either, if that helps.",
    "A sailor from {hintTown} swore nobody like that lives there.",
    "You can strike {hintTown} off your list. My cousin knows everyone there.",
    "Not in {hintTown}, I would wager. They hate strangers there even more than here.",
    "Someone asked after {person} in {hintTown} last month and came back empty handed.",
  ],
  findFound: [
    "{person}? Yes, they live just up the hill. Tell whoever sent you they are well.",
    "Ah, you mean {person}. They are here, and very keen nobody finds out. Ah. I have said too much.",
    "You found them, or rather me. Well, tell them I am alive and not coming back.",
    "{person} is here in {town}, working hard and paying debts slowly. Go and report back.",
    "Yes, {person} came through months ago and never left. Go tell your friend.",
  ],
  findComplete: [
    "You found {person}? Thank heavens. Here, as promised.",
    "So that is where {person} has got to. Thank you, {title}. Your reward.",
    "Alive and well? I do not know whether to be relieved or furious. Here is your money.",
    "Thank you. Now I know where to send the bill.",
    "Good work. I shall write to them at once, and possibly also to a lawyer.",
  ],
  noMoreTalk: [
    "Not now, {name}. I have talked myself hoarse.",
    "Enough for today. Come back when the tide has turned.",
    "I have said all I have to say, and some of it twice.",
    "My throat is dry and my patience drier. Another day, {name}.",
    "If you keep asking, I shall start charging by the word.",
    "Go and bother someone else, {title}. I need a rest.",
  ],
} satisfies Record<string, string[]>
