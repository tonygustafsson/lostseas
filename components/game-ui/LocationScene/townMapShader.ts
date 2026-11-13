// Brings a town map to life with WebGL, in a single pass over one canvas:
// rippling water (where the water mask is), drifting clouds (where the sky
// mask is) and a few seagulls flying over everything. The weather decides how
// cloudy it is, and can bring rain or fog over the whole town.

import { createAmbienceRenderer, SHADER_COMMON } from "./ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;

// The weather, see weatherAmbience.ts
uniform float u_cloudCover;
uniform float u_cloudShade;
uniform float u_rain;
uniform float u_fog;
uniform float u_gulls;

// Water ripple strength in CSS pixels
const float WATER_AMPLITUDE = 1.875;
const int SEAGULLS = 5;
const vec3 FOG_COLOR = vec3(0.9, 0.92, 0.94);
const vec3 OVERCAST_COLOR = vec3(0.08, 0.1, 0.14);

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

const TEXTURES = ["u_image", "u_water", "u_sky"] as const

// Textures in this order: image, water, sky. Uniforms from getWeatherAmbience.
export const createTownMapRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)
