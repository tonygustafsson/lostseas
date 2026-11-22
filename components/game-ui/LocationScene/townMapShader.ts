// Brings a town map to life with WebGL, in a single pass over one canvas:
// rippling water (where the water mask is), drifting clouds (where the sky
// mask is), flags drawn in the wind (from the data in flagSprites.json), the
// people, cats and rats on the streets and a few seagulls flying over
// everything. The weather decides how cloudy it is, and can bring rain or fog
// over the whole town.

import {
  createAmbienceRenderer,
  SHADER_COMMON,
  warmUpShader,
} from "./ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;
// What people walk behind: alpha marks it, red and green hold the height where
// it meets the ground in 1/16 pixels, see frontMask.ts
uniform sampler2D u_walkFront;
uniform vec2 u_imageSize;
// The size the streets and the front mask were drawn at. The picture that is
// loaded can be a resized copy, so u_imageSize is not it.
uniform vec2 u_mapSize;

// Street levels, see walkUniforms.ts
const int MAX_LEVELS = 7;
// x start, x end, feet and half the width of a lane
uniform vec4 u_laneBox[MAX_LEVELS];
// Picture pixels to a sprite pixel of a person on the level
uniform float u_laneSize[MAX_LEVELS];
uniform float u_laneCount;

// Flags drawn by the shader, in pixels of the harbour picture. Each is four
// corners (x start and end, top and bottom at the pole, top and bottom at the
// free end), a nation and whether it has a pole, see flagUniforms.ts
const int MAX_FLAGS = 12;
uniform vec4 u_flagEdges[MAX_FLAGS];
uniform vec4 u_flagFar[MAX_FLAGS];
uniform float u_flagCount;

// The weather, see weatherAmbience.ts
uniform float u_cloudCover;
uniform float u_cloudShade;
uniform float u_rain;
uniform float u_fog;
uniform float u_gulls;
uniform float u_wind;
uniform float u_activity;

// Water ripple strength in CSS pixels
const float WATER_AMPLITUDE = 1.875;
const int SEAGULLS = 5;
const vec3 FOG_COLOR = vec3(0.9, 0.92, 0.94);
const vec3 OVERCAST_COLOR = vec3(0.08, 0.1, 0.14);

// The Union Flag as it was after 1707. A tile is as high as p.y goes to 1 and
// w wide, the diagonals run from corner to corner.
vec3 flagEngland(vec2 p, float w) {
  float len = sqrt(1.0 + w * w);
  float saltire = min(abs(p.x - p.y * w), abs(p.x + p.y * w - w)) / len;
  vec2 q = abs(p - vec2(w, 1.0) * 0.5);
  float cross = min(q.x, q.y);

  vec3 color = vec3(0.05, 0.13, 0.43);
  color = mix(color, vec3(0.95, 0.94, 0.9), step(saltire, 0.1));
  color = mix(color, vec3(0.95, 0.94, 0.9), step(cross, 0.15));

  return mix(color, vec3(0.78, 0.1, 0.14), step(cross, 0.08));
}

// The pixels of a fleur-de-lis, 13 wide and 14 tall. A row is a number with a bit
// for every pixel, the left one first.
float fleurPixel(float column, float row) {
  float bits = 0.0;

  if (row < 0.5) {
    bits = 64.0;
  } else if (row < 1.5) {
    bits = 224.0;
  } else if (row < 2.5) {
    bits = 496.0;
  } else if (row < 3.5) {
    bits = 496.0;
  } else if (row < 4.5) {
    bits = 2546.0;
  } else if (row < 5.5) {
    bits = 7671.0;
  } else if (row < 6.5) {
    bits = 7919.0;
  } else if (row < 7.5) {
    bits = 3822.0;
  } else if (row < 8.5) {
    bits = 1772.0;
  } else if (row < 9.5) {
    bits = 496.0;
  } else if (row < 10.5) {
    bits = 4094.0;
  } else if (row < 11.5) {
    bits = 1016.0;
  } else if (row < 12.5) {
    bits = 224.0;
  } else if (row < 13.5) {
    bits = 432.0;
  }

  return mod(floor(bits / pow(2.0, column)), 2.0);
}

// White with golden fleurs-de-lis in staggered rows. Cell is the space one
// fleur has, cloth the position on the flag in picture pixels.
vec3 flagFrance(vec2 cloth, float cell) {
  vec2 grid = cloth / cell;
  grid.x += 0.5 * mod(floor(grid.y), 2.0);
  vec2 c = fract(grid) - 0.5;

  // A fleur is 14 pixels tall and takes up 70% of the cell
  float size = 0.7 / 14.0;
  vec2 pixel = vec2(c.x + 13.0 * 0.5 * size, c.y + 0.35) / size;
  float fleur = 0.0;

  if (pixel.x >= 0.0 && pixel.x < 13.0 && pixel.y >= 0.0 && pixel.y < 14.0) {
    fleur = fleurPixel(floor(pixel.x), floor(pixel.y));
  }

  return mix(vec3(0.94, 0.92, 0.86), vec3(0.86, 0.64, 0.14), fleur);
}

