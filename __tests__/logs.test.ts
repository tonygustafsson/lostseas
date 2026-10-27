import { describe, expect, it } from "vitest"

import { groupLogsByDay } from "@/utils/logs"

describe("groupLogsByDay", () => {
  it("puts the newest day and newest entry first", () => {
    const groups = groupLogsByDay([
      { day: 1, timestamp: 1, message: "a" },
      { day: 1, timestamp: 2, message: "b" },
      { day: 3, timestamp: 3, message: "c" },
      { day: 3, timestamp: 4, message: "d" },
    ])

    expect(groups).toEqual([
      {
        day: 3,
        entries: [
          { day: 3, timestamp: 4, message: "d" },
          { day: 3, timestamp: 3, message: "c" },
        ],
      },
      {
        day: 1,
        entries: [
          { day: 1, timestamp: 2, message: "b" },
          { day: 1, timestamp: 1, message: "a" },
        ],
      },
    ])
  })

  it("is empty without logs", () => {
    expect(groupLogsByDay([])).toEqual([])
  })
})
