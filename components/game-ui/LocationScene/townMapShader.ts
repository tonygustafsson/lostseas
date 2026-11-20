// Brings a town map to life with WebGL, in a single pass over one canvas:
// rippling water (where the water mask is), drifting clouds (where the sky
// mask is), flags waving in the wind (where the flag mask is) and a few seagulls flying over everything. The weather decides how
// cloudy it is, and can bring rain or fog over the whole town.

import { createAmbienceRenderer, SHADER_COMMON } from "./ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;
uniform sampler2D u_flag;
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

// A flag ripples from the pole to the free end, which is where the flag mask is
// red. Pixels are pulled from a little up, down and sideways, but never from
// outside the flag.
vec4 flag(vec2 uv, float pole) {
  float amplitude = max(1.5, u_size.x * 0.0015) * u_wind;
  // The speed stays fixed, scaling time by the fading wind would make the
  // flag whip around while the weather changes
  float phase = u_time * 4.0 - pole * 7.0;
  float wave = sin(phase) + 0.4 * sin(phase * 1.7 + 1.0);
  vec2 offset = vec2(0.5 * cos(phase), wave) * amplitude * pole / u_size;
  vec2 waved = uv + offset;

  if (texture2D(u_flag, waved).a < 0.5) {
    waved = uv;
  }

  // Crests catch the light, troughs fall into shade
  vec3 color = texture2D(u_image, waved).rgb * (1.0 + 0.1 * wave * pole * min(u_wind, 1.0));

  return vec4(color, 1.0);
}

