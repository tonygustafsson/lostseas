const names = [
  "The Salty Weapon",
  "Abominable",
  "Acacia Saint",
  "Acapulco Gold",
  "Acuario",
  "Acuarious",
  "Adios Mamita",
  "Affluential",
  "Afrodita",
  "Aga-Pito",
  "Alimony",
  "Alison",
  "Alpine",
  "Anchors Astray",
  "Anchovia",
  "Angel Of The Sea",
  "Anthony",
  "Aphrodesia",
  "Apocalypso",
  "April Rose",
  "Apta Julia",
  "Aqua Pulp",
  "Aquadisiac",
  "Aquatic Dream",
  "Aracataca",
  "Ariel",
  "Arotiaka",
  "Baba Rum",
  "Baby Nate",
  "Bad Dog",
  "Bail Out",
  "Balmy Steve",
  "Banana Cabana",
  "Bare Necessity",
  "Bay Voyage",
  "Baysick Living",
  "Bella Luna",
  "Bella Vita",
  "Beluga Belt",
  "Bitter Plaid",
  "Black Velvet",
  "Bland Diego",
  "Bleu Et Blanc",
  "Blind Fury",
  "Bloat",
  "Blue Horizon",
  "Blue Sea",
  "Blue Sky",
  "Bluewater",
  "Boil Head",
  "Boilcat",
  "Bolero",
  "Bolt Colt",
  "Bonefly",
  "Boozer",
  "Bottom Checker",
  "Bountyhunter",
  "Brain Mantis",
  "Breakin Wind",
  "Bull Fish",
  "Cabin Fever",
  "Candela",
  "Caribbean King",
  "Caribbean Queen",
  "Caribbean Soul",
  "Carrasco's Melody",
  "Casa Aqua",
  "Cast Away",
  "Celine",
  "Chancaca",
  "Cielo Mio",
  "Cinderella",
  "Clover Deuce",
  "Coco Loco",
  "Constantinople",
  "Continent",
  "Coral Fixation",
  "Coral Reef",
  "Coral Sea",
  "Corsica",
  "Crabby Lady",
  "Crabkitten",
  "Crack Of Dawn",
  "Crescendo",
  "Crimea River",
  "Curious Girl",
  "Current Affair",
  "Current One",
  "Cut-Out",
  "Dancing Girl",
  "Dawn's Early Light",
  "Day Tripper",
  "Debt Setter",
  "Deep Blue",
  "Defacto Princess",
  "Del Mar Dinghy",
  "Deucebra",
  "Dew Mi Moor",
  "Dialogue",
  "Diamantra",
  "Diamond Sky",
  "Dirty Larah",
  "Don Quixote",
  "Dos Winos",
  "Double Felix",
  "Doña Flor",
  "Dredgery",
  "Drippin' Wet",
  "Drippy Dockside",
  "Dulce Miel",
  "Dulcinea",
  "Earthmark",
  "East north",
  "Easy Boy",
  "Easy Girl",
  "Easy Livin'",
  "Eclipse",
  "Eclipto",
  "Elixir",
  "Empty Nest",
  "Melody",
  "Endeavor",
  "Endless Summer",
  "Ensure Angler",
  "Eres Mi Loba",
  "Ergoknot",
  "Glorious Escape",
  "Extro",
  "Fair Weather",
  "Fanarina",
  "Fangold",
  "Fantasea",
  "Fantasy",
  "Far East",
  "Farolito",
  "Faux Phox",
  "Fiasco",
  "Final Curtin",
  "Final Offer",
  "Finale",
  "Fish Eye",
  "Fish Tank",
  "Fishy Business",
  "Five O'clock Shadow",
  "Flagrant Fish",
  "Flamenco",
  "Flight Risk",
  "Fly Bye",
  "Flying Marsius",
  "Flying Monk",
  "Flying Potato",
  "Fo Lita",
  "Fog Blob",
  "Foolish",
  "Foxy Girl",
  "Fragrant",
  "Fraid Knot",
  "Free Bird",
  "Free Spirit",
  "French Girl",
  "Friendly Fire",
  "Frolique",
  "Fruity",
  "Drunk Fathom",
  "Full Throttle",
  "Fully Engaged",
  "Fury",
  "Fuzzy Logic",
  "Gaucho Del Mar",
  "Genie's Dream",
  "Giant Path",
  "Giggling Marlin",
  "Gizord",
  "Gloat",
  "Goin' Broke",
  "Golden Bass",
  "Golden Meanie",
  "Gone Away",
  "Gone With The Wind",
  "Good Thing",
  "Gorad",
  "Got My Way",
  "Grand Scale",
  "Green Eyed Larry",
  "Green Louie",
  "Greenspan",
  "Half-A-Wake",
  "Hana-Hana",
  "Hang Loose",
  "Happenstance",
  "Happy Times",
  "Harm's Way",
  "Harmony Sea",
  "Heat Wave",
  "Hide Away",
  "High Coup",
  "High Seas Postal",
  "Hog Fog",
  "Hole Hog",
  "Homeless Mistress",
  "Horizon Sky",
  "Horizon Unlimited",
  "Horrid Crab",
  "Huge Attitude",
  "Hungry Beaver",
  "Hurricane",
  "Futitus",
  "Ice Bear",
  "Idealis",
  "Impossible Dream",
  "Impulse",
  "Inspector",
  "Intrepid Sludge",
  "Iron Arm",
  "Island Rhythm",
  "Isle Rider",
  "Jalapeño Fireball",
  "Jane Belle",
  "Joanna",
  "Join Venture",
  "Jolin-Jolan",
  "Judgment Day",
  "Just Right",
  "Kane Mutiny",
  "Karen Knot",
  "Ocean Debt",
  "Kelp Monster",
  "King Of The Ocean",
  "King Of The Deeps",
  "King Of The Sea",
  "Kist My Stearn",
  "Kiti-Kiti",
  "Kiwi Kiwi",
  "Knight Of The Sea",
  "Knot Small",
  "Knot So Fast",
  "Knot Too Shabby",
  "Krill",
  "La Bolita",
  "La Consentida",
  "La Morena",
  "La Número Cien",
  "La Zilla",
  "Ladies First",
  "Lafayette",
  "Lagoon",
  "Lake Lizzard",
  "Lake Show",
  "Land Ho",
  "Landphobic",
  "Last Fling",
  "Last Gasp",
  "Lattitude",
  "Laura",
  "Lay A Wake",
  "Lazy Bones",
  "Lazy Boy",
  "Lazy Dazy",
  "Le Jeune Way",
  "Le Manoir",
  "Le Musée",
  "Le Samoa",
  "Le Savoir",
  "Le Victoria",
  "Lee's Ferry",
  "Les Caraibes",
  "Les Delices",
  "Les Passions",
  "Lick The Toad",
  "Liquid Paradise",
  "Lirolai",
  "Loop Hole",
  "Loopy Tuna",
  "Lost Bait",
  "Lost Paradise",
  "Low Ball",
  "Low Tides",
  "Lucitania",
  "Lucitano",
  "Lunamar",
  "Magma Radiant",
  "Magnetic Cocoon",
  "Magnina",
  "Mangelica",
  "Mantis",
  "Maravilla",
  "Maria Del Cielo",
  "Maria Del Mar",
  "Mariela",
  "Maringue",
  "Mariposa",
  "Maritza",
  "Mary Of The Sea",
  "Matilde",
  "Mañana",
  "Medulla Mortadella",
  "Mefistofeles",
  "Melani",
  "Mindingo",
  "Minga",
  "Miss Charm",
  "Moon River",
  "Morgan",
  "Muñeca Brava",
  "Pride",
  "Three Suns",
  "Trophy",
  "Mystique",
  "Natural Silence",
  "Nature's Wrath",
  "Neversink",
  "New Start",
  "Ocean Dancer",
  "Ocean Flower",
  "Ocean Reef",
  "Ocean Stories",
  "Oceanary",
  "Oceanary Soul",
  "Oceanica",
  "Octopus Wrecks",
  "Old As Dirt",
  "Omega To Epsilon",
  "Opt-Inn",
  "Orion",
  "Oshia",
  "Osmosis",
  "Over The Horizon",
  "Parlame D'amore",
  "The Swordfish",
  "Peril",
  "Phaedra",
  "Pineapple Day",
  "Plankwalker",
  "Portogalo",
  "Ports O' Call Tawny",
  "Positive Lattitude",
  "Positive Persuasion",
  "Pour Votre Confort",
  "Power Trip",
  "Prawn Care",
  "Prawn Daddy",
  "Prawn God",
  "Prawn Kiss",
  "Prawn Logic",
  "Prawn Love",
  "Prawn Machine",
  "Prawn Panic",
  "Prawn Phreak",
  "Prawn Pilot",
  "Prawn Queen",
  "Prawn Song",
  "Prawn Tong",
  "Prawnbroker",
  "Prawnderful",
  "Prawnimetric",
  "Prawnlette",
  "Prawnosis",
  "Prawnscape",
  "Prawnto",
  "Prawntosaurus",
  "Predator",
  "Prelude",
  "Prey For Piece",
  "Prince Of The Ocean",
  "Princess Eschew",
  "Princess Of The Ocean",
  "Princess Of The Sea",
  "Private Dancer",
  "Problem Solver",
  "Profitdom",
  "Propagander",
  "Prophet",
  "Props O' Fun",
  "Proud Mari",
  "Proud Mary",
  "Proud Veteran",
  "Provence D'amor",
  "Puget.Wav",
  "Pumping And Bayleen",
  "Pumpty Dumpty",
  "Purple Heart",
  "Putting Zoo",
  "Puttz'n Around",
  "Putzin",
  "Quantiful",
  "Quasi-Nausea",
  "Quatro",
  "Quazonor",
  "Questionable Behaivor",
  "Quimbombo",
  "Quinn Of The Sea",
  "Rabid Rabbit",
  "Rachel The Sublime",
  "Radamus",
  "Radiant Earth",
  "Radiant Fire",
  "Radiant Swift",
  "Random",
  "Rasputin",
  "Rat-Bastard",
  "Ratz Bass",
  "Raze Capitol",
  "Rebecca",
  "Rebel Soul",
  "Reddish Fetish",
  "Reel Crazy",
  "Reel Laxed",
  "Reel Nuts",
  "Reel Trouble",
  "Reel-Laxed",
  "Relax Inn",
  "Relentless",
  "Reptile Holiday",
  "Resentment",
  "Restless Boat",
  "Restless Sole",
  "Retired At Thirty",
  "Rhonda-vous",
  "Rhumba",
  "Rich Craft",
  "Riggin' It Right",
  "Rio Rocinante",
  "River Dance",
  "River Fisher",
  "Rocinante",
  "Rock Reation",
  "Rock'n Roll",
  "Rocket Buoy",
  "Rocket Red",
  "Rococo",
  "Rode 2 Recovery",
  "Romain Place",
  "Romeo Mauve",
  "Ron Dot Com",
  "Rooster Fuzz",
  "Rotten Attitude",
  "Round Tuit",
  "Row Bust",
  "Royal Lush",
  "Royal Wetting",
  "Rudder Season",
  "Rumba",
  "Runaboater",
  "Runaground Sue",
  "Runnin' Errands",
  "Runnin' Late Too",
  "Runny Norse",
  "Rust Bubbles",
  "Rust Bucket",
  "Sabiandulú",
  "Safary",
  "Safe Seamen",
  "Safety First",
  "Sale 'n Buy",
  "Salome",
  "Salsa Girl",
  "Salty Nights",
  "Salty Weekend",
  "Samarkanda",
  "Same Smell",
  "Samopolis",
  "Sancho Panza",
  "Sanctuary Of Sea",
  "Sand Waves",
  "Sandokan",
  "Sandpiper",
  "Saphire Rose",
  "Sarasonic",
  "Sayonara",
  "Scandal",
  "Scape From Land",
  "Scene Serene",
  "Scuba-Do",
  "Sea Bear",
  "Sea Boy",
  "Sea Brisket",
  "Sea Buddy",
  "Sea Cups",
  "Sea Dancer",
  "Sea Dragon",
  "Sea Drunk",
  "Sea Edge",
  "Sea Friar",
  "Sea Gar Afishonado",
  "Sea Guardian",
  "Sea Haggle",
  "Sea Hooter",
  "Sea Hunter",
  "Sea Knight",
  "Sea Lyon",
  "Sea Me Smile",
  "Sea Menace",
  "Sea Monkey",
  "Sea Nile",
  "Sea Ocean Sky",
  "Sea Passions",
  "Sea Ray Play",
  "Sea Rious",
  "Sea Sickle",
  "Sea Thunder",
  "Sea Vu Play",
  "Sea Weasel",
  "Sea Ya",
  "Sea For Two",
  "Sea-Cilian",
  "Sea-Cret Hide Aweigh",
  "Sea-F-O",
  "Sea-Licious",
  "Sea-N-Red",
  "Sea-Nyle",
  "Sea-Sea Rider",
  "Sea-Sought",
  "Sea-esta",
  "SeaMountain",
  "SeaNick Route",
  "SeaQuestered",
  "SeaSky",
  "Seaboney",
  "Seaclusion",
  "Seas The Day",
  "Seas The Day",
  "Season Maker",
  "Season Ticket",
  "Second Coming",
  "Sensor Ship",
  "Sequitur",
  "Serenade",
  "Serpent Tina",
  "Seven Seas",
  "Señor Serene",
  "Señora Bonita",
  "Señorita",
  "Shaam",
  "Shakira",
  "Shangrilatte",
  "Sharkspot",
  "Sharper Ways",
  "She's So Fine",
  "Sheworthy",
  "Shhh I'm Fishing",
  "Ship Faced",
  "Ship Happens",
  "Ship For Brains",
  "Ships-N-Giggles",
  "Shiraz",
  "Shock Theraphy",
  "Shore I Am",
  "Shore Thing",
  "Shore's Fun",
  "Short Cut",
  "Show Me More",
  "Shrink Of Swim",
  "Shu-Biz",
  "Siboney",
  "Sibundoy",
  "Sick Day",
  "Sicodelic Boat",
  "Significant Otter",
  "Silver Bass",
  "Silver Fox",
  "Sin Or Swim",
  "Sindromo",
  "Sing The Boat",
  "Sir Docks-A-Lot",
  "Sir Lunchalot",
  "Sir Ossis Of The River",
  "Sister Ann",
  "Sisterwind",
  "Ski Ya' Later",
  "Ski D'a Sea",
  "Skip Town",
  "Slalom Oath",
  "Slay Ride",
  "Sleeky",
  "Slickyboy",
  "Slip Away",
  "Sloop Ketch",
  "Sloupe Dville",
  "Sludge",
  "Slumlord",
  "Slush Fund",
  "Smelly",
  "Snapper Trapper",
  "Snow Flake",
  "Snow Substitute",
  "So So Toboso",
  "Sobuyit",
  "Sodium Free",
  "Sofia's Dream",
  "Sofie",
  "Soggy Pants",
  "Soledad",
  "Soliman",
  "Solitaire",
  "Someday Maybe",
  "Something Else",
  "Something's Below",
  "Somewhere In Time",
  "Son Of A Saylor",
  "Sonata Fast",
  "Sopatelas",
  "Sotally Tober",
  "South South South",
  "Southern Girl",
  "Spayedfor",
  "Special Delivery",
  "Special Time",
  "Speck Tackler",
  "Sperm Potato",
  "Spirit Channeler",
  "Spook 'n Group",
  "Squall Washer",
  "Squeegee Spree",
  "Squid Pro Quo",
  "Squish",
  "St. Tropez",
  "Star Bored",
  "Star Island",
  "Star Sixty Nine",
  "Stardust",
  "State Of Fish Oil",
  "Stella Starboard",
  "Stevie Nico",
  "Still Think'n",
  "Stocks & Blondes",
  "Stomp Fish",
  "Stomping Fish",
  "Storm Front",
  "Stormandy",
  "Storyeller",
  "Street Mgmt",
  "Stress Killer",
  "Strike 3",
  "Stupid Pleasure",
  "Sturgeon General",
  "Sturgeon General",
  "Suavecito",
  "Sub-lime",
  "Subtle Stubble",
  "Sue Said Yes",
  "Sufi's Choice",
  "Sugar Doggy",
  "Suit-Up",
  "Sultan",
  "Sum Bum",
  "Summer Maker",
  "Summer Maker",
  "Summer Sled",
  "Sun And Sea",
  "Sun-Day Driver",
  "Sunbright Sparrow",
  "Sunclipse",
  "Sunrise To Sunset",
  "Sunset At The Sea",
  "Sunuva Beach",
  "Super Ciao",
  "Superstar Shippers",
  "Surface Intervall",
  "Surprise",
  "Sushi Bar",
  "Sushi Blue",
  "Sushi Logic",
  "Sweet Chariot",
  "Sweet Honey",
  "Sweet N Sour",
  "Swimming Boy",
  "Swimming Girl",
  "Sycophant 7",
  "Symphony",
  "Syndromo",
  "Tab Bandit",
  "Tahoe A Go Go",
  "Tail Of The Snail",
  "Tamerlan",
  "Tanker Sore",
  "Tarot",
  "Tarzana Sunrise",
  "Teacher's Pet",
  "Teak For Two",
  "Tee Time",
  "Teen Impact",
  "Tellurider",
  "Temptatious",
  "Tequesta",
  "Tequila Mockingbird",
  "Terrific Lady",
  "Testimoney",
  "Testosterone",
  "Thar She Floats",
  "That's Enoff",
  "That's My Girl",
  "That's My Way",
  "The 8th Marvel",
  "The Big Train",
  "The Bostonian",
  "The Crown Jewel",
  "The Dog House",
  "The Dog House",
  "The Floridian",
  "The Gas Haug",
  "The Good Life",
  "The Good Ship Tollypop",
  "The Grateful Dad",
  "The Great Divide",
  "The Hawk",
  "The Honeymoon",
  "The Hunger",
  "The Intouchable",
  "The Joy Of Fishing",
  "The Joy Of The Sea",
  "The Last Savage",
  "The Last Straw",
  "The Last Straw",
  "The Lunchroom",
  "The Mayor's Reel Office",
  "The Newyorker",
  "The Next One",
  "The Noise",
  "The Nude One",
  "The Old Way",
  "The Only Child",
  "The Other Woman",
  "The Other Woman",
  "The Poop Nymph",
  "The Relationshipping Department",
  "The Rod Father",
  "The Sacrificial Clam",
  "The Seaward",
  "The Ticket",
  "The Two Ways",
  "The Wavey Line",
  "The Wet Spot",
  "The Wife's Car",
  "The Winer",
  "Thinder Lizard",
  "Think Snow",
  "Thirsty Camel",
  "This Man's Island",
  "Thisisit",
  "Thong Thong Blue",
  "Those Where The Days",
  "Three - Two - One",
  "Three Buoys And A Lady",
  "Three Girls",
  "Thunder This",
  "Thunder Under",
  "ThunderSea",
  "Thundertoe",
  "Tide The Knot",
  "Tie Tonic",
  "Tiffany",
  "Tight Game",
  "Time IV Family",
  "Tipically American",
  "Titan's Clash",
  "Titanic Too",
  "Todd's Beryl Of Fun",
  "Toe Taggin'",
  "Toll Trona",
  "Tongolongo",
  "Tool'n Around",
  "Tool'n Around2",
  "Toolin' And Refueling",
  "Toot Boot",
  "Tooth Fury",
  "Top Secret",
  "Torpor Speedo",
  "Torquemada",
  "Totally Hitched",
  "Touch Zone",
  "Tous Les Jours",
  "Toyaholic",
  "Trauma Queen",
  "Treasure",
  "Tredding Water",
  "Trickster",
  "Troll Tones",
  "Troll Your Own",
  "Trouble",
  "Truly Blessed",
  "Tsunami Tsandwich",
  "Tuesday Welder",
  "Tumba La Tanga",
  "Tunapocalypse",
  "Turbine Queen",
  "Turning Point",
  "Tweezy",
  "Twilight Zone",
  "Twin Screws",
  "Two Yoots",
  "Two For The Tango",
  "U Go Girl",
  "UC Piquant",
  "Unacho",
  "Uncle Barney",
  "Uncle Bulgaria",
  "Uncle Thunder",
  "Unconscious Lady",
  "Uncorped",
  "Under Thunder",
  "United Love",
  "Urban Sturgeon",
  "Utara",
  "Valeria",
  "Valium",
  "Vallenato",
  "Vaya Con Dios",
  "Velvedere",
  "Ven A Gozar",
  "Verboten",
  "Veronica",
  "Veronique",
  "Viagabond",
  "Viaqua",
  "Victoria's Secret",
  "Vino-barbitol",
  "Vintage",
  "Vintage Man",
  "Vintage Man",
  "Vintage Taste",
  "Virginia Sweet",
  "Virile Feral",
  "Vitamin Sea",
  "Vive La France",
  "Vodka",
  "Volax",
  "Volga Rarity",
  "Voodoo Vat",
  "Vvirile",
  "WHY-KNOT",
  "Wake My Day",
  "Wake Watchers",
  "Waken It Easy",
  "Wana-wana Pu",
  "Wannabee",
  "Warrier",
  "Wasn't Easy",
  "Water Back",
  "Water Logged",
  "Water Monk",
  "Water Rabbit",
  "Water Works",
  "Watergates",
  "Watersprout",
  "Wave Hog",
  "Wavy Gravy",
  "Way MoDock",
  "Wayne's World",
  "We Be Fishin",
  "Weak Moment",
  "Wee Gone",
  "Weedamow",
  "Weekend Waterbed",
  "Wespentit",
  "Wet Dream",
  "Wet Dreams",
  "Wet Ev Oar",
  "Wet Paint",
  "Wet-Ever",
  "Wetted Bliss",
  "Whale Jelly",
  "What Wake",
  "What's Up Dock",
  "Whispering Columbus",
  "White Light",
  "White Noise",
  "White Squeed",
  "White Squid",
  "Whoo-Ahh",
  "Whosurdaddy",
  "Whosyourdaddy",
  "Why Knot",
  "Wichy Woman",
  "Wicket Wet Too",
  "Wide Open",
  "Widow's Love",
  "Wife Support",
  "Wig It",
  "Wild Blue Yonder",
  "Willy Wicket",
  "Windy",
  "Wine Down",
  "Wine-N-Down",
  "Winemonger",
  "Winning Ticket",
  "Winter Dream",
  "Winter's Plum",
  "Wire We Here",
  "Wise Boy",
  "Witchy Woman",
  "Without A Purpose",
  "Woke Up Late",
  "Woman's Into Fishin'",
  "Women's Affair",
  "Wonder Boat",
  "Wordlobster",
  "Wordmonger",
  "Worth The Wake",
  "Wrath's Path",
  "Wuzaporsh",
  "X-Hail",
  "Xylar",
  "Y Knot",
  "Yangtze Doodle",
  "Ye-Ye-Ye",
  "Yeasty Pete",
  "Yellow Fish",
  "Yellow Flower",
  "Yellow Rose",
  "Yield Of Dreams",
  "Your Ad Here",
  "Your Place Oar Mine",
  "Yucatango",
  "Yuppie Slum",
  "Zero Cavity Say…ahh",
  "Zero Hour",
  "Ziggles",
  "Zilch",
  "Zilencio",
  "Zilla",
  "Zilla Drop",
  "Zillaberry",
  "Zillatide",
  "Zip - Zap",
  "Zolavo",
  "Zuniper",
  "Zutro's",
  "EBait",
  "Got Debt",
  "Not Me 'til Monday",
  "Off The Hook",
]

const getShipName = () => names[Math.floor(Math.random() * names.length)]

export default getShipName