// The coat of arms of Spain, q is the position from its middle in heights of
// the arms, about -0.5 to 0.5. A simple version: a crown, a shield in four
// parts with a blue oval, and a pillar with a red ribbon on each side. Returns
// the colour and 1 where something is drawn.
vec4 flagSpainArms(vec2 q) {
  float side = abs(q.x);

  // The crown, with three points and a red jewel
  if (q.y > -0.5 && q.y < -0.3 && side < 0.19) {
    bool points = q.y > -0.42;

    if (!points || side < 0.03 || (side > 0.1 && side < 0.16)) {
      return vec4(0.95, 0.72, 0.1, 1.0);
    }
  }

  if (q.y > -0.32 && q.y < -0.29 && side < 0.2) {
    return vec4(0.7, 0.1, 0.12, 1.0);
  }

  // The pillars, white with a red ribbon winding round them
  if (side > 0.26 && side < 0.35 && q.y > -0.24 && q.y < 0.36) {
    if (q.y < -0.19) {
      return vec4(0.95, 0.72, 0.1, 1.0);
    }

    if (fract(q.y * 5.0 + 0.4 * q.x) < 0.35) {
      return vec4(0.72, 0.1, 0.12, 1.0);
    }

    return vec4(0.93, 0.9, 0.83, 1.0);
  }

  // The shield, straight at the top and pointed at the bottom
  float reach = q.y < 0.2 ? 0.21 : 0.21 * (0.42 - q.y) / 0.22;

  if (q.y > -0.27 && q.y < 0.42 && side < reach) {
    if (side > reach - 0.015 || q.y < -0.255) {
      return vec4(0.35, 0.1, 0.05, 1.0);
    }

    // The blue oval in the middle with a golden jewel
    vec2 oval = vec2(q.x / 0.07, (q.y - 0.02) / 0.095);

    if (length(oval) < 1.0) {
      return length(oval) < 0.35 ? vec4(0.95, 0.72, 0.1, 1.0) : vec4(0.1, 0.2, 0.6, 1.0);
    }

    if (q.y < 0.06) {
      if (q.x < 0.0) {
        // Castile, a golden tower on red
        bool tower = abs(q.x + 0.11) < 0.045 && q.y > -0.17 && q.y < -0.06;

        return tower ? vec4(0.95, 0.72, 0.1, 1.0) : vec4(0.72, 0.1, 0.12, 1.0);
      }

      // Leon, a lion on silver
      bool lion = length(vec2(q.x - 0.11, (q.y + 0.1) * 0.8)) < 0.055;

      return lion ? vec4(0.5, 0.15, 0.45, 1.0) : vec4(0.93, 0.92, 0.88, 1.0);
    }

    if (q.x < 0.0) {
      // Aragon, red stripes on gold
      bool stripe = fract(q.x * 16.0) < 0.5;

      return stripe ? vec4(0.72, 0.1, 0.12, 1.0) : vec4(0.95, 0.72, 0.1, 1.0);
    }

    // Navarre, golden chains on red
    bool chain = fract((q.x + q.y) * 11.0) < 0.2;

    return chain ? vec4(0.95, 0.72, 0.1, 1.0) : vec4(0.72, 0.1, 0.12, 1.0);
  }

  return vec4(0.0);
}

// Red, yellow and red stripes with the coat of arms by the pole. Not the flag
// of 1715, it is the one that is wanted for now.
vec3 flagSpain(vec2 p, float w) {
  vec3 red = vec3(0.72, 0.05, 0.1);
  vec3 yellow = vec3(0.98, 0.75, 0.08);
  vec3 color = (p.y < 0.25 || p.y > 0.75) ? red : yellow;

  vec4 arms = flagSpainArms((p - vec2(0.36 * w, 0.54)) / 0.72);

  return mix(color, arms.rgb, arms.a);
}

// Red, white and blue stripes
vec3 flagHolland(vec2 p) {
  if (p.y < 0.3333) {
    return vec3(0.68, 0.13, 0.15);
  }

  if (p.y < 0.6667) {
    return vec3(0.95, 0.94, 0.9);
  }

  return vec3(0.12, 0.25, 0.55);
}

// The size of a pixel of a drawn flag in picture pixels, close to the pixels of
// the painted picture so the flags do not look cleaner than what is round them
const float FLAG_PIXEL = 1.75;

// The cloth of a drawn flag: nation 0 England, 1 France, 2 Spain, 3 Holland.
// Cloth is the position on it in picture pixels from the pole and the top.
// The pattern covers the whole flag, a French flag gets fleurs a little over a
// third of its height apart.
vec3 flagDesign(float nation, vec2 cloth, vec2 flagSize) {
  if (nation > 0.5 && nation < 1.5) {
    return flagFrance(cloth, flagSize.y * 0.35);
  }

  vec2 tile = cloth / flagSize;
  float w = flagSize.x / flagSize.y;
  vec2 p = vec2(tile.x * w, tile.y);

  if (nation < 0.5) {
    return flagEngland(p, w);
  }

  if (nation < 2.5) {
    return flagSpain(p, w);
  }

  return flagHolland(p);
}

// How a pole is sized from the flag it holds: the width and the height of the
// flag at the pole, the pole reaches a little above and well below it
float poleWidth(float height) {
  return max(4.0, height * 0.11);
}

// The wooden pole of a flag with a golden ball on top, painted like the ones in
// Basse-Terre. It stands against the pole side of the cloth and grows with the
// flag. Returns the colour and 1 where the pole is, 0 elsewhere.
vec4 flagPole(vec2 pixel) {
  vec4 e = vec4(0.0);
  bool found = false;

  // Only finds the flag. The drawing is after the loop, the loop is repeated
  // for every flag by the compiler and the drawing should not be.
  for (int i = 0; i < MAX_FLAGS; i++) {
    if (float(i) >= u_flagCount) {
      break;
    }

    vec4 candidate = u_flagEdges[i];
    float height = candidate.w - candidate.z;
    float width = poleWidth(height);

    if (
      u_flagFar[i].w > 0.5 &&
      pixel.x >= candidate.x - width - height * 0.075 &&
      pixel.x <= candidate.x + height * 0.075 &&
      pixel.y > candidate.z - height * 0.4 && pixel.y < candidate.w + height * 0.7
    ) {
      e = candidate;
      found = true;
      break;
    }
  }

  if (!found) {
    return vec4(0.0);
  }

  float height = e.w - e.z;
  float width = poleWidth(height);
  float across = (pixel.x - (e.x - width)) / width;
  float ball = height * 0.075;
  float ballY = e.z - height * 0.17 + ball;

  // The ball, with a bright spot top left and a dark rim
  vec2 fromBall = vec2(pixel.x - (e.x - width * 0.5), pixel.y - ballY);

  if (length(fromBall) < ball) {
    vec3 gold = vec3(0.93, 0.6, 0.08);

    if (length(fromBall) > ball - 1.0) {
      gold = vec3(0.35, 0.16, 0.03);
    } else if (length(fromBall - vec2(-ball * 0.3, -ball * 0.3)) < ball * 0.35) {
      gold = vec3(1.0, 0.85, 0.4);
    }

    return vec4(gold, 1.0);
  }

  if (across >= 0.0 && across <= 1.0 && pixel.y > ballY && pixel.y < e.w + height * 0.6) {
    // From the left: brown edge, orange, bright, dark, black outline
    vec3 wood = vec3(0.5, 0.35, 0.16);

    if (across > 0.15) {
      wood = vec3(0.69, 0.43, 0.04);
    }

    if (across > 0.4) {
      wood = vec3(0.85, 0.58, 0.05);
    }

    if (across > 0.62) {
      wood = vec3(0.29, 0.17, 0.04);
    }

    if (across > 0.8) {
      wood = vec3(0.07, 0.03, 0.01);
    }

    return vec4(wood, 1.0);
  }

  return vec4(0.0);
}

