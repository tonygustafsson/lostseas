export const START_DATE = new Date(1640, 0, 1)

export const getCurrentDate = (day: Character["day"]) => {
  const elapsedDays = Math.max(0, day - 1)
  const currentDate = new Date(START_DATE)
  currentDate.setDate(currentDate.getDate() + elapsedDays)

  return currentDate.toDateString()
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

export const toDateTime = (date: Date) => {
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US"

  const dateTime = new Date(date).toLocaleString(locale, {
    dateStyle: "short",
    timeStyle: "short",
  })

  return dateTime
}
