import { describe, expect, it } from "vitest"

import {
  convertDaysToTimeSpan,
  getCurrentDate,
  getDateOfDay,
  getLogDate,
  START_DATE,
} from "@/utils/date"

describe("getDateOfDay", () => {
  it("starts on the first of January 1715", () => {
    expect(getDateOfDay(1)).toEqual(START_DATE)
    expect(getLogDate(1)).toBe("1 January 1715")
  })

  it("adds one date per day after the first", () => {
    expect(getLogDate(2)).toBe("2 January 1715")
    expect(getLogDate(32)).toBe("1 February 1715")
  })

  it("rolls over into the next year", () => {
    expect(getLogDate(365)).toBe("31 December 1715")
    expect(getLogDate(366)).toBe("1 January 1716")
  })

  it("does not go before the start for days below one", () => {
    expect(getDateOfDay(0)).toEqual(START_DATE)
    expect(getDateOfDay(-5)).toEqual(START_DATE)
  })

  it("does not change the start date", () => {
    const before = START_DATE.getTime()

    getDateOfDay(100)

    expect(START_DATE.getTime()).toBe(before)
  })
})

describe("getCurrentDate", () => {
  it("writes the date of the day", () => {
    expect(getCurrentDate(1)).toBe(START_DATE.toDateString())
  })
})

describe("convertDaysToTimeSpan", () => {
  it.each([
    [0, "0 days"],
    [29, "29 days"],
    [30, "1 months, 0 days"],
    [45, "1 months, 15 days"],
    [364, "12 months, 4 days"],
    [365, "1 years, 0 months, 0 days"],
    [400, "1 years, 1 months, 5 days"],
    [730, "2 years, 0 months, 0 days"],
  ])("writes %i days as %s", (days, text) => {
    expect(convertDaysToTimeSpan(days)).toBe(text)
  })
})
