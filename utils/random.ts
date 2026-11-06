// TODO: Use Crypto.randomInt instead
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/** Pass a seeded randomInt to make the pick replayable */
export const pickRandom = <T>(
  list: readonly T[],
  randomInt: (min: number, max: number) => number = getRandomInt
) => list[randomInt(0, list.length - 1)]
