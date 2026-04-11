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
