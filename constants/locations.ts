export const NATIONS: Record<Nation, { name: string; warWith: Nation }> = {
  England: {
    name: "Great Britain",
    warWith: "France",
  },
  France: {
    name: "France",
    warWith: "England",
  },
  Spain: {
    name: "Spain",
    warWith: "Holland",
  },
  Holland: {
    name: "Holland",
    warWith: "Spain",
  },
}

export const LOCATIONS = {
  shop: "Shop",
  tavern: "Tavern",
  bank: "Bank",
  market: "Market",
  shipyard: "Shipyard",
  cityhall: "City hall",
  harbor: "Harbor",
  sea: "Sea",
} as Record<string, TownLocation | SeaLocation>

// Position of a building on the town map image, in percent of the image
// width and height. Size is the highlight diameter in percent of the width.
export type TownBuildingPosition = {
  x: number
  y: number
  size: number
}

export type TownBuilding = {
  name: string
  description: string
  desktop: TownBuildingPosition
  mobile: TownBuildingPosition
}

export type TownLocations = Record<
  Town,
  {
    name: string
    nation: Nation
    summary: string
    harborDescription: string
    buildings: Record<TownLocation, TownBuilding>
    map: {
      x: number
      y: number
      textAlign?: "bottom" | "right" | "left"
      // Open water next to the town, where sea routes start and end and the
      // ship docks
      harbor: { x: number; y: number }
    }
  }
>

/** Kilometres per day at sea, about the speed of a real ship in 1715. */
export const KM_PER_DAY = 200

// Scale of the sea map. Distances follow the routes drawn on the map, so a
// town that looks further away is further away.
export const KM_PER_PIXEL = 4.9

