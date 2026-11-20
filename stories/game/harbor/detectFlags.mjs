// The flags of a harbour picture, so the shader can make them wave. Alpha is
// the flag and red is how far from the pole a pixel is, so the free end of
// the flag moves the most.
//
// A picture is not read for flags on its own. Every flag gets a rough box in
// config/flags.json, and the shape of the flag is cut out of that box by the
// colours of the nation. A box with a fifth value of 1 is used as it is.
// The colours of a flag, as two tests on a pixel. England is blue and red,
// Spain red and yellow, France white with gold lilies and Holland red, white
// and blue.
export const PALETTES = {
  England: {
    a: (r, g, b) => b > r + 45 && r < 90 && g < 110 && b < 215 && b > 60,
    c: (r, g, b) => r > 150 && g < 110 && b < 130,
  },
  Spain: {
    a: (r, g, b) => r > 170 && g < 70 && b < 80,
    c: (r, g, b) => r > 215 && g > 165 && b < 90,
  },
  Holland: {
    a: (r, g, b) => r > 170 && g < 80 && b < 80,
    c: (r, g, b) => b > r + 80 && r < 100 && g < 130,
  },
  France: {
    a: (r, g, b) => Math.min(r, g, b) > 212,
    c: (r, g, b) => r > 190 && g > 140 && b < 120,
  },
}

// The longest run of true values, bridging gaps of up to gap
const longestRun = (values, gap) => {
  const filled = [...values]
  let i = 0

  while (i < filled.length) {
    if (!filled[i]) {
      let j = i

      while (j < filled.length && !filled[j]) {
        j++
      }

      if (i > 0 && j < filled.length && j - i <= gap) {
        for (let k = i; k < j; k++) {
          filled[k] = true
        }
      }

      i = j
    } else {
      i++
    }
  }

  let best = [0, 0]
  let start = -1

  for (let k = 0; k <= filled.length; k++) {
    const on = k < filled.length && filled[k]

    if (on && start < 0) {
      start = k
    }

    if (!on && start >= 0) {
      if (k - start > best[1] - best[0]) {
        best = [start, k]
      }

      start = -1
    }
  }

  return best
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)

  return sorted[sorted.length >> 1]
}

const percentile = (values, p) => {
  const sorted = [...values].sort((a, b) => a - b)
  const index = ((sorted.length - 1) * p) / 100
  const low = Math.floor(index)
  const high = Math.ceil(index)

  return sorted[low] + (sorted[high] - sorted[low]) * (index - low)
}

// A median over a window of the values, to take the jaggedness out of an edge
const smooth = (values, size) => {
  const half = size >> 1

  return values.map((_, i) => {
    const window = []

    for (let k = i - half; k <= i + half; k++) {
      window.push(values[Math.min(values.length - 1, Math.max(0, k))])
    }

    return median(window)
  })
}

