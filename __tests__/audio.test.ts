import { describe, expect, it } from "vitest"

import { pickRandomSong } from "@/utils/audio"
import { SEA_SONGS, TOWN_SONGS } from "@/utils/sound"

describe("pickRandomSong", () => {
  it("picks sea songs at sea and town songs elsewhere", () => {
    expect(SEA_SONGS).toContain(pickRandomSong("Sea", ""))
    expect(TOWN_SONGS).toContain(pickRandomSong("Harbor", ""))
    expect(TOWN_SONGS).toContain(pickRandomSong(undefined, ""))
  })

  it("never repeats the current song", () => {
    const current = `http://localhost${TOWN_SONGS[0]}`

    expect(pickRandomSong("Tavern", current, () => 0)).toBe(TOWN_SONGS[1])
  })
})
