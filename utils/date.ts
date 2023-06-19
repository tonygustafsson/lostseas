export const START_DATE = new Date(1721, 0, 1)

export const getCurrentDate = (week: Character["week"]) => {
  const startTime = START_DATE.getTime()
  const currentTime = startTime + week * 7 * 24 * 60 * 60 * 1000

  return new Date(currentTime).toDateString()
}
