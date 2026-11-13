// How often each weather turns up in percent, rolled once for every day at sea
const WEATHER_CHANCES: [WeatherType, number][] = [
  ["sunny", 30],
  ["partlySunny", 20],
  ["rainy", 20],
  ["cloudy", 20],
  ["foggy", 10],
]

export const getRandomWeather = (
  random: () => number = Math.random
): WeatherType => {
  const roll = random() * 100
  let total = 0

  for (const [weather, chance] of WEATHER_CHANCES) {
    total += chance

    if (roll < total) {
      return weather
    }
  }

  return "sunny"
}

// Checked every day at sea, so the sky usually holds for a few days
const WEATHER_CHANGE_CHANCE = 0.5

/** Tomorrow's weather at sea. It may also roll the same weather again. */
export const getNextWeather = (
  current: WeatherType,
  random: () => number = Math.random
): WeatherType =>
  random() < WEATHER_CHANGE_CHANCE ? getRandomWeather(random) : current

export const WEATHER_NAMES: Record<WeatherType, string> = {
  sunny: "Sunny",
  partlySunny: "Partly sunny",
  cloudy: "Cloudy",
  rainy: "Rainy",
  foggy: "Foggy",
}
