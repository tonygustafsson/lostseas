type WeatherType = "rainy" | "partlySunny" | "cloudy" | "sunny"

function getWeatherType(day: number): WeatherType {
  if (day % 5 === 2) return "rainy"
  if (day % 4 === 0 || day % 3 === 0) return "partlySunny"
  if (day % 3 === 1) return "cloudy"
  return "sunny"
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const harborArrivedQuips = [
  "Heads up!",
  "Squawk! A word before ye wander off, Cap'n!",
  "Lend me yer ear a moment, Cap'n!",
  "Arrr, a quick word while we're still docked!",
  "Before ye head into town — listen up, Cap'n!",
  "Psst! Got somethin' on me mind, Cap'n!",
  "Squawk! Don't walk off just yet — I've got somethin' to say!",
  "A moment of yer time, Cap'n, if ye please!",
  "Hold on a tick, Cap'n — I've been meanin' to mention this!",
  "Arrr, while I've got yer attention, Cap'n!",
  "Squawk! There be a thing or two worth knowin', Cap'n!",
  "Pay heed, Cap'n — yer trusted parrot has some thoughts!",
  "Before ye go explorin', Cap'n — a word!",
  "I'd be remiss not to mention this, Cap'n. Squawk!",
  "Now that we've made port — a few things worth hearin', Cap'n!",
  "Arrr, listen well, Cap'n — yer feathered advisor speaks!",
  "Squawk! Don't mind me, just an important thing or two!",
  "While the ship be restin', so should yer ears — on me! Squawk!",
  "Cap'n! Cap'n! Over here — got somethin' worth yer attention!",
  "Now that the anchor's dropped, let me bend yer ear a moment!",
  "Arrr, just a friendly reminder or two from yer loyal parrot!",
]

const harborBlockedQuips = [
  "Not so fast!",
  "Squawk! Hold yer anchor, Cap'n — we ain't ready to sail!",
  "Belay that, Cap'n! We can't leave just yet!",
  "Whoa there, Cap'n! The sea ain't ready for us!",
  "Arrr, stand fast! There be things to sort before we set sail!",
  "Easy now, Cap'n — we ain't fit to leave port yet!",
  "Squawk! Stop right there! We've got problems to fix first!",
  "Hold fast, Cap'n! We'd not last a day out there like this!",
  "Arrr, I wouldn't advise leavin' just yet, Cap'n!",
  "Squawk! The sea'll swallow us whole if we leave now!",
  "Wait a moment, Cap'n — we've got some unfinished business here!",
  "Not yet, Cap'n! Sort this out before we dare leave the harbor!",
  "Shiver me timbers, we can't set sail like this, Cap'n!",
  "Squawk! Ye'd best sort this out before even thinkin' of leavin'!",
  "Arrr, pump the brakes, Cap'n — we're not ready for the open sea!",
  "We'd be fish food before sunset if we left now! Squawk!",
  "Hold yer horses, Cap'n! The open sea demands more of us!",
  "Squawk! I refuse to fly above a ship that ain't ready to sail!",
  "Steady on, Cap'n — we've got matters to attend to first!",
  "Arrr, the sea'll still be there once we've sorted ourselves out!",
  "Squawk! Even the bravest captain knows when not to sail!",
]

const weatherQuips: Record<WeatherType, string[]> = {
  sunny: [
    "Squawk! Clear skies today, Cap'n! The sun be blazin' brighter than stolen doubloons!",
    "Arrr, the sun be shinin' like Spanish gold, Cap'n! A fine day for plunderin'!",
    "Squawk! Not a cloud in sight! Perfect for spottin' enemy sails on the horizon!",
  ],
  rainy: [
    "Shiver me timbers, Cap'n! The heavens be pourin' like a leaky hull out there!",
    "Squawk! Wet feathers! The skies be weepin' harder than a sailor who lost his rum ration!",
    "Arrr, it be rainin' cats and bilge rats outside, Cap'n! Even the fish be seekin' shelter!",
  ],
  cloudy: [
    "Squawk! The skies be grey as Davy Jones' beard today, Cap'n!",
    "Arrr, gloomy clouds above — thick as the skull of a stubborn Spaniard! Squawk!",
    "Can't see the stars to navigate today, Cap'n! Good thing we be stayin' in port! Squawk!",
  ],
  partlySunny: [
    "Squawk! Sun and clouds battlin' it out up there — just like us against the Spanish fleet!",
    "Partly sunny, partly not, Cap'n! Even the sky can't make up its mind today! Arrr!",
    "Half sun, half clouds — like a treasure map with half the markings washed away! Squawk!",
  ],
}

const highMoodQuips = [
  "Squawk! The crew be singin' sea shanties below deck, Cap'n! Fine spirits all around!",
  "Arrr, the crew be as happy as clams at high tide! They'd sail anywhere for ye today!",
  "The crew's mood be sky-high, Cap'n! They'd follow ye to Davy Jones and back! Squawk!",
]

const lowMoodQuips = [
  "Squawk! Heard some grumblin' from the crew below deck, Cap'n... might be time for some rum!",
  "Arrr, the crew be restless as a caged bilge rat. A bit o' gold might calm 'em down! Squawk!",
  "The crew's lookin' glum, Cap'n. A trip to the tavern might do 'em a world of good! Squawk!",
]

const lowHealthQuips = [
  "Half the crew be green in the gills, Cap'n! Squawk! They be needin' medicine, and quick!",
  "Arrr, me feathers bristle seein' the crew this ill, Cap'n! Get 'em medicine before it's too late!",
  "Squawk! The crew be coughin' and sneezin'! Sicker than a landlubber in a storm, they are!",
]

const bigCrewQuips = [
  "Arrr, ye've got quite the fleet of sea dogs, Cap'n! The ship be buzzin' like a busy port! Squawk!",
  "Squawk! What a crew! More pirates than I've seen since the sacking of Cartagena!",
]

const smallCrewQuips = [
  "Squawk! Just the few of us, Cap'n, but we be fierce as any armada!",
  "Arrr, small crew but loyal to the last! A tight ship be a fast ship! Squawk!",
]

const generalQuips = [
  "Squawk! Pieces of eight! Pieces of eight! ...Sorry, Cap'n. Old habits!",
  "Arrr, the horizon be callin', Cap'n! Treasure awaits those bold enough to seek it! Squawk!",
  "I once flew over a merchant ship loaded to the gunnels with silk and spices. Should've told ye sooner! Squawk!",
  "Squawk! Did ye know the best treasure ain't gold, Cap'n? It be the enemies we plundered along the way! Heh!",
  "Arrr, they say Tortuga's tavern has the finest rum this side of the Atlantic! Not that I'd know... Squawk!",
  "Squawk! A good pirate keeps one eye on the horizon and one on the crew. Good thing I've got two eyes! Heh!",
  "Fair winds and followin' seas, Cap'n! May yer cannons be true and yer rum never run dry! Squawk!",
  "The sea don't care about yer plans, Cap'n — she makes her own! Best be ready for anything! Squawk!",
  "Arrr, fortune favours the bold and the well-armed, Cap'n! Remember that! Squawk!",
]

const attackSuccessQuips = [
  "Success, Captain!",
  "Squawk! We did it, Cap'n! Victory is ours!",
  "Arrr, they never stood a chance against us! Squawk!",
  "Haha! That'll teach 'em to sail these waters! Squawk!",
  "Squawk! A fine bit of plunderin', Cap'n!",
  "Arrr, the sea favours the bold — and that's us! Squawk!",
  "Squawk! We sent 'em runnin' with their tails between their legs!",
  "Victory! The crew fought like lions, Cap'n! Squawk!",
  "Squawk! Another fine prize for our hold, Cap'n!",
  "Arrr, that's what we do, Cap'n — and we do it well! Squawk!",
  "Squawk! The enemy's loss is our treasure, Cap'n!",
  "Ha! They should've thought twice before crossin' us! Squawk!",
  "Squawk! Our cannons spoke, and the enemy listened!",
  "Arrr, the plunder's ours and the sea is quiet again! Squawk!",
  "Squawk! A glorious battle, Cap'n — the bards will sing of this!",
  "We showed 'em what pirates are made of, Cap'n! Squawk!",
  "Squawk! Fortune smiled upon us today, Cap'n!",
  "Arrr, swift and merciless — that's the pirate way! Squawk!",
  "Squawk! Another ship bested, another legend grows!",
  "The crew fought bravely and the spoils are ours, Cap'n! Squawk!",
  "Arrr, well fought, Cap'n! The seas tremble at our name! Squawk!",
]

const attackFailureQuips = [
  "Yarr, we failed!",
  "Squawk! They got the better of us this time, Cap'n...",
  "Arrr, the battle didn't go our way. Squawk!",
  "Squawk! We bit off more than we could chew, Cap'n!",
  "A hard loss, Cap'n. The sea gives and the sea takes. Squawk!",
  "Squawk! They were tougher than they looked, Cap'n!",
  "Arrr, we fought well, but it wasn't enough. Squawk!",
  "Squawk! Even the bravest crew loses one now and again, Cap'n!",
  "We'll get 'em next time, Cap'n. Squawk! This ain't over!",
  "Arrr, lick yer wounds and live to fight another day! Squawk!",
  "Squawk! The enemy had the wind at their backs today, Cap'n!",
  "A setback, nothin' more. We'll rebuild and strike again! Squawk!",
  "Squawk! The sea humbles even the mightiest pirates, Cap'n!",
  "Arrr, they had more fight in 'em than expected. Squawk!",
  "Squawk! Fortune wasn't with us today, Cap'n. Happens to all pirates!",
  "We gave 'em a good scare at least, Cap'n! Squawk!",
  "Squawk! Retreat now, plunder later — that's the smart pirate way!",
  "Arrr, a painful lesson, but a lesson nonetheless. Squawk!",
  "Squawk! Even Blackbeard lost a battle or two, Cap'n!",
  "They bested us today, Cap'n. But our day will come! Squawk!",
  "Arrr, no shame in it — we'll be back stronger than ever! Squawk!",
]

export function getAttackSuccessQuip() {
  return pickRandom(attackSuccessQuips)
}

export function getAttackFailureQuip() {
  return pickRandom(attackFailureQuips)
}

export function getHarborArrivedQuip() {
  return pickRandom(harborArrivedQuips)
}

export function getHarborBlockedQuip() {
  return pickRandom(harborBlockedQuips)
}

export function getPirateQuip(
  crew: Player["crewMembers"] | undefined,
  day: Character["day"] = 0
) {
  if (!day || !crew) return pickRandom(generalQuips)

  const weather = getWeatherType(day)
  const crewCount = crew?.count ?? 0
  const crewMood = crew?.mood ?? 100
  const crewHealth = crew?.health ?? 100

  const pool: string[] = []

  // Weather is always relevant
  pool.push(...weatherQuips[weather])

  // Crew-based commentary when there's a crew
  if (crewCount > 0) {
    if (crewHealth < 40) {
      pool.push(...lowHealthQuips)
    }
    if (crewMood < 40) {
      pool.push(...lowMoodQuips)
    } else if (crewMood > 70) {
      pool.push(...highMoodQuips)
    }
    if (crewCount >= 30) {
      pool.push(...bigCrewQuips)
    } else if (crewCount <= 3) {
      pool.push(...smallCrewQuips)
    }
  }

  // General pirate flavor always in the mix
  pool.push(...generalQuips)

  return pickRandom(pool)
}