// Whether a pixel is near a flag or its pole, the rest of the picture skips
// the flag drawing
bool nearFlag(vec2 pixel) {
  for (int i = 0; i < MAX_FLAGS; i++) {
    if (float(i) >= u_flagCount) {
      break;
    }

    vec4 e = u_flagEdges[i];
    vec4 f = u_flagFar[i];
    float sway = (e.w - e.z + f.y - f.x) * 0.5 * 0.2;

    if (
      pixel.x > e.x - 14.0 && pixel.x < e.y + 6.0 &&
      pixel.y > min(e.z, f.x) - sway - 6.0 &&
      pixel.y < max(e.w, f.y) + sway + 6.0
    ) {
      return true;
    }

    // A pole reaches above and below the flag
    float height = e.w - e.z;

    if (
      f.w > 0.5 &&
      pixel.x > e.x - 14.0 && pixel.x < e.x + 2.0 &&
      pixel.y > e.z - height * 0.4 && pixel.y < e.w + height * 0.7
    ) {
      return true;
    }
  }

  return false;
}

// A flag waves from the pole to the free end, the top and bottom edges move
// with the cloth. Returns the colour and how much of the pixel the cloth covers.
vec4 flagCloth(vec2 pixel) {
  bool found = false;
  float t = 0.0;
  float span = 1.0;
  float height = 1.0;
  float nation = 0.0;
  float phase = 0.0;
  float top = 0.0;
  float edge = 0.0;

  // Only finds the flag and where on it the pixel is. The colour is worked out
  // once after the loop, the compiler repeats the loop for every flag and the
  // nations are a lot of code.
  for (int i = 0; i < MAX_FLAGS; i++) {
    if (float(i) >= u_flagCount) {
      break;
    }

    vec4 e = u_flagEdges[i];
    vec4 f = u_flagFar[i];
    float candidateSpan = e.y - e.x;
    float candidateT = (pixel.x - e.x) / candidateSpan;

    if (candidateT < 0.0 || candidateT > 1.0) {
      continue;
    }

    // Same rhythm as the painted flags had, the stronger the wind the more it waves
    float candidatePhase = u_time * 4.0 - candidateT * 7.0;
    float wave = sin(candidatePhase) + 0.4 * sin(candidatePhase * 1.7 + 1.0);
    float candidateHeight = (e.w - e.z + f.y - f.x) * 0.5;
    float sway = candidateHeight * 0.06 * (0.4 + 0.6 * min(u_wind, 2.0));
    float shift = wave * sway * candidateT;

    float candidateTop = mix(e.z, f.x, candidateT) + shift;
    float candidateBottom = mix(e.w, f.y, candidateT) + shift;
    float candidateEdge = min(pixel.y - candidateTop, candidateBottom - pixel.y);

    // Hard edges, like the pixel art round it
    if (candidateEdge < 0.0) {
      continue;
    }

    found = true;
    t = candidateT;
    span = candidateSpan;
    height = candidateHeight;
    nation = f.z;
    phase = candidatePhase;
    top = candidateTop;
    edge = candidateEdge;
    break;
  }

  if (!found) {
    return vec4(0.0);
  }

  vec3 color = flagDesign(nation, vec2(t * span, pixel.y - top), vec2(span, height));

  // Crests catch the light, troughs fall into shade, in a few steps
  float shade = 1.0 + 0.16 * cos(phase + 0.6) * t * min(u_wind, 1.0);
  color *= floor(shade / 0.05 + 0.5) * 0.05;

  // A darker line along the top and the bottom, as the painted flags have
  if (edge < FLAG_PIXEL) {
    color *= 0.82;
  }

  return vec4(color, 1.0);
}

// The pixel itself and the four next to it, the outline of a sprite is where a
// neighbour is drawn and the pixel is not. Each sprite is asked for in one loop,
// asking five times in a row makes the GPU compile its code five times, which
// took the shader over 20 seconds to build.
vec2 neighbourOffset(int i) {
  return vec2(
    i == 1 ? -1.0 : (i == 2 ? 1.0 : 0.0),
    i == 3 ? -1.0 : (i == 4 ? 1.0 : 0.0)
  );
}

