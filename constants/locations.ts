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

export type TownLocations = Record<
  Town,
  {
    nation: Nation
    descriptions?: Partial<Record<TownLocation | SeaLocation, string>>
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
    descriptions: {
      Shop: "Amidst the lively town square, The Maritime Emporium allures passersby with its diverse wares, offering nourishing provisions, canteens of pure water, medicinal remedies, fine tobacco, aged rum, delicate porcelain, and an exotic assortment of aromatic spices, evoking the spirit of maritime adventure and worldly trade.",
      Tavern:
        "Amidst the cobbled streets, The Salty Seadog Tavern exudes a rustic charm, where wine, tobacco, and rum flow freely, and the lively chatter of talkative pirates fills the air with tales of daring escapades.",
      Bank: "Amidst the dimly lit chamber, rows of heavy wooden desks adorned with quill pens and leather-bound ledgers stand as scribes meticulously record transactions, while the air carries the scent of ink and parchment.",
      Market:
        "Amidst the cobbled streets and bustling stalls, vendors hawk their wares to a vibrant tapestry of patrons, the air alive with the harmonious medley of haggling voices and the tantalizing aroma of exotic spices.",
      Shipyard:
        "Amidst wooden structures and echoing with the sounds of hammering and creaking timber, skilled craftsmen shape massive vessels under the vast expanse of the open sky.",
      "City hall":
        "At the epicenter of urban activity, the city hall's imposing stature underscores its role as the epicenter of governance, its design reflecting the community's commitment to organization and progress.",
      Harbor:
        "Nestled along the coastline, the bustling harbor teems with maritime activity, its docks alive with the comings and goings of ships, merchants, and the vibrant pulse of trade.",
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
    descriptions: {
      Shop: "Within the bustling market square, The Captain's Cove Emporium beckons with a rich assortment of provisions, leather-bound water bottles, healing tonics, aromatic tobacco, aged rum, delicate porcelain, and a tantalizing array of spices, evoking the essence of maritime exploration and exotic trade.",
      Tavern:
        "Nestled in the heart of the town, The Captain's Quarters Inn entices patrons with its rich libations of wine, tobacco, and rum, while talkative pirates spin riveting yarns that whisk listeners away to the high seas.",
      Bank: "Inside the bank, clerks in ruffled collars and powdered wigs bustle about, orchestrating exchanges of coin and bills beneath the watchful gaze of ornate oil paintings and flickering candlelight.",
      Market:
        "In a lively bazaar of cobbled pathways and colorful awnings, traders peddle their diverse merchandise to a mosaic of eager shoppers, creating a sensory collage of bargaining banter and alluring scents.",
      Shipyard:
        "Within the maritime construction hub, the air resounds with the rhythmic cadence of hammers meeting wood, as skilled artisans fashion imposing ships beneath the expansive canopy of the heavens.",
      "City hall":
        "At the heart of the urban landscape, the city hall stands as an architectural emblem of civic governance, its grand façade and towering spires evoking a sense of authority and communal identity.",
      Harbor:
        "At the meeting point of land and sea, the harbor buzzes with a symphony of maritime engagements, where vessels, merchants, and the aroma of goods create a bustling tableau of trade.",
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
    descriptions: {
      Shop: "Nestled along the lively quayside, The Seafarer's Emporium entices with its treasure trove of sustenance, leather-clad water flasks, healing elixirs, aromatic tobacco, aged rum, delicate porcelain, and an exotic array of spices, embodying the spirit of maritime adventure and alluring trade.",
      Tavern:
        "Within the lively tavern known as The Buccaneer's Cove, the air is thick with the aroma of wine, tobacco, and rum, as talkative pirates gather to swap stories of their adventurous exploits.",
      Bank: "The heart of the bank beats with the rhythmic scratching of quills on parchment, as patrons huddle in small clusters, discussing trade deals and loans amidst the grandeur of oak-panelled walls and high vaulted ceilings.",
      Market:
        "Within a market square adorned with makeshift stalls and vibrant banners, a symphony of bartering voices weaves through the air, accompanied by the visual feast of goods ranging from glistening textiles to gleaming trinkets.",
      Shipyard:
        "Amid the shipbuilding precinct, the symphony of ringing tools and the scent of freshly hewn timber converge, creating a scene where master shipwrights sculpt mighty vessels against the backdrop of the boundless firmament.",
      "City hall":
        "Anchored in the urban center, the city hall's majestic presence embodies civic leadership, its architectural grandeur serving as a symbolic nexus for communal affairs.",
      Harbor:
        "Along the shore's edge, the harbor thrives as a hub of seafaring ventures, where ships dock amidst a lively scene of commerce, echoing with the sounds of rigging and negotiation.",
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
    descriptions: {
      Shop: "Amidst the cobblestone streets, The Adventurer's Emporium beckons with its diverse offerings, from nourishing victuals and leather-bound water bottles to medicinal tinctures, aromatic tobacco, aged rum, delicate porcelain, and an exotic assortment of spices, all evoking the allure of daring expeditions and global trade.",
      Tavern:
        "Amidst the bustling town square, The Shipwrecked Sailor Alehouse beckons with its offerings of wine, tobacco, and rum, as talkative pirates recount their daring escapades over merry glasses.",
      Bank: "Within the bank's opulent interior, the hushed whispers of bankers and traders intertwine with the rustle of fine silk garments, creating an atmosphere of clandestine negotiations amidst polished mahogany desks and stacks of gold coins.",
      Market:
        "Amidst the bustling marketplace, a lively dance of commerce unfolds as vendors flaunt their wares under a patchwork of sunlit canopies, while the chorus of negotiations mingles with the rustle of coins and the occasional burst of laughter.",
      Shipyard:
        "In the shipyard's bustling expanse, the harmony of chisels and saws intermingles with the salty breeze, as experienced shipbuilders shape majestic boats beneath the open expanse of the sky.",
      "City hall":
        "Within the bustling urban expanse, the city hall's imposing structure commands attention, a focal point where governance takes shape through intricate design and towering architecture.",
      Harbor:
        "Nestled within the coastal embrace, the harbor breathes life into the waterfront, a dynamic arena where ships dock and cargoes exchange hands, enveloped in the salty breeze of maritime enterprise.",
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
    descriptions: {
      Shop: "Within the old town's bustling center, The Maritime Emporium lures in passersby with its eclectic range of goods, from nourishing provisions and leather-clad water bottles to medicinal remedies, aromatic tobacco, aged rum, delicate porcelain, and a captivating variety of spices, invoking a sense of seafaring adventure and worldly intrigue.",
      Tavern:
        "The Jolly Roger Inn stands tall, a cozy tavern where wine, tobacco, and rum flow freely, and talkative pirates share their legendary tales with eager ears.",
      Bank: "Stepping into the bank feels like entering a world frozen in time, where the gentle shuffle of papers mingles with the soft chiming of pocket watches, encapsulating the elegance of an era marked by handwritten ledgers and graceful transactions.",
      Market:
        "The market scene unfolds with a kaleidoscope of colors and sounds, as traders present their treasures against a backdrop of animated conversations and the tantalizing sizzle of food stalls, creating an atmosphere of spirited exchange.",
      Shipyard:
        "Within the naval construction site, the echoes of labor resonate against the backdrop of billowing clouds, as shipwrights meticulously craft formidable seafaring vessels with a chorus of hammer strikes and timber manipulation.",
      "City hall":
        "Amidst the urban tapestry, the city hall's regal edifice stands as a testament to civic administration, its stately appearance mirroring the importance of local governance.",
      Harbor:
        "The shoreline transforms into a theater of maritime affairs at the bustling harbor, where vessels of all sizes jostle for space while merchants and traders navigate the intricate dance of business.",
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
    descriptions: {
      Shop: "In the heart of the old town, The Seafarer's Emporium entices with its diverse selection, from nourishing provisions and leather-clad water bottles to healing elixirs, aromatic tobacco, aged rum, delicate porcelain, and an enchanting array of spices, evoking the charm of maritime exploration and international trade.",
      Tavern:
        "Tucked away in the narrow alleys, The Sea Serpent's Hideaway lures with its enticing wines, tobacco, and rum, and the laughter of talkative pirates fills the air.",
      Bank: "In the heart of the bank, sunlight filters through stained glass windows, casting colorful reflections upon the intricate mosaic floors, as patrons engage in animated discussions while ink-stained fingers record the ebb and flow of financial fortunes.",
      Market:
        "In the heart of the marketplace, a mosaic of stalls forms a labyrinth of goods and opportunities, where buyers and sellers engage in an orchestrated rhythm of interaction, accompanied by the harmonious blend of languages and dialects.",
      Shipyard:
        "Amid the sprawling shipbuilding grounds, a panorama of craftsmanship unfolds under the watchful eye of the elements, where artisans shape sturdy ships through the harmonious interplay of skilled hands and natural forces.",
      "City hall":
        "At the crossroads of the city, the city hall's resplendent building speaks to the core of communal management, its design and stature reflecting the city's organizational heart.",
      Harbor:
        "Where land meets water, the harbor unfurls as a bustling gateway to distant horizons, where ships are moored and seafarers and merchants converge to shape the ebb and flow of trade.",
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
    descriptions: {
      Shop: "Amidst the bustling market square, The Adventurer's Emporium calls out with its captivating offerings, encompassing nourishing victuals and leather-bound water bottles, medicinal tinctures, aromatic tobacco, aged rum, delicate porcelain, and an exotic assortment of spices, all conjuring visions of daring expeditions and global commerce.",
      Tavern:
        "Along the waterfront, The Smuggler's Den Tavern serves up wine, tobacco, and rum to a boisterous crowd of talkative pirates, swapping tales that captivate everyone present.",
      Bank: "Within the bank's oak-paneled walls, the air is thick with the scent of aged leather and candle wax, as clerks meticulously copy entries from worn parchment scrolls onto fresh pages, preserving the intricate tapestry of economic activities.",
      Market:
        "Within the vibrant market setting, the air resonates with the hum of activity, interweaving the cadence of transactions and the mesmerizing array of products, from aromatic herbs to intricately woven fabrics.",
      Shipyard:
        "The shipyard's lively atmosphere comes alive with the symphony of creation, as skilled workers ply their trade amid stacks of timber and the vast panorama of the sky, fashioning vessels that will brave the open seas.",
      "City hall":
        "In the midst of urban activity, the city hall's architectural magnificence underscores its role as the administrative cornerstone, its form a tangible representation of communal structure.",
      Harbor:
        "Embraced by the sea's expanse, the harbor emerges as a dynamic crossroads of seafaring activities, its docks a stage where cargoes are loaded and unloaded, while tales of distant shores are exchanged.",
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
    descriptions: {
      Shop: "Nestled along the cobblestone streets, The Maritime Emporium allures with its treasure trove, housing nourishing victuals and leather-clad water bottles, medicinal remedies, aromatic tobacco, aged rum, delicate porcelain, and a captivating variety of spices, embodying the spirit of seafaring adventures and exotic trade.",
      Tavern:
        "In the heart of the town's nightlife, The Blackbeard's Lair entices with its selection of wine, tobacco, and rum, while talkative pirates regale one another with thrilling stories.",
      Bank: "Amidst the rich tapestries and velvet draperies, the bank exudes an air of sophistication and precision, with patrons consulting with bankers in quiet tones while the clink of metal coins resonates from the counting rooms nearby.",
      Market:
        "Amidst the open-air market's vibrant chaos, an array of vendors beckons with treasures ranging from gleaming jewels to handcrafted pottery, the ambiance enriched by the symphony of negotiations and the chatter of eager patrons.",
      Shipyard:
        "Within the maritime workshop, the resonant melody of tools against wood harmonizes with the vast azure canvas above, while dedicated shipbuilders bring forth maritime giants from raw materials.",
      "City hall":
        "Within the urban fabric, the city hall's dignified exterior symbolizes the city's collective identity, housing the mechanisms through which local governance finds expression.",
      Harbor:
        "Along the water's edge, the harbor forms a bustling canvas of maritime interactions, with ships unloading exotic goods and skilled dockworkers navigating the labyrinth of crates and barrels.",
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
    descriptions: {
      Shop: "Nestled along the cobblestone streets, The Maritime Emporium allures with its treasure trove, housing nourishing victuals and leather-clad water bottles, medicinal remedies, aromatic tobacco, aged rum, delicate porcelain, and a captivating variety of spices, embodying the spirit of seafaring adventures and exotic trade.",
      Tavern:
        "The Pirate's Cove Tavern exudes a seafaring charm, where wine, tobacco, and rum are readily available, and talkative pirates entertain with tales of daring adventures on the high seas.",
      Bank: "The bank's interior is a tableau of ordered chaos, with clerks rushing to and fro beneath the gaze of stern portraits, ink-stained aprons contrasting against the polished grandeur of gilded mirrors and towering shelves of leather-bound ledgers.",
      Market:
        "Stepping into the bustling market square, one is enveloped by a sensory tapestry of sights and sounds, where traders extol their goods in a chorus of languages, set against the backdrop of vivid fabrics and fragrant spices.",
      Shipyard:
        "Amid the ship construction arena, the orchestrated dance of artisans and raw materials takes center stage, as majestic vessels begin to take shape beneath the boundless expanse of the heavens.",
      "City hall":
        "Anchored in the urban sprawl, the city hall's impressive architecture embodies civic order, a visual embodiment of the mechanisms that guide the community's functioning.",
      Harbor:
        "Nestled within the coastal embrace, the harbor comes alive with the pulse of maritime connections, as sailors and traders collaborate amidst the backdrop of anchored vessels and bustling quaysides.",
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
    descriptions: {
      Shop: "Within the town's lively center, The Wandering Merchant beckons with its diverse stock, ranging from nourishing victuals and leather-bound water bottles to healing tonics, fragrant tobacco, aged rum, delicate porcelain, and a tantalizing array of spices, invoking the essence of adventurous journeys and cultural exchange.",
      Tavern:
        "Nestled within the old town's narrow lanes, The Mariner's Retreat beckons with its offerings of wine, tobacco, and rum, as talkative pirates share their escapades, weaving an atmosphere of excitement and merriment.",
      Bank: "Inside the bank, the flickering glow of candles dances across the faces of clients gathered around heavy oak tables, where transactions are recorded in flowing script, encapsulating the timeless artistry of financial record-keeping.",
      Market:
        "The market unfolds as a dynamic tableau of exchange, with traders and buyers engaging in a dance of offers and counteroffers amidst the backdrop of colorful stalls laden with exotic fruits, fine textiles, and ornate crafts.",
      Shipyard:
        "In the shipyard's dynamic theater of craftsmanship, the interplay of labor and the elements gives birth to maritime marvels, as immense ships emerge beneath the ever-changing tableau of the sky.",
      "City hall":
        "Amid the city's bustling rhythm, the city hall's commanding presence signifies governance, its design a visual embodiment of the urban body's organizational hub.",
      Harbor:
        "The harbor's energetic waterfront scene is a testament to maritime enterprise, where vessels find refuge and commodities change hands, painting a picture of bustling activity framed by the sea.",
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
    descriptions: {
      Shop: "In the heart of the quaint town square, The Trader's Emporium enchants patrons with its alluring assortment, featuring nourishing provisions and leather-clad water bottles, medicinal elixirs, aromatic tobacco, aged rum, delicate porcelain, and an exotic blend of spices, evoking the spirit of exploration and intercontinental trade.",
      Tavern:
        "The Swashbuckler's Hideout entices patrons with its choice wines, tobacco, and rum, where talkative pirates fill the air with captivating tales of their high-sea exploits.",
      Bank: "Stepping into the bank is like entering a realm of calculated elegance, where the symphony of quills and the rustle of fine parchment provide the backdrop to a stage where fortunes are measured and deals are struck with utmost solemnity.",
      Market:
        "Amidst the vibrant market scene, a diverse array of merchants presents their merchandise beneath a canopy of sunlit awnings, the air alive with the music of commerce as patrons navigate the tapestry of goods and deals.",
      Shipyard:
        "Within the bustling shipbuilding domain, a convergence of human ingenuity and natural backdrop takes place, where colossal ships arise from the symphony of tools and the embrace of the open firmament.",
      "City hall":
        "At the heart of the urban mosaic, the city hall's monumental construction stands as an emblem of civic administration, its form reflecting the community's cooperative endeavors.",
      Harbor:
        "The harbor becomes a vibrant epicenter of maritime affairs, where the interplay of vessels, goods, and aspirations creates a dynamic tapestry woven with the threads of trade and exploration.",
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
    descriptions: {
      Shop: "Amidst the bustling streets, The Globe-Trotter's Emporium entices with its rich collection, including nourishing victuals and leather-bound water bottles, medicinal concoctions, fragrant tobacco, aged rum, delicate porcelain, and an enticing array of spices, evoking a sense of adventurous voyages and cosmopolitan commerce.",
      Tavern:
        "Within the cozy tavern known as The Rumrunner's Haven, wine, tobacco, and rum flow aplenty, while talkative pirates regale eager listeners with stories of their daring adventures.",
      Bank: "Within the bank, the ambiance is one of subdued grandeur, where patrons converse in hushed tones amidst the intricate carvings of wooden fixtures, and the gentle shuffle of parchment echoes the cadence of financial transactions.",
      Market:
        "Within the lively market enclave, a vibrant mosaic of traders and customers converges, their interactions painting a vivid tableau of animated discussions, clinking coins, and the delightful fragrance of street food.",
      Shipyard:
        "Amidst the maritime construction hub, the resonance of tools against wood forms a backdrop for the creation of grand vessels, their emergence under the vast sky a testament to the artistry of shipwrights.",
      "City hall":
        "Within the urban landscape, the city hall's resolute structure conveys the essence of local governance, its design encapsulating the principles that underpin communal life.",
      Harbor:
        "At the juncture of land and sea, the harbor flourishes as a bustling arena of maritime interactions, where ships find haven and bustling quayside activities shape the rhythms of trade.",
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
    descriptions: {
      Shop: "Nestled along the historic quayside, The Traveler's Bazaar enthralls visitors with its diverse treasure trove, encompassing nourishing provisions and leather-clad water bottles, medicinal tonics, aromatic tobacco, aged rum, delicate porcelain, and a captivating mix of spices, embodying the allure of maritime adventures and international markets.",
      Tavern:
        "Nestled amidst the town's bustling streets, The Tipsy Buccaneer Inn invites with its selection of wine, tobacco, and rum, where talkative pirates gather to share their enthralling escapades.",
      Bank: "Inside the bank's chamber, the walls adorned with maps of distant lands and exotic commodities, patrons gather to negotiate while clerks diligently transcribe their agreements, encapsulating the essence of a world fueled by ink and commerce.",
      Market:
        "Amidst the bustling market square, a bustling ecosystem of commerce thrives, where spirited barter and the vibrant array of products create a scene reminiscent of a living, breathing tapestry.",
      Shipyard:
        "In the shipyard's energetic milieu, the steady rhythm of craftsmanship harmonizes with the expanse of the heavens, as adept shipbuilders meticulously shape seaworthy giants from raw materials.",
      "City hall":
        "Nestled amidst the urban fabric, the city hall's architectural opulence conveys the essence of civic management, its towering spires and intricate façade mirroring the intricacies of communal affairs.",
      Harbor:
        "Along the coastline, the harbor stands as a testament to maritime vitality, a place where ships berth and the air is filled with the resonant calls of seafarers and merchants.",
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
    descriptions: {
      Shop: "Within the town's vibrant center, The Globetrotter's Market charms passersby with its diverse offerings, from nourishing victuals and leather-bound water bottles to healing elixirs, fragrant tobacco, aged rum, delicate porcelain, and an enchanting variety of spices, all evoking the spirit of exploratory journeys and worldly trade.",
      Tavern:
        "Along the waterfront, The Groggy Sailor Alehouse beckons with its enticing wines, tobacco, and rum, while talkative pirates recount their swashbuckling tales in a lively atmosphere.",
      Bank: "Stepping into the bank feels like entering a treasury of secrets, with the flickering glow of candles casting an enigmatic light on the faces of bankers engrossed in intricate calculations, surrounded by shelves laden with tomes of economic wisdom.",
      Market:
        "Stepping into the market's bustling realm, one is immersed in a sensory panorama, where the interplay of enthusiastic haggling and the captivating display of goods forms a living portrait of trade.",
      Shipyard:
        "Within the ship construction realm, the symphony of labor and the natural world intertwines, culminating in the birth of majestic ships that will navigate the open waters under the watchful eye of the sky.",
      "City hall":
        "Anchored at the urban crossroads, the city hall's dignified construction embodies the spirit of governance, its presence a visual reminder of the city's administrative nucleus.",
      Harbor:
        "Embracing the shoreline, the harbor reverberates with the heartbeat of maritime commerce, its docks alive with the exchange of goods and stories, woven together by the threads of seafaring.",
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
    descriptions: {
      Shop: "In the heart of the bustling market, The Merchant's Oasis allures with its eclectic array, housing nourishing provisions and leather-clad water bottles, medicinal remedies, aromatic tobacco, aged rum, delicate porcelain, and a captivating blend of spices, capturing the essence of adventurous expeditions and cross-cultural exchange.",
      Tavern:
        "The Black Pearl Tavern stands tall, offering a variety of wine, tobacco, and rum, where talkative pirates fill the air with animated stories of their daring exploits.",
      Bank: "The bank's interior resonates with the weight of history as patrons engage in earnest discussions, their voices mingling with the faint rustle of parchment as transactions are meticulously documented, painting a portrait of an era defined by tactile financial dealings.",
      Market:
        "The market's spirited ambiance unfolds as a realm of vibrant exchanges, where the chorus of vendor calls and the symphony of patrons' responses combine with the spectacle of goods, presenting a microcosm of economic vitality.",
      Shipyard:
        "Amid the shipbuilding arena, the dance of creation unfolds beneath the overarching sky, as seasoned artisans bring to life intricate vessels through the marriage of hands-on skill and atmospheric elements.",
      "City hall":
        "In the heart of the cityscape, the city hall's grandeur speaks volumes about civic responsibility, its ornate structure encapsulating the collective aspirations of the community.",
      Harbor:
        "Where waves lap against the land, the harbor emerges as a bustling nexus of maritime engagements, where vessels dock and depart, forming a kinetic mosaic of trade and exploration.",
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
    descriptions: {
      Shop: "Amidst the cobblestone alleys, The Voyager's Trove calls out with its diverse assortment, offering nourishing victuals and leather-bound water bottles, medicinal tinctures, fragrant tobacco, aged rum, delicate porcelain, and an alluring medley of spices, evoking a sense of maritime discoveries and global commerce.",
      Tavern:
        "Tucked away in the old town's hidden corner, The Merry Marauder Tavern serves up wine, tobacco, and rum, while talkative pirates regale each other and curious visitors with thrilling accounts of their adventures.",
      Bank: "Amidst the richly adorned interior of the bank, the air is charged with anticipation as patrons exchange knowing glances, while clerks in elaborate attire record each agreement with quills that scratch like a symphony, immortalizing the rhythm of commerce.",
      Market:
        "In the heart of the market, a mosaic of cultural treasures is presented by traders, the air resonating with the rhythm of commerce as visitors navigate the labyrinthine alleys, engaging in a dance of transactions amidst the vivid tapestry of offerings.",
      Shipyard:
        "The shipyard's vibrant setting reverberates with the music of industry, where dedicated craftsmen sculpt imposing ships beneath the ever-changing canvas of the sky, a testament to the symbiotic relationship between human endeavor and nature.",
      "City hall":
        "Amidst the bustling cityscape, the city hall's commanding architecture tells the story of civic order, its formidable appearance an emblem of the collaborative efforts that shape urban life.",
      Harbor:
        "The coastal harbor becomes a dynamic crossroads of the sea, where ships find refuge from their voyages and the waterfront hums with the activities of mariners, merchants, and the exchange of treasures.",
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

export const SEA_DESCRIPTIONS = [
  "Sailing boldly across the seven seas, our crew navigates the ship through treacherous waters, seeking adventure and hidden treasures while raising the Jolly Roger high.",
  "Roaming the vast expanse of the seven seas, our fearless crew steers the vessel through perilous waters, hunting for riches and raising our distinctive flag high.",
  "On the boundless ocean, our intrepid crew commands the ship through turbulent waters, pursuing fortune and proudly hoisting our unique emblem.",
  "Amidst the endless sea, our daring crew guides the ship through challenging waters, in search of treasures and defiantly displaying our emblem aloft.",
  "Venturing across the open sea, our resolute crew navigates the ship through unpredictable waters, on a quest for wealth and proudly flying our symbolic banner.",
  "Sailing the seven seas, our courageous crew charts a course through hazardous waters, in pursuit of bounty and boldly showcasing our emblem.",
  "Cruising the wide oceans, our audacious crew commands the vessel through tumultuous waters, chasing after riches and displaying our emblem defiantly.",
  "Across the boundless waters, our valiant crew pilots the ship through tempestuous seas, seeking wealth and raising our distinctive flag high.",
  "Navigating the vast sea, our determined crew steers the vessel through challenging waters, pursuing treasures and proudly unfurling our emblem.",
  "Roaming the open ocean, our adventurous crew guides the ship through turbulent waters, in search of fortune and defiantly displaying our emblem aloft.",
  "Exploring the seven seas, our intrepid crew commands the ship through unpredictable waters, on a quest for wealth and proudly flying our symbolic banner.",
  "Sailing the expansive seas, our daring crew plots a course through treacherous waters, pursuing untold wealth and displaying our emblem with pride.",
  "Amidst the vast ocean, our courageous crew navigates the ship through challenging waters, seeking riches and hoisting our distinctive banner high.",
  "Cruising the boundless waters, our resolute crew commands the vessel through tumultuous seas, chasing after fortune and showcasing our emblem defiantly.",
  "Venturing across the open sea, our audacious crew steers the ship through unpredictable waters, in pursuit of bounty and proudly unfurling our emblem.",
  "Roaming the limitless ocean, our valiant crew pilots the vessel through tempestuous waters, seeking treasures and raising our distinctive flag high.",
  "Exploring the seven seas, our determined crew guides the ship through hazardous waters, on a quest for wealth and displaying our emblem with pride.",
  "Sailing boldly across the vast expanse of the sea, our fearless crew charts a course through perilous waters, hunting for riches and hoisting our unique banner high.",
  "Navigating the endless sea, our intrepid crew commands the ship through challenging waters, pursuing untold wealth and defiantly showcasing our emblem.",
  "Roaming the wide oceans, our adventurous crew steers the vessel through tumultuous waters, in search of fortune and proudly flying our symbolic banner.",
  "Cruising the expansive seas, our audacious crew pilots the ship through unpredictable waters, chasing after bounty and raising our distinctive flag high.",
  "Sailing the open sea, our determined crew charts a course through treacherous waters, pursuing hidden riches and displaying our emblem with pride.",
  "Amidst the vast expanse of the ocean, our courageous crew navigates the ship through challenging waters, seeking treasures and hoisting our distinctive banner high.",
  "Venturing across the boundless sea, our valiant crew steers the ship through tumultuous waters, in pursuit of fortune and defiantly showcasing our emblem.",
  "Exploring the seven seas, our fearless crew commands the vessel through unpredictable waters, chasing after untold wealth and proudly unfurling our emblem.",
]
