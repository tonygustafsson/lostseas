export type CharacterGender = "Male" | "Female"

export interface Character {
  id: string
  name: string
  age: number
  gender: CharacterGender
  nationality: Nation
  description: string
  image: string
}

export const CHARACTERS: Character[] = [
  {
    id: "mateo-salazar",
    name: "Mateo Salazar",
    age: 22,
    gender: "Male",
    nationality: "Holland",
    description:
      "Wavy brown hair spills from under a red bandana, and a wide grin shows he has never met a harbour he did not like. Raised among the forts of the coast, he still believes his fortune waits in the next port.",
    image: "/img/characters/mateo-salazar.png",
  },
  {
    id: "silas-harrow",
    name: "Silas Harrow",
    age: 64,
    gender: "Male",
    nationality: "England",
    description:
      "A navy cap with a gold anchor sits above white hair and a full white beard, with a red neckerchief knotted at his throat. He has run a tavern for thirty years, and his sly half smile says he has heard every sailor's tale twice.",
    image: "/img/characters/silas-harrow.png",
  },
  {
    id: "kofi-bellamy",
    name: "Kofi Bellamy",
    age: 29,
    gender: "Male",
    nationality: "France",
    description:
      "Dark locs spill from a grey headband, and a thin scar cuts through one brow above a full beard. He served on the fort's guns before signing on with a merchant crew, and he still checks every cannon at dawn.",
    image: "/img/characters/kofi-bellamy.png",
  },
  {
    id: "ambrose-quill",
    name: "Ambrose Quill",
    age: 68,
    gender: "Male",
    nationality: "France",
    description:
      "Grey hair curls from under a battered tricorn, and round spectacles sit on a face weathered by sea. Once a harbour clerk, he trusts ink more than cannon, and that knowing smile hints at more talking than fighting.",
    image: "/img/characters/ambrose-quill.png",
  },
  {
    id: "tobias-brandt",
    name: "Tobias Brandt",
    age: 40,
    gender: "Male",
    nationality: "England",
    description:
      "Thick brown hair and a full beard frame a broad grin, and leather overalls hang over his chest with a hammer tucked in the strap. He learned to shape timber in his father's shipyard, and he trusts a sound hull more than any chart.",
    image: "/img/characters/tobias-brandt.png",
  },
  {
    id: "garrett-stone",
    name: "Garrett Stone",
    age: 50,
    gender: "Male",
    nationality: "Spain",
    description:
      "Bald and broad, with a short grey-streaked beard and a red neckerchief, he steadies the wheel as a storm rolls in. A fisherman's son before he ever held a helm, he stays calm in a gale and never trusts luck to navigate.",
    image: "/img/characters/garrett-stone.png",
  },
  {
    id: "felix-ashby",
    name: "Felix Ashby",
    age: 21,
    gender: "Male",
    nationality: "England",
    description:
      "Blond curls spill under a green headband as he reads the notices pinned to the harbour wall. Always first to volunteer for an errand and last to leave the quay, he dreams of signing on a ship bound for bigger seas.",
    image: "/img/characters/felix-ashby.png",
  },
  {
    id: "barnaby-pott",
    name: "Barnaby Pott",
    age: 60,
    gender: "Male",
    nationality: "Holland",
    description:
      "Bald and rosy-cheeked, with a broad white moustache and a blue neckerchief, he tends the galley as copper pots bubble and bread cools. He cooked for a merchant fleet for years, and he hums while he works.",
    image: "/img/characters/barnaby-pott.png",
  },
  {
    id: "rory-kincaid",
    name: "Rory Kincaid",
    age: 33,
    gender: "Male",
    nationality: "France",
    description:
      "Wild red-brown hair and a full beard frame a lopsided grin, with a yellow neckerchief at his throat. He works the nets on rain-soaked jetties before dawn, and he will share his last fish with anyone having a worse day.",
    image: "/img/characters/rory-kincaid.png",
  },
  {
    id: "joaquin-reyes",
    name: "Joaquin Reyes",
    age: 23,
    gender: "Male",
    nationality: "Holland",
    description:
      "Dark curls fall over a gold hoop earring, and a blue neckerchief hangs open at his chest. He is the life of every harbour festival, dancing under bunting and lantern light, and he has talked his way into more dances than fights.",
    image: "/img/characters/joaquin-reyes.png",
  },
  {
    id: "jonas-finch",
    name: "Jonas Finch",
    age: 19,
    gender: "Male",
    nationality: "England",
    description:
      "Sun-streaked hair tumbles over a green neckerchief, and his grin never quite leaves his face. He spends sunny mornings on the dock counting ships in and waving at the gulls. Easygoing and generous, he rarely loses his temper.",
    image: "/img/characters/jonas-finch.png",
  },
  {
    id: "lucian-vane",
    name: "Lucian Vane",
    age: 38,
    gender: "Male",
    nationality: "France",
    description:
      "Dark wavy hair and a close-trimmed beard frame a faint smile, with a compass pendant resting above his navy neckerchief. He studies charts late into the night beside a brass sextant. Reserved and precise, he trusts the stars more than people.",
    image: "/img/characters/lucian-vane.png",
  },
  {
    id: "ezekiel-thorne",
    name: "Ezekiel Thorne",
    age: 45,
    gender: "Male",
    nationality: "Holland",
    description:
      "A bald head with a scar across the brow, and a grey-black beard, frame a wide and knowing grin. A red neckerchief marks him as a veteran of many storms. He has survived shipwreck and mutiny, and now he laughs at danger in a way that makes younger crew nervous.",
    image: "/img/characters/ezekiel-thorne.png",
  },
  {
    id: "humphrey-dowd",
    name: "Humphrey Dowd",
    age: 66,
    gender: "Male",
    nationality: "England",
    description:
      "White hair curls below a navy cap, and a navy coat with gold trim is buttoned over a brown waistcoat. He keeps the harbour ledgers in an office overlooking the bay, with a quill always at hand. Shrewd and smug in equal measure, he knows what every ship carries.",
    image: "/img/characters/humphrey-dowd.png",
  },
  {
    id: "cormac-doyle",
    name: "Cormac Doyle",
    age: 24,
    gender: "Male",
    nationality: "Holland",
    description:
      "Ginger hair falls loosely over a blue neckerchief, and a small gold hoop catches the lantern light. He grins at every festival and rarely misses a dance on the quay. Quick to laugh and slow to hold a grudge, he is the friend every crew wants ashore.",
    image: "/img/characters/cormac-doyle.png",
  },
  {
    id: "ignatius-crane",
    name: "Ignatius Crane",
    age: 58,
    gender: "Male",
    nationality: "Spain",
    description:
      "Grey stubble and a red bandana mark him as a rigger who has worked the lofts for decades. He can tie any knot blindfolded, and he will show you how if you ask nicely. Gruff on the outside, he keeps a soft spot for apprentices.",
    image: "/img/characters/ignatius-crane.png",
  },
  {
    id: "pip-larkin",
    name: "Pip Larkin",
    age: 16,
    gender: "Male",
    nationality: "France",
    description:
      "Messy brown hair and a patched shirt make him look younger than sixteen, and a green scarf is knotted at his neck. A sly grin shows he is up to something on the rain-soaked dock. Quick and fearless, he runs errands for half the harbour.",
    image: "/img/characters/pip-larkin.png",
  },
  {
    id: "rafael-navarro",
    name: "Rafael Navarro",
    age: 31,
    gender: "Male",
    nationality: "Spain",
    description:
      "A black bandana and a scar across his brow give him a dangerous look, but his crooked smile softens it. He stands guard by the fort cannons and knows every gun by name. Disciplined and proud, he takes his orders seriously, mostly.",
    image: "/img/characters/rafael-navarro.png",
  },
  {
    id: "tristan-hale",
    name: "Tristan Hale",
    age: 27,
    gender: "Male",
    nationality: "Spain",
    description:
      "Auburn hair falls over light stubble, and a blue scarf hangs loose at his neck. He leans on the harbour rail at night, watching ships come in under lantern light. Charming and restless, he is never short of a story, though he is vague about where he has been.",
    image: "/img/characters/tristan-hale.png",
  },
  {
    id: "obadiah-greene",
    name: "Obadiah Greene",
    age: 65,
    gender: "Male",
    nationality: "Spain",
    description:
      "White curls spill from under a green headband, and a long white beard rests on his chest. He keeps a tiny apothecary full of herbs, tinctures and glass bottles. Patient and kind, he treats the sick without asking for payment, though he never reveals his recipes.",
    image: "/img/characters/obadiah-greene.png",
  },
  {
    id: "isabela-cortez",
    name: "Isabela Cortez",
    age: 30,
    gender: "Female",
    nationality: "England",
    description:
      "Dark curls tumble from under a red bandana, and gold hoops catch the light of the sunset. She commands from the quarterdeck with a knowing smile, and her crew would follow her into any storm. Once a merchant's daughter, she reads the sea as quickly as a ledger.",
    image: "/img/characters/isabela-cortez.png",
  },
  {
    id: "marisol-vega",
    name: "Marisol Vega",
    age: 20,
    gender: "Female",
    nationality: "France",
    description:
      "A red headscarf holds back dark curls, and a wide smile lights up the fruit market. She haggles with every trader and usually wins. Warm and quick-witted, she sells more oranges than anyone in town and never forgets a face.",
    image: "/img/characters/marisol-vega.png",
  },
  {
    id: "dorothea-wren",
    name: "Dorothea Wren",
    age: 42,
    gender: "Female",
    nationality: "Holland",
    description:
      "Grey streaks run through dark hair tied up with a red ribbon, and a row of herbs hangs behind her. She runs the ship's sickbay with calm hands and a quiet voice. Patient and practical, she has seen more fevers than fights.",
    image: "/img/characters/dorothea-wren.png",
  },
  {
    id: "anne-calloway",
    name: "Anne Calloway",
    age: 35,
    gender: "Female",
    nationality: "England",
    description:
      "A red bandana and a gold medallion catch the light as she bends over her charts. A sextant and an inkwell sit at her elbow, with a lantern glowing in the window. Sharp-eyed and self-assured, she plots every course herself.",
    image: "/img/characters/anne-calloway.png",
  },
  {
    id: "josefina-rae",
    name: "Josefina Rae",
    age: 26,
    gender: "Female",
    nationality: "France",
    description:
      "A red bandana holds back wild curls, and a grin dares the storm to try. She guards the dock cannons in lightning and rain, and fears nothing that floats. Bold and blunt, she has a temper, but her crew would follow her into any gale.",
    image: "/img/characters/josefina-rae.png",
  },
  {
    id: "calla-brooks",
    name: "Calla Brooks",
    age: 21,
    gender: "Female",
    nationality: "England",
    description:
      "A blue bandana keeps brown curls from her eyes, and freckles dust her cheeks as she grins at the sunset. She spends her evenings on deck watching gulls and distant sails. Cheerful and easygoing, she makes friends faster than most sailors make enemies.",
    image: "/img/characters/calla-brooks.png",
  },
  {
    id: "rosalind-teague",
    name: "Rosalind Teague",
    age: 58,
    gender: "Female",
    nationality: "France",
    description:
      "Grey curls peek from a patterned headscarf as she sorts sacks of spice in a bustling store. She has bargained with captains from three nations and never lost a deal. Warm and wise, she slips sweets to children and keeps the accounts in her head.",
    image: "/img/characters/rosalind-teague.png",
  },
  {
    id: "nadia-blackwood",
    name: "Nadia Blackwood",
    age: 32,
    gender: "Female",
    nationality: "Holland",
    description:
      "Long braids strung with gold beads are tied back under a black headband, and a thin scar cuts across one brow. Cannon smoke does not bother her, and she loads faster than most men can aim. Hard as iron, she is loyal to the crew that earned her trust.",
    image: "/img/characters/nadia-blackwood.png",
  },
  {
    id: "imani-hartley",
    name: "Imani Hartley",
    age: 30,
    gender: "Female",
    nationality: "France",
    description:
      "Dark locs are pinned up with gold beads under a red headband, and a sextant rests near her hand. She charts the stars from a cabin window while the moon rises over the bay. Thoughtful and patient, she would rather find the right course than the quick one.",
    image: "/img/characters/imani-hartley.png",
  },
  {
    id: "margaret-flint",
    name: "Margaret Flint",
    age: 42,
    gender: "Female",
    nationality: "England",
    description:
      "Ginger curls escape a brown headscarf as she works the shipyard in a leather apron. She can frame a hull by eye and mend a keel faster than most men. Practical and steady, she takes pride in boats that never leak.",
    image: "/img/characters/margaret-flint.png",
  },
  {
    id: "hester-quinn",
    name: "Hester Quinn",
    age: 62,
    gender: "Female",
    nationality: "France",
    description:
      "Grey braids strung with gold beads sit beneath a patterned red headscarf, and a black vest is trimmed in gold. She keeps the ship's ledgers in the cargo hold, and no coin goes missing on her watch. Stern and fair, she respects anyone who can count.",
    image: "/img/characters/hester-quinn.png",
  },
  {
    id: "lucia-mendez",
    name: "Lucia Mendez",
    age: 19,
    gender: "Female",
    nationality: "Holland",
    description:
      "Short dark curls peek from a red bandana, and freckles dust her cheeks as she laughs at the market stalls. She runs errands for half the traders in town and remembers every price. Quick-tempered but warm, she is the first to cheer a good sale.",
    image: "/img/characters/lucia-mendez.png",
  },
  {
    id: "philippa-sage",
    name: "Philippa Sage",
    age: 28,
    gender: "Female",
    nationality: "Holland",
    description:
      "A teal headscarf frames brown curls, and a small bottle of tincture sits in her belt. She tends herbs in a cabin hung with bundles of leaves and flowers. Gentle and observant, she notices when someone is unwell before they do.",
    image: "/img/characters/philippa-sage.png",
  },
  {
    id: "winifred-cobb",
    name: "Winifred Cobb",
    age: 36,
    gender: "Female",
    nationality: "Holland",
    description:
      "A mustard-yellow headscarf holds back brown curls, and a blue neckerchief is knotted over her apron. She tends a galley fire under copper pans and fresh loaves. Warm and cheerful, she feeds the crew first and always has a laugh ready.",
    image: "/img/characters/winifred-cobb.png",
  },
  {
    id: "bridget-callahan",
    name: "Bridget Callahan",
    age: 34,
    gender: "Female",
    nationality: "Spain",
    description:
      "Long auburn curls escape a brown headscarf above overalls and a white shirt. She works the timber of a half-built hull with a hammer hooked on her belt. Confident and capable, she out-works most of the yard and says so.",
    image: "/img/characters/bridget-callahan.png",
  },
  {
    id: "tamsin-pryce",
    name: "Tamsin Pryce",
    age: 22,
    gender: "Female",
    nationality: "Spain",
    description:
      "A teal headband holds back curly brown hair, and freckles show when she smiles over the fish stalls. She sells the day's catch as the sun sets over the harbour. Bright-eyed and talkative, she knows every boat by its sound.",
    image: "/img/characters/tamsin-pryce.png",
  },
  {
    id: "cecilia-drake",
    name: "Cecilia Drake",
    age: 34,
    gender: "Female",
    nationality: "Spain",
    description:
      "Curly dark hair is pushed back under a blue headband, and a compass pendant hangs at her throat. She works at a desk strewn with charts and a brass sextant. Thoughtful and sharp-tongued, she can plot a course in her head faster than most can read one.",
    image: "/img/characters/cecilia-drake.png",
  },
  {
    id: "odessa-grant",
    name: "Odessa Grant",
    age: 60,
    gender: "Female",
    nationality: "England",
    description:
      "A red turban and gold hoops frame a sharp, knowing smile. Ledgers and books crowd her shipping office, with the harbour framed in the window behind her. Shrewd and dignified, she has inspected every cargo that leaves the port and rarely misses a discrepancy.",
    image: "/img/characters/odessa-grant.png",
  },
  {
    id: "rosa-alvarez",
    name: "Rosa Alvarez",
    age: 25,
    gender: "Female",
    nationality: "Spain",
    description:
      "Curly brown hair peeks from under a yellow headband, and a blue neckerchief is knotted over a brown apron. She cooks in a kitchen full of copper pots and fresh loaves. Warm and quick to laugh, she claims her bread keeps the crew loyal.",
    image: "/img/characters/rosa-alvarez.png",
  },
  {
    id: "eleanor-fitch",
    name: "Eleanor Fitch",
    age: 24,
    gender: "Female",
    nationality: "Spain",
    description:
      "Auburn curls escape a brown headband as she grins over the timbers of a half-built ship. Freckles and a tool belt show she has spent most of her life on the slipway. Confident and practical, she spots a rotten plank from across the yard.",
    image: "/img/characters/eleanor-fitch.png",
  },
  {
    id: "amara-cole",
    name: "Amara Cole",
    age: 27,
    gender: "Female",
    nationality: "England",
    description:
      "Dark curls are tied back with a green headband, and gold hoops catch the light as she grins at the harbour. A tall ship flies the English flag behind her, with a sunlit town rising beyond the quay. Bold and warm, she keeps her crew laughing through the longest voyages and never leaves a debt unpaid.",
    image: "/img/characters/amara-cole.png",
  },
  {
    id: "cornelis-vos",
    name: "Cornelis Vos",
    age: 52,
    gender: "Male",
    nationality: "Holland",
    description:
      "A bald head gleams above a close grey-flecked beard, and a yellow neckerchief is knotted at his throat. He oversees a ship under construction, with timber scaffolding and shipwrights hammering all around him. Patient and thoughtful, he measures twice, speaks rarely, and expects every plank to earn its place.",
    image: "/img/characters/cornelis-vos.png",
  },
  {
    id: "tomas-ruiz",
    name: "Tomas Ruiz",
    age: 24,
    gender: "Male",
    nationality: "Spain",
    description:
      "Curly dark hair spills from under a straw hat, and a blue neckerchief sits open at his collar as he smiles at the fishing boats. Nets and silver fish hang from the dock behind him. Cheerful and easygoing, he will happily share his catch with anyone who asks.",
    image: "/img/characters/tomas-ruiz.png",
  },
  {
    id: "mathilde-girard",
    name: "Mathilde Girard",
    age: 61,
    gender: "Female",
    nationality: "France",
    description:
      "Dark braids streaked with silver are pinned up with gold beads, and round wire spectacles rest on her nose. A gold medallion hangs at her throat, in a room lined with glass bottles and dried herbs. Wise and watchful, she has tended half the crew and remembers every name.",
    image: "/img/characters/mathilde-girard.png",
  },
  {
    id: "lucia-fuentes",
    name: "Lucía Fuentes",
    age: 29,
    gender: "Female",
    nationality: "Spain",
    description:
      "A red patterned bandana frames wavy brown hair, and gold hoops catch the sunlight as she leans on a market stall. Turquoise beads sit around her neck, with oranges and bolts of cloth behind her. Sharp at bargaining and generous with friends, she could sell salt to a sailor who has just bought a whole cargo.",
    image: "/img/characters/lucia-fuentes.png",
  },
  {
    id: "juliette-moreau",
    name: "Juliette Moreau",
    age: 33,
    gender: "Female",
    nationality: "France",
    description:
      "A black tricorn with gold trim sits over long dark braids, and a gold scarf is knotted at her collar. She wears a navy coat with gold buttons in a cabin lined with maps and brass instruments. Calm and decisive, she has commanded a ship since her first mutiny and has never once lost her temper.",
    image: "/img/characters/juliette-moreau.png",
  },
  {
    id: "samuel-greaves",
    name: "Samuel Greaves",
    age: 63,
    gender: "Male",
    nationality: "England",
    description:
      "White curls frame a weathered face and a neat white beard, and a green scarf is wrapped over a tan travelling coat. Lanterns glow along the quay as a full moon rises over the harbour. A retired shipping agent, he now wanders the docks at night, and he knows the price of everything.",
    image: "/img/characters/samuel-greaves.png",
  },
  {
    id: "femke-de-vries",
    name: "Femke de Vries",
    age: 22,
    gender: "Female",
    nationality: "Holland",
    description:
      "Curly brown hair peeks out under a yellow headband, and her grin lights up as the sun sets over the bay. A tall ship sails in the distance behind her. Lively and curious, she loves the sea, and she will sign on to any ship that promises a new horizon.",
    image: "/img/characters/femke-de-vries.png",
  },
  {
    id: "diego-acosta",
    name: "Diego Acosta",
    age: 36,
    gender: "Male",
    nationality: "Spain",
    description:
      "A close-cropped head and a short dark beard give him a stern look, with a thin scar running down one cheek. He wears a blue neckerchief over a white shirt and a brown leather strap. Standing before a sun-washed fort, he is loyal, disciplined and quick to defend his crew.",
    image: "/img/characters/diego-acosta.png",
  },
  {
    id: "etienne-laurent",
    name: "Étienne Laurent",
    age: 28,
    gender: "Male",
    nationality: "France",
    description:
      "Wavy brown hair falls loosely over a sun-browned face, and a green scarf is knotted at his collar. A canvas satchel of old maps hangs over one shoulder as he gazes at a turquoise cove. Restless and romantic, he has charted more islands than he has bothered to name.",
    image: "/img/characters/etienne-laurent.png",
  },
  {
    id: "ruth-ellery",
    name: "Ruth Ellery",
    age: 31,
    gender: "Female",
    nationality: "England",
    description:
      "Dark curls escape a green headband, and a green neckerchief is knotted at her throat. A compass pendant rests on her waistcoat, with a sextant and charts spread across the desk. Methodical and quietly confident, she trusts her instruments and rarely misjudges the wind.",
    image: "/img/characters/ruth-ellery.png",
  },
  {
    id: "jan-bakker",
    name: "Jan Bakker",
    age: 26,
    gender: "Male",
    nationality: "Holland",
    description:
      "Curly hair sticks out from under a straw hat, and a blue neckerchief is tied beneath a broad, easy smile. Fishing boats bob in the harbour behind him, with a stone town rising beyond. Friendly and hard-working, he sails for love of the sea and is always first to lend a hand.",
    image: "/img/characters/jan-bakker.png",
  },
  {
    id: "ines-carrera",
    name: "Inés Carrera",
    age: 58,
    gender: "Female",
    nationality: "Spain",
    description:
      "A striped turban in red and gold wraps grey-streaked curls, and a red scarf is knotted at her neck. Behind her a stone archway frames a sunlit fort and a waiting galleon. Shrewd and proud, she has run the port's warehouses for decades and knows exactly what every crate is worth.",
    image: "/img/characters/ines-carrera.png",
  },
  {
    id: "celine-berthier",
    name: "Céline Berthier",
    age: 38,
    gender: "Female",
    nationality: "France",
    description:
      "A white headband holds back curly brown hair, and a silver compass medallion hangs over a green waistcoat. She works among hanging herbs, glass jars and a stone mortar in a cabin full of books. Gentle and clever, she mixes remedies for the sick and keeps the crew's secrets.",
    image: "/img/characters/celine-berthier.png",
  },
  {
    id: "gideon-marsh",
    name: "Gideon Marsh",
    age: 46,
    gender: "Male",
    nationality: "England",
    description:
      "Dark hair falls in wet strands past a scarred, weathered face, and a yellow neckerchief is knotted at the throat of his dark coat. Lightning flashes behind him as waves crash over the rail. Stern and steady, he has weathered mutiny and storm, and he trusts his crew more than the sky.",
    image: "/img/characters/gideon-marsh.png",
  },
  {
    id: "noor-visser",
    name: "Noor Visser",
    age: 25,
    gender: "Female",
    nationality: "Holland",
    description:
      "A red bandana patterned with gold frames curly dark hair, and a turquoise necklace sits over a white shirt. Lanterns glow across a bustling night harbour behind her, with a tall ship at the quay. Warm and confident, she is the life of every festival and always knows where the music is playing.",
    image: "/img/characters/noor-visser.png",
  },
]

export const CHARACTER_IDS = CHARACTERS.map((c) => c.id) as [
  string,
  ...string[],
]

export const getCharacterById = (id: string) =>
  CHARACTERS.find((c) => c.id === id)
