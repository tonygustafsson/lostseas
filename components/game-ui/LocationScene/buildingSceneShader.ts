// Brings a building interior to life with WebGL, in a single pass over one
// canvas: rippling water and drifting clouds seen through windows and arches,
// dust floating in the light around them, and flickering candles, lanterns
// and fires. The weather shows in the sky outside, and a rainy day makes the
// room a little darker.

import {
  type AmbienceRenderer,
  createAmbienceRenderer,
  SHADER_COMMON,
  warmUpShader,
} from "./ambienceRenderer"
import { BUILDING_GULLS, getGullArrays } from "./gulls"

// The parts of main(), in the order they are drawn
const WEATHER_PART = `
  float waterMask = texture2D(u_water, uv).a * (1.0 - u_hideWater);
  if (waterMask > 0.01) {
    color = water(u_water, uv, shown, waterMask, WATER_AMPLITUDE);
  }

  // A few gulls fly past, only seen where the sky shows
  if (skyMask > 0.01 && u_gulls > 0.0) {
    for (int i = 0; i < GULL_COUNT; i++) {
      color = seagull(color, p, u_gull[i], shown, u_gulls * skyMask);
    }
  }

  // Rain falls in the sky and fog hangs over the sky and the sea, neither comes
  // inside
  float outside = max(skyMask, waterMask);

  if (skyMask > 0.01) {
    color = clouds(color, p, shown.x, skyMask, u_cloudCover, u_cloudShade);
  }

  if (outside > 0.01 && u_fog > 0.0) {
    float density = mist(p / shown.x * vec2(4.0, 8.0) + vec2(-u_time * 0.04, 0.0));
    color = over(color, FOG_COLOR, min(0.6 + 0.4 * density, 0.95) * u_fog * outside);
  }

  if (skyMask > 0.01 && u_rain > 0.0) {
    color = rain(color, p, vec2(6.0, 50.0), 2.4, 0.0, u_rain * skyMask);
    color = rain(color, p, vec2(9.0, 80.0), 1.8, 41.0, u_rain * skyMask);
  }

  // Grey skies leave the room a little gloomier and rain more so, the lights
  // below still glow
  if (u_gloom > 0.0) {
    color = over(color, GLOOM_COLOR, u_gloom * (1.0 - skyMask) * (1.0 - u_hideSky));
  }
`

const DUST_PART = `
  // Less dust over the sky itself, it floats inside. It only shows in
  // sunlight.
  float sunLight = light.b * u_sun;
  float dustZone = sunLight * (1.0 - 0.6 * skyMask) * (1.0 - u_hideDust);

  // Light shafts only fall inside the room, not over the view outside
  if (sunLight > 0.01 && u_hideBeams < 1.0) {
    float inside = (1.0 - skyMask) * (1.0 - texture2D(u_water, uv).a);

    color = beams(color, p, min(light.b, 1.0) * u_sun * inside);
  }

  if (dustZone > 0.01) {
    color = dust(color, p, 14.0, 0.08, 31.0, dustZone);
    color = dust(color, p, 22.0, 0.12, 0.0, dustZone);
    color = dust(color, p, 36.0, 0.2, 17.0, dustZone);
  }
`

const LIGHTS_PART = `
  if (light.g > 0.01 && u_hideFire < 1.0) {
    float f = flicker(p);

    if (light.r > 0.01) {
      vec3 flame = texture2D(u_image, uv).rgb;
      flame *= vec3(1.2 + 0.4 * f, 1.12 + 0.3 * f, 1.0 + 0.15 * f);
      color = over(color, min(flame, vec3(1.0)), light.r);
    }

    color = over(color, GLOW_COLOR, light.g * (0.24 + 0.14 * f));
  }
`

// The dust can be left out or drawn alone, for a canvas of its own over the
// intro card. The editor draws everything on one canvas.
type Layer = "all" | "scene" | "dust"

