// Brings the sea map to life with WebGL: small wave crests rolling over the
// water, and the weather drifting over the whole map in a few clouds, a light
// rain or a thin fog. The image itself is never displaced, so the ink lines
// and labels stay crisp.

import {
  createAmbienceRenderer,
  SHADER_COMMON,
} from "@/components/game-ui/LocationScene/ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;

// The weather, see weatherAmbience.ts. Kept faint, the map must stay readable.
uniform float u_cloudCover;
uniform float u_cloudShade;
uniform float u_rain;
uniform float u_fog;

const float WAVE_STRENGTH = 0.5;
const vec3 FOG_COLOR = vec3(0.93, 0.94, 0.95);
// Dark streaks, pale ones would vanish on the parchment
const vec3 RAIN_INK = vec3(0.3, 0.38, 0.5);
// 1.0 is the original pace
const float WAVE_SPEED = 0.75;

// How far from land, in map units, the waves start to fade out
const float COAST_MARGIN = 12.0;

// Crests roll diagonally and are broken into short strokes that come and go.
// A pale crest with a darker trough behind it reads on light parchment.
vec3 waves(vec3 color, vec2 p) {
  float t = u_time * WAVE_SPEED;
  float warp = noise(p * 0.12 + t * 0.2) * 4.0;
  float phase = p.x * 0.45 + p.y * 0.2 + warp - t * 2.4;
  float strokes = smoothstep(0.45, 0.75, noise(p * 0.3 + vec2(t * 0.6, 0.0)));
  float crest = smoothstep(0.75, 1.0, sin(phase)) * strokes;
  float trough = smoothstep(0.75, 1.0, sin(phase + 0.9)) * strokes;

  color = mix(color, color * vec3(0.5, 0.6, 0.78), trough * WAVE_STRENGTH * 0.6);

  // Pale blue crests and blue-grey troughs, a hint of sea on the parchment
  return mix(color, vec3(0.86, 0.94, 1.0), crest * WAVE_STRENGTH);
}

// The share of water around uv, sampled on two rings so the waves fade out
// smoothly towards the coast instead of running up to it
float openWater(vec2 uv) {
  float sum = 0.0;

  for (int i = 0; i < 8; i++) {
    float angle = float(i) * 0.785398;
    vec2 direction = vec2(cos(angle), sin(angle)) / u_size;

    sum += texture2D(u_water, uv + direction * COAST_MARGIN).r;
    sum += texture2D(u_water, uv + direction * COAST_MARGIN * 0.5).r;
  }

  return smoothstep(0.75, 1.0, sum / 16.0);
}

// A few soft clouds drifting over the map, each with its shadow a little below
vec3 mapClouds(vec3 color, vec2 p) {
  vec2 q = p / u_size.x * 5.0 + vec2(-u_time * 0.015, u_time * 0.004);
  float threshold = mix(0.6, 0.45, u_cloudCover);
  float shadow = smoothstep(threshold, threshold + 0.12, fbm(q - vec2(0.08, 0.16)));
  float cloud = smoothstep(threshold, threshold + 0.12, fbm(q));
  vec3 cloudColor = mix(vec3(1.0), vec3(0.62, 0.65, 0.7), u_cloudShade);

  // Sunny and partly sunny days are clear, clouds only gather when it is
  // cloudier than that
  float sky = smoothstep(0.4, 0.5, u_cloudCover);

  // Grey days dim the whole map a little, not only under the clouds
  color = mix(color, color * vec3(0.82, 0.85, 0.9), u_cloudShade * 0.5);

  // White clouds hardly show on parchment, their shadows are what reads
  color = mix(color, color * vec3(0.55, 0.6, 0.68), shadow * 0.45 * sky);

  return mix(color, cloudColor, cloud * 0.65 * sky);
}

// Thin banks of haze, never thick enough to hide a town
vec3 mapFog(vec3 color, vec2 p) {
  vec2 q = p / u_size.x * 3.0 + vec2(-u_time * 0.01, 0.0);
  float banks = smoothstep(0.35, 0.75, fbm(q));

  return mix(color, FOG_COLOR, (0.12 + 0.3 * banks) * u_fog);
}

void main() {
  vec2 p = v_uv * u_size;
  vec3 color = texture2D(u_image, v_uv).rgb;

  // The mask is opaque black and white, white is water
  float water = texture2D(u_water, v_uv).r;

  if (water > 0.5) {
    color = mix(color, waves(color, p), openWater(v_uv));
  }

  if (u_cloudCover > 0.4) {
    color = mapClouds(color, p);
  }

  if (u_fog > 0.0) {
    color = mapFog(color, p);
  }

  if (u_rain > 0.0) {
    color = mix(color, color * vec3(0.8, 0.84, 0.9), 0.15 * u_rain);
    float streaks = rain(vec4(0.0), p, vec2(5.0, 22.0), 3.3, 7.0, 1.0).a;
    color = mix(color, RAIN_INK, streaks * 0.6 * u_rain);
  }

  gl_FragColor = vec4(color, 1.0);
}
`

const TEXTURES = ["u_image", "u_water"] as const

// Textures in this order: image, water. The map is zoomed in with a CSS
// transform, so it is drawn at the image's full resolution to stay sharp.
export const createSeaMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES, {
    imageResolution: true,
  })
