import { describe, expect, it } from "vitest"

import { groupLogsByDay } from "@/utils/logs"

describe("groupLogsByDay", () => {
  it("puts the newest day and newest entry first", () => {
    const groups = groupLogsByDay([
      { day: 1, timestamp: 1, message: "a", type: "trade" },
      { day: 1, timestamp: 2, message: "b", type: "trade" },
      { day: 3, timestamp: 3, message: "c", type: "trade" },
      { day: 3, timestamp: 4, message: "d", type: "trade" },
    ])

    expect(groups).toEqual([
      {
        day: 3,
        entries: [
          { day: 3, timestamp: 4, message: "d", type: "trade" },
          { day: 3, timestamp: 3, message: "c", type: "trade" },
        ],
      },
      {
        day: 1,
        entries: [
          { day: 1, timestamp: 2, message: "b", type: "trade" },
          { day: 1, timestamp: 1, message: "a", type: "trade" },
        ],
      },
    ])
  })

  it("is empty without logs", () => {
    expect(groupLogsByDay([])).toEqual([])
  })
})