const buildShader = (layer: Layer) => `
${SHADER_COMMON}

uniform sampler2D u_water;
uniform sampler2D u_sky;
// Red is the flame or lantern glass, green the soft glow around it and blue
// where dust floats in the light coming in from outside
uniform sampler2D u_light;
uniform vec2 u_imageSize;
// The intro card in CSS pixels on the canvas: x, y, width and height. Dust
// over it is dimmer, as the dark card makes it stand out.
uniform vec4 u_card;

// The weather, see weatherAmbience.ts
uniform float u_cloudCover;
uniform float u_cloudShade;
uniform float u_rain;
uniform float u_fog;
uniform float u_sun;
uniform float u_gloom;
uniform float u_gulls;
// The gulls in the air, their flight is in gulls.ts
const int GULL_COUNT = ${BUILDING_GULLS.count};
uniform vec4 u_gull[GULL_COUNT];

// 1 hides a part of the ambience, for the story to look at them one by one.
// Unset is 0, everything shows.
uniform float u_hideWater;
uniform float u_hideSky;
uniform float u_hideDust;
uniform float u_hideBeams;
uniform float u_hideFire;

// Water ripple strength in CSS pixels, the sea is far away in most interiors
const float WATER_AMPLITUDE = 1.25;
const vec3 GLOW_COLOR = vec3(1.0, 0.72, 0.36);
const vec3 DUST_COLOR = vec3(1.0, 0.96, 0.86);
// Share of grid cells that hold a mote in full dust
const float DUST_DENSITY = 0.19;
// Light shafts: how far they lean (sideways per pixel down), their colour and
// how strongly they show at most
const float BEAM_SLANT = 0.55;
const vec3 BEAM_COLOR = vec3(1.0, 0.9, 0.7);
const float BEAM_ALPHA = 0.3;
const vec3 FOG_COLOR = vec3(0.86, 0.88, 0.9);
const vec3 GLOOM_COLOR = vec3(0.04, 0.05, 0.08);
// Matches the card's rounded corners and how much of the dust shows over it
const float CARD_RADIUS = 24.0;
const float DUST_OVER_CARD = 0.45;

// Distance in CSS pixels from the card's edge, negative inside it
float cardEdge(vec2 point) {
  vec2 halfSize = u_card.zw * 0.5;
  vec2 q = abs(point - u_card.xy - halfSize) - halfSize + CARD_RADIUS;

  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - CARD_RADIUS;
}

// How much of the dust shows at a point, less over the card
float dustVisibility(vec2 point) {
  return mix(1.0, DUST_OVER_CARD, 1.0 - smoothstep(-1.0, 1.0, cardEdge(point)));
}

// Mist is soft, a few layers of noise are enough and the fog was the most
// expensive weather with five
float mist(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 3; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }

  // Three layers add up to less than the five of fbm, scaled to the same range
  return value * 1.107;
}

// Between -1 and 1. Lights a little apart get their own rhythm: a slow
// breathing, a quick flutter and now and then a short dip.
float flicker(vec2 p) {
  float t = u_time;
  float slow = noise(p / 45.0 + vec2(t * 2.5, t * 0.7));
  float fast = noise(p / 25.0 - vec2(t * 11.0, t * 3.0));
  float dip = smoothstep(0.75, 0.95, noise(p / 60.0 + vec2(t * 1.3, 7.0)));

  return clamp((slow * 0.6 + fast * 0.4) * 2.2 - 1.1 - dip * 0.8, -1.0, 1.0);
}

// Slanting shafts of sunlight coming in from the openings, drifting slowly
// sideways. Strength is how much light there is at the point, up to 1.
vec4 beams(vec4 base, vec2 p, float strength) {
  float across = p.x - p.y * BEAM_SLANT;
  float drift = u_time * 0.12;
  float wide = noise(vec2(across / 120.0 + drift, 3.0));
  float thin = noise(vec2(across / 40.0 - drift * 0.6, 8.0));
  float shaft = smoothstep(0.4, 0.85, wide * 0.7 + thin * 0.3);

  return over(
    base,
    BEAM_COLOR,
    shaft * strength * BEAM_ALPHA * dustVisibility(v_uv * u_size)
  );
}

// Some cells of a grid, cell CSS pixels wide, hold a mote drifting slowly up
// and sideways, circling a little and catching the light now and then. The
// thinner the dust (zone, up to 1), the fewer cells hold one, so it fades out
// into the room instead of covering all of it.
vec4 dust(vec4 base, vec2 p, float cell, float speed, float seed, float zone) {
  float t = u_time;
  vec2 q = p / cell + vec2(t * speed * 0.4, t * speed);
  vec2 id = floor(q);
  float h = hash(id + seed);

  if (h > DUST_DENSITY * zone) {
    return base;
  }

  vec2 centre = 0.5 + 0.2 * vec2(sin(t * 0.5 + h * 40.0), cos(t * 0.4 + h * 20.0));
  float radius = cell * (0.06 + 0.06 * hash(id + seed + 1.0));
  float d = length((fract(q) - centre) * cell);
  float twinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(t * (0.8 + h * 3.0) + h * 30.0));
  float core = 1.0 - smoothstep(radius * 0.4, radius + 0.7, d);
  float halo = 1.0 - smoothstep(radius, radius * 2.5, d);
  float alpha = (core * 0.5 + halo * 0.14) * twinkle * (0.4 + 0.6 * zone);

  return over(
    base,
    DUST_COLOR,
    min(alpha * dustVisibility(v_uv * u_size), 1.0)
  );
}

void main() {
  // Same as object-fit: cover, centred
  float scale = max(u_size.x / u_imageSize.x, u_size.y / u_imageSize.y);
  vec2 shown = u_imageSize * scale;
  vec2 uv = (v_uv * u_size - (u_size - shown) * 0.5) / shown;
  vec2 p = uv * shown;

  float skyMask = texture2D(u_sky, uv).a * (1.0 - u_hideSky);
  vec3 light = texture2D(u_light, uv).rgb;
  vec4 color = vec4(0.0);

${layer !== "dust" ? WEATHER_PART : ""}
${layer !== "scene" ? DUST_PART : ""}
${layer !== "dust" ? LIGHTS_PART : ""}

  gl_FragColor = color;
}
`

