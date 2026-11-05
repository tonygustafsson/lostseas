// Brings the sea map to life with WebGL: small wave crests rolling over the
// water. The image itself is never displaced, so the ink lines and labels stay
// crisp.

import {
  createAmbienceRenderer,
  SHADER_COMMON,
} from "@/components/game-ui/LocationScene/ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;

const float WAVE_STRENGTH = 0.5;
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

void main() {
  vec2 p = v_uv * u_size;
  vec3 color = texture2D(u_image, v_uv).rgb;

  // The mask is opaque black and white, white is water
  float water = texture2D(u_water, v_uv).r;

  if (water > 0.5) {
    color = mix(color, waves(color, p), openWater(v_uv));
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