// One pixel of a townsperson in 1715, on a grid 7 wide and 21 tall with the
// head at the top. Frame 0 and 2 are the two strides, frame 1 has the feet
// together. Seed picks the clothes. A gentleman wears a tricorn hat or a
// powdered wig with a long coat, a woman a cap and a long skirt.
vec4 person(float col, float row, float frame, float seed) {
  float r = row - 1.0;
  float pick = floor(hash(seed + 20.0) * 6.0);
  vec3 coat = pick < 1.0 ? vec3(0.45, 0.28, 0.2)
    : pick < 2.0 ? vec3(0.2, 0.27, 0.42)
    : pick < 3.0 ? vec3(0.55, 0.48, 0.34)
    : pick < 4.0 ? vec3(0.28, 0.38, 0.26)
    : pick < 5.0 ? vec3(0.5, 0.22, 0.2)
    : vec3(0.36, 0.34, 0.33);
  float tone = hash(seed + 21.0);
  vec3 skin = mix(vec3(0.86, 0.66, 0.52), vec3(0.45, 0.3, 0.2), tone * tone);
  bool woman = hash(seed + 22.0) > 0.5;
  bool wig = !woman && hash(seed + 23.0) > 0.7;
  vec3 hat = mix(vec3(0.13, 0.11, 0.1), vec3(0.24, 0.2, 0.3), hash(seed + 24.0));
  vec3 hair = mix(vec3(0.25, 0.15, 0.08), vec3(0.7, 0.55, 0.3), hash(seed + 25.0));
  vec3 wigColor = vec3(0.82, 0.8, 0.78);
  vec3 dark = vec3(0.12, 0.1, 0.1);
  vec3 linen = vec3(0.86, 0.82, 0.72);

  // Face, with hair or a wig at the sides
  if (r >= 1.0 && r <= 3.0) {
    if (col >= 2.0 && col <= 4.0) {
      return vec4(skin, 1.0);
    }

    if (col == 1.0 || col == 5.0) {
      if (wig) {
        return vec4(wigColor, 1.0);
      }

      if (woman && r <= 2.0) {
        return vec4(hair, 1.0);
      }
    }
  }

  // Top of the head, a crown and a wide brim for the tricorn
  if (r == -1.0 && col >= 2.0 && col <= 4.0) {
    return vec4(woman ? linen : (wig ? wigColor : hat), 1.0);
  }

  if (r == 0.0) {
    if (woman && col >= 1.0 && col <= 5.0) {
      return vec4(linen, 1.0);
    }

    if (wig && col >= 1.0 && col <= 5.0) {
      return vec4(wigColor, 1.0);
    }

    if (!woman && !wig) {
      return vec4(col == 0.0 || col == 6.0 ? hat * 1.7 : hat, 1.0);
    }
  }

  // Shoulders
  if (r == 4.0 && col >= 1.0 && col <= 5.0) {
    return vec4(coat, 1.0);
  }

  // Arms swing with the stride, one step longer when forward
  float armLeft = frame > 1.5 ? 1.0 : 0.0;
  float armRight = frame < 0.5 ? 1.0 : 0.0;

  if (r >= 5.0 && r <= 9.0 && col >= 2.0 && col <= 4.0) {
    return vec4(r == 5.0 && woman ? linen : coat, 1.0);
  }

  if (col == 1.0) {
    if (r >= 5.0 && r <= 8.0 + armLeft) {
      return vec4(coat * 0.85, 1.0);
    }

    if (r == 9.0 + armLeft) {
      return vec4(skin, 1.0);
    }
  }

  if (col == 5.0) {
    if (r >= 5.0 && r <= 8.0 + armRight) {
      return vec4(coat, 1.0);
    }

    if (r == 9.0 + armRight) {
      return vec4(skin, 1.0);
    }
  }

  // Waist
  if (r == 9.0 && col >= 2.0 && col <= 4.0) {
    return vec4(woman ? linen : dark, 1.0);
  }

  if (woman) {
    // A long skirt to the ankles, widening towards the hem
    float flare = r >= 13.0 ? 1.0 : 0.0;

    if (r >= 10.0 && r <= 18.0 && col >= 2.0 - flare && col <= 4.0 + flare) {
      return vec4(r >= 17.0 ? coat * 0.7 : coat * 0.9, 1.0);
    }

    // Shoes peeking out, one forward and one back
    float shoes = frame < 0.5 ? 1.0 : (frame > 1.5 ? 3.0 : 2.0);

    if (r == 19.0 && (col == shoes || col == shoes + 2.0)) {
      return vec4(dark, 1.0);
    }

    return vec4(0.0);
  }

  // A long coat to the knee, a touch fuller at the hem, or plain trousers
  if (r >= 10.0 && r <= 14.0) {
    float hem = r >= 13.0 ? 1.0 : 0.0;

    if (col >= 2.0 - hem && col <= 4.0 + hem) {
      return vec4(coat * (col == 2.0 - hem || col == 4.0 + hem ? 0.8 : 1.0), 1.0);
    }
  }

  // White stockings and shoes, the far leg in shade
  float farLeg = frame < 0.5 ? 1.0 : (frame > 1.5 ? 5.0 : 2.0);
  float nearLeg = frame < 0.5 ? 5.0 : (frame > 1.5 ? 1.0 : 4.0);

  if (r >= 15.0 && r <= 18.0) {
    if (col == nearLeg) {
      return vec4(linen, 1.0);
    }

    if (col == farLeg) {
      return vec4(linen * 0.72, 1.0);
    }
  }

  if (r == 19.0) {
    if (col == nearLeg || col == nearLeg + 1.0) {
      return vec4(dark, 1.0);
    }

    if (col == farLeg || col == farLeg + 1.0) {
      return vec4(dark * 1.4, 1.0);
    }
  }

  return vec4(0.0);
}

// The sprite with a dark outline and a little shadow underneath
vec4 personPixel(float col, float row, float frame, float seed) {
  vec4 here = vec4(0.0);
  float near = 0.0;

  for (int i = 0; i < 5; i++) {
    vec2 shift = neighbourOffset(i);
    vec4 other = person(col + shift.x, row + shift.y, frame, seed);

    if (i == 0) {
      here = other;
    } else {
      near += other.a;
    }
  }

  if (here.a > 0.5) {
    return here;
  }

  if (near > 0.5) {
    return vec4(0.08, 0.06, 0.05, 0.9);
  }

  if (row == 21.0 && col >= 1.0 && col <= 5.0) {
    return vec4(0.0, 0.0, 0.0, 0.22);
  }

  return vec4(0.0);
}

