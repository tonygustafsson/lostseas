// How the weather looks in the scenes and on the sea map. Every value runs from
// 0 to 1: cloud cover and how grey the clouds are, how hard it rains, how thick
// the fog is, how many seagulls brave it, whether the sun shines in,
// how gloomy it is indoors and how hard the wind makes flags wave.
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
    u_wind: number
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
    u_wind: 1.5,
  },
  partlySunny: {
    u_cloudCover: 0.375,
    u_cloudShade: 0,
    u_rain: 0,
    u_fog: 0,
    u_gulls: 1,
    u_sun: 1,
    u_gloom: 0,
    u_wind: 1.5,
  },
  cloudy: {
    u_cloudCover: 0.75,
    u_cloudShade: 0.4,
    u_rain: 0,
    u_fog: 0,
    u_gulls: 1,
    u_sun: 0,
    u_gloom: 0.2,
    u_wind: 1.75,
  },
  rainy: {
    u_cloudCover: 1,
    u_cloudShade: 0.85,
    u_rain: 1,
    u_fog: 0.25,
    u_gulls: 0,
    u_sun: 0,
    u_gloom: 0.4,
    u_wind: 2.75,
  },
  foggy: {
    u_cloudCover: 0.5,
    u_cloudShade: 0.3,
    u_rain: 0,
    u_fog: 1,
    u_gulls: 0.3,
    u_sun: 0,
    u_gloom: 0.1,
    u_wind: 0.375,
  },
}

// Undefined while the weather isn't known yet
export const getWeatherAmbience = (weather: WeatherType | undefined) =>
  weather && WEATHER_AMBIENCE[weather]