export const TOWNS: TownLocations = {
  "st-georges": {
    name: "St. George's",
    nation: "England",
    summary: "Established fortified harbour town",
    harborDescription:
      "Ships pick their way through the reefs into St. George's Harbour, where cedar sloops built on the island crowd the quay beside the old stone houses, ready to carry salt, timber and news far out across the Atlantic from every other port.",
    buildings: {
      Shop: {
        name: "King's Mercantile",
        description:
          "An orange and white striped awning shades the open doors of the King's Mercantile, looking out over the wharf towards the fort. Inside, lanterns glow above sacks of rice and flour, crates of indigo and baskets of fresh fruit, while a Union flag hangs over the long counter with its brass scales and shelves of bottles and blue-and-white porcelain.",
        desktop: { x: 10, y: 52, size: 12 },
        mobile: { x: 19, y: 63, size: 32 },
      },
      Tavern: {
        name: "Redcoat Tavern",
        description:
          "Lanterns hang from the flower-draped gallery of the Redcoat Tavern, and its arched doorways open onto the harbour and the fort. Crimson banners with golden crowns hang over the long bar, where a chalkboard lists ale, porter, rum and grog alongside pies and roasts. Off-duty soldiers and sailors share rum at tables set with brass tankards and candle lanterns.",
        desktop: { x: 25, y: 50, size: 12 },
        mobile: { x: 51, y: 63, size: 32 },
      },
      Bank: {
        name: "Crown Ledger Bank",
        description:
          "Red brick and tall arched windows look out over the harbour from the Crown Ledger Bank, where planters come to deposit their tobacco money. Navy banners set with golden crowns hang above a polished counter of scales, quills and ledgers, and a great iron vault stamped with a crown guards the back of the marble hall.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 82, y: 63, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Behind its red brick and white columns, the Governor's Hall keeps a grand chamber beneath a candle chandelier. A carved crest with golden lions crowns the doors to a balcony overlooking the fort, flanked by Union flags and green curtains. A mahogany desk with green leather chairs faces a crackling fireplace, a brass telescope and a great map of the coast.",
        desktop: { x: 55.5, y: 48, size: 14 },
        mobile: { x: 50, y: 33, size: 40 },
      },
      Market: {
        name: "Dockside Market",
        description:
          "Red and white striped awnings shade the entrance of the Dockside Market, a clapboard hall with green shutters and flower boxes. A ship's wheel hangs above the sign, and strings of chillies and garlic dangle from the beams. Crates of oranges, apples, cabbages and carrots line the aisle, while barrels and sacks run straight down to the wharf.",
        desktop: { x: 73, y: 52, size: 12 },
        mobile: { x: 16, y: 34, size: 28 },
      },
      Shipyard: {
        name: "Royal Shipwrights",
        description:
          "Crossed hammers mark the sign of the Royal Shipwrights, an open timber frame raised over the slipway. A wooden hull sits in its cradle among ladders and scaffolding, and a tall crane leans out over the water towards the fort. Barrels of tar, stacks of fresh-cut planks and a workbench spread with ship plans fill the floor.",
        desktop: { x: 89, y: 52, size: 14 },
        mobile: { x: 84, y: 34, size: 30 },
      },
    },
    map: {
      x: 776,
      y: 45,
      harbor: { x: 796, y: 55 },
    },
  },
  bridgetown: {
    name: "Bridgetown",
    nation: "England",
    summary: "Established trading port",
    harborDescription:
      "Coral-stone warehouses crowd the curve of Carlisle Bay, where hogsheads of sugar and casks of rum roll down to the waiting longboats and British merchantmen ride at anchor in water so clear you can count the shells on the sand.",
    buildings: {
      Shop: {
        name: "Coral Crown Mercantile",
        description:
          "Beneath a slate roof and a crowned blue sign, the Coral Crown Mercantile opens onto the quay under blue awnings. Inside, sacks of sugar, bundles of cane and crates of bananas and limes crowd the floor, barrels of salt pork and fresh water wait by the counter, and a Union flag and a map of Barbados hang beside shelves of bottles, rope and porcelain.",
        desktop: { x: 8.5, y: 48, size: 11 },
        mobile: { x: 18, y: 35, size: 30 },
      },
      Tavern: {
        name: "Anchor & Crown Tavern",
        description:
          "A red-brick house with green shutters, the Anchor & Crown Tavern keeps its doors open to the sea breeze and the ships in the bay. Inside, a whole pig turns on the spit over the hearth, a chalkboard offers rum, spiced rum and plantation punch, and sailors in tricorn hats drink from pewter tankards while a cat dozes by the tables.",
        desktop: { x: 22.5, y: 48, size: 11 },
        mobile: { x: 49, y: 35, size: 30 },
      },
      Bank: {
        name: "Island Ledger Bank",
        description:
          "Pale stone and tall arched windows give the Island Ledger Bank an air of quiet authority. Beneath a carved crest of lions and a palm, clerks at green-shaded lamps record deposits along the polished counter, while a guard stands by the open vault stacked with gold bars. Planters and merchants cross the chequered marble floor to deposit their sugar fortunes.",
        desktop: { x: 37, y: 48, size: 10 },
        mobile: { x: 82, y: 36, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "The red-brick Governor's Hall rises behind white columns and a balcony overlooking the waterfront. Inside, the governor sits at a raised desk between two Union flags, beneath a crest of the lion and unicorn and a candle chandelier. Clerks scratch away at desks lined with potted palms, and great maps of Barbados and the Caribbean cover the walls.",
        desktop: { x: 54.5, y: 45, size: 14 },
        mobile: { x: 32, y: 60, size: 44 },
      },
      Market: {
        name: "Plantation Quay Market",
        description:
          "Striped red and cream awnings shade the stone arches of the Plantation Quay Market, piled high with mangoes, plantains, bananas and pineapples. Traders weigh brown and fine sugar from open sacks beside bundles of cane and barrels of rum, a fish stall sells the fresh catch, and carts of sacks rumble over the cobbles towards the harbour.",
        desktop: { x: 73, y: 48, size: 14 },
        mobile: { x: 66, y: 63, size: 28 },
      },
      Shipyard: {
        name: "King's Shipyard",
        description:
          "A crowned sign and a Union flag hang over the timber shed of the King's Shipyard, which opens straight onto the water. Inside, carpenters climb the scaffolding around a tall new hull, and others saw planks at long workbenches. A great wooden crane swings a crate out over the dock, where barrels of tar wait beside stacks of timber.",
        desktop: { x: 90, y: 48, size: 14 },
        mobile: { x: 90, y: 63, size: 26 },
      },
    },
    map: {
      x: 914,
      y: 458,
      harbor: { x: 920, y: 470 },
    },
  },
  kingston: {
    name: "Kingston",
    nation: "England",
    summary: "Established commercial harbour",
    harborDescription:
      "Ships anchor in the broad harbour behind the Palisadoes, where the drowned streets of old Port Royal lie beneath the water, and the young town of Kingston spreads out along new wharves busy with sugar, logwood and Spanish silver.",
    buildings: {
      Shop: {
        name: "Crown Compass Shop",
        description:
          "Red brick, green shutters and a golden crown above a green sign mark the Crown Compass Shop. Inside, shelves are crowded with compasses, spyglasses, globes and model ships, while bolts of cloth, sacks of beans and barrels of cannonballs fill the floor. An old anchor leans by the open green doors, which look out across the harbour to the fort.",
        desktop: { x: 7.5, y: 55, size: 11 },
        mobile: { x: 19, y: 50, size: 30 },
      },
      Tavern: {
        name: "Mariner's Rest Tavern",
        description:
          "A ship's wheel sits over the green sign of the Mariner's Rest Tavern, and lantern light fills every window from the dormers to the long gallery. Inside, a fire roars in the stone hearth, Union flags hang from the gallery and a naval coat is slung over a chair. Planters and sailors drink side by side, trading news from home.",
        desktop: { x: 22, y: 52, size: 13 },
        mobile: { x: 49, y: 50, size: 32 },
      },
      Bank: {
        name: "Royal Exchange Bank",
        description:
          "Tall white columns and golden crowns give the Royal Exchange Bank the look of a temple to money. Inside, portraits of a redcoat general and a naval officer flank a great barred vault heaped with gold, and a red carpet leads past chests of coin to the clerks' counter. Here the island's sugar money is turned into respectable British coin.",
        desktop: { x: 37, y: 52, size: 10 },
        mobile: { x: 82, y: 50, size: 32 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red brick and white columns rise behind a sweep of stone steps at the Governor's Hall. Inside, blue banners bearing the royal coat of arms in gold hang beneath a candle chandelier, and Union flags stand beside green doors opening onto a balcony above the fort. The governor's carved desk faces two crowned blue chairs, a fireplace and a great map of the world.",
        desktop: { x: 52, y: 48, size: 14 },
        mobile: { x: 50, y: 25, size: 40 },
      },
      Market: {
        name: "Harbour Row Market",
        description:
          "Cream canvas awnings and red and white striped canopies shelter the stalls of the Harbour Row Market, laden with yams, citrus, bananas, slabs of meat and sacks of cocoa. Fish hang from hooks above the counters, and woven rugs drape the old timbered building that holds the traders' stores. The noise rolls out over the cobbled quay and rarely stops before midnight.",
        desktop: { x: 71, y: 55, size: 15 },
        mobile: { x: 26, y: 75, size: 40 },
      },
      Shipyard: {
        name: "Queen's Dockyard",
        description:
          "A golden anchor between two crowns decorates the sign of the Queen's Dockyard, a weathered timber shed facing the water and the fort. Inside, a long hull stands in its cradle among ladders, pulleys and ropes, while plans and a model ship lie on the workbench. The master shipwright inspects every plank before it goes in, and barrels of tar line the slipway.",
        desktop: { x: 90, y: 52, size: 14 },
        mobile: { x: 76, y: 73, size: 42 },
      },
    },
    map: {
      x: 538,
      y: 367,
      harbor: { x: 548, y: 381 },
    },
  },
  nassau: {
    name: "Nassau",
    nation: "England",
    summary: "Pirate haven, a damaged and poorly developed town",
    harborDescription:
      "Rotting hulks and burned-out houses line the shore of New Providence, where pirate sloops careen on the beach beneath the crumbling fort, and nobody in the ragged town answers to any governor.",
    buildings: {
      Shop: {
        name: "Bay Crown Mercantile",
        description:
          "A crowned sign hangs outside the blue doors of the Bay Crown Mercantile, which open straight onto the bay. Inside, a Union flag and a gilded crown hang above the long blue counter, where the shopkeeper weighs out coin on brass scales. Shelves of cloth and porcelain line the walls, pistols and cutlasses hang on racks, and a parrot watches over the chests.",
        desktop: { x: 11, y: 48, size: 13 },
        mobile: { x: 19, y: 20, size: 32 },
      },
      Tavern: {
        name: "Sailmaker's Rest Tavern",
        description:
          "Open shutters let the turquoise bay sparkle into the Sailmaker's Rest Tavern, where spare sails and coils of rope hang from the rafters. A ship's wheel crowns the sign above the bar, and the cross of St George and a portrait of the King look down on the rum barrels behind it. Sailors crowd the tables beneath the glow of brass lanterns.",
        desktop: { x: 26, y: 47, size: 11 },
        mobile: { x: 83, y: 20, size: 30 },
      },
      Bank: {
        name: "Colonial Ledger Bank",
        description:
          "Tall arched windows light the pale stone hall of the Colonial Ledger Bank, beneath the royal lion and unicorn. Bewigged clerks record every coin in great ledgers behind gleaming brass grilles, while planters queue across the chequered floor with their bundles of tobacco, trading a season's hard work for silver. A redcoat guards the heavy iron vault, standing open on chests of gold.",
        desktop: { x: 41, y: 47, size: 13 },
        mobile: { x: 18, y: 40, size: 32 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Doors beneath an arched fanlight open from the red-brick Governor's Hall onto a balcony above the turquoise lagoon. Inside, a great map of the Caribbean and a portrait in a red coat hang behind the carved mahogany desk where the Governor receives captains. The lion and unicorn crest, a Union flag and blue banners with crowns and anchors complete the room.",
        desktop: { x: 59, y: 45, size: 14 },
        mobile: { x: 55, y: 37, size: 38 },
      },
      Market: {
        name: "Mangrove Quay Market",
        description:
          "Under the timber roof of the Mangrove Quay Market, bananas hang from the beams above stalls heaped with limes, cacao, coconuts and pineapples. Traders weigh fruit on swinging scales, snapper, grouper and jack glisten on beds of salt, and fishing canoes from around the island unload their baskets straight onto the planks of the long jetty.",
        desktop: { x: 75, y: 50, size: 13 },
        mobile: { x: 26, y: 64, size: 40 },
      },
      Shipyard: {
        name: "Providence Shipwrights",
        description:
          "Crossed hammers mark the sign of Providence Shipwrights, a great timber shed that smells of fresh-cut mahogany and bubbling pine tar. Carpenters saw and hew beneath a half-built hull whose bare ribs rise above the slipway, and a crane swings cargo on the jetty outside. At the workbench, the master shipwright pores over plans with a captain.",
        desktop: { x: 91, y: 48, size: 14 },
        mobile: { x: 80, y: 66, size: 38 },
      },
    },
    map: {
      x: 504,
      y: 204,
      harbor: { x: 508, y: 218 },
    },
  },
  "cap-francais": {
    name: "Cap-Français",
    nation: "France",
    summary: "Established colonial harbour",
    harborDescription:
      "Beneath green mountains on the north coast of Saint-Domingue, French merchantmen crowd the roadstead to load sugar and indigo, while old buccaneers turned planters drink to the days when Tortuga lay just across the water.",
    buildings: {
      Shop: {
        name: "Harbor Shop",
        description:
          "Golden fleurs-de-lis frame the sign of the Harbor Shop, a squat stone building with a terracotta roof right on the waterfront. Inside, lanterns light shelves of bottles, porcelain jars and folded cloth, a rack of cutlasses and a brass globe, while sacks of beans, cannonballs, anchors and coils of rope crowd the floor. Nobody asks where your money came from.",
        desktop: { x: 10, y: 62, size: 12 },
        mobile: { x: 12, y: 72, size: 26 },
      },
      Tavern: {
        name: "Golden Lily Tavern",
        description:
          "The Golden Lily Tavern sits on the steep stairs climbing from the harbour, its balconies wrapped in climbing vines and lit by warm lanterns. Inside, a long bar of bottles faces open stone arches that look out over the harbour and the fort, and dice, cards and gold coins litter the tables where buccaneers drink, gamble and recruit.",
        desktop: { x: 26, y: 60, size: 14 },
        mobile: { x: 39, y: 72, size: 26 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "Golden lilies decorate the sign of the Royal Bank, a fine stone house with a blue slate roof that looks almost out of place among the rough houses of the town. Inside, brass-grilled counters marked Deposits, Exchange and Loans line a chequered marble hall, and a great vault door stands open on stacked gold bars. The clerks wisely ask few questions.",
        desktop: { x: 41, y: 58, size: 11 },
        mobile: { x: 31, y: 42, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "White banners with golden lilies hang either side of the doors of the Governor's Hall, a pale stone building with a blue slate roof. Inside, blue banners, a great wall map and a carved fleur-de-lis desk fill the governor's office, whose arched balcony looks out over the harbour to the fortress on the cliff. The governor keeps a careful peace with the buccaneers.",
        desktop: { x: 58, y: 58, size: 13 },
        mobile: { x: 70, y: 44, size: 40 },
      },
      Market: {
        name: "Grand Market",
        description:
          "Red and white striped awnings shade the stalls of the Grand Market, set beneath stone arches hung with flowering vines and white banners of golden lilies. Hams, garlic and chillies hang above heaps of fruit, fresh fish and bright spices, while looted silks and rugs pile up by the water, and traders argue loudly over every price.",
        desktop: { x: 73.5, y: 63, size: 11 },
        mobile: { x: 62, y: 72, size: 22 },
      },
      Shipyard: {
        name: "Royal Dockyard",
        description:
          "Golden lilies flank the sign of the Royal Dockyard, a massive timber frame beside the tall masts of the harbour. Inside, a fully planked hull stands wrapped in scaffolding and ladders, while pulleys and iron hooks hang from the beams above workbenches, stacked timber and coils of rope. Beyond the open side, the fort watches over the ships that buccaneers wear out so quickly.",
        desktop: { x: 88, y: 62, size: 11 },
        mobile: { x: 85, y: 76, size: 26 },
      },
    },
    map: {
      x: 658,
      y: 332,
      harbor: { x: 668, y: 321 },
    },
  },
  "basse-terre": {
    name: "Basse-Terre",
    nation: "France",
    summary: "Established fortified town",
    harborDescription:
      "Under the smoking heights of La Soufrière, the stone houses of Basse-Terre line the shore below Fort Saint-Charles, where French ships load sugar and the governor of Guadeloupe keeps a wary eye out for British sails.",
    buildings: {
      Shop: {
        name: "Quay Shop",
        description:
          "Blue shutters and a red-tiled roof give the Quay Shop a warm, sunny charm, and a cream striped awning shades its open front. Inside, cheeses, bread and strings of chillies sit beside sacks of salt, coffee beans and cinnamon, while shelves of bottles and blue and white porcelain rise behind a counter carved with golden lilies, looking straight out over the quay.",
        desktop: { x: 13, y: 58, size: 10 },
        mobile: { x: 23, y: 74, size: 26 },
      },
      Tavern: {
        name: "Blue Heron Tavern",
        description:
          "A painted blue heron marks the sign of the Blue Heron Tavern, a tall house of honey-coloured stone with a slate roof and a balcony full of flowers. Inside, flowering galleries and white banners of golden lilies surround a long bar of bottles, and blue doors open onto the harbour while planters and sailors toast each other with rum and claret.",
        desktop: { x: 26, y: 55, size: 11 },
        mobile: { x: 50, y: 74, size: 28 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "The white flag with golden lilies flies above the Royal Bank, a stately house of pale stone with a golden fleur-de-lis set into its slate roof. Inside, tall arched windows light a chequered marble hall where a brass-railed counter guards ledgers and gold bars, and an iron vault stands open beside potted palms for the tobacco merchants counting their profits.",
        desktop: { x: 40, y: 55, size: 10 },
        mobile: { x: 82, y: 72, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Bougainvillea climbs the arcade of the Governor's Hall, a graceful building with blue shutters and a golden fleur-de-lis above the roofline. Inside, a great map of the Caribbean hangs above a carved desk draped in red, flanked by blue velvet chairs and shelves of books, while the open arcade looks down over the harbour and the church on the hill.",
        desktop: { x: 56, y: 53, size: 14 },
        mobile: { x: 30, y: 40, size: 40 },
      },
      Market: {
        name: "Basse-Terre Market",
        description:
          "Beneath a terracotta roof and a row of stone arches, the Basse-Terre Market sets out its stalls under red and white striped awnings. Baskets of oranges, plantains, pineapples and coffee beans crowd the counters, with chillies and garlic hanging overhead, and through the arches the old stone aqueduct can be seen on the hill above the harbour.",
        desktop: { x: 72, y: 58, size: 12 },
        mobile: { x: 75, y: 52, size: 38 },
      },
      Shipyard: {
        name: "King's Yard",
        description:
          "Under a great open timber roof, the King's Yard cradles a hull still bare to its ribs, ringed with scaffolding and ladders. Chains and pulley blocks hang from the beams over stacked timber, coils of rope and barrels of tar, and lanterns light the work on ships for the French crown, with the harbour and the aqueduct beyond.",
        desktop: { x: 92, y: 58, size: 14 },
        mobile: { x: 81, y: 31, size: 36 },
      },
    },
    map: {
      x: 875,
      y: 391,
      textAlign: "right",
      harbor: { x: 878, y: 400 },
    },
  },
  "saint-pierre": {
    name: "Saint-Pierre",
    nation: "France",
    summary: "Established trading town",
    harborDescription:
      "Under the brooding shadow of Mount Pelée, the busy roadstead fills with French ships taking on sugar and cocoa, and smoke from the sugar mills drifts down to the crowded quays.",
    buildings: {
      Shop: {
        name: "Coral Crown Shop",
        description:
          "A carved red coral fan sits above the sign of the Coral Crown Shop, a cheerful house with blue shutters and a red-tiled roof. Blue and white striped awnings shade the door, and inside, lanterns light shelves of porcelain, branches of red coral, seashells and coral necklaces, while casks, rope and sacks of provisions crowd the floor beneath white and blue banners of France.",
        desktop: { x: 12, y: 52, size: 12 },
        mobile: { x: 27, y: 30, size: 36 },
      },
      Tavern: {
        name: "La Perle Tavern",
        description:
          "Smoke curls from the chimney of La Perle Tavern, where a foaming golden tankard hangs above the dark sign. Inside, a roaring fireplace, a candlelit gallery and a long bar stacked with bottles and barrels frame stone arches open to the harbour, and lantern light falls on tables of sailors and planters drinking rum from the island's own distilleries.",
        desktop: { x: 26.5, y: 52, size: 11 },
        mobile: { x: 64, y: 30, size: 36 },
      },
      Bank: {
        name: "Royal Indies Bank",
        description:
          "White stone columns, a blue slate roof and a golden fleur-de-lis announce the Royal Indies Bank. Inside, a blue carpet of golden lilies leads across a chequered marble hall to a row of brass-grilled counters, past desks stacked with gold coins, scales and ledgers, where merchants trade their rum and sugar money for letters of credit.",
        desktop: { x: 40, y: 52, size: 10 },
        mobile: { x: 28, y: 50, size: 36 },
      },
      "City hall": {
        name: "Governor's Maison",
        description:
          "A red carpet runs down the steps of the Governor's Maison, an elegant house of pale stone with blue shutters and a golden fleur-de-lis set into its slate roof. Inside, a red velvet chair waits behind a carved desk beneath a great map of the Caribbean, with a globe, telescope and books close at hand, and tall windows look out over the harbour.",
        desktop: { x: 54.5, y: 50, size: 13 },
        mobile: { x: 72, y: 50, size: 36 },
      },
      Market: {
        name: "Spice Quay Market",
        description:
          "A carved golden pineapple crowns the sign of the Spice Quay Market, where red, green and white striped awnings shade crates of bananas, pineapples, cocoa pods and bundles of cinnamon bark. White banners of golden lilies hang from the warm ochre arches, and a path between the stalls leads straight down to the harbour as traders haggle over every sack.",
        desktop: { x: 71.5, y: 55, size: 14 },
        mobile: { x: 26, y: 70, size: 38 },
      },
      Shipyard: {
        name: "Fleur Harbor Dockyard",
        description:
          "A golden anchor and crossed hammers mark the sign of the Fleur Harbor Dockyard, a stone and timber shed with a blue slate roof. Inside, a hull rests on its cradle amid scaffolding and ladders, with ship plans pinned by the workbenches and pulley blocks, rope and an old anchor close by, while ships flying the white flag of France wait at anchor.",
        desktop: { x: 88.5, y: 55, size: 14 },
        mobile: { x: 73, y: 74, size: 42 },
      },
    },
    map: {
      x: 884,
      y: 419,
      textAlign: "right",
      harbor: { x: 892, y: 431 },
    },
  },
  "fort-louis": {
    name: "Fort Louis",
    nation: "France",
    summary: "Small colonial capital and river port",
    harborDescription:
      "French ships anchor off Dauphin Island and send their cargo up Mobile Bay by boat to Fort Louis, a small wooden capital where soldiers, settlers and traders bargain with the Mobile and Choctaw peoples for deerskins.",
    buildings: {
      Shop: {
        name: "Pelican Pearl Shop",
        description:
          "Red tiles, teal shutters and climbing bougainvillea frame the Pelican Pearl Shop, where a red and white striped awning shades the door. Inside, lantern light falls on chests of pearls, seashells and shelves of bottles and porcelain, with coils of rope, casks and crates of fruit for the voyage ahead and a fleur-de-lis rug laid before the counter.",
        desktop: { x: 10, y: 50, size: 13 },
        mobile: { x: 21, y: 51, size: 32 },
      },
      Tavern: {
        name: "Belle Mer Tavern",
        description:
          "Lanterns glow along the long balcony of the Belle Mer Tavern, its dark blue sign painted with golden fleurs-de-lis. Inside, flowers tumble from the gallery over a long bar of wine bottles and barrels marked with lilies, a fiddle waits by the wall, and blue doors open on the harbour, filling the room with laughter and clinking cups of wine.",
        desktop: { x: 26, y: 50, size: 12 },
        mobile: { x: 54, y: 51, size: 34 },
      },
      Bank: {
        name: "Crown Isle Bank",
        description:
          "A golden fleur-de-lis crowns the slate roof of the Crown Isle Bank, a handsome cream building with teal shutters and flower-filled window boxes. Inside, brass posts and ropes guide customers to a carved counter with scales and quill, and an iron vault stands open on stacked gold bars, while bundles of tobacco and timber show the trade that settles its accounts here.",
        desktop: { x: 40, y: 50, size: 11 },
        mobile: { x: 24, y: 28, size: 36 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Wide steps lead up to the Governor's Hall, a stately cream building with a blue slate roof, a golden fleur-de-lis and a balcony draped in flowers. Inside, blue curtains and banners of golden lilies frame a carved desk, a marble fireplace and a large wall map, while open doors lead to the balcony where officials debate the colony's affairs.",
        desktop: { x: 55.5, y: 48, size: 14 },
        mobile: { x: 71, y: 28, size: 40 },
      },
      Market: {
        name: "Bayfront Spice Market",
        description:
          "Under a red-tiled roof wreathed in flowers, the Bayfront Spice Market opens its stalls beneath red, green and white striped awnings. Labelled bins of cayenne, nutmeg, cinnamon, allspice and pepper sit beneath strings of chillies and garlic, beside baskets of fresh fruit, and the scent of spices carries all the way to the water.",
        desktop: { x: 73, y: 52, size: 12 },
        mobile: { x: 29, y: 72, size: 36 },
      },
      Shipyard: {
        name: "Crescent Dockyard",
        description:
          "A great timber frame with a golden fleur-de-lis above its entrance, the Crescent Dockyard rings with mallets and saws. Scaffolding and ladders wrap a hull taking shape on the slipway, ship plans cover the workbenches, and a hook and pulley hoist timber from the quay beside the harbour fort.",
        desktop: { x: 89, y: 52, size: 14 },
        mobile: { x: 74, y: 72, size: 40 },
      },
    },
    map: {
      x: 287,
      y: 84,
      harbor: { x: 295, y: 102 },
    },
  },
  portobelo: {
    name: "Portobelo",
    nation: "Spain",
    summary: "Fortified trading port",
    harborDescription:
      "Mule trains laden with Peruvian silver come down the jungle road from Panama to the stone quays, where soldiers from the forts guard every chest until the great fair brings the galleons that carry the King's fortune home.",
    buildings: {
      Shop: {
        name: "Pearl Shop",
        description:
          "Bougainvillea climbs the whitewashed arches of the Pearl Shop, where red banners bearing the royal crest hang beneath lanterns on iron chains. Inside, open shells, chests and gold bowls brim with pearls beside brass scales on the counter, while sacks, barrels and crates of food, water and medicine wait by the arch that looks out over the harbour.",
        desktop: { x: 8, y: 58, size: 10 },
        mobile: { x: 14, y: 73, size: 26 },
      },
      Tavern: {
        name: "Compass Tavern",
        description:
          "The Compass Tavern is a long white house with a red-tiled roof and a wooden gallery along its upper floor, and inside a great ship's wheel hangs on the wall above that gallery. Its compass-topped sign hangs over a bar lined with bottles and barrels, and muleteers fresh from the jungle road crowd the long tables alongside sailors waiting for the silver fleet.",
        desktop: { x: 22.5, y: 56, size: 13 },
        mobile: { x: 46, y: 72, size: 34 },
      },
      Bank: {
        name: "Treasure Bank",
        description:
          "The Treasure Bank is built like a fortress, its thick stone walls and heavy doors guarded day and night. Inside, a carved royal crest flanked by golden lions crowns the iron-grilled vault, and chests of silver, gold bars and sacks of coin crowd the clerks' tables, where brass scales weigh the silver of Peru before it sails for Spain.",
        desktop: { x: 37, y: 55, size: 10 },
        mobile: { x: 17, y: 45, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Crimson banners embroidered in gold hang from the arcade of the Governor's Hall, a white stone building with a small bell tower and a grand stairway up from the quay. Inside, a high-backed red chair bearing the royal crest stands behind a carved desk, with a great map, a portrait, a globe and a model galleon around it, and tall arches open onto the harbour.",
        desktop: { x: 54, y: 50, size: 15 },
        mobile: { x: 51, y: 43, size: 38 },
      },
      Market: {
        name: "Plaza Market",
        description:
          "The Plaza Market spreads red, green and blue striped awnings over its stalls beneath a cool arcade of stone arches hung with Spanish banners and flowers. Pineapples, bananas and cacao pods spill from crates, fresh fish and oysters lie on ice, and traders bargain over pearls, sacks of beans and bright woven cloth with the harbour glittering beyond.",
        desktop: { x: 71.5, y: 57, size: 14 },
        mobile: { x: 86, y: 49, size: 30 },
      },
      Shipyard: {
        name: "Portobelo Shipyard",
        description:
          "Under a long red-tiled roof held up by heavy beams, the Portobelo Shipyard keeps a great hull in its cradle, wrapped in scaffolding and ladders. Spanish banners hang from the posts above stacks of timber, an anvil, coils of rope and chains, and carpenters patch the battered ships of the treasure fleet here before they brave the long voyage home.",
        desktop: { x: 90, y: 52, size: 14 },
        mobile: { x: 80, y: 72, size: 36 },
      },
    },
    map: {
      x: 440,
      y: 540,
      harbor: { x: 441, y: 548 },
    },
  },
  havana: {
    name: "Havana",
    nation: "Spain",
    summary: "Major commercial and naval port",
    harborDescription:
      "Guarded by the great Morro fortress, the deep and sheltered bay holds the whole Spanish treasure fleet as it gathers for the crossing to Spain, while chandlers and caulkers grow rich preparing the galleons for the voyage.",
    buildings: {
      Shop: {
        name: "Harbor Shop",
        description:
          "Two wide arches open the whitewashed Harbor Shop to the quay, and under its terracotta roof Havana's captains stock up before the long crossing. Inside, an iron anchor leans against the wall beside barrels, sacks and coils of rope, while shelves of bottles, blue and white jars and folded cloth rise behind a counter set with brass scales.",
        desktop: { x: 10, y: 50, size: 11 },
        mobile: { x: 16, y: 58, size: 30 },
      },
      Tavern: {
        name: "Parrot Tavern",
        description:
          "A brightly painted parrot perches above the bar of the Parrot Tavern, beside a carved coat of arms and shelves of bottles and barrels. Bougainvillea spills from the iron-railed balcony overhead, lanterns glow on iron brackets, and a guitar rests by the candlelit tables while the arches look out over the harbour and the fortress walls.",
        desktop: { x: 24.5, y: 50, size: 10 },
        mobile: { x: 25, y: 40, size: 34 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "Behind ornate iron gates and a gilded royal coat of arms, the Royal Bank guards the silver of the Spanish crown. Inside, red banners hang above a carved counter with a gilded railing, stacks of silver coin rise beside brass scales and quills, and an iron gate crowned with the royal arms opens onto the great round door of the vault.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 79, y: 43, size: 36 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red and gold banners of Spain hang from the balcony of the Governor's Hall, a grand building of white stone with tall arches. Inside, a red carpet climbs a marble dais to the governor's carved desk and high-backed chair, flanked by banners, globes, maps and halberds, while the columned arches give him a clear view of the treasure fleet in the bay.",
        desktop: { x: 56, y: 48, size: 15 },
        mobile: { x: 54, y: 25, size: 38 },
      },
      Market: {
        name: "Harbor Market",
        description:
          "Orange and white striped awnings stretch out from the Harbor Market, covering tables heaped with mangoes, pineapples and sacks of sugar. Bundles of tobacco leaves and chillies hang from the beams, boxes of cigars sit beside baskets of spices and blue and white jars, and the cathedral towers rise over the rooftops behind.",
        desktop: { x: 74, y: 52, size: 11 },
        mobile: { x: 64, y: 64, size: 36 },
      },
      Shipyard: {
        name: "Havana Shipyard",
        description:
          "Built of stone and dark timber beside a small watchtower, the Havana Shipyard shelters a new hull in scaffolding under its broad roof. A Spanish flag hangs on the stone wall above stacks of timber, an anchor and a rope winch, tall-masted ships tie up at the quay outside, and the yard is famous for vessels of tough Cuban hardwood.",
        desktop: { x: 89, y: 50, size: 14 },
        mobile: { x: 74, y: 82, size: 36 },
      },
    },
    map: {
      x: 413,
      y: 247,
      harbor: { x: 431, y: 249 },
    },
  },
  campeche: {
    name: "Campeche",
    nation: "Spain",
    summary: "Established fortified port",
    harborDescription:
      "Behind stout walls built against pirate raids, the port of Campeche loads logwood and salt onto Spanish ships, while lookouts on the bastions watch the shallow bay for British logwood cutters.",
    buildings: {
      Shop: {
        name: "Plaza Shop",
        description:
          "A white stucco house with a balcony draped in flowers, the Plaza Shop opens two wide arches to the quay under blue and white striped awnings. Inside, crates of oranges and peppers sit beneath strings of garlic and chillies, barrels line the floor, and shelves of bottles, cloth and blue and white jars rise behind a counter under a Spanish banner and a ship's wheel.",
        desktop: { x: 8.5, y: 52, size: 12 },
        mobile: { x: 20, y: 35, size: 30 },
      },
      Tavern: {
        name: "Sailor's Tavern",
        description:
          "Vines and flowers climb the arches of the Sailor's Tavern, shaded outside by blue and white striped awnings. Inside, a great carved ship's wheel hangs on the wall above a bar faced with blue and white tiles, where tankards dangle over rows of bottles and barrels, and the lantern-lit tables are crowded with thirsty sailors.",
        desktop: { x: 23, y: 50, size: 13 },
        mobile: { x: 78, y: 42, size: 34 },
      },
      Bank: {
        name: "Crown Bank",
        description:
          "Behind a gate of black and gold ironwork, the Crown Bank guards its treasury under a painted royal coat of arms. Inside, red banners with golden crowns hang from the pale stone arches, gilded railings close off the clerks' counter, and a short red-carpeted stair leads through an iron gate to a round vault door and stacks of gold bars.",
        desktop: { x: 38, y: 50, size: 10 },
        mobile: { x: 27, y: 56, size: 34 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red and gold banners of Spain hang down the white walls of the Governor's Hall, a grand building with arched windows and an iron balcony. Inside, a gilded crest crowns the inner doorway, halberds and a great map line the walls, and a carved desk draped in the royal arms faces tall glass doors that open onto the balcony and the fortress beyond.",
        desktop: { x: 53.5, y: 47, size: 14 },
        mobile: { x: 52, y: 24, size: 38 },
      },
      Market: {
        name: "Grand Market",
        description:
          "Green and orange striped awnings shade the stalls of the Grand Market, piled high with cacao pods, sacks of beans, pineapples and bananas. Strings of chillies and garlic hang from the beams, a carved ship's wheel sits in the vine-covered gable between Spanish banners, and the twin towers of the cathedral rise over the rooftops behind.",
        desktop: { x: 70.5, y: 52, size: 13 },
        mobile: { x: 74, y: 58, size: 38 },
      },
      Shipyard: {
        name: "Campeche Shipyard",
        description:
          "A golden anchor marks the sign of the Campeche Shipyard, a broad timber shed with a stone tower beside it. Inside, a half-built hull rests in its scaffolding beneath chains and pulley blocks, small boats sit on the wet slipway among stacks of timber and tools, and tall masts sway at the pier outside.",
        desktop: { x: 87, y: 50, size: 16 },
        mobile: { x: 63, y: 78, size: 46 },
      },
    },
    map: {
      x: 215,
      y: 324,
      harbor: { x: 215, y: 334 },
    },
  },
  "san-juan": {
    name: "San Juan",
    nation: "Spain",
    summary: "Established fortified port",
    harborDescription:
      "Ships slip past the towering walls of El Morro into a sheltered bay, where Spanish men-of-war take on fresh water and supplies and soldiers drill on the ramparts above the bustling waterfront.",
    buildings: {
      Shop: {
        name: "Port Shop",
        description:
          "Bougainvillea spills from the balcony above the Port Shop, a whitewashed building whose arched wooden doors open straight onto the quay facing El Morro. Inside, a counter draped with a Spanish banner holds brass scales and an armillary sphere, shelves are stacked with sacks, cloth, bottles and jars, and barrels of cannonballs, coils of rope and an anchor crowd the floor.",
        desktop: { x: 8, y: 58, size: 10 },
        mobile: { x: 16, y: 69, size: 28 },
      },
      Tavern: {
        name: "Anchor Tavern",
        description:
          "An iron anchor hangs beside the three tall arches of the Anchor Tavern, which open its lantern-lit room to the harbour and the fortress beyond. Bougainvillea spills down the walls, a fire burns in the hearth beside a bar lined with bottles, and soldiers from the garrison swap stories with sailors over cups of wine at the long tables.",
        desktop: { x: 22.5, y: 58, size: 11 },
        mobile: { x: 45, y: 70, size: 32 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "A golden crown is set into the pale stone front of the Royal Bank, above a sturdy arched door at the top of a short flight of steps. Inside, another carved crown tops the barred vault gate, where gold bars fill the shelves, and the King's officials count stacks of gold coin that pay the garrison and keep the great fortress walls in good repair.",
        desktop: { x: 38, y: 56, size: 10 },
        mobile: { x: 80, y: 69, size: 34 },
      },
      "City hall": {
        name: "Governor's Palace",
        description:
          "Twin towers frame the Governor's Palace, its red-tiled roof crowned with the royal coat of arms and its balcony hung with banners in red and gold. Inside, a red velvet chair stands behind a carved desk under a great sea chart, with shelves of books and a model ship beside it, and arched doors open onto a balustraded balcony overlooking the harbour.",
        desktop: { x: 54.5, y: 52, size: 13 },
        mobile: { x: 48, y: 43, size: 36 },
      },
      Market: {
        name: "San Juan Market",
        description:
          "Beneath a terracotta roof, cream and blue striped awnings shade the stalls of the San Juan Market. Hams, garlic and chillies hang above crates of oranges and tomatoes, sacks of grain, bottles of olive oil fresh from Spain and fish laid on ice change hands, and flowers tumble from every arch around it.",
        desktop: { x: 71, y: 60, size: 12 },
        mobile: { x: 16, y: 45, size: 28 },
      },
      Shipyard: {
        name: "San Juan Shipyard",
        description:
          "Crossed hammers hang on the sign of the San Juan Shipyard, a timber shed whose open front faces straight onto the bay. A new hull rests inside behind scaffolding and stairs, surrounded by stacked timber, rope and a workbench of tools, while warships of the Spanish crown tie up alongside to have their damage repaired.",
        desktop: { x: 88, y: 58, size: 14 },
        mobile: { x: 80, y: 42, size: 36 },
      },
    },
    map: {
      x: 776,
      y: 343,
      harbor: { x: 794, y: 342 },
    },
  },
  savaneta: {
    name: "Savaneta",
    nation: "Holland",
    summary: "Small Dutch administrative outpost",
    harborDescription:
      "Few colonists live on this dry Dutch island, where Caquetío herders drive cattle and horses down to the beach at Savaneta for shipping to Curaçao, and West India Company sloops come and go with hides, salted meat and news.",
    buildings: {
      Shop: {
        name: "Oranje Trade House",
        description:
          "Behind orange brick, a stepped gable and green shutters, the Oranje Trade House sells everything from salted fish to sailcloth. Inside, the Dutch flag hangs beside a map of the island, salted fish dangle above bins of spices, and rolls of sailcloth, coils of rope and crates of white salt crowd the floor. Its green doors open under a cream awning onto the quay.",
        desktop: { x: 9.5, y: 48, size: 11 },
        mobile: { x: 19, y: 37, size: 30 },
      },
      Tavern: {
        name: "Admiral's Rest Tavern",
        description:
          "A long, low house with a dark slate roof, the Admiral's Rest Tavern opens its green doors wide onto the harbour. Inside, lanterns glow over blue-cushioned stools, Delft mugs and a bar stacked with bottles and a great tapped barrel, while sailors at the tables talk of salt prices, storms and the next voyage.",
        desktop: { x: 24, y: 50, size: 12 },
        mobile: { x: 50, y: 46, size: 34 },
      },
      Bank: {
        name: "Guild Ledger Bank",
        description:
          "Tall and narrow, the Guild Ledger Bank wears a stepped brick gable and a green arched door. Inside, red, white and blue banners hang from the gallery, and beneath a gilded lion crest a great iron vault stands behind a brass-railed counter, where careful Dutch clerks weigh coins on brass scales and record every guilder.",
        desktop: { x: 40, y: 48, size: 11 },
        mobile: { x: 84, y: 43, size: 30 },
      },
      "City hall": {
        name: "Stadholder's Hall",
        description:
          "Golden stone, a slender bell tower and a broad flight of stone steps mark the Stadholder's Hall. Inside, a blue lion crest and red, white and blue banners hang above a great carved desk, while green shutters stand open to the harbour and the trade winds. Island officials pore over maps of Aruba beneath a candle chandelier.",
        desktop: { x: 56, y: 46, size: 13 },
        mobile: { x: 51, y: 22, size: 36 },
      },
      Market: {
        name: "Spice Wharf Market",
        description:
          "Beneath a red-brick stepped gable and a pair of Dutch flags, the Spice Wharf Market spreads its cream awnings over stalls of cloves, nutmeg and cinnamon. Strings of peppers and garlic hang above crates of oranges, bananas and pineapples, bolts of bright cloth fill the far stalls, and the windmill turns on the hill across the water.",
        desktop: { x: 72.5, y: 50, size: 11 },
        mobile: { x: 35, y: 70, size: 34 },
      },
      Shipyard: {
        name: "Eastwind Dockyard",
        description:
          "Under a slate roof and the Dutch flag, the Eastwind Dockyard is a great open shed where bare timber scaffolding surrounds a ship's hull. A pulley and iron hook hang ready over the quay, ship plans are pinned to the wall, and stacked planks, barrels and crates of ironwork wait to be hauled aboard.",
        desktop: { x: 90, y: 48, size: 14 },
        mobile: { x: 78, y: 70, size: 40 },
      },
    },
    map: {
      x: 702,
      y: 477,
      textAlign: "left",
      harbor: { x: 718, y: 489 },
    },
  },
  willemstad: {
    name: "Willemstad",
    nation: "Holland",
    summary: "Established fortified port",
    harborDescription:
      "Brightly painted Dutch gabled houses crowd the waterfront of Willemstad, and the deep natural harbor is packed with merchantmen from every nation, all welcome as long as their trade pays the Company its share.",
    buildings: {
      Shop: {
        name: "Oranje Supply House",
        description:
          "Painted a warm orange with white trim and a stepped Dutch gable, the Oranje Supply House is the brightest building on the waterfront. Inside its green doors, crates of salt fish, sacks of beans and baskets of oranges and limes crowd the floor, while muskets, rope and cannonballs line the walls behind a counter draped with the orange lion.",
        desktop: { x: 9, y: 50, size: 10 },
        mobile: { x: 17, y: 45, size: 28 },
      },
      Tavern: {
        name: "Sailor's Rest Tavern",
        description:
          "A red-tiled roof and sky blue walls give the Sailor's Rest Tavern a cheerful look. Its lantern-lit veranda looks out over the painted houses of Willemstad, and inside a long bar of bottles and racked pipes stands beneath a gallery hung with the Dutch flag and a lion banner, where sailors from every nation share rum.",
        desktop: { x: 24, y: 52, size: 11 },
        mobile: { x: 49, y: 47, size: 30 },
      },
      Bank: {
        name: "Merchant Ledger Bank",
        description:
          "A tall stepped gable with white trim crowns the Merchant Ledger Bank, its green shutters and arched door watched over by a pair of lanterns. Inside, the Company's crest guards an iron-barred vault stacked with gold, and clerks behind the brass-railed counter count guilders, pieces of eight and English shillings alike, as long as the coin is good.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 83, y: 47, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Pale yellow walls, a domed bell tower and a blue coat of arms above the door make the Governor's Hall the pride of Willemstad. Inside, blue lion banners and Dutch flags frame a raised desk on a carpeted dais, and green shutters open onto a balcony over the harbour, past potted palms and Delft vases.",
        desktop: { x: 54.5, y: 46, size: 13 },
        mobile: { x: 50, y: 25, size: 34 },
      },
      Market: {
        name: "Harbor Spice Market",
        description:
          "Under the stepped gable of the Harbor Spice Market, cream awnings and Dutch flags shade crates overflowing with peppers, cinnamon, oranges and limes beside bolts of brightly dyed cloth. Strings of chillies and garlic hang from the beams, and beyond the quay the windmill turns on the hill above Willemstad's painted houses.",
        desktop: { x: 70, y: 52, size: 10 },
        mobile: { x: 26, y: 75, size: 32 },
      },
      Shipyard: {
        name: "Bluewater Dockyard",
        description:
          "Beneath a dark shingled roof and the Dutch flag, the Bluewater Dockyard is a forest of scaffolding around a growing hull. Pulleys swing bundles of timber in from the quay, past stacked beams, tar barrels and coils of rope, and shipwrights hammer away from first light until dusk with Willemstad's painted houses across the water.",
        desktop: { x: 88, y: 52, size: 16 },
        mobile: { x: 74, y: 75, size: 42 },
      },
    },
    map: {
      x: 723,
      y: 481,
      harbor: { x: 725, y: 494 },
    },
  },
  "simpson-bay": {
    name: "Simpson Bay",
    nation: "Holland",
    summary: "Small fishing and anchorage settlement",
    harborDescription:
      "Fishing boats and the odd trading sloop anchor in the quiet lagoon of Simpson Bay, on the Dutch half of an island shared with France, where salt from the great pond is raked into white heaps along the shore.",
    buildings: {
      Shop: {
        name: "Salt Pond Supply Shop",
        description:
          "A red and white striped awning hangs over the green door of the Salt Pond Supply Shop, a brick house with a stepped gable and flower boxes in every window. Inside, barrels and sacks brim with salt, hams, garlic and chillies hang from the beams, and bolts of cloth, coils of rope and crates of cannonballs crowd around a counter with brass scales.",
        desktop: { x: 8.5, y: 52, size: 10 },
        mobile: { x: 17, y: 38, size: 28 },
      },
      Tavern: {
        name: "Pelican Sail Tavern",
        description:
          "Under a red-tiled roof and pale blue walls, the Pelican Sail Tavern opens its green doors onto a striped-awning veranda over the quay. A pelican figure perches above the bar, flowers trail from the beams beside Dutch flags, and herdsmen and sailors gather at long wooden tables, drinking until the stars come out over the bay.",
        desktop: { x: 22.5, y: 54, size: 11 },
        mobile: { x: 50, y: 46, size: 32 },
      },
      Bank: {
        name: "Island Ledger Bank",
        description:
          "Painted a soft sage green, the Island Ledger Bank stands out with its stepped gable, flower boxes and green arched door. Inside, the Dutch flag hangs above rows of ledger drawers and an iron-barred vault, and clerks at the long counter weigh coin on brass scales and keep careful records of every sack of salt shipped to Curaçao.",
        desktop: { x: 38, y: 52, size: 9 },
        mobile: { x: 85, y: 42, size: 26 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "A golden building with a clock above the entrance and a domed bell tower, the Governor's Hall sits at the top of a wide stone stair. Inside, a crowned lion crest and red, white and blue banners hang above a great map of the island, and green shutters open onto the harbour past potted palms, Delft vases and the Dutch flag.",
        desktop: { x: 54, y: 50, size: 14 },
        mobile: { x: 55, y: 20, size: 38 },
      },
      Market: {
        name: "Salt Bay Market",
        description:
          "Green and cream striped awnings shade the stalls of the Salt Bay Market, set beneath cream stone arches in orange brick walls hung with flowers. Crates spill over with oranges, limes and peppers, sacks of spices sit beneath strings of garlic and chillies, and fishermen bring their catch straight up from the boats below, laying it out on salt beside lobster pots and nets.",
        desktop: { x: 70.5, y: 54, size: 10 },
        mobile: { x: 25, y: 70, size: 32 },
      },
      Shipyard: {
        name: "Oyster Reef Shipyard",
        description:
          "A tall wooden crane leans over the Oyster Reef Shipyard, where a ship's hull rises within a cage of scaffolding and ladders. Pulleys lower bundles of timber to the quay, ship plans hang above the workbenches, and rowing boats crowd the pier outside as the sound of hammers carries across the water.",
        desktop: { x: 88, y: 54, size: 16 },
        mobile: { x: 74, y: 74, size: 44 },
      },
    },
    map: {
      x: 837,
      y: 340,
      textAlign: "right",
      harbor: { x: 840, y: 355 },
    },
  },
  "st-eustatius": {
    name: "St. Eustatius",
    nation: "Holland",
    summary: "Established village with harbour",
    harborDescription:
      "A small Dutch village clusters below Fort Oranje on the cliff, and warehouses along the Lower Town shore sell gunpowder, cloth and wine to traders of any flag who can pay in coin.",
    buildings: {
      Shop: {
        name: "Quill Supply House",
        description:
          "Beneath a stepped gable of orange brick and the Dutch flag, the Quill Supply House trades in everything a ship might need. Cream awnings shade its green door, and crates of fruit, barrels of water and coils of rope wait on the stone quay outside.",
        desktop: { x: 8.5, y: 52, size: 10 },
        mobile: { x: 17, y: 32, size: 28 },
      },
      Tavern: {
        name: "Harbor Lantern Tavern",
        description:
          "Lanterns hang all along the wooden gallery of the Harbor Lantern Tavern, a low house with a dark slate roof. Its tables spill out onto the quay, where smugglers from every flag share rum and keep one eye on the ships at anchor.",
        desktop: { x: 23, y: 52, size: 14 },
        mobile: { x: 49, y: 52, size: 40 },
      },
      Bank: {
        name: "Statia Ledger Bank",
        description:
          "A carved white crest crowns the stepped brick gable of the Statia Ledger Bank, and lanterns burn on either side of its green double door. Pots of flowers line the steps, and inside, letters of credit change hands as easily as coin.",
        desktop: { x: 38.5, y: 52, size: 10 },
        mobile: { x: 84, y: 33, size: 28 },
      },
      "City hall": {
        name: "Island Council Hall",
        description:
          "Golden walls, a clock-faced crest and a slender bell tower mark the Island Council Hall. A broad stone stair climbs past potted palms to its green doors, and from the balcony the council watches over the busiest free port in the Caribbean.",
        desktop: { x: 55, y: 50, size: 13 },
        mobile: { x: 51, y: 30, size: 34 },
      },
      Market: {
        name: "Fort Bay Market",
        description:
          "Under a stepped red gable, the Fort Bay Market stretches its cream awnings over crates bursting with fruit, flowers and spices. Barrels line the front, and buyers from every nation crowd the stalls in search of a bargain.",
        desktop: { x: 72.5, y: 55, size: 11 },
        mobile: { x: 32, y: 75, size: 34 },
      },
      Shipyard: {
        name: "Oranje Shipworks",
        description:
          "Scaffolding wraps a half-built hull inside the Oranje Shipworks, an open timber shed with a slate roof and a crane leaning over the water. Small boats bob at the pier while shipwrights work through the day.",
        desktop: { x: 89, y: 55, size: 15 },
        mobile: { x: 76, y: 76, size: 42 },
      },
    },
    map: {
      x: 840,
      y: 357,
      textAlign: "right",
      harbor: { x: 841, y: 359 },
    },
  },
}
