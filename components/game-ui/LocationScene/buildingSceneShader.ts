// Brings a building interior to life with WebGL, in a single pass over one
// canvas: rippling water and drifting clouds seen through windows and arches,
// dust floating in the light around them, and flickering candles, lanterns
// and fires. The weather shows in the sky outside, and a rainy day makes the
// room a little darker.

import { createAmbienceRenderer, SHADER_COMMON } from "./ambienceRenderer"

const FRAGMENT_SHADER = `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;
// Red is the flame or lantern glass, green the soft glow around it and blue
// where dust floats in the light coming in from outside
uniform sampler2D u_light;
uniform vec2 u_imageSize;

// The weather, see weatherAmbience.ts
uniform float u_cloudCover;
uniform float u_cloudShade;
uniform float u_rain;
uniform float u_fog;
uniform float u_sun;
uniform float u_gloom;

// Water ripple strength in CSS pixels, the sea is far away in most interiors
const float WATER_AMPLITUDE = 1.25;
const vec3 GLOW_COLOR = vec3(1.0, 0.72, 0.36);
const vec3 DUST_COLOR = vec3(1.0, 0.96, 0.86);
const vec3 FOG_COLOR = vec3(0.86, 0.88, 0.9);
const vec3 GLOOM_COLOR = vec3(0.04, 0.05, 0.08);

// Between -1 and 1. Lights a little apart get their own rhythm: a slow
// breathing, a quick flutter and now and then a short dip.
float flicker(vec2 p) {
  float t = u_time;
  float slow = noise(p / 45.0 + vec2(t * 2.5, t * 0.7));
  float fast = noise(p / 25.0 - vec2(t * 11.0, t * 3.0));
  float dip = smoothstep(0.75, 0.95, noise(p / 60.0 + vec2(t * 1.3, 7.0)));

  return clamp((slow * 0.6 + fast * 0.4) * 2.2 - 1.1 - dip * 0.8, -1.0, 1.0);
}

// Some cells of a grid, cell CSS pixels wide, hold a mote drifting slowly up
// and sideways, circling a little and catching the light now and then
vec4 dust(vec4 base, vec2 p, float cell, float speed, float seed, float zone) {
  float t = u_time;
  vec2 q = p / cell + vec2(t * speed * 0.4, t * speed);
  vec2 id = floor(q);
  float h = hash(id + seed);

  if (h > 0.4) {
    return base;
  }

  vec2 centre = 0.5 + 0.2 * vec2(sin(t * 0.5 + h * 40.0), cos(t * 0.4 + h * 20.0));
  float radius = cell * (0.06 + 0.06 * hash(id + seed + 1.0));
  float d = length((fract(q) - centre) * cell);
  float twinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(t * (0.8 + h * 3.0) + h * 30.0));
  float core = 1.0 - smoothstep(radius * 0.4, radius + 0.7, d);
  float halo = 1.0 - smoothstep(radius, radius * 2.5, d);
  float alpha = (core * 0.85 + halo * 0.25) * twinkle * zone;

  return over(base, DUST_COLOR, min(alpha, 1.0));
}

void main() {
  // Same as object-fit: cover, centred
  float scale = max(u_size.x / u_imageSize.x, u_size.y / u_imageSize.y);
  vec2 shown = u_imageSize * scale;
  vec2 uv = (v_uv * u_size - (u_size - shown) * 0.5) / shown;
  vec2 p = uv * shown;

  float waterMask = texture2D(u_water, uv).a;
  float skyMask = texture2D(u_sky, uv).a;
  vec3 light = texture2D(u_light, uv).rgb;
  vec4 color = vec4(0.0);

  if (waterMask > 0.01) {
    color = water(u_water, uv, shown, waterMask, WATER_AMPLITUDE);
  }

  // Rain falls in the sky and fog hangs over the sky and the sea, neither comes
  // inside
  float outside = max(skyMask, waterMask);

  if (skyMask > 0.01) {
    color = clouds(color, p, shown.x, skyMask, u_cloudCover, u_cloudShade);
  }

  if (outside > 0.01 && u_fog > 0.0) {
    float mist = fbm(p / shown.x * vec2(4.0, 8.0) + vec2(-u_time * 0.04, 0.0));
    color = over(color, FOG_COLOR, min(0.6 + 0.4 * mist, 0.95) * u_fog * outside);
  }

  if (skyMask > 0.01 && u_rain > 0.0) {
    color = rain(color, p, vec2(6.0, 50.0), 2.4, 0.0, u_rain * skyMask);
    color = rain(color, p, vec2(9.0, 80.0), 1.8, 41.0, u_rain * skyMask);
  }

  // Grey skies leave the room a little gloomier and rain more so, the lights
  // below still glow
  if (u_gloom > 0.0) {
    color = over(color, GLOOM_COLOR, u_gloom * (1.0 - skyMask));
  }

  // Less dust over the sky itself, it floats inside. It only shows in
  // sunlight.
  float dustZone = light.b * (1.0 - 0.6 * skyMask) * u_sun;

  if (dustZone > 0.01) {
    color = dust(color, p, 14.0, 0.08, 31.0, dustZone);
    color = dust(color, p, 22.0, 0.12, 0.0, dustZone);
    color = dust(color, p, 36.0, 0.2, 17.0, dustZone);
  }

  if (light.g > 0.01) {
    float f = flicker(p);

    if (light.r > 0.01) {
      vec3 flame = texture2D(u_image, uv).rgb;
      flame *= vec3(1.2 + 0.4 * f, 1.12 + 0.3 * f, 1.0 + 0.15 * f);
      color = over(color, min(flame, vec3(1.0)), light.r);
    }

    color = over(color, GLOW_COLOR, light.g * (0.24 + 0.14 * f));
  }

  gl_FragColor = color;
}
`

const TEXTURES = ["u_image", "u_water", "u_sky", "u_light"] as const

// Textures in this order: image, water, sky, light. Uniforms from
// getWeatherAmbience.
export const createBuildingSceneRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, FRAGMENT_SHADER, TEXTURES)