export const detectFlags = (picture, nation, boxes) => {
  const { width, height, data } = picture
  const palette = PALETTES[nation]

  if (!palette) {
    throw new Error(`No flag colours for ${nation}`)
  }

  // The mask is red for the distance from the pole, alpha for the flag
  const out = new Uint8ClampedArray(width * height * 4)
  const put = (x, ya, yb, t) => {
    for (let y = Math.max(0, ya); y < Math.min(height, yb); y++) {
      out.set([Math.round(t * 255), 0, 0, 255], (y * width + x) * 4)
    }
  }
  const pixel = (x, y) => {
    const i = (y * width + x) * 4

    return [data[i], data[i + 1], data[i + 2]]
  }

  for (const box of boxes) {
    const x0 = Math.max(0, box[0])
    const y0 = Math.max(0, box[1])
    const x1 = Math.min(width, box[2])
    const y1 = Math.min(height, box[3])

    // A box used as it is, the wave grows from its left edge
    if (box.length > 4) {
      for (let x = x0; x < x1; x++) {
        put(x, y0, y1, (x - x0) / Math.max(1, x1 - x0 - 1))
      }

      continue
    }

    if (nation === "Holland") {
      // Small flags on busy backgrounds, a rectangle placed from the red stripe
      const xs = []
      const ys = []

      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          if (palette.a(...pixel(x, y))) {
            xs.push(x - x0)
            ys.push(y - y0)
          }
        }
      }

      if (xs.length < 8) {
        continue
      }

      let cx = median(xs)
      let cy = median(ys)

      for (let round = 0; round < 3; round++) {
        const near = xs
          .map((_, i) => i)
          .filter((i) => Math.abs(xs[i] - cx) < 32 && Math.abs(ys[i] - cy) < 10)

        if (near.length < 8) {
          break
        }

        cx = median(near.map((i) => xs[i]))
        cy = median(near.map((i) => ys[i]))
      }

      const keep = xs
        .map((_, i) => i)
        .filter((i) => Math.abs(xs[i] - cx) < 32 && Math.abs(ys[i] - cy) < 10)

      if (keep.length < 8) {
        continue
      }

      let ax0 = Math.trunc(
        percentile(
          keep.map((i) => xs[i]),
          2
        )
      )
      let ax1 =
        Math.trunc(
          percentile(
            keep.map((i) => xs[i]),
            98
          )
        ) + 1
      const ay0 = Math.trunc(
        percentile(
          keep.map((i) => ys[i]),
          2
        )
      )
      let span = ax1 - ax0

      ax0 -= Math.trunc(0.15 * span)
      ax1 += Math.trunc(0.06 * span)
      span = ax1 - ax0

      // The blue stripe at the bottom tells how tall the flag is
      let bottom = -1

      for (
        let y = ay0;
        y < Math.min(y1 - y0, ay0 + Math.trunc(1.6 * span));
        y++
      ) {
        let blue = 0

        for (let x = ax0; x < ax1; x++) {
          if (x >= 0 && x0 + x < width && palette.c(...pixel(x0 + x, y0 + y))) {
            blue++
          }
        }

        if (blue >= 0.3 * span) {
          bottom = y
        }
      }

      const ay1 = bottom >= 0 ? bottom + 2 : ay0 + Math.trunc(1.15 * span)

      for (let k = ax0; k < ax1; k++) {
        put(
          x0 + k,
          y0 + ay0 - 1,
          y0 + ay1,
          (k - ax0) / Math.max(1, ax1 - ax0 - 1)
        )
      }

      continue
    }

    // Per column, the longest run of flag colours is the flag. Gaps for the
    // white of a cross and the stripes are bridged.
    const columns = []

    for (let x = x0; x < x1; x++) {
      const column = []

      for (let y = y0; y < y1; y++) {
        const [r, g, b] = pixel(x, y)
        column.push(palette.a(r, g, b) || palette.c(r, g, b))
      }

      columns.push(longestRun(column, 8))
    }

    const [s0, e0] = longestRun(
      columns.map(([a, b]) => b - a >= 4),
      6
    )

    if (e0 - s0 < 6) {
      continue
    }

    const tops = smooth(
      columns.slice(s0, e0).map((r) => r[0]),
      7
    )
    const bottoms = smooth(
      columns.slice(s0, e0).map((r) => r[1]),
      7
    )

    // Colours behind the flag can make a few columns taller than the flag
    const full = median(bottoms.map((b, i) => b - tops[i]))
    const centres = tops.map((t, i) => (t + bottoms[i]) / 2)

    for (let k = s0; k < e0; k++) {
      const i = k - s0
      const window = centres.slice(Math.max(0, i - 7), i + 8)
      const centre = median(window)
      const top = Math.max(tops[i], centre - 0.62 * full)
      const bottom = Math.min(bottoms[i], centre + 0.62 * full)

      put(
        x0 + k,
        y0 + Math.trunc(top) - 1,
        y0 + Math.trunc(bottom) + 1,
        i / Math.max(1, e0 - s0 - 1)
      )
    }
  }

  return { width, height, data: out }
}
