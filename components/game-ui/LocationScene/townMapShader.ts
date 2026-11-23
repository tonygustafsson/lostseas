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
import { MAX_FLAGS } from "./flagUniforms"
import { WALKER_COUNT } from "./walkers"
import { WALKER_SHEET, WALKER_SHEET_ROWS } from "./walkSprites"
import { MAX_LEVELS } from "./walkUniforms"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;
// The sky grown a little and blurred, for the darkness of a gloomy day
uniform sampler2D u_skyGloom;
uniform float u_gloom;
// What people walk behind: alpha marks it, red and green hold the height where
// it meets the ground in 1/16 pixels, see frontMask.ts
uniform sampler2D u_walkFront;
uniform vec2 u_imageSize;
// The size the streets and the front mask were drawn at. The picture that is
// loaded can be a resized copy, so u_imageSize is not it.
uniform vec2 u_mapSize;

// Street levels, see walkUniforms.ts
const int MAX_LEVELS = ${MAX_LEVELS};
// x start, x end, feet and half the width of a lane
uniform vec4 u_laneBox[MAX_LEVELS];
uniform float u_laneCount;

// Flags drawn by the shader, in pixels of the harbour picture. Each is four
// corners (x start and end, top and bottom at the pole, top and bottom at the
// free end), a nation and whether it has a pole, see flagUniforms.ts
const int MAX_FLAGS = ${MAX_FLAGS};
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

// Water ripple strength in CSS pixels
const float WATER_AMPLITUDE = 1.875;
const int SEAGULLS = 5;
const vec3 FOG_COLOR = vec3(0.9, 0.92, 0.94);
const vec3 OVERCAST_COLOR = vec3(0.08, 0.1, 0.14);
// How much darker the sky and water get on a gloomy day, a bit more than indoors
const float OPEN_GLOOM = 1.25;

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

// Whether the object in the front mask hides somebody whose feet are at feetY
bool hiddenBehind(vec2 p, float feetY) {
  vec4 front = texture2D(u_walkFront, p / u_mapSize);
  float base = (floor(front.r * 255.0 + 0.5) * 256.0 + floor(front.g * 255.0 + 0.5)) / 16.0;

  return front.a > 0.5 && feetY < base;
}

// The people, cats and rats on the streets. Where they are and which pose of
// the sheet they have is worked out in walkers.ts and arrives as two uniform
// lists, in the order they are drawn (A: feet x and y, picture pixels to a sprite
// pixel, facing. B: sheet column and row, opacity, middle of the sprite).
// Everything is in this one loop on purpose, see the notes on build time in
// the graphical-ambience skill.
const int WALKER_COUNT = ${WALKER_COUNT};
uniform vec4 u_walkA[WALKER_COUNT];
uniform vec4 u_walkB[WALKER_COUNT];
uniform sampler2D u_walkSprites;

const vec2 CELL = vec2(${WALKER_SHEET.cellWidth}.0, ${WALKER_SHEET.cellHeight}.0);
const vec2 SHEET = vec2(${WALKER_SHEET.columns * WALKER_SHEET.cellWidth}.0, ${WALKER_SHEET_ROWS * WALKER_SHEET.cellHeight}.0);
const float FEET_ROW = ${WALKER_SHEET.feetRow}.0;

vec4 walkerLayer(vec4 color, vec2 p) {
  for (int i = 0; i < WALKER_COUNT; i++) {
    vec4 a = u_walkA[i];
    vec4 b = u_walkB[i];
    float size = a.z;

    if (b.z > 0.0 && abs(p.x - a.x) < CELL.x * size && abs(p.y - a.y) < CELL.y * size) {
      // Snapped to the sprite's own pixels, or it shimmers as it moves
      vec2 feet = floor(a.xy / size) * size;
      vec2 cell = floor(vec2(
        (p.x - feet.x) / size * a.w + b.w,
        FEET_ROW - (feet.y - p.y) / size
      ));

      if (cell.x >= 0.0 && cell.x < CELL.x && cell.y >= 0.0 && cell.y < CELL.y) {
        // The middle of a texel, so the sheet is not blurred
        vec2 texel = (vec2(b.x, b.y) * CELL + cell + 0.5) / SHEET;
        vec4 sprite = texture2D(u_walkSprites, texel);

        // Behind a lamppost or a cannon when standing further back than where
        // it touches the ground
        if (sprite.a > 0.0 && !hiddenBehind(p, feet.y)) {
          color = over(color, sprite.rgb, sprite.a * b.z);
        }
      }
    }
  }

  return color;
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

  // The sky and water darken as a whole, also where there is no cloud
  if (u_gloom > 0.0) {
    float gloomMask = max(texture2D(u_skyGloom, v_uv).a, waterMask);
    color = over(color, OVERCAST_COLOR, u_gloom * OPEN_GLOOM * gloomMask);
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
  vec2 pixel = v_uv * u_mapSize;
  bool nearLane = false;

  for (int i = 0; i < MAX_LEVELS; i++) {
    if (float(i) < u_laneCount) {
      vec4 lane = u_laneBox[i];

      if (pixel.x > lane.x + 2.0 && pixel.x < lane.y - 2.0 && pixel.y > lane.z - 80.0 && pixel.y < lane.z + 20.0) {
        nearLane = true;
      }
    }
  }

  if (nearLane) {
    color = walkerLayer(color, pixel);
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

const TEXTURES = [
  "u_image",
  "u_water",
  "u_sky",
  "u_skyGloom",
  "u_walkFront",
  "u_walkSprites",
] as const

// Textures in this order: image, water, sky, the sky for the gloom, what people
// walk behind, the sheet of people, cats and rats.
// Uniforms from getWeatherAmbience.
export const createTownMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)

// Builds the shader in the background, for when a harbour is about to be shown
export const warmUpTownMapShader = () => warmUpShader(FRAGMENT_SHADER)