// A cat on a grid 10 wide and 6 tall, facing right. Frames 0 to 2 are the
// strides of a walking cat and frame 3 a cat sitting up. Kind 0 is a ginger
// tabby and kind 1 is black with white socks and chest.
vec4 cat(float col, float row, float frame, float kind) {
  vec3 base = kind < 0.5 ? vec3(0.84, 0.52, 0.24) : vec3(0.17, 0.17, 0.19);
  vec3 stripe = kind < 0.5 ? vec3(0.6, 0.32, 0.13) : vec3(0.26, 0.26, 0.29);
  vec3 light = kind < 0.5 ? vec3(0.95, 0.84, 0.68) : vec3(0.92, 0.92, 0.9);
  bool striped = mod(col, 2.0) < 0.5;

  if (frame > 2.5) {
    // Sitting up with the tail along the ground
    if (row == 0.0 && (col == 6.0 || col == 8.0)) {
      return vec4(base, 1.0);
    }

    if (row >= 1.0 && row <= 2.0 && col >= 6.0 && col <= 8.0) {
      return vec4(row == 2.0 && col == 8.0 ? light : base, 1.0);
    }

    if (row >= 3.0 && row <= 4.0 && col >= 6.0 && col <= 7.0) {
      return vec4(kind < 0.5 ? base : light, 1.0);
    }

    if (row == 3.0 && col >= 4.0 && col <= 5.0) {
      return vec4(striped ? stripe : base, 1.0);
    }

    if (row == 4.0 && col >= 3.0 && col <= 5.0) {
      return vec4(striped ? stripe : base, 1.0);
    }

    if (row == 5.0 && col >= 3.0 && col <= 6.0) {
      return vec4(base * 0.9, 1.0);
    }

    if (row == 5.0 && col >= 7.0 && col <= 8.0) {
      return vec4(light, 1.0);
    }

    if (row == 5.0 && col >= 0.0 && col <= 2.0) {
      return vec4(striped ? stripe : base, 1.0);
    }

    if (row == 4.0 && col == 0.0) {
      return vec4(base, 1.0);
    }

    return vec4(0.0);
  }

  // Tail up
  if (col == 0.0 && row >= 0.0 && row <= 2.0) {
    return vec4(row == 1.0 ? stripe : base, 1.0);
  }

  // Head with ears and a pale muzzle
  if (row == 0.0 && (col == 7.0 || col == 9.0)) {
    return vec4(base, 1.0);
  }

  if (row >= 1.0 && row <= 3.0 && col >= 7.0 && col <= 9.0) {
    return vec4(row == 3.0 && col >= 8.0 ? light : base, 1.0);
  }

  // Body
  if (row == 2.0 && col >= 1.0 && col <= 6.0) {
    return vec4(striped ? stripe : base, 1.0);
  }

  if (row == 3.0 && col >= 1.0 && col <= 6.0) {
    return vec4(kind < 0.5 ? light : base, 1.0);
  }

  // Legs, the far pair in shade
  float rear = frame < 0.5 ? 1.0 : (frame > 1.5 ? 3.0 : 2.0);
  float front = frame < 0.5 ? 7.0 : (frame > 1.5 ? 5.0 : 6.0);

  if (row >= 4.0 && row <= 5.0) {
    bool paw = row == 5.0;

    if (col == rear + 1.0 || col == front + 1.0) {
      return vec4(paw ? light : base, 1.0);
    }

    if (col == rear || col == front) {
      return vec4((paw ? light : base) * 0.75, 1.0);
    }
  }

  return vec4(0.0);
}

// The cat with a dark outline and a little shadow underneath
vec4 catPixel(float col, float row, float frame, float kind) {
  vec4 here = vec4(0.0);
  float near = 0.0;

  for (int i = 0; i < 5; i++) {
    vec2 shift = neighbourOffset(i);
    vec4 other = cat(col + shift.x, row + shift.y, frame, kind);

    if (i == 0) {
      here = other;
    } else {
      near += other.a;
    }
  }

  if (here.a > 0.5) {
    return here;
  }

  if (near > 0.5) {
    return vec4(0.08, 0.06, 0.05, 0.85);
  }

  if (row == 6.0 && col >= 1.0 && col <= 8.0) {
    return vec4(0.0, 0.0, 0.0, 0.2);
  }

  return vec4(0.0);
}

// A rat on a grid 8 wide and 4 tall, facing right. Frames 0 to 2 are the
// scurrying strides and frame 3 a rat frozen in a hunch.
vec4 rat(float col, float row, float frame) {
  vec3 fur = vec3(0.34, 0.29, 0.26);
  vec3 pink = vec3(0.72, 0.5, 0.48);

  if (frame > 2.5) {
    if (row == 3.0 && col >= 0.0 && col <= 2.0) {
      return vec4(pink, 1.0);
    }

    if (row >= 1.0 && row <= 3.0 && col >= 3.0 && col <= 5.0) {
      return vec4(fur * (row == 1.0 ? 1.1 : 0.9), 1.0);
    }

    if (row >= 2.0 && row <= 3.0 && col >= 6.0 && col <= 7.0) {
      return vec4(col == 7.0 && row == 3.0 ? pink : fur, 1.0);
    }

    if (row == 1.0 && col == 6.0) {
      return vec4(fur * 0.8, 1.0);
    }

    return vec4(0.0);
  }

  // Long thin tail
  if (row == 2.0 && col <= 1.0) {
    return vec4(pink, 1.0);
  }

  // Body and a pointed head with an ear
  if (row >= 1.0 && row <= 2.0 && col >= 2.0 && col <= 5.0) {
    return vec4(row == 1.0 ? fur * 1.1 : fur * 0.9, 1.0);
  }

  if (row == 2.0 && col >= 6.0 && col <= 7.0) {
    return vec4(col == 7.0 ? pink : fur, 1.0);
  }

  if (row == 1.0 && col == 6.0) {
    return vec4(fur * 0.8, 1.0);
  }

  // Four quick legs
  float back = frame < 0.5 ? 2.0 : (frame > 1.5 ? 3.0 : 2.5);
  float front = frame < 0.5 ? 6.0 : (frame > 1.5 ? 5.0 : 5.5);

  if (row == 3.0 && (col == floor(back) || col == floor(front))) {
    return vec4(fur * 0.7, 1.0);
  }

  return vec4(0.0);
}

vec4 ratPixel(float col, float row, float frame) {
  vec4 here = vec4(0.0);
  float near = 0.0;

  for (int i = 0; i < 5; i++) {
    vec2 shift = neighbourOffset(i);
    vec4 other = rat(col + shift.x, row + shift.y, frame);

    if (i == 0) {
      here = other;
    } else {
      near += other.a;
    }
  }

  if (here.a > 0.5) {
    return here;
  }

  if (near > 0.5) {
    return vec4(0.07, 0.05, 0.04, 0.8);
  }

  return vec4(0.0);
}

// A random number for every walk, so nobody repeats
float walkRandom(float slot, float k) {
  return hash(slot * 13.37 + k * 71.13 + 3.0);
}

float gLevels = 0.0;

// Picture pixels in a pixel of a person on the reference level, speeds and
// distances were tuned there and scale with the level's size
const float REFERENCE_SIZE = 2.26;

// Uniform arrays can only be indexed by a loop counter on some GPUs
vec4 laneBox(float level) {
  vec4 box = vec4(0.0);

  for (int i = 0; i < MAX_LEVELS; i++) {
    if (float(i) == level) {
      box = u_laneBox[i];
    }
  }

  return box;
}

// How many street levels there are, none without a lane
float levelCount() {
  return u_laneCount;
}

// Where a level starts and ends
vec2 levelExtent(float level) {
  return laneBox(level).xy;
}

// How many picture pixels a pixel of a person is on a level, nearer is bigger
float levelSize(float level) {
  float size = 0.0;

  for (int i = 0; i < MAX_LEVELS; i++) {
    if (float(i) == level) {
      size = u_laneSize[i];
    }
  }

  return size;
}

