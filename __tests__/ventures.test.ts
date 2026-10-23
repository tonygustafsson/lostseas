import { existsSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import {
  getBestReturns,
  getVentureImage,
  VENTURE_IDS,
  VENTURES,
} from "@/constants/ventures"
import { camelCaseToKebabCase } from "@/utils/string"

describe("ventures", () => {
  it.each(VENTURE_IDS)("%s has a background image", (ventureId) => {
    const image = getVentureImage(ventureId)

    expect(existsSync(path.join(process.cwd(), "public", image))).toBe(true)
  })

  it("names the image after the venture id", () => {
    expect(getVentureImage("silverFleet")).toBe(
      "/img/ventures/silver-fleet.png"
    )
  })

  it("turns camelCase ids into kebab-case", () => {
    expect(camelCaseToKebabCase("tobaccoRun")).toBe("tobacco-run")
    expect(camelCaseToKebabCase("sugar")).toBe("sugar")
  })

  it("finds the best possible returns", () => {
    expect(getBestReturns(VENTURES.silverFleet)).toBe(24000)
  })
})
