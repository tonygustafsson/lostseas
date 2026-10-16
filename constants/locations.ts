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
          "Beneath a dark slate roof and a flag snapping in the wind, the King's Mercantile sets out its wares under striped awnings: baskets of fruit, sacks of flour and casks of fresh water stacked along the front. Lanterns burn at the door long after the evening gun has sounded from the fort.",
        desktop: { x: 10, y: 52, size: 12 },
        mobile: { x: 19, y: 63, size: 32 },
      },
      Tavern: {
        name: "Redcoat Tavern",
        description:
          "With its crimson sign framed by golden tankards, the Redcoat Tavern is hard to miss. Lanterns hang from the flower-draped gallery above, warm light pours through the arched doorways, and off-duty soldiers share rum with sailors among the barrels outside.",
        desktop: { x: 25, y: 50, size: 12 },
        mobile: { x: 51, y: 63, size: 32 },
      },
      Bank: {
        name: "Crown Ledger Bank",
        description:
          "Red brick trimmed with white stone and a navy sign set with golden crowns, the Crown Ledger Bank wears its loyalties openly. Potted palms flank the steps up to its arched oak door, where planters come to deposit their rice and indigo money.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 82, y: 63, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Crowned by a white cupola and a carved crest with golden lions, the Governor's Hall rises in red brick behind tall white columns. Flower boxes brighten every window, and a broad stone stair leads up to the green front door.",
        desktop: { x: 55.5, y: 48, size: 14 },
        mobile: { x: 50, y: 33, size: 40 },
      },
      Market: {
        name: "Dockside Market",
        description:
          "Red and white striped awnings shade the counters of the Dockside Market, a clapboard house with green shutters and flower boxes. Crates of oranges, apples and greens line the front, and porters roll barrels straight from the wharf to the stalls.",
        desktop: { x: 73, y: 52, size: 12 },
        mobile: { x: 16, y: 34, size: 28 },
      },
      Shipyard: {
        name: "Royal Shipwrights",
        description:
          "Crossed hammers mark the sign of the Royal Shipwrights, an open timber frame raised over the slipway. A wooden hull sits in its cradle among ladders and scaffolding, and the smell of tar and fresh-cut pine drifts across the shore.",
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
          "Beneath a slate roof and a gilded crown, the Coral Crown Mercantile spills its wares onto the quay. Crates of fruit and sacks of flour crowd the blue awnings out front, while barrels of salt pork and fresh water wait by the door for any captain about to put to sea.",
        desktop: { x: 8.5, y: 48, size: 11 },
        mobile: { x: 18, y: 35, size: 30 },
      },
      Tavern: {
        name: "Anchor & Crown Tavern",
        description:
          "A red-brick house with green shutters and a row of dormer windows, the Anchor & Crown Tavern keeps its doors open to the sea breeze. Sailors drink rum at the tables beneath its wooden porch, and the smell of tobacco and roasting meat drifts out over the barrels stacked on the quay.",
        desktop: { x: 22.5, y: 48, size: 11 },
        mobile: { x: 49, y: 35, size: 30 },
      },
      Bank: {
        name: "Island Ledger Bank",
        description:
          "Pale stone, tall arched windows and a carved crest above the roofline give the Island Ledger Bank an air of quiet authority. Lanterns flank the broad steps up to its heavy oak door, where planters and merchants come to deposit their sugar fortunes.",
        desktop: { x: 37, y: 48, size: 10 },
        mobile: { x: 82, y: 36, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Under the flag flying from its rooftop, the red-brick Governor's Hall rises behind four white columns and a balcony overlooking the waterfront. Potted palms line the stone steps, and clerks hurry in and out with petitions for the governor's seal.",
        desktop: { x: 54.5, y: 45, size: 14 },
        mobile: { x: 32, y: 60, size: 44 },
      },
      Market: {
        name: "Plantation Quay Market",
        description:
          "Striped red and cream awnings shade the arched stalls of the Plantation Quay Market, piled high with mangoes, plantains and sacks of sugar from the inland estates. Traders call out their prices over the clatter of carts on the cobbles.",
        desktop: { x: 73, y: 48, size: 14 },
        mobile: { x: 66, y: 63, size: 28 },
      },
      Shipyard: {
        name: "King's Shipyard",
        description:
          "A timber shed with a crowned sign opens straight onto the water at the King's Shipyard. Inside, the ribs of a new hull rise from the slipway, and a tall wooden crane swings planks and crates down to the busy dock.",
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
          "Red brick, green shutters and a golden crown above the sign mark the Crown Compass Shop. Its windows are stacked with sacks, jars and lanterns, barrels line the front, and an old anchor leans against the wall by the door.",
        desktop: { x: 7.5, y: 55, size: 11 },
        mobile: { x: 19, y: 50, size: 30 },
      },
      Tavern: {
        name: "Mariner's Rest Tavern",
        description:
          "Every window of the Mariner's Rest Tavern glows with lantern light, from the dormers under its dark roof to the long gallery above the door. A ship's wheel sits over the sign, and privateers and navy men drink side by side, each pretending not to know the other.",
        desktop: { x: 22, y: 52, size: 13 },
        mobile: { x: 49, y: 50, size: 32 },
      },
      Bank: {
        name: "Royal Exchange Bank",
        description:
          "Tall white columns and a golden crown above the sign give the Royal Exchange Bank the look of a temple to money. Lanterns light the stone steps, and behind its doors gold of uncertain origin is quietly turned into respectable English coin.",
        desktop: { x: 37, y: 52, size: 10 },
        mobile: { x: 82, y: 50, size: 32 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red brick and white columns rise behind a sweep of stone steps at the Governor's Hall, its royal coat of arms painted in blue and gold. From the flag on the roof to the green shutters, every detail reminds the town who is in charge.",
        desktop: { x: 52, y: 48, size: 14 },
        mobile: { x: 50, y: 25, size: 40 },
      },
      Market: {
        name: "Harbour Row Market",
        description:
          "Canvas awnings in cream and red stripes shelter the stalls of the Harbour Row Market, laden with yams, citrus, turtle meat and sacks of cocoa. The old timbered building behind holds the traders' stores, and the noise rarely stops before midnight.",
        desktop: { x: 71, y: 55, size: 15 },
        mobile: { x: 26, y: 75, size: 40 },
      },
      Shipyard: {
        name: "Queen's Dockyard",
        description:
          "A golden anchor between two crowns decorates the sign of the Queen's Dockyard, a weathered timber shed facing the water. Inside, a hull stands in its cradle among ladders and ropes, and naval officers inspect every plank before it goes in.",
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
          "A gilded crown and the cross of St George hang above the long counter of the Bay Crown Mercantile, where the shopkeeper weighs out coin on brass scales. Shelves of cloth, rope and porcelain line the walls, pistols and cutlasses wait on their racks, and sacks, barrels and chests crowd the floor beside the open door to the bay.",
        desktop: { x: 11, y: 48, size: 13 },
        mobile: { x: 19, y: 20, size: 32 },
      },
      Tavern: {
        name: "Sailmaker's Rest Tavern",
        description:
          "Beneath the thatch of the Sailmaker's Rest, spare sails and coils of rope hang from the rafters while brass lanterns glow over crowded tables. The English flag and a portrait of the King look down on the rum barrels behind the bar, and through the open shutters the turquoise bay sparkles as sailors mend canvas between rounds.",
        desktop: { x: 26, y: 47, size: 11 },
        mobile: { x: 83, y: 20, size: 30 },
      },
      Bank: {
        name: "Colonial Ledger Bank",
        description:
          "Beneath the royal lion and unicorn, bewigged clerks of the Colonial Ledger Bank record every coin in great ledgers behind gleaming brass grilles. Logwood cutters queue across the chequered floor with their bundles, trading a season's hard work for silver, while the heavy iron vault stands open on chests of gold.",
        desktop: { x: 41, y: 47, size: 13 },
        mobile: { x: 18, y: 40, size: 32 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "In a red-brick chamber hung with a great map of the Caribbean and a portrait of the King, the Governor receives captains at his carved mahogany desk. Tall doors open onto a balcony above the turquoise lagoon, and every ship that crosses the reef is noted in the harbourmaster's book.",
        desktop: { x: 59, y: 45, size: 14 },
        mobile: { x: 55, y: 37, size: 38 },
      },
      Market: {
        name: "Mangrove Quay Market",
        description:
          "Under the thatch of the Mangrove Quay Market, bananas hang from the beams above stalls heaped with limes, cacao, coconuts and pineapples. Traders weigh fruit on swinging scales, fresh fish glisten on beds of salt, and canoes from up the river unload their baskets straight onto the planks.",
        desktop: { x: 75, y: 50, size: 13 },
        mobile: { x: 26, y: 64, size: 40 },
      },
      Shipyard: {
        name: "Belize Shipwrights",
        description:
          "The great timber shed of Belize Shipwrights smells of fresh-cut mahogany and bubbling pine tar. Carpenters saw and hew beneath a half-built hull whose bare ribs rise above the slipway, while the master shipwright pores over plans with a captain at the workbench.",
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
          "Golden fleurs-de-lis frame the sign of the Harbor Shop, a squat stone building with a terracotta roof right on the waterfront. Under its cream awning, crates of fruit and barrels of supplies wait for buyers, and nobody asks where your money came from.",
        desktop: { x: 10, y: 62, size: 12 },
        mobile: { x: 12, y: 72, size: 26 },
      },
      Tavern: {
        name: "Golden Lily Tavern",
        description:
          "The Golden Lily Tavern sits on the steep stairs climbing from the harbour, its balconies wrapped in climbing vines and lit by warm lanterns. Inside, buccaneers drink, gamble and recruit, and fights break out as often as songs.",
        desktop: { x: 26, y: 60, size: 14 },
        mobile: { x: 39, y: 72, size: 26 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "Golden lilies decorate the sign of the Royal Bank, a fine stone house with a blue slate roof that looks almost out of place among the rough houses of the town. Lanterns flank its three arched doors, and the clerks wisely ask few questions.",
        desktop: { x: 41, y: 58, size: 11 },
        mobile: { x: 31, y: 42, size: 30 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "White banners with golden lilies hang either side of the doors of the Governor's Hall, a pale stone building with a long balcony and a blue slate roof. The governor keeps a careful peace with the buccaneers, and the fortress on the cliff above makes sure of it.",
        desktop: { x: 58, y: 58, size: 13 },
        mobile: { x: 70, y: 44, size: 40 },
      },
      Market: {
        name: "Grand Market",
        description:
          "Red and cream striped awnings shade the stalls of the Grand Market, where looted silks sit beside fresh fruit and salted beef. The stone building behind has a terracotta roof and a row of arched windows, overlooking traders who argue loudly over every price.",
        desktop: { x: 73.5, y: 63, size: 11 },
        mobile: { x: 62, y: 72, size: 22 },
      },
      Shipyard: {
        name: "Royal Dockyard",
        description:
          "Golden lilies flank the sign of the Royal Dockyard, a massive timber frame beside the tall masts of the harbour. A hull rests in the shadows inside, and a heavy crane lifts timber for the ships that buccaneers wear out so quickly.",
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
          "Blue shutters and a red-tiled roof give the Quay Shop a warm, sunny charm. A striped awning shades its counter of cheeses, bread and dried goods, while crates and barrels wait by the waterfront for ships bound back to France.",
        desktop: { x: 13, y: 58, size: 10 },
        mobile: { x: 23, y: 74, size: 26 },
      },
      Tavern: {
        name: "Blue Heron Tavern",
        description:
          "A painted blue heron swings on the sign outside the Blue Heron Tavern, a tall house of honey-coloured stone with a slate roof and a balcony full of flowers. Lanterns glow by the twin doors, and inside planters and sailors toast each other with rum and claret.",
        desktop: { x: 26, y: 55, size: 11 },
        mobile: { x: 50, y: 74, size: 28 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "The white flag with golden lilies flies above the Royal Bank, a stately house of pale stone with a golden fleur-de-lis set into its slate roof. Columns frame the heavy oak door, and potted palms line the steps where sugar merchants come to count their profits.",
        desktop: { x: 40, y: 55, size: 10 },
        mobile: { x: 82, y: 72, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Bougainvillea climbs the arcade of the Governor's Hall, a graceful building with blue shutters, an iron balcony and a golden fleur-de-lis above the roofline. Stone stairways wind up the hillside around it, past terraces of flowers and palms.",
        desktop: { x: 56, y: 53, size: 14 },
        mobile: { x: 30, y: 40, size: 40 },
      },
      Market: {
        name: "Saint Pierre Market",
        description:
          "Beneath a terracotta roof and a row of arched windows, the Saint Pierre Market sets out its stalls under cream and red striped awnings. Baskets of oranges, plantains and coffee beans crowd the counters, and the old stone aqueduct can be seen on the hill above.",
        desktop: { x: 72, y: 58, size: 12 },
        mobile: { x: 75, y: 52, size: 38 },
      },
      Shipyard: {
        name: "King's Yard",
        description:
          "Under a great open timber roof, the King's Yard cradles a hull still bare to its ribs. A wooden hoist stands beside the shed, and carpenters work by lantern light to finish ships for the French crown.",
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
          "A carved red coral fan sits above the sign of the Coral Crown Shop, a cheerful house with blue shutters and a red-tiled roof. Blue and white striped awnings shade shelves of provisions, lanterns and casks, while the white banner of France flutters overhead.",
        desktop: { x: 12, y: 52, size: 12 },
        mobile: { x: 27, y: 30, size: 36 },
      },
      Tavern: {
        name: "La Perle Tavern",
        description:
          "Smoke curls from the chimney of La Perle Tavern, where a foaming golden tankard hangs above the dark sign. Beneath its stone arches, lantern light falls on crowded tables of sailors and planters drinking rum from the island's own distilleries.",
        desktop: { x: 26.5, y: 52, size: 11 },
        mobile: { x: 64, y: 30, size: 36 },
      },
      Bank: {
        name: "Royal Indies Bank",
        description:
          "White stone columns, a blue slate roof and a golden fleur-de-lis announce the Royal Indies Bank. Banners of the French crown hang either side of its arched door, and a broad flight of steps leads merchants inside to trade their sugar money for letters of credit.",
        desktop: { x: 40, y: 52, size: 10 },
        mobile: { x: 28, y: 50, size: 36 },
      },
      "City hall": {
        name: "Governor's Maison",
        description:
          "A red carpet runs down the steps of the Governor's Maison, an elegant house of pale stone with blue shutters and a golden fleur-de-lis set into its slate roof. Lanterns and potted flowers line the entrance, ready for the next visiting captain.",
        desktop: { x: 54.5, y: 50, size: 13 },
        mobile: { x: 72, y: 50, size: 36 },
      },
      Market: {
        name: "Spice Quay Market",
        description:
          "A carved golden pineapple crowns the sign of the Spice Quay Market, where red and green striped awnings shade crates of bananas, pineapples, cocoa and cinnamon bark. The warm ochre walls glow in the afternoon sun as traders haggle over every sack.",
        desktop: { x: 71.5, y: 55, size: 14 },
        mobile: { x: 26, y: 70, size: 38 },
      },
      Shipyard: {
        name: "Fleur Harbor Dockyard",
        description:
          "A golden anchor emblem hangs over the entrance of the Fleur Harbor Dockyard, a stone and timber shed with a blue slate roof. Inside, a hull rests on its cradle, while ships flying the white flag of France wait at anchor for repairs.",
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
          "Red tiles, teal shutters and climbing bougainvillea frame the Pelican Pearl Shop, where a striped red awning shades the door. Inside, lantern light falls on shelves of provisions, coils of rope and casks of fresh water for the voyage ahead.",
        desktop: { x: 10, y: 50, size: 13 },
        mobile: { x: 21, y: 51, size: 32 },
      },
      Tavern: {
        name: "Belle Mer Tavern",
        description:
          "Lanterns glow along the long balcony of the Belle Mer Tavern, its dark blue sign painted with golden fleurs-de-lis. Flowers tumble over the railings, and from the arched doorways below comes the sound of fiddles, laughter and clinking cups of wine.",
        desktop: { x: 26, y: 50, size: 12 },
        mobile: { x: 54, y: 51, size: 34 },
      },
      Bank: {
        name: "Gulf Crown Bank",
        description:
          "A golden fleur-de-lis crowns the slate roof of the Gulf Crown Bank, a handsome cream building with teal shutters and flower-filled window boxes. Twin lanterns light the arched entrance, where traders in furs and timber come to settle their accounts.",
        desktop: { x: 40, y: 50, size: 11 },
        mobile: { x: 24, y: 28, size: 36 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Wide steps lead up to the Governor's Hall, a stately cream building with a blue slate roof, a golden fleur-de-lis and a balcony draped in flowers. The white royal banner of France flies nearby as officials debate the colony's affairs inside.",
        desktop: { x: 55.5, y: 48, size: 14 },
        mobile: { x: 71, y: 28, size: 40 },
      },
      Market: {
        name: "Bayfront Spice Market",
        description:
          "Under a red-tiled roof wreathed in flowers, the Bayfront Spice Market opens its stalls beneath red and green striped awnings. Baskets of peppers, vanilla and fresh fruit crowd the counters, and the scent of spices carries all the way to the water.",
        desktop: { x: 73, y: 52, size: 12 },
        mobile: { x: 29, y: 72, size: 36 },
      },
      Shipyard: {
        name: "Crescent Dockyard",
        description:
          "A great timber frame with a fleur-de-lis above its sign, the Crescent Dockyard rings with mallets and saws. Scaffolding wraps a hull taking shape on the slipway, and a wooden crane lifts timber from the barges below.",
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
          "Through the wide arches of the Pearl Shop, strings of pearls and polished shells glitter in the lantern light. Bougainvillea climbs the whitewashed walls, and behind the treasures sit the plainer goods every crew needs: food, water and medicine for the voyage.",
        desktop: { x: 8, y: 58, size: 10 },
        mobile: { x: 14, y: 73, size: 26 },
      },
      Tavern: {
        name: "Compass Tavern",
        description:
          "A ship's wheel hangs above the sign of the Compass Tavern, a long white house with a red-tiled roof and a wooden gallery along its upper floor. Muleteers fresh from the jungle road crowd its tables alongside sailors waiting for the silver fleet.",
        desktop: { x: 22.5, y: 56, size: 13 },
        mobile: { x: 46, y: 72, size: 34 },
      },
      Bank: {
        name: "Treasure Bank",
        description:
          "The Treasure Bank is built like a fortress, its thick stone walls carved with the royal crest and its heavy studded doors guarded day and night. Lanterns burn on either side of the entrance, for here the silver of Peru waits before it sails for Spain.",
        desktop: { x: 37, y: 55, size: 10 },
        mobile: { x: 17, y: 45, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Crimson banners embroidered in gold hang from the arcade of the Governor's Hall, a white stone building with a carved crest and a small bell tower. A grand stairway leads up from the quay, lined with potted palms and flowers.",
        desktop: { x: 54, y: 50, size: 15 },
        mobile: { x: 51, y: 43, size: 38 },
      },
      Market: {
        name: "Plaza Market",
        description:
          "The Plaza Market spreads its striped awnings over stalls of fruit, fish and woven goods. Behind them, a cool arcade of stone arches offers shade to traders bargaining over pearls, cacao and Peruvian cloth.",
        desktop: { x: 71.5, y: 57, size: 14 },
        mobile: { x: 86, y: 49, size: 30 },
      },
      Shipyard: {
        name: "Panama Shipyard",
        description:
          "Under a long red-tiled roof held up by heavy beams, the Panama Shipyard keeps a hull in its cradle. Carpenters patch the battered ships of the treasure fleet here before they brave the long voyage home.",
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
          "Whitewashed walls, a terracotta roof and two wide arches open to the street: the Harbor Shop is where Havana's captains stock up before the long crossing. Barrels, coils of rope and baskets of supplies fill the shaded interior, and an iron anchor hangs beside the door.",
        desktop: { x: 10, y: 50, size: 11 },
        mobile: { x: 16, y: 58, size: 30 },
      },
      Tavern: {
        name: "Parrot Tavern",
        description:
          "A brightly painted parrot perches above the sign of the Parrot Tavern, keeping watch over the tables beneath its arches. Bougainvillea spills from the balcony, lanterns glow on iron posts, and guitars and loud voices carry out into the warm night.",
        desktop: { x: 24.5, y: 50, size: 10 },
        mobile: { x: 25, y: 40, size: 34 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "Behind ornate iron gates and a gilded royal coat of arms, the Royal Bank guards the silver of the Spanish crown. Its pale stone front is carved with columns and balconies, and armed clerks watch every chest that passes through the arched doors.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 79, y: 43, size: 36 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red and gold banners of Spain hang from the balcony of the Governor's Hall, a grand building of white stone with tall arches and a bell tower rising behind. Officials in fine coats climb the steps, while the governor keeps an eye on the treasure fleet in the bay.",
        desktop: { x: 56, y: 48, size: 15 },
        mobile: { x: 54, y: 25, size: 38 },
      },
      Market: {
        name: "Harbor Market",
        description:
          "Striped awnings stretch out from the Harbor Market, covering tables heaped with mangoes, pineapples, tobacco leaves and sacks of sugar. Market women call out prices in the shade, while the cathedral towers rise over the rooftops behind.",
        desktop: { x: 74, y: 52, size: 11 },
        mobile: { x: 64, y: 64, size: 36 },
      },
      Shipyard: {
        name: "Havana Shipyard",
        description:
          "Built of stone and dark timber beside a small watchtower, the Havana Shipyard shelters a new hull under its broad roof. Tall-masted ships tie up alongside, and the yard is famous for vessels of tough Cuban hardwood that outlast any built in Europe.",
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
          "A white stucco house with a terracotta roof and a balcony draped in flowers, the Plaza Shop opens two wide arches to the quay. A colourful striped awning covers baskets of fruit and dried goods, and barrels of water line the doorstep.",
        desktop: { x: 8.5, y: 52, size: 12 },
        mobile: { x: 20, y: 35, size: 30 },
      },
      Tavern: {
        name: "Sailor's Tavern",
        description:
          "A great carved ship's wheel sits under the gable of the Sailor's Tavern. Its arched doorway glows with lantern light, vines and flowers climb the walls, and the tables outside are crowded with barrels and thirsty river men.",
        desktop: { x: 23, y: 50, size: 13 },
        mobile: { x: 78, y: 42, size: 34 },
      },
      Bank: {
        name: "Crown Bank",
        description:
          "Behind a gate of black and gold ironwork, the Crown Bank guards its treasury under a painted royal coat of arms. Its pale yellow stone and red-tiled roof catch the sun, and potted palms stand on either side of the heavy door.",
        desktop: { x: 38, y: 50, size: 10 },
        mobile: { x: 27, y: 56, size: 34 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Red and gold banners of Spain hang down the white walls of the Governor's Hall, a grand building with arched windows, an iron balcony and a gilded crest under the flag. A wide stair leads up to its wooden doors from the plaza below.",
        desktop: { x: 53.5, y: 47, size: 14 },
        mobile: { x: 52, y: 24, size: 38 },
      },
      Market: {
        name: "Grand Market",
        description:
          "Green and orange striped awnings shade the stalls of the Grand Market, piled high with cacao beans, peppers and tropical fruit. Vines climb the timbered gable above, and the twin towers of the cathedral rise over the rooftops behind.",
        desktop: { x: 70.5, y: 52, size: 13 },
        mobile: { x: 74, y: 58, size: 38 },
      },
      Shipyard: {
        name: "Villa Hermosa Shipyard",
        description:
          "A golden anchor marks the sign of the Villa Hermosa Shipyard, a broad timber shed with a stone tower beside it. River boats and a half-built hull share the slipway, and tall masts sway at the pier outside.",
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
          "A cream awning shades the arched doors of the Port Shop, a whitewashed building with a terracotta roof and a balcony hung with vines. Crates, barrels and baskets of supplies crowd the doorstep, ready for crews who have just sailed in past El Morro.",
        desktop: { x: 8, y: 58, size: 10 },
        mobile: { x: 16, y: 69, size: 28 },
      },
      Tavern: {
        name: "Anchor Tavern",
        description:
          "An iron anchor hangs above the sign of the Anchor Tavern, and three tall arches open its lantern-lit room to the street. Bougainvillea spills down the walls while soldiers from the garrison swap stories with sailors over cups of wine.",
        desktop: { x: 22.5, y: 58, size: 11 },
        mobile: { x: 45, y: 70, size: 32 },
      },
      Bank: {
        name: "Royal Bank",
        description:
          "A golden crown is set into the pale stone front of the Royal Bank, above a sturdy arched door at the top of a short flight of steps. Inside, the King's officials count the coin that pays the garrison and keeps the great fortress walls in good repair.",
        desktop: { x: 38, y: 56, size: 10 },
        mobile: { x: 80, y: 69, size: 34 },
      },
      "City hall": {
        name: "Governor's Palace",
        description:
          "Twin towers frame the Governor's Palace, its red-tiled roof crowned with the royal coat of arms and its balcony hung with banners in red and gold. Palms and flowering vines soften the pale stone, and a stone stair leads up to the main doors.",
        desktop: { x: 54.5, y: 52, size: 13 },
        mobile: { x: 48, y: 43, size: 36 },
      },
      Market: {
        name: "San Juan Market",
        description:
          "Beneath a terracotta roof, cream and blue striped awnings shade the stalls of the San Juan Market. Sacks of grain, baskets of fruit and jars of olive oil fresh from Spain change hands, and flowers tumble from every wall around it.",
        desktop: { x: 71, y: 60, size: 12 },
        mobile: { x: 16, y: 45, size: 28 },
      },
      Shipyard: {
        name: "San Juan Shipyard",
        description:
          "Crossed tools hang on the sign of the San Juan Shipyard, a timber shed whose open front faces straight onto the bay. A new hull rests inside, and warships of the Spanish crown tie up alongside to have their damage repaired.",
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
          "A Dutch house of orange brick with a stepped gable and green shutters, the Oranje Trade House sells everything from salted fish to sailcloth. Cream awnings shade its doorway, and barrels of supplies stand ready on the stone landing.",
        desktop: { x: 9.5, y: 48, size: 11 },
        mobile: { x: 19, y: 37, size: 30 },
      },
      Tavern: {
        name: "Admiral's Rest Tavern",
        description:
          "A long, low house with a dark slate roof and a timber balcony, the Admiral's Rest Tavern sets its tables out by the water. Lanterns burn beside the door, and inside the talk is of salt prices, storms and the next voyage.",
        desktop: { x: 24, y: 50, size: 12 },
        mobile: { x: 50, y: 46, size: 34 },
      },
      Bank: {
        name: "Guild Ledger Bank",
        description:
          "Tall and narrow, the Guild Ledger Bank wears a stepped brick gable topped with the red, white and blue flag. Lanterns flank its green arched door, behind which careful Dutch clerks weigh coins and record every guilder.",
        desktop: { x: 40, y: 48, size: 11 },
        mobile: { x: 84, y: 43, size: 30 },
      },
      "City hall": {
        name: "Stadholder's Hall",
        description:
          "Golden stone, a blue crest above the door and a slender bell tower mark the Stadholder's Hall, which rises above a broad flight of stone steps. Green shutters stand open to catch the trade winds as island officials go about the Company's business.",
        desktop: { x: 56, y: 46, size: 13 },
        mobile: { x: 51, y: 22, size: 36 },
      },
      Market: {
        name: "Spice Wharf Market",
        description:
          "Beneath a red-brick stepped gable, the Spice Wharf Market spreads its cream awnings over stalls of cloves, nutmeg, fresh fruit and bolts of bright cloth. Crates of goods line the front, all within sight of the windmill turning on the hill.",
        desktop: { x: 72.5, y: 50, size: 11 },
        mobile: { x: 35, y: 70, size: 34 },
      },
      Shipyard: {
        name: "Eastwind Dockyard",
        description:
          "Bare timber scaffolding surrounds a ship's hull inside the Eastwind Dockyard, a great open shed with a slate roof. A wooden crane leans out over the quay, and stacked crates and planks wait to be hauled aboard.",
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
          "Painted a warm orange with white trim and a stepped Dutch gable, the Oranje Supply House is the brightest building on the waterfront. Under its cream awning, barrels of salt fish, water casks and sacks of provisions stand ready beside the green front door.",
        desktop: { x: 9, y: 50, size: 10 },
        mobile: { x: 17, y: 45, size: 28 },
      },
      Tavern: {
        name: "Sailor's Rest Tavern",
        description:
          "A red-tiled roof and sky blue walls give the Sailor's Rest Tavern a cheerful look. Its wooden veranda is lined with lanterns and tables, where sailors from every nation share pipes and rum as the evening breeze comes in off the water.",
        desktop: { x: 24, y: 52, size: 11 },
        mobile: { x: 49, y: 47, size: 30 },
      },
      Bank: {
        name: "Merchant Ledger Bank",
        description:
          "A tall stepped gable with white trim crowns the Merchant Ledger Bank, its green shutters and arched door watched over by a pair of lanterns. The Company's clerks inside will count guilders, pieces of eight and English shillings alike, as long as the coin is good.",
        desktop: { x: 39, y: 50, size: 10 },
        mobile: { x: 83, y: 47, size: 28 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "Pale yellow walls, a domed bell tower and a blue coat of arms above the door make the Governor's Hall the pride of Willemstad. A grand stair climbs to its green doors, past potted palms and flowering shrubs.",
        desktop: { x: 54.5, y: 46, size: 13 },
        mobile: { x: 50, y: 25, size: 34 },
      },
      Market: {
        name: "Harbor Spice Market",
        description:
          "Under the stepped gable of the Harbor Spice Market, cream awnings shade crates overflowing with peppers, nutmeg, oranges and brightly dyed cloth. The windmill turns on the hill behind, and the air is thick with cinnamon and cloves.",
        desktop: { x: 70, y: 52, size: 10 },
        mobile: { x: 26, y: 75, size: 32 },
      },
      Shipyard: {
        name: "Bluewater Dockyard",
        description:
          "Beneath a dark shingled roof and the Dutch flag, the Bluewater Dockyard is a forest of scaffolding around a growing hull. A tall crane swings timber in from the water, and shipwrights hammer away from first light until dusk.",
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
          "A red and white striped awning hangs over the door of the Nassau Supply Shop, a brick house with a stepped gable and green shutters. Flower boxes fill every window, and barrels of salt and supplies wait outside for the next ship to come in.",
        desktop: { x: 8.5, y: 52, size: 10 },
        mobile: { x: 17, y: 38, size: 28 },
      },
      Tavern: {
        name: "Pelican Sail Tavern",
        description:
          "Under a red-tiled roof and pale blue walls, the Pelican Sail Tavern opens a lantern-lit veranda onto the quay. Salt rakers and sailors gather at its wooden tables, drinking until the stars come out over the bay.",
        desktop: { x: 22.5, y: 54, size: 11 },
        mobile: { x: 50, y: 46, size: 32 },
      },
      Bank: {
        name: "Island Ledger Bank",
        description:
          "Painted a soft sage green, the Island Ledger Bank stands out with its stepped gable, flower boxes and green arched door. Lanterns light the steps, and the clerks inside keep careful records of every barrel of salt sold from the ponds.",
        desktop: { x: 38, y: 52, size: 9 },
        mobile: { x: 85, y: 42, size: 26 },
      },
      "City hall": {
        name: "Governor's Hall",
        description:
          "A golden building with a clock above the entrance and a domed bell tower, the Governor's Hall sits at the top of a wide stone stair. Green shutters and potted palms soften its grand front, and the Dutch flag flies proudly from the tower.",
        desktop: { x: 54, y: 50, size: 14 },
        mobile: { x: 55, y: 20, size: 38 },
      },
      Market: {
        name: "Salt Bay Market",
        description:
          "Green and cream striped awnings shade the stalls of the Salt Bay Market, set beneath an orange brick gable. Crates spill over with oranges, limes and peppers, and fishermen bring their catch straight up from the boats below.",
        desktop: { x: 70.5, y: 54, size: 10 },
        mobile: { x: 25, y: 70, size: 32 },
      },
      Shipyard: {
        name: "Oyster Reef Shipyard",
        description:
          "A tall wooden crane leans over the Oyster Reef Shipyard, where a ship's hull rises within a cage of scaffolding. Rowing boats crowd the pier outside, and the sound of hammers carries across the water.",
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
