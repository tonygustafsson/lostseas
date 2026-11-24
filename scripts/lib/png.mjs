// A minimal PNG writer, to not need a package. Pixels are RGBA bytes.

import { deflateSync } from "node:zlib"

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n

  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }

  return c >>> 0
})

const crc32 = (buffer) => {
  let c = 0xffffffff

  for (const byte of buffer) {
    c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  }

  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const body = Buffer.concat([Buffer.from(type), data])
  const length = Buffer.alloc(4)
  const crc = Buffer.alloc(4)

  length.writeUInt32BE(data.length)
  crc.writeUInt32BE(crc32(body))

  return Buffer.concat([length, body, crc])
}

export const encodePng = (width, height, pixels) => {
  const header = Buffer.alloc(13)

  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // bit depth
  header[9] = 6 // RGBA

  // Every scanline starts with filter type 0 (none)
  const raw = Buffer.alloc((width * 4 + 1) * height)

  for (let y = 0; y < height; y++) {
    pixels.copy(
      raw,
      y * (width * 4 + 1) + 1,
      y * width * 4,
      (y + 1) * width * 4
    )
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}
