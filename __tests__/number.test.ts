import { describe, expect, it } from "vitest"

import { formatGold, formatNumber } from "@/utils/number"

describe("formatNumber", () => {
  it("groups thousands", () => {
    expect(formatNumber(0)).toBe("0")
    expect(formatNumber(999)).toBe("999")
    expect(formatNumber(12500)).toBe("12,500")
    expect(formatNumber(1200000)).toBe("1,200,000")
  })
})

describe("formatGold", () => {
  it("adds the currency", () => {
    expect(formatGold(1)).toBe("1 gold")
    expect(formatGold(24000)).toBe("24,000 gold")
  })
})