// One pixel of a townsperson in 1715, on a grid 7 wide and 21 tall with the
// head at the top. Frame 0 and 2 are the two strides, frame 1 has the feet
// together. Seed picks the clothes. A gentleman wears a tricorn hat or a
// powdered wig with a long coat, a woman a cap and a long skirt. Role 1 is a
// porter carrying a crate and role 2 a porter with empty hands.
vec4 person(float col, float row, float frame, float seed, float role) {
  float r = row - 1.0;
  bool porter = role > 0.5;
  float pick = floor(hash(seed + 20.0) * 6.0);
  vec3 coat = pick < 1.0 ? vec3(0.45, 0.28, 0.2)
    : pick < 2.0 ? vec3(0.2, 0.27, 0.42)
    : pick < 3.0 ? vec3(0.55, 0.48, 0.34)
    : pick < 4.0 ? vec3(0.28, 0.38, 0.26)
    : pick < 5.0 ? vec3(0.5, 0.22, 0.2)
    : vec3(0.36, 0.34, 0.33);
  float tone = hash(seed + 21.0);
  vec3 skin = mix(vec3(0.86, 0.66, 0.52), vec3(0.45, 0.3, 0.2), tone * tone);
  bool woman = !porter && hash(seed + 22.0) > 0.5;
  bool wig = !woman && !porter && hash(seed + 23.0) > 0.7;
  vec3 hat = mix(vec3(0.13, 0.11, 0.1), vec3(0.24, 0.2, 0.3), hash(seed + 24.0));
  vec3 hair = mix(vec3(0.25, 0.15, 0.08), vec3(0.7, 0.55, 0.3), hash(seed + 25.0));
  vec3 wigColor = vec3(0.82, 0.8, 0.78);
  vec3 dark = vec3(0.12, 0.1, 0.1);
  vec3 linen = vec3(0.86, 0.82, 0.72);
  vec3 trousers = vec3(0.32, 0.25, 0.18);

  // Porters wear rolled sleeves and a plain shirt
  if (porter) {
    coat = mix(linen * 0.9, coat, 0.3);
  }

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
    return vec4(woman ? linen : (wig ? wigColor : (porter ? vec3(0.0) : hat)), porter ? 0.0 : 1.0);
  }

  if (r == 0.0) {
    if (porter && col >= 1.0 && col <= 5.0) {
      return vec4(hair * 0.8, 1.0);
    }

    if (woman && col >= 1.0 && col <= 5.0) {
      return vec4(linen, 1.0);
    }

    if (wig && col >= 1.0 && col <= 5.0) {
      return vec4(wigColor, 1.0);
    }

    if (!woman && !wig && !porter) {
      return vec4(col == 0.0 || col == 6.0 ? hat * 1.7 : hat, 1.0);
    }
  }

  // Shoulders
  if (r == 4.0 && col >= 1.0 && col <= 5.0) {
    return vec4(coat, 1.0);
  }

  // A crate held in front, with the hands under it
  if (role > 0.5 && role < 1.5 && col >= 4.0 && col <= 6.0 && r >= 6.0 && r <= 9.0) {
    bool edge = r == 6.0 || r == 9.0 || col == 6.0;

    return vec4(edge ? vec3(0.4, 0.27, 0.14) : vec3(0.62, 0.44, 0.24), 1.0);
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
    float hem = (r >= 13.0 && !porter) ? 1.0 : 0.0;

    if (col >= 2.0 - hem && col <= 4.0 + hem) {
      if (porter) {
        return vec4(trousers, 1.0);
      }

      return vec4(coat * (col == 2.0 - hem || col == 4.0 + hem ? 0.8 : 1.0), 1.0);
    }
  }

  // White stockings and shoes, the far leg in shade
  float farLeg = frame < 0.5 ? 1.0 : (frame > 1.5 ? 5.0 : 2.0);
  float nearLeg = frame < 0.5 ? 5.0 : (frame > 1.5 ? 1.0 : 4.0);
  vec3 legs = porter ? trousers : linen;

  if (r >= 15.0 && r <= 18.0) {
    if (col == nearLeg) {
      return vec4(legs, 1.0);
    }

    if (col == farLeg) {
      return vec4(legs * 0.72, 1.0);
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
vec4 personPixel(float col, float row, float frame, float seed, float role) {
  vec4 here = person(col, row, frame, seed, role);

  if (here.a > 0.5) {
    return here;
  }

  float near = person(col - 1.0, row, frame, seed, role).a +
    person(col + 1.0, row, frame, seed, role).a +
    person(col, row - 1.0, frame, seed, role).a +
    person(col, row + 1.0, frame, seed, role).a;

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
  vec4 here = cat(col, row, frame, kind);

  if (here.a > 0.5) {
    return here;
  }

  float near = cat(col - 1.0, row, frame, kind).a +
    cat(col + 1.0, row, frame, kind).a +
    cat(col, row - 1.0, frame, kind).a +
    cat(col, row + 1.0, frame, kind).a;

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
  vec4 here = rat(col, row, frame);

  if (here.a > 0.5) {
    return here;
  }

  float near = rat(col - 1.0, row, frame).a + rat(col + 1.0, row, frame).a +
    rat(col, row - 1.0, frame).a + rat(col, row + 1.0, frame).a;

  if (near > 0.5) {
    return vec4(0.07, 0.05, 0.04, 0.8);
  }

  return vec4(0.0);
}

// A bird on a grid 8 wide and 5 tall, facing right. Frame 0 stands, frame 1
// pecks at the ground and frame 2 flutters up. Kind 0 is a grey pigeon and
// kind 1 a brown hen with a red comb.
vec4 bird(float col, float row, float frame, float kind) {
  vec3 body = kind < 0.5 ? vec3(0.5, 0.52, 0.58) : vec3(0.58, 0.38, 0.2);
  vec3 head = kind < 0.5 ? vec3(0.32, 0.4, 0.5) : vec3(0.92, 0.88, 0.8);
  vec3 beak = vec3(0.9, 0.62, 0.2);

  // Wings up when fluttering
  if (frame > 1.5) {
    if (row <= 1.0 && col >= 2.0 && col <= 4.0) {
      return vec4(body * 0.8, 1.0);
    }

    if (row >= 2.0 && row <= 3.0 && col >= 1.0 && col <= 5.0) {
      return vec4(body, 1.0);
    }

    if (row >= 1.0 && row <= 2.0 && col >= 5.0 && col <= 6.0) {
      return vec4(head, 1.0);
    }

    if (row == 2.0 && col == 7.0) {
      return vec4(beak, 1.0);
    }

    return vec4(0.0);
  }

  // Tail and body
  if (row == 2.0 && col == 0.0) {
    return vec4(body * 0.7, 1.0);
  }

  if (row >= 2.0 && row <= 3.0 && col >= 1.0 && col <= 5.0) {
    return vec4(row == 2.0 ? body * 1.1 : body * 0.9, 1.0);
  }

  // Head up, or down at the ground when pecking
  if (frame < 0.5) {
    if (row >= 0.0 && row <= 1.0 && col >= 5.0 && col <= 6.0) {
      return vec4(row == 0.0 && kind > 0.5 && col == 5.0 ? vec3(0.8, 0.15, 0.12) : head, 1.0);
    }

    if (row == 1.0 && col == 7.0) {
      return vec4(beak, 1.0);
    }

    if (row == 2.0 && col == 5.0) {
      return vec4(head, 1.0);
    }
  } else {
    if (row >= 3.0 && row <= 4.0 && col >= 6.0 && col <= 7.0) {
      return vec4(row == 4.0 && col == 7.0 ? beak : head, 1.0);
    }
  }

  // Thin legs
  if (row == 4.0 && (col == 3.0 || col == 4.0)) {
    return vec4(0.45, 0.3, 0.25, 1.0);
  }

  return vec4(0.0);
}

vec4 birdPixel(float col, float row, float frame, float kind) {
  vec4 here = bird(col, row, frame, kind);

  if (here.a > 0.5) {
    return here;
  }

  float near = bird(col - 1.0, row, frame, kind).a + bird(col + 1.0, row, frame, kind).a +
    bird(col, row - 1.0, frame, kind).a + bird(col, row + 1.0, frame, kind).a;

  if (near > 0.5) {
    return vec4(0.08, 0.06, 0.05, 0.8);
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
const int PAIRS = 2;
const int PORTERS = 2;
const int CATS = 2;
const int RATS = 2;
const int FLOCKS = 2;
const float WALK_SLOT = 110.0;
const float TALK_SLOT = 120.0;
const float PORTER_SLOT = 90.0;
const float CAT_SLOT = 55.0;
const float RAT_SLOT = 40.0;
const float FLOCK_SLOT = 70.0;

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
vec4 drawPerson(vec2 p, float x, float y, float size, float facing, float frame, float seed, float role) {
  // Snapped to the sprite's own pixels, or it shimmers as it moves
  vec2 feet = floor(vec2(x, y) / size) * size;
  float column = (p.x - feet.x) / size * facing + 3.5;
  float row = 21.0 - (feet.y - p.y) / size;

  if (column < -1.0 || column > 8.0 || row < -1.0 || row > 22.0) {
    return vec4(0.0);
  }

  vec4 pixel = personPixel(floor(column), floor(row), frame, seed, role);

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
  vec4 pixel = drawPerson(p, w.x, w.y, w.size, w.facing, frame, w.slot, 0.0);

  // Fades in and out at the ends of the lane
  float fade = clamp(w.elapsed / 0.6, 0.0, 1.0) * clamp((w.pathLength - w.travelled) / (w.speed * 0.6), 0.0, 1.0);

  return vec4(pixel.rgb, pixel.a * fade * w.presence);
}

// Two people meet, face each other and talk for a good while, waving their
// arms now and then, and then each goes back the way they came. Who 0 comes in
// from the start of the street and who 1 from the end.
vec4 talker(vec2 p, float pair, float who) {
  float time = u_time + pair * 41.0;
  float cycle = floor(time / TALK_SLOT);
  float local = time - cycle * TALK_SLOT;
  float slot = cycle + 401.0 + pair * 173.0;
  float count = gLevels;
  float level = floor(walkRandom(slot, 12.0) * count);
  vec2 extent = levelExtent(level);
  float size = levelSize(level);
  float lane = extent.y - extent.x;
  float meet = extent.x + mix(0.35, 0.65, walkRandom(slot, 2.0)) * lane;
  float gap = 9.0 * size;
  bool first = who < 0.5;
  float speedA = mix(26.0, 38.0, walkRandom(slot, 3.0)) * size / REFERENCE_SIZE;
  float speedB = mix(26.0, 38.0, walkRandom(slot, 4.0)) * size / REFERENCE_SIZE;
  float distanceA = meet - gap * 0.5 - extent.x;
  float distanceB = extent.y - meet - gap * 0.5;
  float arrive = max(distanceA / speedA, distanceB / speedB) + walkRandom(slot, 5.0) * 8.0;
  float talkFor = mix(8.0, 16.0, walkRandom(slot, 6.0));

  float speed = first ? speedA : speedB;
  float travel = first ? distanceA : distanceB;
  float direction = first ? 1.0 : -1.0;
  float home = first ? extent.x : extent.y;
  float stand = first ? meet - gap * 0.5 : meet + gap * 0.5;
  float startAt = arrive - travel / speed;
  float leaveAt = arrive + talkFor;
  float x = stand;
  float facing = direction;
  float travelled = travel;
  float fade = 1.0;
  bool talking = false;

  if (count < 0.5 || local < startAt) {
    return vec4(0.0);
  }

  if (local < arrive) {
    travelled = (local - startAt) * speed;
    x = home + direction * travelled;
    fade = clamp((local - startAt) / 0.6, 0.0, 1.0);
  } else if (local < leaveAt) {
    talking = true;
  } else {
    float back = (local - leaveAt) * speed;

    if (back > travel) {
      return vec4(0.0);
    }

    x = stand - direction * back;
    facing = -direction;
    travelled = travel + back;
    fade = clamp((travel - back) / (speed * 0.6), 0.0, 1.0);
  }

  if (abs(p.x - x) > 30.0) {
    return vec4(0.0);
  }

  vec3 laneHere = laneAt(x, level);

  if (laneHere.z < 0.5) {
    return vec4(0.0);
  }

  float y = laneHere.x + (walkRandom(slot, 8.0) * 2.0 - 1.0) * laneHere.y;

  // Waving a hand now and then, each in their own time
  float gesture = sin(u_time * 1.9 + who * 2.7 + slot) + 0.6 * sin(u_time * 3.1 + who * 1.3);
  float frame = talking ? (gesture > 0.9 ? 0.0 : (gesture < -0.9 ? 2.0 : 1.0)) : strideFrame(travelled, size);
  vec4 pixel = drawPerson(p, x, y, size, facing, frame, slot * 2.0 + who + 3.0, 0.0);

  return vec4(pixel.rgb, pixel.a * fade * presenceOf(slot));
}

// A porter carries a crate from one place to another, puts it down, walks back
// empty handed, and does it all again.
vec4 porter(vec2 p, float index) {
  float time = u_time + index * 29.0;
  float cycle = floor(time / PORTER_SLOT);
  float local = time - cycle * PORTER_SLOT;
  float slot = cycle + 601.0 + index * 157.0;
  float count = gLevels;
  float level = floor(walkRandom(slot, 12.0) * count);
  vec2 extent = levelExtent(level);
  float size = levelSize(level);
  float lane = extent.y - extent.x;
  float speed = mix(18.0, 26.0, walkRandom(slot, 2.0)) * size / REFERENCE_SIZE;
  float distance = min(mix(220.0, 480.0, walkRandom(slot, 3.0)) * size / REFERENCE_SIZE, lane * 0.6);
  float from = mix(extent.x + 40.0, extent.y - 40.0 - distance, walkRandom(slot, 4.0));
  float rest = mix(2.5, 5.0, walkRandom(slot, 5.0));
  float leg = distance / speed;
  float t = mod(local, 2.0 * (leg + rest));

  if (count < 0.5) {
    return vec4(0.0);
  }

  float x = from;
  float facing = 1.0;
  float travelled = 0.0;
  float role = 2.0;

  if (t < leg) {
    x = from + t * speed;
    travelled = t * speed;
    role = 1.0;
  } else if (t < leg + rest) {
    x = from + distance;
  } else if (t < 2.0 * leg + rest) {
    x = from + distance - (t - leg - rest) * speed;
    travelled = (t - leg - rest) * speed;
    facing = -1.0;
  } else {
    facing = -1.0;
  }

  if (abs(p.x - x) > 30.0) {
    return vec4(0.0);
  }

  vec3 laneHere = laneAt(x, level);

  if (laneHere.z < 0.5) {
    return vec4(0.0);
  }

  float y = laneHere.x + (walkRandom(slot, 8.0) * 2.0 - 1.0) * laneHere.y;
  bool standing = t >= leg && t < leg + rest || t >= 2.0 * leg + rest;
  float frame = standing ? 1.0 : strideFrame(travelled, size);
  vec4 pixel = drawPerson(p, x, y, size, facing, frame, slot * 3.0, role);
  float fade = clamp(local / 0.8, 0.0, 1.0) * clamp((PORTER_SLOT - local) / 0.8, 0.0, 1.0);

  return vec4(pixel.rgb, pixel.a * fade * presenceOf(slot));
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

// Two flocks of three birds peck about on the street. Somebody walking by
// startles them, they flutter up and spread out, and settle again when the
// person has gone. Flock 0 are pigeons and flock 1 are hens.
vec4 flocks(vec4 base, vec2 p) {
  vec4 color = base;

  for (int f = 0; f < FLOCKS; f++) {
    float time = u_time + float(f) * 37.0;
    float cycle = floor(time / FLOCK_SLOT);
    float local = time - cycle * FLOCK_SLOT;
    float slot = cycle + 801.0 + float(f) * 191.0;
    float count = gLevels;
    float level = floor(walkRandom(slot, 12.0) * count);
    vec2 extent = levelExtent(level);
    float personSize = levelSize(level);
    float scale = personSize / REFERENCE_SIZE;
    float centre = mix(extent.x + 120.0, extent.y - 120.0, walkRandom(slot, 3.0));

    // Nothing to do unless the pixel is near the flock
    if (count < 0.5 || abs(p.x - centre) > 140.0 * scale) {
      continue;
    }

    float reach = 90.0 * scale;
    float startle = 0.0;

    for (int i = 0; i < WALKERS; i++) {
      Walk w = walkOf(float(i), 0.0, 100000.0);

      if (w.active && w.level == level) {
        startle = max(startle, clamp((reach - abs(w.x - centre)) / reach, 0.0, 1.0) * w.presence);
      }
    }

    vec3 laneHere = laneAt(centre, level);

    if (laneHere.z < 0.5) {
      continue;
    }

    float fade = clamp(local / 0.8, 0.0, 1.0) * clamp((FLOCK_SLOT - local) / 0.8, 0.0, 1.0) * presenceOf(slot);

    for (int b = 0; b < 3; b++) {
      float bb = float(b);
      float spot = (bb - 1.0) * mix(16.0, 24.0, walkRandom(slot, 30.0 + bb)) * scale;
      float x = centre + spot * (1.0 + 2.5 * startle);
      float lift = startle * mix(25.0, 45.0, walkRandom(slot, 40.0 + bb)) * scale;
      float flutter = startle > 0.1 ? sin(u_time * 18.0 + bb * 2.0) * 1.5 * scale : 0.0;
      float y = laneHere.x + (walkRandom(slot, 50.0 + bb) * 2.0 - 1.0) * laneHere.y - lift + flutter;
      float facing = walkRandom(slot, 60.0 + bb) > 0.5 ? 1.0 : -1.0;
      float peck = hash(floor(u_time * 2.5 + bb * 3.0) + slot) > 0.45 ? 1.0 : 0.0;
      float frame = startle > 0.15 ? 2.0 : peck;
      float size = personSize * 0.55;
      vec2 feet = floor(vec2(x, y) / size) * size;
      float column = (p.x - feet.x) / size * facing + 4.0;
      float row = 5.0 - (feet.y - p.y) / size;

      if (column < -1.0 || column > 9.0 || row < -1.0 || row > 6.0) {
        continue;
      }

      vec4 pixel = birdPixel(floor(column), floor(row), frame, float(f));

      if (pixel.a > 0.0 && !hiddenBehind(p, feet.y + lift)) {
        color = over(color, pixel.rgb, pixel.a * fade);
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

  vec4 flagMask = texture2D(u_flag, v_uv);

  if (flagMask.a > 0.5) {
    color = flag(v_uv, flagMask.r);
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
    color = flocks(color, pixel);

    for (int i = 0; i < RATS; i++) {
      vec4 animal = vermin(pixel, float(i));
      color = over(color, animal.rgb, animal.a);
    }

    for (int i = 0; i < CATS; i++) {
      vec4 animal = stray(pixel, float(i));
      color = over(color, animal.rgb, animal.a);
    }

    for (int i = 0; i < PORTERS; i++) {
      vec4 person = porter(pixel, float(i));
      color = over(color, person.rgb, person.a);
    }

    for (int i = 0; i < WALKERS; i++) {
      vec4 person = walker(pixel, float(i));
      color = over(color, person.rgb, person.a);
    }

    // Whoever is nearer, the first of a pair is drawn last
    for (int i = 0; i < PAIRS; i++) {
      vec4 second = talker(pixel, float(i), 1.0);
      color = over(color, second.rgb, second.a);
      vec4 first = talker(pixel, float(i), 0.0);
      color = over(color, first.rgb, first.a);
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

const TEXTURES = [
  "u_image",
  "u_water",
  "u_sky",
  "u_flag",
  "u_walkFront",
] as const

// Textures in this order: image, water, sky, flags, what people walk behind.
// Uniforms from getWeatherAmbience.
export const createTownMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)
