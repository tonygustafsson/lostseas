export type WeatherType = "rainy" | "partlySunny" | "cloudy" | "sunny"

// Weather follows the game day, so everyone sees the same sky on the same day
export const getWeatherType = (day: number): WeatherType => {
  if (day % 5 === 2) return "rainy"
  if (day % 4 === 0 || day % 3 === 0) return "partlySunny"
  if (day % 3 === 1) return "cloudy"
  return "sunny"
}