// The lane on a level at picture column x, with the height of the feet, half the
// width and whether it can be walked at all. A street stops a little short of
// its ends.
vec3 laneAt(float x, float level) {
  vec4 box = laneBox(level);
  float isInside = step(box.x + 2.0, x) * step(x, box.y - 2.0);

  return vec3(box.z, box.w, isInside);
}

// Whether the object in the front mask hides somebody whose feet are at feetY
bool hiddenBehind(vec2 p, float feetY) {
  vec4 front = texture2D(u_walkFront, p / u_mapSize);
  float base = (floor(front.r * 255.0 + 0.5) * 256.0 + floor(front.g * 255.0 + 0.5)) / 16.0;

  return front.a > 0.5 && feetY < base;
}

// How many of the town's people are about, from 1 on a fine day down to a few
// in the rain. Every walk draws its own number and shows up only when the
// weather allows it. It is all or nothing, a soft edge here would leave the
// walks whose number is close to the weather's half see-through.
float presenceOf(float slot) {
  return step(walkRandom(slot, 13.0), u_activity);
}

const int WALKERS = 8;
const int CATS = 2;
const int RATS = 2;
const float WALK_SLOT = 110.0;
const float CAT_SLOT = 55.0;
const float RAT_SLOT = 40.0;

// Where somebody out for a stroll is at this moment
struct Walk {
  float x;
  float y;
  float level;
  float size;
  float facing;
  float travelled;
  float speed;
  float pathLength;
  float elapsed;
  float presence;
  float slot;
  bool paused;
  bool active;
};

// People stroll along the lanes in the walk mask. Every slot of time starts a
// new walk with its own person, street level, direction, speed, stops and
// turning back, so nothing repeats in a way the eye can follow.
Walk walkOf(float index, float pixelX, float margin) {
  Walk w;
  w.active = false;
  w.x = 0.0;
  w.y = 0.0;

  // Each walker runs on its own clock, so they set off at different moments
  float time = u_time + index * 17.0;
  float cycle = floor(time / WALK_SLOT);
  float local = time - cycle * WALK_SLOT;
  float slot = cycle + index * 97.0;
  float count = gLevels;
  float level = floor(walkRandom(slot, 12.0) * count);
  vec2 extent = levelExtent(level);
  float size = levelSize(level);
  float direction = walkRandom(slot, 1.0) > 0.5 ? 1.0 : -1.0;
  // A stroll, about 1.2 metres a second for a person this tall
  float speed = mix(26.0, 38.0, walkRandom(slot, 2.0)) * size / REFERENCE_SIZE;
  float delay = walkRandom(slot, 3.0) * 12.0;
  bool turnsBack = walkRandom(slot, 5.0) > 0.55;
  float lane = extent.y - extent.x;
  float reach = mix(0.25, 0.5, walkRandom(slot, 7.0)) * lane;
  float pathLength = turnsBack ? 2.0 * reach : lane;
  float walkTime = pathLength / speed;

  // Stops once or twice for a good while, to look around or talk
  float stopAt = mix(0.1, 0.45, walkRandom(slot, 4.0)) * walkTime;
  float stopFor = mix(3.0, 9.0, walkRandom(slot, 6.0));
  float laterAt = mix(0.55, 0.9, walkRandom(slot, 9.0)) * walkTime + stopFor;
  float laterFor = walkRandom(slot, 10.0) > 0.45 ? mix(3.0, 8.0, walkRandom(slot, 11.0)) : 0.0;
  float elapsed = local - delay;
  float held = clamp(elapsed - stopAt, 0.0, stopFor);
  float heldLater = clamp(elapsed - laterAt, 0.0, laterFor);
  float travelled = speed * (elapsed - held - heldLater);

  if (count < 0.5 || elapsed < 0.0 || travelled > pathLength) {
    return w;
  }

  bool returning = turnsBack && travelled > reach;
  float along = returning ? 2.0 * reach - travelled : travelled;
  float x = (direction > 0.0 ? extent.x : extent.y) + direction * along;

  if (abs(x - pixelX) > margin) {
    return w;
  }

  vec3 laneHere = laneAt(x, level);

  if (laneHere.z < 0.5) {
    return w;
  }

  w.active = true;
  w.x = x;
  w.y = laneHere.x + (walkRandom(slot, 8.0) * 2.0 - 1.0) * laneHere.y;
  w.level = level;
  w.size = size;
  w.facing = returning ? -direction : direction;
  w.travelled = travelled;
  w.speed = speed;
  w.pathLength = pathLength;
  w.elapsed = elapsed;
  w.presence = presenceOf(slot);
  w.slot = slot;
  w.paused = (held > 0.0 && held < stopFor) || (heldLater > 0.0 && heldLater < laterFor);

  return w;
}

// Draws one person with their feet at (x, y), size picture pixels to a sprite
// pixel. Returns the colour and how much of it covers the pixel at p.
vec4 drawPerson(vec2 p, float x, float y, float size, float facing, float frame, float seed) {
  // Snapped to the sprite's own pixels, or it shimmers as it moves
  vec2 feet = floor(vec2(x, y) / size) * size;
  float column = (p.x - feet.x) / size * facing + 3.5;
  float row = 21.0 - (feet.y - p.y) / size;

  if (column < -1.0 || column > 8.0 || row < -1.0 || row > 22.0) {
    return vec4(0.0);
  }

  vec4 pixel = personPixel(floor(column), floor(row), frame, seed);

  // Behind a lamppost or a cannon when standing further back than where it
  // touches the ground
  if (pixel.a > 0.0 && hiddenBehind(p, feet.y)) {
    return vec4(0.0);
  }

  return pixel;
}

// Four poses to a double step, about 0.7 metres of walking each
float strideFrame(float travelled, float size) {
  float stride = mod(floor(travelled / (4.1 * size)), 4.0);

  return stride < 0.5 ? 0.0 : (stride < 1.5 ? 1.0 : (stride < 2.5 ? 2.0 : 1.0));
}

