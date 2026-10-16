export const NATIONS: Record<Nation, { name: Nation; warWith: Nation }> = {
  England: {
    name: "England",
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
    nation: Nation
    harborDescription: string
    buildings: Record<TownLocation, TownBuilding>
    map: {
      x: number
      y: number
      textAlign?: "bottom" | "right"
      distanceTo: Record<Town, number>
    }
  }
>

const DISTANCES = {
  CHARLES_TOWNE_BILOXI: 5,
  CHARLES_TOWNE_HAVANA: 2,
  CHARLES_TOWNE_BELIZE: 5,
  CHARLES_TOWNE_VILLA_HERMOSA: 6,
  CHARLES_TOWNE_PORT_ROYALE: 5,
  CHARLES_TOWNE_LEOGANE: 4,
  CHARLES_TOWNE_TORTUGA: 4,
  CHARLES_TOWNE_SAN_JUAN: 5,
  CHARLES_TOWNE_ST_MARTIN: 5,
  CHARLES_TOWNE_ST_EUSTATIUS: 5,
  CHARLES_TOWNE_MARTINIQUE: 6,
  CHARLES_TOWNE_BARBADOS: 7,
  CHARLES_TOWNE_BONAIRE: 6,
  CHARLES_TOWNE_CURACAO: 5,
  CHARLES_TOWNE_PANAMA: 6,
  BARBADOS_MARTINIQUE: 1,
  BARBADOS_ST_EUSTATIUS: 1,
  BARBADOS_ST_MARTIN: 2,
  BARBADOS_SAN_JUAN: 2,
  BARBADOS_TORTUGA: 3,
  BARBADOS_LEOGANE: 3,
  BARBADOS_PORT_ROYALE: 4,
  BARBADOS_HAVANA: 5,
  BARBADOS_BONAIRE: 2,
  BARBADOS_CURACAO: 3,
  BARBADOS_PANAMA: 5,
  BARBADOS_BELIZE: 7,
  BARBADOS_BILOXI: 8,
  BARBADOS_VILLA_HERMOSA: 9,
  BARBADOS_CHARLES_TOWNE: 6,
  PORT_ROYALE_HAVANA: 2,
  PORT_ROYALE_LEOGANE: 1,
  PORT_ROYALE_TORTUGA: 2,
  PORT_ROYALE_SAN_JUAN: 3,
  PORT_ROYALE_ST_MARTIN: 3,
  PORT_ROYALE_ST_EUSTATIUS: 3,
  PORT_ROYALE_MARTINIQUE: 3,
  PORT_ROYALE_BARBADOS: 4,
  PORT_ROYALE_BONAIRE: 3,
  PORT_ROYALE_CURACAO: 2,
  PORT_ROYALE_PANAMA: 2,
  PORT_ROYALE_BELIZE: 3,
  PORT_ROYALE_VILLA_HERMOSA: 5,
  PORT_ROYALE_BILOXI: 5,
  BELIZE_VILLA_HERMOSA: 4,
  BELIZE_HAVANA: 2,
  BELIZE_BILOXI: 4,
  BELIZE_CHARLES_TOWNE: 5,
  BELIZE_PANAMA: 3,
  BELIZE_CURACAO: 5,
  BELIZE_BONAIRE: 5,
  BELIZE_BARBADOS: 7,
  BELIZE_MARTINIQUE: 6,
  BELIZE_ST_EUSTATIUS: 6,
  BELIZE_ST_MARTIN: 6,
  BELIZE_SAN_JUAN: 6,
  BELIZE_TORTUGA: 5,
  BELIZE_LEOGANE: 4,
  BELIZE_PORT_ROYALE: 3,
  TORTUGA_LEOGANE: 1,
  TORTUGA_SAN_JUAN: 1,
  TORTUGA_PORT_ROYALE: 2,
  TORTUGA_ST_MARTIN: 2,
  TORTUGA_ST_EUSTATIUS: 2,
  TORTUGA_MARTINIQUE: 3,
  TORTUGA_BARBADOS: 3,
  TORTUGA_BONAIRE: 3,
  TORTUGA_CURACAO: 3,
  TORTUGA_PANAMA: 5,
  TORTUGA_BELIZE: 5,
  TORTUGA_VILLA_HERMOSA: 7,
  TORTUGA_BILOXI: 5,
  TORTUGA_CHARLES_TOWNE: 4,
  TORTUGA_HAVANA: 3,
  LEOGANE_PORT_ROYALE: 1,
  LEOGANE_TORTUGA: 1,
  LEOGANE_SAN_JUAN: 2,
  LEOGANE_ST_MARTIN: 2,
  LEOGANE_ST_EUSTATIUS: 3,
  LEOGANE_MARTINIQUE: 3,
  LEOGANE_BARBADOS: 3,
  LEOGANE_BILOXI: 5,
  LEOGANE_BONAIRE: 3,
  LEOGANE_CURACAO: 3,
  LEOGANE_PANAMA: 3,
  LEOGANE_HAVANA: 4,
  LEOGANE_BELIZE: 4,
  LEOGANE_VILLA_HERMOSA: 7,
  MARTINIQUE_ST_EUSTATIUS: 1,
  MARTINIQUE_ST_MARTIN: 1,
  MARTINIQUE_SAN_JUAN: 2,
  MARTINIQUE_HAVANA: 6,
  MARTINIQUE_BONAIRE: 3,
  MARTINIQUE_CURACAO: 3,
  MARTINIQUE_PANAMA: 5,
  MARTINIQUE_VILLA_HERMOSA: 9,
  MARTINIQUE_BILOXI: 8,
  BILOXI_HAVANA: 2,
  BILOXI_VILLA_HERMOSA: 3,
  BILOXI_PANAMA: 5,
  BILOXI_CURACAO: 6,
  BILOXI_BONAIRE: 7,
  BILOXI_ST_EUSTATIUS: 8,
  BILOXI_ST_MARTIN: 8,
  BILOXI_SAN_JUAN: 8,
  PANAMA_CURACAO: 2,
  PANAMA_BONAIRE: 3,
  PANAMA_VILLA_HERMOSA: 6,
  PANAMA_HAVANA: 4,
  PANAMA_SAN_JUAN: 4,
  PANAMA_ST_MARTIN: 5,
  PANAMA_ST_EUSTATIUS: 5,
  HAVANA_VILLA_HERMOSA: 4,
  HAVANA_CURACAO: 4,
  HAVANA_BONAIRE: 5,
  HAVANA_ST_EUSTATIUS: 6,
  HAVANA_ST_MARTIN: 5,
  HAVANA_SAN_JUAN: 4,
  VILLA_HERMOSA_CURACAO: 6,
  VILLA_HERMOSA_BONAIRE: 7,
  VILLA_HERMOSA_ST_EUSTATIUS: 7,
  VILLA_HERMOSA_ST_MARTIN: 7,
  VILLA_HERMOSA_SAN_JUAN: 7,
  SAN_JUAN_ST_MARTIN: 1,
  SAN_JUAN_ST_EUSTATIUS: 1,
  SAN_JUAN_CURACAO: 2,
  SAN_JUAN_BONAIRE: 2,
  BONAIRE_CURACAO: 1,
  BONAIRE_ST_EUSTATIUS: 2,
  BONAIRE_ST_MARTIN: 2,
  CURACAO_ST_EUSTATIUS: 3,
  CURACAO_ST_MARTIN: 3,
  ST_MARTIN_ST_EUSTATIUS: 1,
}

export const TOWNS: TownLocations = {
  "Charles Towne": {
    nation: "England",
    harborDescription:
      "Palmetto-log wharves line the mouth of the Cooper River, stacked high with barrels of rice and indigo bound for London, while redcoats watch from the battery and planters haggle with ship captains over the price of passage.",
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
          "Red brick and tall arched windows look out over the harbour from the Crown Ledger Bank, where planters come to deposit their rice and indigo money. Navy banners set with golden crowns hang above a polished counter of scales, quills and ledgers, and a great iron vault stamped with a crown guards the back of the marble hall.",
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
      x: 388,
      y: 47,
      textAlign: "bottom",
      distanceTo: {
        "Charles Towne": 0,
        Biloxi: DISTANCES.CHARLES_TOWNE_BILOXI,
        Havana: DISTANCES.CHARLES_TOWNE_HAVANA,
        Belize: DISTANCES.CHARLES_TOWNE_BELIZE,
        "Villa Hermosa": DISTANCES.CHARLES_TOWNE_VILLA_HERMOSA,
        "Port Royale": DISTANCES.CHARLES_TOWNE_PORT_ROYALE,
        Leogane: DISTANCES.CHARLES_TOWNE_LEOGANE,
        Tortuga: DISTANCES.CHARLES_TOWNE_TORTUGA,
        "San Juan": DISTANCES.CHARLES_TOWNE_SAN_JUAN,
        "St. Martin": DISTANCES.CHARLES_TOWNE_ST_MARTIN,
        "St. Eustatius": DISTANCES.CHARLES_TOWNE_ST_EUSTATIUS,
        Martinique: DISTANCES.CHARLES_TOWNE_MARTINIQUE,
        Barbados: DISTANCES.CHARLES_TOWNE_BARBADOS,
        Bonaire: DISTANCES.CHARLES_TOWNE_BONAIRE,
        Curacao: DISTANCES.CHARLES_TOWNE_CURACAO,
        Panama: DISTANCES.CHARLES_TOWNE_PANAMA,
      },
    },
  },
  Barbados: {
    nation: "England",
    harborDescription:
      "Coral-stone warehouses crowd the curve of Carlisle Bay, where hogsheads of sugar and molasses roll down to the waiting longboats and English merchantmen ride at anchor in water so clear you can count the shells on the sand.",
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
      x: 779,
      y: 387,
      distanceTo: {
        Barbados: 0,
        Martinique: DISTANCES.BARBADOS_MARTINIQUE,
        "St. Eustatius": DISTANCES.BARBADOS_ST_EUSTATIUS,
        "St. Martin": DISTANCES.BARBADOS_ST_MARTIN,
        "San Juan": DISTANCES.BARBADOS_SAN_JUAN,
        Tortuga: DISTANCES.BARBADOS_TORTUGA,
        Leogane: DISTANCES.BARBADOS_LEOGANE,
        "Port Royale": DISTANCES.BARBADOS_PORT_ROYALE,
        Havana: DISTANCES.BARBADOS_HAVANA,
        Bonaire: DISTANCES.BARBADOS_BONAIRE,
        Curacao: DISTANCES.BARBADOS_CURACAO,
        Panama: DISTANCES.BARBADOS_PANAMA,
        Belize: DISTANCES.BARBADOS_BELIZE,
        "Villa Hermosa": DISTANCES.BARBADOS_VILLA_HERMOSA,
        Biloxi: DISTANCES.BARBADOS_BILOXI,
        "Charles Towne": DISTANCES.BARBADOS_CHARLES_TOWNE,
      },
    },
  },
  "Port Royale": {
    nation: "England",
    harborDescription:
      "Crammed onto a narrow spit of sand, the docks of Port Royale never sleep. Navy frigates moor beside battered privateers, and gold of uncertain origin changes hands in plain sight of the fort.",
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
          "A ship's wheel sits over the green sign of the Mariner's Rest Tavern, and lantern light fills every window from the dormers to the long gallery. Inside, a fire roars in the stone hearth, Union flags hang from the gallery and a naval coat is slung over a chair. Privateers and navy men drink side by side, each pretending not to know the other.",
        desktop: { x: 22, y: 52, size: 13 },
        mobile: { x: 49, y: 50, size: 32 },
      },
      Bank: {
        name: "Royal Exchange Bank",
        description:
          "Tall white columns and golden crowns give the Royal Exchange Bank the look of a temple to money. Inside, portraits of a redcoat general and a naval officer flank a great barred vault heaped with gold, and a red carpet leads past chests of coin to the clerks' counter. Here gold of uncertain origin is quietly turned into respectable English coin.",
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
          "A golden anchor between two crowns decorates the sign of the Queen's Dockyard, a weathered timber shed facing the water and the fort. Inside, a long hull stands in its cradle among ladders, pulleys and ropes, while plans and a model ship lie on the workbench. Naval officers inspect every plank before it goes in, and barrels of tar line the slipway.",
        desktop: { x: 90, y: 52, size: 14 },
        mobile: { x: 76, y: 73, size: 42 },
      },
    },
    map: {
      x: 452,
      y: 306,
      distanceTo: {
        "Port Royale": 0,
        Havana: DISTANCES.PORT_ROYALE_HAVANA,
        Leogane: DISTANCES.PORT_ROYALE_LEOGANE,
        Tortuga: DISTANCES.PORT_ROYALE_TORTUGA,
        "San Juan": DISTANCES.PORT_ROYALE_SAN_JUAN,
        "St. Martin": DISTANCES.PORT_ROYALE_ST_MARTIN,
        "St. Eustatius": DISTANCES.PORT_ROYALE_ST_EUSTATIUS,
        Martinique: DISTANCES.PORT_ROYALE_MARTINIQUE,
        Barbados: DISTANCES.PORT_ROYALE_BARBADOS,
        Bonaire: DISTANCES.PORT_ROYALE_BONAIRE,
        Curacao: DISTANCES.PORT_ROYALE_CURACAO,
        Panama: DISTANCES.PORT_ROYALE_PANAMA,
        Belize: DISTANCES.PORT_ROYALE_BELIZE,
        "Villa Hermosa": DISTANCES.PORT_ROYALE_VILLA_HERMOSA,
        Biloxi: DISTANCES.PORT_ROYALE_BILOXI,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_PORT_ROYALE,
      },
    },
  },
  Belize: {
    nation: "England",
    harborDescription:
      "Rough wooden jetties poke out between the mangroves, where Baymen float great rafts of logwood down the river and load them by hand onto ships that must pick their way carefully through the shallow reef beyond.",
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
          "Tall arched windows light the pale stone hall of the Colonial Ledger Bank, beneath the royal lion and unicorn. Bewigged clerks record every coin in great ledgers behind gleaming brass grilles, while logwood cutters queue across the chequered floor with their bundles, trading a season's hard work for silver. A redcoat guards the heavy iron vault, standing open on chests of gold.",
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
          "Under the timber roof of the Mangrove Quay Market, bananas hang from the beams above stalls heaped with limes, cacao, coconuts and pineapples. Traders weigh fruit on swinging scales, snapper, grouper and jack glisten on beds of salt, and canoes from up the river unload their baskets straight onto the planks of the long jetty.",
        desktop: { x: 75, y: 50, size: 13 },
        mobile: { x: 26, y: 64, size: 40 },
      },
      Shipyard: {
        name: "Belize Shipwrights",
        description:
          "Crossed hammers mark the sign of Belize Shipwrights, a great timber shed that smells of fresh-cut mahogany and bubbling pine tar. Carpenters saw and hew beneath a half-built hull whose bare ribs rise above the slipway, and a crane swings cargo on the jetty outside. At the workbench, the master shipwright pores over plans with a captain.",
        desktop: { x: 91, y: 48, size: 14 },
        mobile: { x: 80, y: 66, size: 38 },
      },
    },
    map: {
      x: 207,
      y: 303,
      textAlign: "right",
      distanceTo: {
        Belize: 0,
        "Villa Hermosa": DISTANCES.BELIZE_VILLA_HERMOSA,
        Havana: DISTANCES.BELIZE_HAVANA,
        Biloxi: DISTANCES.BELIZE_BILOXI,
        "Charles Towne": DISTANCES.BELIZE_CHARLES_TOWNE,
        Panama: DISTANCES.BELIZE_PANAMA,
        Curacao: DISTANCES.BELIZE_CURACAO,
        Bonaire: DISTANCES.BELIZE_BONAIRE,
        Barbados: DISTANCES.BELIZE_BARBADOS,
        Martinique: DISTANCES.BELIZE_MARTINIQUE,
        "St. Eustatius": DISTANCES.BELIZE_ST_EUSTATIUS,
        "St. Martin": DISTANCES.BELIZE_ST_MARTIN,
        "San Juan": DISTANCES.BELIZE_SAN_JUAN,
        Tortuga: DISTANCES.BELIZE_TORTUGA,
        Leogane: DISTANCES.BELIZE_LEOGANE,
        "Port Royale": DISTANCES.BELIZE_PORT_ROYALE,
      },
    },
  },
  Tortuga: {
    nation: "France",
    harborDescription:
      "Beneath the cliffs and the guns of the old fort, buccaneer sloops crowd a cramped little harbor where nobody asks where the cargo came from, and every second sailor on the quay seems to be looking for a new captain.",
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
      x: 598,
      y: 262,
      distanceTo: {
        Tortuga: 0,
        Leogane: DISTANCES.TORTUGA_LEOGANE,
        "San Juan": DISTANCES.TORTUGA_SAN_JUAN,
        "Port Royale": DISTANCES.TORTUGA_PORT_ROYALE,
        "St. Martin": DISTANCES.TORTUGA_ST_MARTIN,
        "St. Eustatius": DISTANCES.TORTUGA_ST_EUSTATIUS,
        Martinique: DISTANCES.TORTUGA_MARTINIQUE,
        Barbados: DISTANCES.TORTUGA_BARBADOS,
        Bonaire: DISTANCES.TORTUGA_BONAIRE,
        Curacao: DISTANCES.TORTUGA_CURACAO,
        Panama: DISTANCES.TORTUGA_PANAMA,
        Belize: DISTANCES.TORTUGA_BELIZE,
        "Villa Hermosa": DISTANCES.TORTUGA_VILLA_HERMOSA,
        Biloxi: DISTANCES.TORTUGA_BILOXI,
        "Charles Towne": DISTANCES.TORTUGA_CHARLES_TOWNE,
        Havana: DISTANCES.TORTUGA_HAVANA,
      },
    },
  },
  Leogane: {
    nation: "France",
    harborDescription:
      "Flat-bottomed barges glide in from the sugar plains of Saint-Domingue, and French merchantmen load casks of indigo and raw sugar while customs officers in powdered wigs tally every crate in their leather ledgers.",
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
          "The white flag with golden lilies flies above the Royal Bank, a stately house of pale stone with a golden fleur-de-lis set into its slate roof. Inside, tall arched windows light a chequered marble hall where a brass-railed counter guards ledgers and gold bars, and an iron vault stands open beside potted palms for the sugar merchants counting their profits.",
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
        name: "Saint Pierre Market",
        description:
          "Beneath a terracotta roof and a row of stone arches, the Saint Pierre Market sets out its stalls under red and white striped awnings. Baskets of oranges, plantains, pineapples and coffee beans crowd the counters, with chillies and garlic hanging overhead, and through the arches the old stone aqueduct can be seen on the hill above the harbour.",
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
      x: 537,
      y: 300,
      distanceTo: {
        Leogane: 0,
        "Port Royale": DISTANCES.LEOGANE_PORT_ROYALE,
        Tortuga: DISTANCES.LEOGANE_TORTUGA,
        "San Juan": DISTANCES.LEOGANE_SAN_JUAN,
        "St. Martin": DISTANCES.LEOGANE_ST_MARTIN,
        "St. Eustatius": DISTANCES.LEOGANE_ST_EUSTATIUS,
        Martinique: DISTANCES.LEOGANE_MARTINIQUE,
        Barbados: DISTANCES.LEOGANE_BARBADOS,
        Bonaire: DISTANCES.LEOGANE_BONAIRE,
        Curacao: DISTANCES.LEOGANE_CURACAO,
        Panama: DISTANCES.LEOGANE_PANAMA,
        Belize: DISTANCES.LEOGANE_BELIZE,
        "Villa Hermosa": DISTANCES.LEOGANE_VILLA_HERMOSA,
        Biloxi: DISTANCES.LEOGANE_BILOXI,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_LEOGANE,
        Havana: DISTANCES.LEOGANE_HAVANA,
      },
    },
  },
  Martinique: {
    nation: "France",
    harborDescription:
      "Under the brooding shadow of Mount Pelée, the busy roadstead fills with French ships taking on rum and sugar, and the scent of cane smoke drifts down from the hillside distilleries to the crowded quays.",
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
      x: 752,
      y: 353,
      textAlign: "right",
      distanceTo: {
        Martinique: 0,
        "St. Eustatius": DISTANCES.MARTINIQUE_ST_EUSTATIUS,
        "St. Martin": DISTANCES.MARTINIQUE_ST_MARTIN,
        "San Juan": DISTANCES.MARTINIQUE_SAN_JUAN,
        Barbados: DISTANCES.BARBADOS_MARTINIQUE,
        Tortuga: DISTANCES.TORTUGA_MARTINIQUE,
        Leogane: DISTANCES.LEOGANE_MARTINIQUE,
        "Port Royale": DISTANCES.PORT_ROYALE_MARTINIQUE,
        Havana: DISTANCES.MARTINIQUE_HAVANA,
        Bonaire: DISTANCES.MARTINIQUE_BONAIRE,
        Curacao: DISTANCES.MARTINIQUE_CURACAO,
        Panama: DISTANCES.MARTINIQUE_PANAMA,
        Belize: DISTANCES.BELIZE_MARTINIQUE,
        "Villa Hermosa": DISTANCES.MARTINIQUE_VILLA_HERMOSA,
        Biloxi: DISTANCES.MARTINIQUE_BILOXI,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_MARTINIQUE,
      },
    },
  },
  Biloxi: {
    nation: "France",
    harborDescription:
      "The sound is too shallow for deep-hulled ships, so longboats shuttle cargo across the calm water to a modest landing of pine planks, where French settlers trade furs and timber for supplies they cannot grow themselves.",
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
        name: "Gulf Crown Bank",
        description:
          "A golden fleur-de-lis crowns the slate roof of the Gulf Crown Bank, a handsome cream building with teal shutters and flower-filled window boxes. Inside, brass posts and ropes guide customers to a carved counter with scales and quill, and an iron vault stands open on stacked gold bars, while bundles of furs and timber show the trade that settles its accounts here.",
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
      x: 259,
      y: 68,
      distanceTo: {
        Biloxi: 0,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_BILOXI,
        Havana: DISTANCES.BILOXI_HAVANA,
        Belize: DISTANCES.BELIZE_BILOXI,
        "Villa Hermosa": DISTANCES.BILOXI_VILLA_HERMOSA,
        Panama: DISTANCES.BILOXI_PANAMA,
        Curacao: DISTANCES.BILOXI_CURACAO,
        Bonaire: DISTANCES.BILOXI_BONAIRE,
        Barbados: DISTANCES.BARBADOS_BILOXI,
        Martinique: DISTANCES.MARTINIQUE_BILOXI,
        "St. Eustatius": DISTANCES.BILOXI_ST_EUSTATIUS,
        "St. Martin": DISTANCES.BILOXI_ST_MARTIN,
        "San Juan": DISTANCES.BILOXI_SAN_JUAN,
        Tortuga: DISTANCES.TORTUGA_BELIZE,
        Leogane: DISTANCES.LEOGANE_BELIZE,
        "Port Royale": DISTANCES.PORT_ROYALE_BELIZE,
      },
    },
  },
  Panama: {
    nation: "Spain",
    harborDescription:
      "Mule trains laden with Peruvian silver descend from the jungle road to the stone quays, where Spanish soldiers guard every chest until the treasure galleons are ready to carry the King's fortune home.",
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
        name: "Panama Shipyard",
        description:
          "Under a long red-tiled roof held up by heavy beams, the Panama Shipyard keeps a great hull in its cradle, wrapped in scaffolding and ladders. Spanish banners hang from the posts above stacks of timber, an anvil, coils of rope and chains, and carpenters patch the battered ships of the treasure fleet here before they brave the long voyage home.",
        desktop: { x: 90, y: 52, size: 14 },
        mobile: { x: 80, y: 72, size: 36 },
      },
    },
    map: {
      x: 382,
      y: 459,
      distanceTo: {
        Panama: 0,
        Curacao: DISTANCES.PANAMA_CURACAO,
        Bonaire: DISTANCES.PANAMA_BONAIRE,
        Belize: DISTANCES.BELIZE_PANAMA,
        "Villa Hermosa": DISTANCES.PANAMA_VILLA_HERMOSA,
        Biloxi: DISTANCES.BILOXI_PANAMA,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_PANAMA,
        Havana: DISTANCES.PANAMA_HAVANA,
        Tortuga: DISTANCES.TORTUGA_PANAMA,
        Leogane: DISTANCES.LEOGANE_PANAMA,
        "Port Royale": DISTANCES.PORT_ROYALE_PANAMA,
        "San Juan": DISTANCES.PANAMA_SAN_JUAN,
        "St. Martin": DISTANCES.PANAMA_ST_MARTIN,
        "St. Eustatius": DISTANCES.PANAMA_ST_EUSTATIUS,
        Martinique: DISTANCES.MARTINIQUE_PANAMA,
        Barbados: DISTANCES.BARBADOS_PANAMA,
      },
    },
  },
  Havana: {
    nation: "Spain",
    harborDescription:
      "Guarded by the great Morro fortress, the deep and sheltered bay holds the whole Spanish treasure fleet as it gathers for the crossing to Seville, while chandlers and caulkers grow rich preparing the galleons for the voyage.",
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
      x: 351,
      y: 204,
      distanceTo: {
        Havana: 0,
        Biloxi: DISTANCES.BILOXI_HAVANA,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_HAVANA,
        Belize: DISTANCES.BELIZE_HAVANA,
        "Villa Hermosa": DISTANCES.HAVANA_VILLA_HERMOSA,
        Panama: DISTANCES.PANAMA_HAVANA,
        Curacao: DISTANCES.HAVANA_CURACAO,
        Bonaire: DISTANCES.HAVANA_BONAIRE,
        Barbados: DISTANCES.BARBADOS_HAVANA,
        Martinique: DISTANCES.MARTINIQUE_HAVANA,
        "St. Eustatius": DISTANCES.HAVANA_ST_EUSTATIUS,
        "St. Martin": DISTANCES.HAVANA_ST_MARTIN,
        "San Juan": DISTANCES.HAVANA_SAN_JUAN,
        Tortuga: DISTANCES.TORTUGA_HAVANA,
        Leogane: DISTANCES.LEOGANE_HAVANA,
        "Port Royale": DISTANCES.PORT_ROYALE_HAVANA,
      },
    },
  },
  "Villa Hermosa": {
    nation: "Spain",
    harborDescription:
      "Far up the muddy river, the small landing smells of wet earth and cacao, where dugout canoes bring sacks of beans and dyewood out of the swamps to be loaded aboard Spanish coasters bound for Veracruz.",
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
          "Vines and flowers climb the arches of the Sailor's Tavern, shaded outside by blue and white striped awnings. Inside, a great carved ship's wheel hangs on the wall above a bar faced with blue and white tiles, where tankards dangle over rows of bottles and barrels, and the lantern-lit tables are crowded with thirsty river men.",
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
        name: "Villa Hermosa Shipyard",
        description:
          "A golden anchor marks the sign of the Villa Hermosa Shipyard, a broad timber shed with a stone tower beside it. Inside, a half-built hull rests in its scaffolding beneath chains and pulley blocks, river boats sit on the wet slipway among stacks of timber and tools, and tall masts sway at the pier outside.",
        desktop: { x: 87, y: 50, size: 16 },
        mobile: { x: 63, y: 78, size: 46 },
      },
    },
    map: {
      x: 133,
      y: 303,
      distanceTo: {
        "Villa Hermosa": 0,
        Belize: DISTANCES.BELIZE_VILLA_HERMOSA,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_VILLA_HERMOSA,
        Biloxi: DISTANCES.BILOXI_VILLA_HERMOSA,
        Havana: DISTANCES.HAVANA_VILLA_HERMOSA,
        Panama: DISTANCES.PANAMA_VILLA_HERMOSA,
        Curacao: DISTANCES.VILLA_HERMOSA_CURACAO,
        Bonaire: DISTANCES.VILLA_HERMOSA_BONAIRE,
        Barbados: DISTANCES.BARBADOS_VILLA_HERMOSA,
        Martinique: DISTANCES.MARTINIQUE_VILLA_HERMOSA,
        "St. Eustatius": DISTANCES.VILLA_HERMOSA_ST_EUSTATIUS,
        "St. Martin": DISTANCES.VILLA_HERMOSA_ST_MARTIN,
        "San Juan": DISTANCES.VILLA_HERMOSA_SAN_JUAN,
        Tortuga: DISTANCES.TORTUGA_VILLA_HERMOSA,
        Leogane: DISTANCES.LEOGANE_VILLA_HERMOSA,
        "Port Royale": DISTANCES.PORT_ROYALE_VILLA_HERMOSA,
      },
    },
  },
  "San Juan": {
    nation: "Spain",
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
      x: 661,
      y: 283,
      distanceTo: {
        "San Juan": 0,
        "St. Martin": DISTANCES.SAN_JUAN_ST_MARTIN,
        "St. Eustatius": DISTANCES.SAN_JUAN_ST_EUSTATIUS,
        Martinique: DISTANCES.MARTINIQUE_SAN_JUAN,
        Barbados: DISTANCES.BARBADOS_SAN_JUAN,
        Tortuga: DISTANCES.TORTUGA_SAN_JUAN,
        Leogane: DISTANCES.LEOGANE_SAN_JUAN,
        "Port Royale": DISTANCES.PORT_ROYALE_SAN_JUAN,
        Biloxi: DISTANCES.BILOXI_SAN_JUAN,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_SAN_JUAN,
        Havana: DISTANCES.HAVANA_SAN_JUAN,
        Belize: DISTANCES.BELIZE_SAN_JUAN,
        "Villa Hermosa": DISTANCES.VILLA_HERMOSA_SAN_JUAN,
        Panama: DISTANCES.PANAMA_SAN_JUAN,
        Curacao: DISTANCES.SAN_JUAN_CURACAO,
        Bonaire: DISTANCES.SAN_JUAN_BONAIRE,
      },
    },
  },
  Bonaire: {
    nation: "Holland",
    harborDescription:
      "Gleaming white pyramids of salt line the low shore, where flamingos wade in the shallow pans and Dutch ships anchor offshore to fill their holds with the island's only real treasure.",
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
          "Golden stone, a slender bell tower and a broad flight of stone steps mark the Stadholder's Hall. Inside, a blue lion crest and red, white and blue banners hang above a great carved desk, while green shutters stand open to the harbour and the trade winds. Island officials pore over maps of Bonaire beneath a candle chandelier.",
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
      x: 610,
      y: 429,
      distanceTo: {
        Bonaire: 0,
        Curacao: DISTANCES.BONAIRE_CURACAO,
        Panama: DISTANCES.PANAMA_BONAIRE,
        Barbados: DISTANCES.BARBADOS_BONAIRE,
        Martinique: DISTANCES.MARTINIQUE_BONAIRE,
        "St. Eustatius": DISTANCES.BONAIRE_ST_EUSTATIUS,
        "St. Martin": DISTANCES.BONAIRE_ST_MARTIN,
        "San Juan": DISTANCES.SAN_JUAN_BONAIRE,
        Tortuga: DISTANCES.TORTUGA_BONAIRE,
        Leogane: DISTANCES.LEOGANE_BONAIRE,
        "Port Royale": DISTANCES.PORT_ROYALE_BONAIRE,
        Belize: DISTANCES.BELIZE_BONAIRE,
        "Villa Hermosa": DISTANCES.VILLA_HERMOSA_BONAIRE,
        Biloxi: DISTANCES.BILOXI_BONAIRE,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_BONAIRE,
        Havana: DISTANCES.HAVANA_BONAIRE,
      },
    },
  },
  Curacao: {
    nation: "Holland",
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
      x: 558,
      y: 405,
      distanceTo: {
        Curacao: 0,
        Bonaire: DISTANCES.BONAIRE_CURACAO,
        Panama: DISTANCES.PANAMA_CURACAO,
        Barbados: DISTANCES.BARBADOS_CURACAO,
        Martinique: DISTANCES.MARTINIQUE_CURACAO,
        "St. Eustatius": DISTANCES.CURACAO_ST_EUSTATIUS,
        "St. Martin": DISTANCES.CURACAO_ST_MARTIN,
        "San Juan": DISTANCES.SAN_JUAN_CURACAO,
        Tortuga: DISTANCES.TORTUGA_CURACAO,
        Leogane: DISTANCES.LEOGANE_CURACAO,
        "Port Royale": DISTANCES.PORT_ROYALE_CURACAO,
        Belize: DISTANCES.BELIZE_CURACAO,
        "Villa Hermosa": DISTANCES.VILLA_HERMOSA_CURACAO,
        Biloxi: DISTANCES.BILOXI_CURACAO,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_CURACAO,
        Havana: DISTANCES.HAVANA_CURACAO,
      },
    },
  },
  "St. Martin": {
    nation: "Holland",
    harborDescription:
      "Shared uneasily between the Dutch and the French, the island's harbor bustles with salt traders from the great ponds behind town, and sailors drink on both sides of a border nobody bothers to mark on the beach.",
    buildings: {
      Shop: {
        name: "Nassau Supply Shop",
        description:
          "A red and white striped awning hangs over the green door of the Nassau Supply Shop, a brick house with a stepped gable and flower boxes in every window. Inside, barrels and sacks brim with salt, hams, garlic and chillies hang from the beams, and bolts of cloth, coils of rope and crates of cannonballs crowd around a counter with brass scales.",
        desktop: { x: 8.5, y: 52, size: 10 },
        mobile: { x: 17, y: 38, size: 28 },
      },
      Tavern: {
        name: "Pelican Sail Tavern",
        description:
          "Under a red-tiled roof and pale blue walls, the Pelican Sail Tavern opens its green doors onto a striped-awning veranda over the quay. A pelican figure perches above the bar, flowers trail from the beams beside Dutch flags, and salt rakers and sailors gather at long wooden tables, drinking until the stars come out over the bay.",
        desktop: { x: 22.5, y: 54, size: 11 },
        mobile: { x: 50, y: 46, size: 32 },
      },
      Bank: {
        name: "Island Ledger Bank",
        description:
          "Painted a soft sage green, the Island Ledger Bank stands out with its stepped gable, flower boxes and green arched door. Inside, the Dutch flag hangs above rows of ledger drawers and an iron-barred vault, and clerks at the long counter weigh coin on brass scales and keep careful records of every sack of salt sold from the ponds.",
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
      x: 720,
      y: 301,
      textAlign: "right",
      distanceTo: {
        "St. Martin": 0,
        "St. Eustatius": DISTANCES.ST_MARTIN_ST_EUSTATIUS,
        Martinique: DISTANCES.MARTINIQUE_ST_MARTIN,
        Barbados: DISTANCES.BARBADOS_ST_MARTIN,
        "San Juan": DISTANCES.SAN_JUAN_ST_MARTIN,
        Tortuga: DISTANCES.TORTUGA_ST_MARTIN,
        Leogane: DISTANCES.LEOGANE_ST_MARTIN,
        "Port Royale": DISTANCES.PORT_ROYALE_ST_MARTIN,
        Biloxi: DISTANCES.BILOXI_ST_MARTIN,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_ST_MARTIN,
        Havana: DISTANCES.HAVANA_ST_MARTIN,
        Belize: DISTANCES.BELIZE_ST_MARTIN,
        "Villa Hermosa": DISTANCES.VILLA_HERMOSA_ST_MARTIN,
        Panama: DISTANCES.PANAMA_ST_MARTIN,
        Curacao: DISTANCES.CURACAO_ST_MARTIN,
        Bonaire: DISTANCES.BONAIRE_ST_MARTIN,
      },
    },
  },
  "St. Eustatius": {
    nation: "Holland",
    harborDescription:
      "Known to every smuggler as the Golden Rock, this tiny free port has warehouses packed along the Lower Town shore, where Dutch traders sell gunpowder, cloth and wine to any flag that can pay in coin.",
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
      x: 741,
      y: 327,
      textAlign: "right",
      distanceTo: {
        "St. Eustatius": 0,
        "St. Martin": DISTANCES.ST_MARTIN_ST_EUSTATIUS,
        Martinique: DISTANCES.MARTINIQUE_ST_EUSTATIUS,
        "San Juan": DISTANCES.SAN_JUAN_ST_EUSTATIUS,
        Barbados: DISTANCES.BARBADOS_ST_EUSTATIUS,
        Tortuga: DISTANCES.TORTUGA_ST_EUSTATIUS,
        Leogane: DISTANCES.LEOGANE_ST_EUSTATIUS,
        "Port Royale": DISTANCES.PORT_ROYALE_ST_EUSTATIUS,
        Biloxi: DISTANCES.BILOXI_ST_EUSTATIUS,
        "Charles Towne": DISTANCES.CHARLES_TOWNE_ST_EUSTATIUS,
        Havana: DISTANCES.HAVANA_ST_EUSTATIUS,
        Belize: DISTANCES.BELIZE_ST_EUSTATIUS,
        "Villa Hermosa": DISTANCES.VILLA_HERMOSA_ST_EUSTATIUS,
        Panama: DISTANCES.PANAMA_ST_EUSTATIUS,
        Curacao: DISTANCES.CURACAO_ST_EUSTATIUS,
        Bonaire: DISTANCES.BONAIRE_ST_EUSTATIUS,
      },
    },
  },
}
