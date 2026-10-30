// TODO: Use Crypto.randomInt instead
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const pickRandom = <T>(list: T[]) =>
  list[getRandomInt(0, list.length - 1)]