vec4 walker(vec2 p, float index) {
  Walk w = walkOf(index, p.x, 30.0);

  if (!w.active) {
    return vec4(0.0);
  }

  float frame = w.paused ? 1.0 : strideFrame(w.travelled, w.size);
  vec4 pixel = drawPerson(p, w.x, w.y, w.size, w.facing, frame, w.slot);

  // Fades in and out at the ends of the lane
  float fade = clamp(w.elapsed / 0.6, 0.0, 1.0) * clamp((w.pathLength - w.travelled) / (w.speed * 0.6), 0.0, 1.0);

  return vec4(pixel.rgb, pixel.a * fade * w.presence);
}

// A cat turns up somewhere on a lane, sits for a while, wanders a short way
// and sits down again until it is time to move on. Cat 0 is a ginger tabby
// and cat 1 a black cat.
vec4 stray(vec2 p, float index) {
  float time = u_time + index * 23.0;
  float cycle = floor(time / CAT_SLOT);
  float local = time - cycle * CAT_SLOT;
  float slot = cycle + 211.0 + index * 131.0;
  float count = gLevels;
  float level = floor(walkRandom(slot, 12.0) * count);
  vec2 extent = levelExtent(level);
  float personSize = levelSize(level);
  float direction = walkRandom(slot, 1.0) > 0.5 ? 1.0 : -1.0;
  float speed = mix(22.0, 42.0, walkRandom(slot, 2.0)) * personSize / REFERENCE_SIZE;
  float startX = mix(extent.x + 150.0, extent.y - 150.0, walkRandom(slot, 3.0));
  float distance = mix(120.0, 520.0, walkRandom(slot, 4.0)) * personSize / REFERENCE_SIZE;
  float sitFor = mix(3.0, 10.0, walkRandom(slot, 5.0));

  float travelled = clamp((local - sitFor) * speed, 0.0, distance);
  bool walking = local > sitFor && travelled < distance;
  float x = clamp(startX + direction * travelled, extent.x + 20.0, extent.y - 20.0);

  if (abs(p.x - x) > 30.0) {
    return vec4(0.0);
  }

  vec3 laneHere = laneAt(x, level);

  if (count < 0.5 || laneHere.z < 0.5) {
    return vec4(0.0);
  }

  float y = laneHere.x + (walkRandom(slot, 8.0) * 2.0 - 1.0) * laneHere.y;

  // Slightly finer pixels than a person, a cat is smaller
  float size = personSize * 0.9;
  vec2 feet = floor(vec2(x, y) / size) * size;
  float column = (p.x - feet.x) / size * direction + 5.0;
  float row = 6.0 - (feet.y - p.y) / size;

  if (column < -1.0 || column > 11.0 || row < -1.0 || row > 7.0) {
    return vec4(0.0);
  }

  float stride = mod(floor(travelled / (5.0 * size)), 4.0);
  float frame = !walking ? 3.0 : (stride < 0.5 ? 0.0 : (stride < 1.5 ? 1.0 : (stride < 2.5 ? 2.0 : 1.0)));
  vec4 pixel = catPixel(floor(column), floor(row), frame, index);

  if (pixel.a > 0.0 && hiddenBehind(p, feet.y)) {
    return vec4(0.0);
  }

  float fade = clamp(local / 0.8, 0.0, 1.0) * clamp((CAT_SLOT - local) / 0.8, 0.0, 1.0);

  return vec4(pixel.rgb, pixel.a * fade * presenceOf(slot));
}

// A rat freezes, then darts a short way along the foot of the wall, freezes
// again, and so on, four times in a row.
vec4 vermin(vec2 p, float index) {
  float time = u_time + index * 11.0;
  float cycle = floor(time / RAT_SLOT);
  float local = time - cycle * RAT_SLOT;
  float slot = cycle + 1001.0 + index * 113.0;
  float count = gLevels;
  float level = floor(walkRandom(slot, 12.0) * count);
  vec2 extent = levelExtent(level);
  float personSize = levelSize(level);
  float scale = personSize / REFERENCE_SIZE;
  float x = mix(extent.x + 100.0, extent.y - 100.0, walkRandom(slot, 3.0));
  float facing = walkRandom(slot, 4.0) > 0.5 ? 1.0 : -1.0;
  bool moving = false;
  float travelled = 0.0;

  for (int k = 0; k < 4; k++) {
    float kk = float(k);
    float startAt = kk * 9.0 + walkRandom(slot, 20.0 + kk) * 3.0;
    float dash = mix(40.0, 170.0, walkRandom(slot, 30.0 + kk)) * scale;
    float direction = walkRandom(slot, 40.0 + kk) > 0.5 ? 1.0 : -1.0;
    float speed = mix(90.0, 140.0, walkRandom(slot, 50.0 + kk)) * scale;
    float moved = clamp((local - startAt) * speed, 0.0, dash);

    x += direction * moved;

    if (local > startAt) {
      facing = direction;
      moving = moved < dash;
      travelled = moved;
    }
  }

  x = clamp(x, extent.x + 20.0, extent.y - 20.0);

  if (abs(p.x - x) > 30.0) {
    return vec4(0.0);
  }

  vec3 laneHere = laneAt(x, level);

  if (count < 0.5 || laneHere.z < 0.5) {
    return vec4(0.0);
  }

  // Along the foot of the wall, at the near edge of the lane
  float y = laneHere.x + laneHere.y * 0.9;
  float size = personSize * 0.6;
  vec2 feet = floor(vec2(x, y) / size) * size;
  float column = (p.x - feet.x) / size * facing + 4.0;
  float row = 4.0 - (feet.y - p.y) / size;

  if (column < -1.0 || column > 9.0 || row < -1.0 || row > 5.0) {
    return vec4(0.0);
  }

  float stride = mod(floor(travelled / (3.0 * size)), 4.0);
  float frame = !moving ? 3.0 : (stride < 0.5 ? 0.0 : (stride < 1.5 ? 1.0 : (stride < 2.5 ? 2.0 : 1.0)));
  vec4 pixel = ratPixel(floor(column), floor(row), frame);

  if (pixel.a > 0.0 && hiddenBehind(p, feet.y)) {
    return vec4(0.0);
  }

  float fade = clamp(local / 0.8, 0.0, 1.0) * clamp((RAT_SLOT - local) / 0.8, 0.0, 1.0);

  return vec4(pixel.rgb, pixel.a * fade * presenceOf(slot));
}

