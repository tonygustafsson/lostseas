// Brings a town map to life with WebGL, in a single pass over one canvas:
// rippling water (where the water mask is), drifting clouds (where the sky
// mask is) and a few seagulls flying over everything.

import { createAmbienceRenderer, SHADER_COMMON } from "./ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;

// Water ripple strength in CSS pixels
const float WATER_AMPLITUDE = 1.875;
const int SEAGULLS = 5;

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
  float alpha = 1.0 - smoothstep(-0.5, 0.5, dist);

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
    color = water(u_water, v_uv, u_size, waterMask, WATER_AMPLITUDE);
  }

  if (skyMask > 0.01) {
    color = clouds(color, p, u_size.x, skyMask);
  }

  for (int i = 0; i < SEAGULLS; i++) {
    color = seagull(color, p, float(i));
  }

  gl_FragColor = color;
}
`

const TEXTURES = ["u_image", "u_water", "u_sky"] as const

// Textures in this order: image, water, sky
export const createTownMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)