const FULL_SHADER = buildShader("all")
const SCENE_SHADER = buildShader("scene")
const DUST_SHADER = buildShader("dust")

const TEXTURES = [
  "u_image",
  "u_water",
  "u_sky",
  "u_light",
  "u_gullSprites",
] as const

// The gulls fly on every frame. A canvas that asks for arrays of its own, like
// the dust over the intro card, takes their place.
const withGulls = (renderer: AmbienceRenderer | null) => {
  renderer?.setFrameArrays((time) => getGullArrays(time, BUILDING_GULLS))

  return renderer
}

// Textures in this order: image, water, sky, light, the sheet of gulls.
// Uniforms from getWeatherAmbience.
export const createBuildingSceneRenderer = (canvas: HTMLCanvasElement) =>
  withGulls(createAmbienceRenderer(canvas, FULL_SHADER, TEXTURES))

// The same without the dust, which a canvas of its own draws over the intro
// card
export const createBuildingBackRenderer = (canvas: HTMLCanvasElement) =>
  withGulls(createAmbienceRenderer(canvas, SCENE_SHADER, TEXTURES))

// Only the dust, for a canvas over the intro card. Same textures and uniforms.
export const createBuildingDustRenderer = (canvas: HTMLCanvasElement) =>
  createAmbienceRenderer(canvas, DUST_SHADER, TEXTURES)

// Builds the shader in the background before a building is entered, so the
// scene gets it ready. See warmUpShader.
export const warmUpBuildingSceneShader = () => {
  warmUpShader(SCENE_SHADER)
  warmUpShader(DUST_SHADER)
}