// Fog rolls in from the sea, thickest in the distance at the top of the map
// and over the open water and sky, thinning out towards the bottom
vec4 fog(vec4 base, vec2 p, float skyMask, float waterMask) {
  vec2 q = p / u_size.x * vec2(4.0, 10.0);
  float wisps = smoothstep(0.35, 0.7, fbm(q + vec2(-u_time * 0.05, u_time * 0.01)));
  float banks = smoothstep(0.3, 0.65, fbm(q * 0.35 + vec2(u_time * 0.02, 3.0)));
  float far = 1.0 - smoothstep(0.05, 0.9, v_uv.y);
  float open = max(skyMask, waterMask * 0.6);
  float density = (0.12 + 0.75 * far + 0.25 * open) * (0.4 + 0.45 * banks + 0.5 * wisps);

  return over(base, FOG_COLOR, clamp(density, 0.0, 0.9) * u_fog);
}

vec4 seagull(vec4 base, vec2 p, float i) {
  float t = u_time;
  float size = clamp(u_size.x * 0.012, 8.0, 18.0) * (0.75 + 0.5 * hash(i + 3.0));
  float speed = 25.0 + 20.0 * hash(i + 1.0);
  float span = u_size.x + size * 4.0;

  float x = mod(t * speed + hash(i + 7.0) * span, span) - size * 2.0;
  x = hash(i + 11.0) > 0.5 ? x : u_size.x - x;
  float y = u_size.y * (0.06 + 0.3 * hash(i + 5.0)) + sin(t * 0.4 + i * 2.0) * size * 1.5;

  // Local coordinates, wing tips at x = -1 and 1, y pointing up
  vec2 q = vec2(p.x - x, y - p.y) / size;

  if (abs(q.x) > 1.2 || abs(q.y) > 1.2) {
    return base;
  }

  // A few wing beats, then a glide with the wings held up
  float beat = sin(t * (7.0 + 2.0 * hash(i + 13.0)) + i * 3.0);
  float glide = smoothstep(0.2, 0.7, sin(t * 0.5 + i * 1.7));
  float flap = mix(beat, 0.7, glide);

  // Wings rise to an elbow and drop to the tips, tapering as they go
  float ax = abs(q.x);
  float wingY = flap * (1.2167 * ax - 1.1667 * ax * ax);
  float thickness = mix(0.16, 0.03, ax);
  float wing = (abs(q.y - wingY) - thickness) * size;
  wing = max(wing, (ax - 1.0) * size);

  float body = (length(q / vec2(0.17, 0.11)) - 1.0) * size * 0.11;
  float dist = min(wing, body);
  float alpha = (1.0 - smoothstep(-0.5, 0.5, dist)) * u_gulls;

  if (alpha <= 0.0) {
    return base;
  }

  vec3 wingColor = mix(vec3(0.82, 0.84, 0.87), vec3(0.18, 0.18, 0.2), smoothstep(0.72, 0.85, ax));
  vec3 color = mix(wingColor, vec3(0.97), 1.0 - smoothstep(-0.5, 0.5, body));

  // Darker edges keep the gulls visible against clouds and white walls
  color = mix(color * 0.6, color, smoothstep(0.0, 0.8, -dist));

  return over(base, color, alpha);
}

void main() {
  vec2 p = v_uv * u_size;
  float waterMask = texture2D(u_water, v_uv).a;
  float skyMask = texture2D(u_sky, v_uv).a;
  vec4 color = vec4(0.0);

  if (waterMask > 0.01) {
    // Choppier in the rain
    float amplitude = WATER_AMPLITUDE * (1.0 + 0.6 * u_rain);
    color = water(u_water, v_uv, u_size, waterMask, amplitude);
  }

  if (skyMask > 0.01) {
    color = clouds(color, p, u_size.x, skyMask, u_cloudCover, u_cloudShade);
  }

  // The drawn flags wave over the picture, which has none of its own
  vec2 flagPixel = v_uv * u_mapSize;
  vec2 flagBlock = (floor(flagPixel / FLAG_PIXEL) + 0.5) * FLAG_PIXEL;

  if (u_flagCount > 0.5 && nearFlag(flagPixel)) {
    vec4 pole = flagPole(flagBlock);
    color = mix(color, vec4(pole.rgb, 1.0), pole.a);

    vec4 cloth = flagCloth(flagBlock);
    color = mix(color, vec4(cloth.rgb, 1.0), cloth.a);
  }

  // Only look for people and cats near a lane, most of the picture never does
  gLevels = levelCount();
  float levels = gLevels;
  vec2 pixel = v_uv * u_mapSize;
  bool nearLane = false;

  for (int i = 0; i < 7; i++) {
    if (float(i) < levels) {
      vec3 lane = laneAt(pixel.x, float(i));

      if (lane.z > 0.5 && pixel.y > lane.x - 80.0 && pixel.y < lane.x + 20.0) {
        nearLane = true;
      }
    }
  }

  if (nearLane) {
    for (int i = 0; i < RATS; i++) {
      vec4 animal = vermin(pixel, float(i));
      color = over(color, animal.rgb, animal.a);
    }

    for (int i = 0; i < CATS; i++) {
      vec4 animal = stray(pixel, float(i));
      color = over(color, animal.rgb, animal.a);
    }

    for (int i = 0; i < WALKERS; i++) {
      vec4 person = walker(pixel, float(i));
      color = over(color, person.rgb, person.a);
    }
  }

  if (u_rain > 0.0) {
    color = over(color, OVERCAST_COLOR, 0.2 * u_rain);
  }

  if (u_gulls > 0.0) {
    for (int i = 0; i < SEAGULLS; i++) {
      color = seagull(color, p, float(i));
    }
  }

  if (u_fog > 0.0) {
    color = fog(color, p, skyMask, waterMask);
  }

  if (u_rain > 0.0) {
    color = rain(color, p, vec2(7.0, 70.0), 2.2, 0.0, u_rain);
    color = rain(color, p, vec2(11.0, 110.0), 1.6, 41.0, u_rain);
  }

  gl_FragColor = color;
}
`

const TEXTURES = ["u_image", "u_water", "u_sky", "u_walkFront"] as const

// Textures in this order: image, water, sky, what people walk behind.
// Uniforms from getWeatherAmbience.
export const createTownMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)

// Builds the shader in the background, for when a harbour is about to be shown
export const warmUpTownMapShader = () => warmUpShader(FRAGMENT_SHADER)
