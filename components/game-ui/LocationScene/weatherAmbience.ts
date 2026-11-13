// How the weather looks in the scenes and on the sea map. Every value runs from
// 0 to 1: cloud cover and how grey the clouds are, how hard it rains, how thick
// the fog is, how many seagulls brave it, whether the sun shines in
// and how gloomy it is indoors.
const WEATHER_AMBIENCE: Record<
  WeatherType,
  {
    u_cloudCover: number
    u_cloudShade: number
    u_rain: number
    u_fog: number
    u_gulls: number
    u_sun: number
    u_gloom: number
  }
> = {
  sunny: {
    u_cloudCover: 0.1,
    u_cloudShade: 0,
    u_rain: 0,
    u_fog: 0,
    u_gulls: 1,
    u_sun: 1,
    u_gloom: 0,
  },
  partlySunny: {
    u_cloudCover: 0.375,
    u_cloudShade: 0,
    u_rain: 0,
    u_fog: 0,
    u_gulls: 1,
    u_sun: 1,
    u_gloom: 0,
  },
  cloudy: {
    u_cloudCover: 0.75,
    u_cloudShade: 0.4,
    u_rain: 0,
    u_fog: 0,
    u_gulls: 1,
    u_sun: 0,
    u_gloom: 0.2,
  },
  rainy: {
    u_cloudCover: 1,
    u_cloudShade: 0.85,
    u_rain: 1,
    u_fog: 0.25,
    u_gulls: 0,
    u_sun: 0,
    u_gloom: 0.4,
  },
  foggy: {
    u_cloudCover: 0.5,
    u_cloudShade: 0.3,
    u_rain: 0,
    u_fog: 1,
    u_gulls: 0.3,
    u_sun: 0,
    u_gloom: 0.1,
  },
}

// Undefined while the weather isn't known yet
export const getWeatherAmbience = (weather: WeatherType | undefined) =>
  weather && WEATHER_AMBIENCE[weather]
