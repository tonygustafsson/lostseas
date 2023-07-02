export const START_DATE = new Date(1721, 0, 1)

export const getCurrentDate = (day: Character["day"]) => {
  const startTime = START_DATE.getTime()
  const currentTime = startTime + day * 24 * 60 * 60 * 1000

  return new Date(currentTime).toDateString()
}
