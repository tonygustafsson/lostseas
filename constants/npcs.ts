export const PLACEMENT_LOCATION: Record<NpcPlacement, TownLocation> = {
  tavern: "Tavern",
  market: "Market",
  governor: "City hall",
}

/** Personalities that sound alike share a voice, so there are fewer recordings to make */
export const NPC_VOICE_TYPES: Record<PersonalityId, string> = {
  oldSalt: "gruff",
  wearyVeteran: "gruff",
  gossip: "lively",
  braggart: "lively",
  shrewdTrader: "smooth",
  schemer: "smooth",
  pompous: "smooth",
  melancholic: "hushed",
  superstitious: "hushed",
}

/** Every voice has this many clips in `public/soundfx/npc/` */
export const NPC_VOICE_CLIPS = 4

export const NPCS: Npc[] = [
  // England
  {
    id: "charles-towne-tavern-mavis-cartwright",
    name: "Mavis Cartwright",
    gender: "Female",
    age: 61,
    town: "Charles Towne",
    placement: "tavern",
    personality: "gossip",
    description:
      "A lace cap sits askew on grey curls, and her sharp eyes follow every whisper across the room while her hands keep polishing the same tankard. She came over as a planter's cook, and she now knows the debts, quarrels and secret sweethearts of every soul on the waterfront.",
  },
  {
    id: "charles-towne-market-thomas-jarvis",
    name: "Thomas Jarvis",
    gender: "Male",
    age: 34,
    town: "Charles Towne",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "A neat brown coat, an inked ledger under one arm and a smile that never quite reaches his eyes mark him out among the salt pork barrels. Apprenticed to a London draper, he crossed the ocean with nothing but a set of scales and has weighed every bargain since to the last grain.",
  },
  {
    id: "charles-towne-governor-randolph-ellis",
    name: "Randolph Ellis",
    gender: "Male",
    age: 57,
    town: "Charles Towne",
    placement: "governor",
    personality: "pompous",
    description:
      "A towering plumed hat, a starched ruff and a velvet doublet strained at every button give him the look of a portrait that has escaped its frame. Sent out by the Crown to tame the colony, he has written forty-one letters home demanding a larger desk and received no reply to any of them.",
  },
  {
    id: "belize-tavern-hugh-palmer",
    name: "Hugh Palmer",
    gender: "Male",
    age: 70,
    town: "Belize",
    placement: "tavern",
    personality: "oldSalt",
    description:
      "A white beard stained yellow by pipe smoke hangs over a tarred jacket, and one wooden leg taps the floor whenever the wind changes. He cut logwood on these shores before the town had a name, and he swears the river mouth still owes him a boat and two good friends.",
  },
  {
    id: "belize-market-eliza-knowles",
    name: "Eliza Knowles",
    gender: "Female",
    age: 27,
    town: "Belize",
    placement: "market",
    personality: "superstitious",
    description:
      "Strings of shells, dried herbs and a single rusty horseshoe hang over her stall, and a pale blue ribbon is tied round her wrist against the evil eye. Her father's ship went down the day a black cat crossed his gangplank, so she will not sell to anyone who arrives with one.",
  },
  {
    id: "belize-governor-frederick-howard",
    name: "Frederick Howard",
    gender: "Male",
    age: 49,
    town: "Belize",
    placement: "governor",
    personality: "wearyVeteran",
    description:
      "A faded red coat hangs on his broad shoulders, and deep lines around tired grey eyes speak of too many campaigns and too few nights of sleep. He fought in the Low Countries before taking this post, and he now guards a swamp full of logwood with the patience of a man who expects nothing.",
  },
  {
    id: "port-royale-tavern-ursula-cole",
    name: "Ursula Cole",
    gender: "Female",
    age: 44,
    town: "Port Royale",
    placement: "tavern",
    personality: "braggart",
    description:
      "Broad as a rum cask, with copper hair bound in a green scarf and a cutlass she uses mostly to slice limes, she fills the room with her laugh. She claims to have arm wrestled three privateer captains and a Spanish admiral in one night, and the story gains a captain every year.",
  },
  {
    id: "port-royale-market-abraham-parry",
    name: "Abraham Parry",
    gender: "Male",
    age: 52,
    town: "Port Royale",
    placement: "market",
    personality: "melancholic",
    description:
      "Stooped and thin, with a drooping moustache and ink stained fingers, he arranges his cloth bolts as gently as if they might break. He left a wife and a small shop in Bristol to make his fortune, and every letter from home tells him that both are doing rather better without him.",
  },
  {
    id: "port-royale-governor-archibald-stokes",
    name: "Archibald Stokes",
    gender: "Male",
    age: 63,
    town: "Port Royale",
    placement: "governor",
    personality: "schemer",
    description:
      "Silver hair is combed back from a narrow face, and long jewelled fingers drum softly on a desk covered in sealed letters. He rose from clerk to governor through favours nobody quite remembers granting, and he keeps a list of every captain who owes him one.",
  },
  {
    id: "barbados-tavern-miles-barnes",
    name: "Miles Barnes",
    gender: "Male",
    age: 19,
    town: "Barbados",
    placement: "tavern",
    personality: "melancholic",
    description:
      "A lanky lad with dark hair falling over sad brown eyes, he sits by the window scribbling verses on the back of old bills of lading. He signed on as a cabin boy to forget a girl in Plymouth, and he has written two hundred poems about her and sent none of them.",
  },
  {
    id: "barbados-market-beatrix-lamb",
    name: "Beatrix Lamb",
    gender: "Female",
    age: 38,
    town: "Barbados",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "A straw hat shades her freckled face, and a heavy purse hangs at her hip beside a knife she uses to test every sugar loaf. Widowed young, she took over her husband's stall and doubled its trade within a year, and the other merchants now quietly copy her prices.",
  },
  {
    id: "barbados-governor-eleanor-richardson",
    name: "Eleanor Richardson",
    gender: "Female",
    age: 54,
    town: "Barbados",
    placement: "governor",
    personality: "pompous",
    description:
      "A gown of stiff purple silk, pearls at her throat and a fan she snaps shut like a pistol make her the grandest sight on the island. She has ruled as acting governor since her husband fell ill, and she corrects anyone who forgets to call her Your Excellency, including her husband.",
  },

  // France
  {
    id: "martinique-tavern-babette-garnier",
    name: "Babette Garnier",
    gender: "Female",
    age: 36,
    town: "Martinique",
    placement: "tavern",
    personality: "gossip",
    description:
      "Dark curls escape a red kerchief, and her laugh carries from the bar to the harbour whenever she hears a juicy tale. She came out to Saint Pierre as a soldier's bride, outlived the soldier and now runs the busiest rumour mill in the French islands.",
  },
  {
    id: "martinique-market-etienne-boulanger",
    name: "Etienne Boulanger",
    gender: "Male",
    age: 45,
    town: "Martinique",
    placement: "market",
    personality: "superstitious",
    description:
      "A thick black beard, a crucifix, a rabbit's foot and a little bag of salt all hang from his neck, and he crosses himself before every sale. He once lost a whole cargo of cocoa after whistling aboard ship, and he has not whistled, or let anyone else whistle, since.",
  },
  {
    id: "martinique-governor-bertrand-aubert",
    name: "Bertrand Aubert",
    gender: "Male",
    age: 60,
    town: "Martinique",
    placement: "governor",
    personality: "schemer",
    description:
      "A thin smile and hooded eyes sit beneath long grey curls, and his blue coat is cut in the latest Paris fashion. He serves the Company of the Islands in public and himself in private, and every planter on the island suspects him of something different.",
  },
  {
    id: "biloxi-tavern-yves-bouvier",
    name: "Yves Bouvier",
    gender: "Male",
    age: 66,
    town: "Biloxi",
    placement: "tavern",
    personality: "oldSalt",
    description:
      "Weathered as driftwood, with a bald head, gold earrings and forearms covered in faded tattoos, he never takes his eyes off the sea for long. He sailed the Gulf for forty years hunting furs and pelts along the coast, and he can tell the weather by the ache in his left knee.",
  },
  {
    id: "biloxi-market-margot-besson",
    name: "Margot Besson",
    gender: "Female",
    age: 23,
    town: "Biloxi",
    placement: "market",
    personality: "braggart",
    description:
      "Bright eyes, a feathered hat far too grand for a market stall and a velvet cloak worn even at noon make her impossible to miss. She tells everyone she was once courted by a duke, though she cannot quite remember which one or what his name was.",
  },
  {
    id: "biloxi-governor-alain-turgot",
    name: "Alain Turgot",
    gender: "Male",
    age: 51,
    town: "Biloxi",
    placement: "governor",
    personality: "wearyVeteran",
    description:
      "A plain grey coat, a sabre scar along his jaw and an old musket ball worn on a cord mark him as a soldier first and a governor second. He fought for the Cardinal before being sent to this marshy outpost, and he now spends his days fighting mosquitoes with no more success.",
  },
  {
    id: "tortuga-tavern-manon-artaud",
    name: "Manon Artaud",
    gender: "Female",
    age: 29,
    town: "Tortuga",
    placement: "tavern",
    personality: "superstitious",
    description:
      "Kohl rimmed eyes and silver bangles flash as she pours, and a dried fish hangs above the bar that she swears keeps the storms away. Her mother read fortunes for buccaneers in the island's coves, and Manon still reads the foam on every tankard before handing it over.",
  },
  {
    id: "tortuga-market-blaise-chamfort",
    name: "Blaise Chamfort",
    gender: "Male",
    age: 41,
    town: "Tortuga",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "A patched coat, a fine silk neckerchief and a pair of reading glasses perched on a broken nose give him a look somewhere between banker and brawler. He buys from buccaneers and sells to merchants, and he has never once asked where any of it came from.",
  },
  {
    id: "tortuga-governor-ignace-jobert",
    name: "Ignace Jobert",
    gender: "Male",
    age: 68,
    town: "Tortuga",
    placement: "governor",
    personality: "pompous",
    description:
      "A cascade of lace at his throat, a scarlet sash and a hat with three ostrich feathers make him look like a peacock in a pirate den. He insists on full court etiquette in a fort full of buccaneers, and he has fined more men for poor bowing than for piracy.",
  },
  {
    id: "leogane-tavern-aubin-laclos",
    name: "Aubin Laclos",
    gender: "Male",
    age: 24,
    town: "Leogane",
    placement: "tavern",
    personality: "braggart",
    description:
      "Handsome and sun browned, with a thin moustache he twirls far too often and a rapier he has never drawn in anger, he holds court at the corner table. He claims to have sailed round the world twice, though the furthest he has been is Tortuga, and he was seasick both ways.",
  },
  {
    id: "leogane-market-adele-bonnaire",
    name: "Adele Bonnaire",
    gender: "Female",
    age: 55,
    town: "Leogane",
    placement: "market",
    personality: "melancholic",
    description:
      "A black shawl, a widow's ring and soft hazel eyes give her a quiet dignity among the shouting traders. She came to Hispaniola with a husband full of plans for an indigo plantation, and now she sells indigo by the pound and sighs at every blue cloth she folds.",
  },
  {
    id: "leogane-governor-yvon-boitel",
    name: "Yvon Boitel",
    gender: "Male",
    age: 46,
    town: "Leogane",
    placement: "governor",
    personality: "schemer",
    description:
      "Neat black hair, a trimmed goatee and a ring for every finger catch the lamplight as he leans back in his chair. He bought his post with borrowed money, and he means to repay every livre of it before anyone in Paris notices how.",
  },

  // Spain
  {
    id: "panama-tavern-socorro-herrera",
    name: "Socorro Herrera",
    gender: "Female",
    age: 49,
    town: "Panama",
    placement: "tavern",
    personality: "oldSalt",
    description:
      "Grey streaked braids are pinned under a sailor's cap, and her hands are rough with rope burns from years at sea. She sailed with the silver fleets disguised as a cabin boy until a captain caught her shaving with no beard, and she has run this tavern ever since.",
  },
  {
    id: "panama-market-sancho-velasco",
    name: "Sancho Velasco",
    gender: "Male",
    age: 39,
    town: "Panama",
    placement: "market",
    personality: "gossip",
    description:
      "Round and cheerful, with a black moustache and a voice that carries over the mule trains, he knows everyone who passes through the isthmus. He started as a muleteer on the road to Portobelo, and he still trades rumours faster than he trades goods.",
  },
  {
    id: "panama-governor-alfonso-benavides",
    name: "Alfonso Benavides",
    gender: "Male",
    age: 62,
    town: "Panama",
    placement: "governor",
    personality: "pompous",
    description:
      "A black velvet doublet, a gold chain of office and a beard trimmed to a perfect point give him the air of a man posing for a royal painter. Descended from a minor noble house in Castile, he mentions his fourteen family titles in every conversation and has never finished listing them.",
  },
  {
    id: "san-juan-tavern-roque-acosta",
    name: "Roque Acosta",
    gender: "Male",
    age: 57,
    town: "San Juan",
    placement: "tavern",
    personality: "melancholic",
    description:
      "Heavy lidded eyes and a grey beard frame a face that seems to have forgotten how to smile, and he plays the same slow tune on a battered guitar every night. He was once a galleon pilot, until a reef he swore was not there proved him wrong in front of the whole fleet.",
  },
  {
    id: "san-juan-market-jacinta-moya",
    name: "Jacinta Moya",
    gender: "Female",
    age: 31,
    town: "San Juan",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "A crisp white mantilla, a quick smile and an abacus she works without looking make her the fastest dealer under the fortress walls. Daughter of a ship's chandler, she could haggle before she could walk, and she once sold a sailor his own lost hat.",
  },
  {
    id: "san-juan-governor-salvador-arellano",
    name: "Salvador Arellano",
    gender: "Male",
    age: 44,
    town: "San Juan",
    placement: "governor",
    personality: "wearyVeteran",
    description:
      "A dented breastplate rests on a stand beside his desk, and a pale scar runs from his temple into short dark hair. He held El Morro against the Dutch years ago, and he would very much like everyone to stop asking him to tell that story.",
  },
  {
    id: "havana-tavern-tadeo-paz",
    name: "Tadeo Paz",
    gender: "Male",
    age: 21,
    town: "Havana",
    placement: "tavern",
    personality: "superstitious",
    description:
      "A wiry young sailor with wide nervous eyes, he wears a saint's medal, a shark's tooth and a lucky sock knotted around his neck. Shipwrecked twice before his twentieth birthday, he now refuses to board any vessel whose name has an odd number of letters.",
  },
  {
    id: "havana-market-joaquina-mercado",
    name: "Joaquina Mercado",
    gender: "Female",
    age: 67,
    town: "Havana",
    placement: "market",
    personality: "gossip",
    description:
      "Tiny and wrinkled, with a black lace fan and bright black eyes, she perches on a stool behind baskets of tobacco and sees everything. She has sold leaf on this square since the harbour fortress was new, and the governor himself sends a servant to ask her what is going on.",
  },
  {
    id: "havana-governor-alejandro-heredia",
    name: "Alejandro Heredia",
    gender: "Male",
    age: 53,
    town: "Havana",
    placement: "governor",
    personality: "schemer",
    description:
      "Dark eyes, a soft voice and a perfectly trimmed silver beard give him a calm that makes visitors nervous. He controls who sails with the treasure fleet and who waits another year, and he never forgets a captain who once made him wait.",
  },
  {
    id: "villa-hermosa-tavern-dulce-rivero",
    name: "Dulce Rivero",
    gender: "Female",
    age: 42,
    town: "Villa Hermosa",
    placement: "tavern",
    personality: "braggart",
    description:
      "Strong arms, a gold tooth and a cutlass hung proudly above the bar give her the air of a retired pirate queen, which is exactly what she wants. She once chased a thief two leagues along the river with a ladle, and by now the ladle has become a sword and the thief a whole crew.",
  },
  {
    id: "villa-hermosa-market-bartolo-carrillo",
    name: "Bartolo Carrillo",
    gender: "Male",
    age: 60,
    town: "Villa Hermosa",
    placement: "market",
    personality: "oldSalt",
    description:
      "A leathery face, a single gold earring and a parrot that bites everyone but him make his cocoa stall a local landmark. He sailed the Gulf for thirty years as a bosun, and he still sleeps in a hammock strung between two market poles.",
  },
  {
    id: "villa-hermosa-governor-pedro-santacruz",
    name: "Pedro Santacruz",
    gender: "Male",
    age: 66,
    town: "Villa Hermosa",
    placement: "governor",
    personality: "pompous",
    description:
      "A vast white ruff, a silver tipped cane and a chest covered with medals of uncertain origin make him look grander than his small town. He considers Villa Hermosa the true jewel of New Spain, and he writes to the viceroy every month to say so.",
  },

  // Holland
  {
    id: "curacao-tavern-griet-vogel",
    name: "Griet Vogel",
    gender: "Female",
    age: 47,
    town: "Curacao",
    placement: "tavern",
    personality: "oldSalt",
    description:
      "Wind burnt cheeks, a sailor's tarred pigtail and a clay pipe that never leaves her mouth make her look more at home on a quarterdeck than behind a bar. She served as a ship's cook on Company voyages to the East Indies, and she still salts the beer out of habit.",
  },
  {
    id: "curacao-market-pieter-haas",
    name: "Pieter Haas",
    gender: "Male",
    age: 33,
    town: "Curacao",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "A sober black suit, a white collar and a ledger bound in good leather mark him as a true son of Amsterdam. He came out as a junior clerk of the West India Company, and he now counts the salt, cloth and copper of half the island in his head.",
  },
  {
    id: "curacao-governor-hubrecht-engel",
    name: "Hubrecht Engel",
    gender: "Male",
    age: 59,
    town: "Curacao",
    placement: "governor",
    personality: "wearyVeteran",
    description:
      "Heavy shoulders, a limp from an old wound and a grey moustache that droops with fatigue speak of a hard life under arms. He was among the soldiers who took the island from the Spanish, and he has spent every day since writing reports nobody in Amsterdam reads.",
  },
  {
    id: "st-eustatius-tavern-klaas-bier",
    name: "Klaas Bier",
    gender: "Male",
    age: 54,
    town: "St. Eustatius",
    placement: "tavern",
    personality: "gossip",
    description:
      "A round red face, a bristling yellow beard and an apron that has seen better decades greet every sailor at the door. Born with a name that settled his future, he has brewed ale on this rock for twenty years and hears every rumour from every ship that drops anchor.",
  },
  {
    id: "st-eustatius-market-saskia-berg",
    name: "Saskia Berg",
    gender: "Female",
    age: 26,
    town: "St. Eustatius",
    placement: "market",
    personality: "superstitious",
    description:
      "Pale blonde braids, a clean white cap and a pocket full of lucky stones give her a fresh look among the tired traders. She arrived from Zeeland convinced the island's volcano is merely asleep, and she will not sell a thing on a day the cloud sits on its peak.",
  },
  {
    id: "st-eustatius-governor-constantijn-reich",
    name: "Constantijn Reich",
    gender: "Male",
    age: 48,
    town: "St. Eustatius",
    placement: "governor",
    personality: "schemer",
    description:
      "A soft smile, a modest black coat and eyes that seem to weigh every word make him easy to underestimate. He welcomes ships of every flag to the free port, and he keeps a private ledger of what each of them carries and to whom.",
  },
  {
    id: "bonaire-tavern-hadewych-zorn",
    name: "Hadewych Zorn",
    gender: "Female",
    age: 69,
    town: "Bonaire",
    placement: "tavern",
    personality: "melancholic",
    description:
      "Silver hair in a thin bun, a faded blue dress and a cameo of a young sailor pinned at her collar give her a quiet, faraway air. Her betrothed sailed for the salt pans forty years ago and never returned, and she still sets out an extra cup every evening just in case.",
  },
  {
    id: "bonaire-market-maarten-koch",
    name: "Maarten Koch",
    gender: "Male",
    age: 20,
    town: "Bonaire",
    placement: "market",
    personality: "braggart",
    description:
      "Tall and gangly, with a shock of straw coloured hair and a borrowed sword worn on the wrong hip, he is eager to impress anyone who will listen. He tells customers he wrestled a shark in the shallows, though witnesses agree it was a rather small fish and that it won.",
  },
  {
    id: "bonaire-governor-diederik-lang",
    name: "Diederik Lang",
    gender: "Male",
    age: 65,
    town: "Bonaire",
    placement: "governor",
    personality: "wearyVeteran",
    description:
      "Stooped but solid, with a white beard and a dented helmet he uses as a fruit bowl, he greets visitors with a long sigh. He fought the Spanish for twenty years in Flanders, and he took this quiet island in the hope that nothing would ever happen again.",
  },
  {
    id: "st-martin-tavern-joost-becker",
    name: "Joost Becker",
    gender: "Male",
    age: 37,
    town: "St. Martin",
    placement: "tavern",
    personality: "oldSalt",
    description:
      "A broad chest, a weathered face and hands like coiled rope mark a man who spent most of his life in the rigging. He worked the salt ships of the Great Pond until a falling yard broke his arm, and he now pours drinks with the same steady grip he once used to reef sails.",
  },
  {
    id: "st-martin-market-femke-apel",
    name: "Femke Apel",
    gender: "Female",
    age: 43,
    town: "St. Martin",
    placement: "market",
    personality: "shrewdTrader",
    description:
      "Rosy cheeks, a starched apron and a small brass scale she polishes between customers give her a homely look that hides a merciless head for numbers. She came to the island selling cheese and soon learned that salt pays better, and she has never let sentiment spoil a deal.",
  },
  {
    id: "st-martin-governor-machteld-glauber",
    name: "Machteld Glauber",
    gender: "Female",
    age: 52,
    town: "St. Martin",
    placement: "governor",
    personality: "pompous",
    description:
      "A gown of black silk, an enormous lace collar and a chain of keys at her waist give her the bearing of a woman who expects to be obeyed. She governs in the name of her absent brother, and she has ordered a portrait of herself for every room in the residence.",
  },
]

export const getNpcById = (id: string) => NPCS.find((npc) => npc.id === id)

export const getNpcAt = (town: Town, placement: NpcPlacement) =>
  NPCS.find((npc) => npc.town === town && npc.placement === placement) as Npc

/** Every NPC has a portrait named after its id */
export const getNpcImage = (npc: Npc) => `/img/npc/${npc.id}.png`

const PLACE_NAMES: Record<NpcPlacement, string> = {
  tavern: "the tavern",
  market: "the market",
  governor: "the city hall",
}

/** Where to find an NPC, eg "the market in Havana" */
export const getNpcPlace = (npc: Npc) =>
  `${PLACE_NAMES[npc.placement]} in ${npc.town}`

/** Labels for the button that carries a conversation on, so it never reads the same twice in a row */
export const GO_ON_LABELS = [
  "Go on",
  "Tell me more",
  "And then?",
  "Keep talking",
  "What else?",
  "Spit it out",
  "I'm listening",
  "Do continue",
  "Anything else?",
  "Pray, go on",
]
