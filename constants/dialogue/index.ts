import "server-only"

import { BRAGGART } from "./braggart"
import { GOSSIP } from "./gossip"
import { MELANCHOLIC } from "./melancholic"
import { OLD_SALT } from "./oldSalt"
import { POMPOUS } from "./pompous"
import { SCHEMER } from "./schemer"
import { SHREWD_TRADER } from "./shrewdTrader"
import { SUPERSTITIOUS } from "./superstitious"
import { WEARY_VETERAN } from "./wearyVeteran"

export { NPC_LINES } from "./npcLines"

export const PERSONALITIES: Record<PersonalityId, DialogueEntry[]> = {
  oldSalt: OLD_SALT,
  gossip: GOSSIP,
  shrewdTrader: SHREWD_TRADER,
  superstitious: SUPERSTITIOUS,
  braggart: BRAGGART,
  melancholic: MELANCHOLIC,
  pompous: POMPOUS,
  wearyVeteran: WEARY_VETERAN,
  schemer: SCHEMER,
}

/** One in this many lines, the NPC tires of talking */
export const TIRED_CHANCE = 3

/** Said after a line when the NPC has had enough of talking */
export const TIRED_LINES = [
  "Now if you will excuse me, {name}, I have talked myself hoarse.",
  "That is all I have in me for now. Come back when the tide has turned.",
  "I have said all I have to say, and some of it twice.",
  "My throat is dry and my patience drier. Another time, {name}.",
  "If you keep asking, I shall start charging by the word.",
  "Go and bother someone else for a while, {title}. I need a rest.",
  "Well, I think we have run out of things to say to each other.",
  "Enough chatter. I have work to do, even if you do not.",
  "That will do for one sitting, {name}.",
  "Forgive me, I am all talked out.",
]

/** Said for the rest of the visit when the player comes back to a tired NPC */
export const DONE_TALKING_LINES = [
  "You again? I told you, {name}, I am all talked out.",
  "We have said all there is to say. Go on, off with you.",
  "Not another word today, {title}. My jaw needs the rest.",
  "I have nothing left to tell you. Try me after your next voyage.",
  "Did you forget something? No? Then neither did I.",
  "If I talk any more, I shall start making things up.",
  "Back so soon? I am still recovering from the last time.",
  "My tongue has gone to bed, {name}. The rest of me will follow.",
  "Sail somewhere and come back with a story. Then we can talk.",
  "I have told you everything, and a few things twice.",
  "Please, {title}. Even I need some peace and quiet now and then.",
  "Whatever it is, it can wait until the next tide.",
  "Talk to someone else for a change. I hear the walls are good listeners.",
  "I am out of stories, out of gossip and nearly out of patience.",
  "You have had your fill of my wisdom for one day, {name}.",
  "Not now. I am busy doing nothing, and I am very good at it.",
  "We have talked enough for one port, {title}.",
  "Come back when you have been to sea. I may have thought of something by then.",
  "Every word I had today, you already have.",
  "Ask me again and I shall pretend to be asleep.",
  "I have run dry, {name}, like a barrel after a crew's shore leave.",
  "Go and spend your gold somewhere, {title}. My words are spent already.",
  "Nothing more to say, I am afraid. Fair winds, {name}.",
  "My voice is hoarse and my mind is empty. Leave an old soul be.",
]
