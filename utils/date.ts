export const START_DATE = new Date(1721, 0, 1)

export const getCurrentDate = (day: Character["day"]) => {
  const startTime = START_DATE.getTime()
  const currentTime = startTime + day * 24 * 60 * 60 * 1000

  return new Date(currentTime).toDateString()
}

export const convertDaysToTimeSpan = (numberOfDays: number) => {
  const years = Math.floor(numberOfDays / 365)
  const months = Math.floor((numberOfDays % 365) / 30)
  const days = Math.floor((numberOfDays % 365) % 30)

  if (years) {
    return `${years} years, ${months} months, ${days} days`
  }

  if (months) {
    return `${months} months, ${days} days`
  }

  return `${days} days`
}
