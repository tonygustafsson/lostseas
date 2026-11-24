---
name: graphical-ambience
description: Use when working on the animated life in the harbour pictures and building interiors (moving water, clouds, flags, people, cats, rats, gulls, flames, weather), when a picture is added or changed, or when something in a scene looks wrong, like people walking on water. Explains which parts are image masks, which are JSON data, how the mask editor works and how to try making the data for a new picture.
---

# Graphical ambience

The harbour and building pictures are still images. A WebGL shader draws the
life on top of them: the sea ripples, clouds drift, flags wave, people, cats and
rats walk the streets, gulls fly past, and rain or fog changes the mood. The
shader only knows where things are from the masks and data below.

Neither the harbours nor the building interiors have mask pictures any more,
everything they need is JSON data (plus the sprite sheet of walkers). Nothing
is generated from the pictures. The data is made by hand, in the mask editors,
or by looking at the picture and writing it (see the last section).

## Where the code is

- `components/game-ui/LocationScene/townMapShader.ts` is the harbour shader and
  `buildingSceneShader.ts` the one for interiors.
- `ambienceRenderer.ts` runs a shader: textures by name in a fixed order, float
  uniforms that fade, and uniform arrays (`setArrays`).
- `useAmbienceCanvas.ts` loads the picture and masks, follows the mobile and
  desktop switch and only draws while on screen.
- `TownMap.tsx` ties it together for the harbour, and `frontMask.ts` draws the
  JSON data into the mask textures in the browser (`useFrontMask`). `weatherAmbience.ts` turns the
  weather into uniforms (`u_cloudCover`, `u_rain`, `u_activity`, and so on).
- `constants/townMaps.ts` holds the picture sizes (desktop 2172x724, mobile
  941x1672) and gives each town's masks and data.

## Building interiors (`constants/buildings`)

Everything is per town and building slug (`tavern`, `city-hall`), in pixels of
the building picture (1605x980). The shader (`buildingSceneShader.ts`) reads
three mask textures, water, sky and light. They are all drawn in the browser by
`useBuildingMasks`, which gives `BuildingScene` its masks.

- `fires.json`, circles `[x, y, radius]`. Light is strongest in the middle and
  fades to nothing at the radius.
- `areas/<town>.json`, per building `sky` and `water`, lists of polygons
  `[x, y, x, y, ...]` for the sky and the water seen through windows and
  arches. Even-odd, so a polygon inside another is a hole (window bars, roofs).
  They are one file for each town, loaded on demand by `loadLocationAreas`
  (`utils/location.ts`), because all 96 buildings are a lot of numbers. Do not
  import them statically. `preloadBuildingScene` starts the load.
- Dust has no data of its own. It comes in through the sky and water polygons
  (`getDustSources` in `lightMask.ts`, bits under `MIN_DUST_SOURCE` are left
  out) and only shows in sunny weather (`u_sun`).

`drawAreaMask` (`areaMask.ts`, shared with the harbour, which uses the
`makeAreaMaskUrl` version) draws sky and water at half size, not blurred for
buildings (`BUILDING_AREA`), the texture filtering softens the edge.
`drawLightMask` (`lightMask.ts`) draws the light mask: green glow and red flame (the middle 40 % of a fire, where the
shader brightens the picture) for fires, and blue for dust. Blue here is only a
channel of the mask, the shader does not look at the colour of the picture. Dust is the polygon at full strength plus copies grown and
blurred a little more each (`DUST_SPREAD`), so the spread is tuned there. The
shader puts a mote in fewer grid cells where the dust is weaker,
`DUST_DENSITY` is the share of cells in full dust, so that is the knob for how
much dust there is.

For speed the masks go to the GPU as canvases (`CanvasMask` in
`useAmbienceCanvas.ts`), never encoded to a picture and decoded again, which
was most of the cost of entering a building. The dust is drawn at a quarter of
the size because it is blurred anyway, and the fog in the shader uses three
layers of noise (`mist`), five made it twice as slow as any other weather.
`preloadBuildingScene` (called when a building is hovered in the harbour) loads
the polygons and builds the shader in the background (`warmUpBuildingSceneShader`).

The polygons were first made automatically from the building pictures and the
mask PNGs that used to be here (deleted, they are in the git history). The sky
was traced from the PNGs. The water was found from the picture, because the
old water masks reached over the shore, the town and distant hills: sea colour
(hue 178 to 225 degrees, saturation 0.58 and up, value 0.45 and up, never
where the sky is), only where it connects to the water the old masks marked.
Treat them as a first draft. Sky, hills and sea are all blue, so some sea is
missing (the left window of the Fort-Louis city hall) and a bit of coast can
slip in. Fix those in the editor. For a new building, draw them by hand.

Edit all of it in the `Ambience editors/Building` story
(`stories/ambience-editors/BuildingSceneEditor.tsx`), tabs Fires, Water and
Sky. Fires: click or drag to place, drag to move, drag the edge to resize.
Water and sky: click corners, click the first one to close, drag a corner or
the inside to move, double-click an edge of the selected polygon to add a
corner, a polygon drawn inside another is a hole. Save writes the JSON through
`.storybook/maskEditorServer.ts` (kinds `fires`, `buildingSky` and
`buildingWater`, the building slug in place of the variant, restart Storybook
after changing that file).

## JSON data (`constants/harbor`)

Imported straight into the game, no mask picture in between. All numbers are
pixels of the original harbour picture, not of the copy the browser loads
(Next serves a resized one, so the shader is given the real size as `u_mapSize`).

- `lanes.json`, the streets people walk. Per town and variant a list of levels,
  `[x start, x end, feet, half width, person size]`. Feet is the y of the
  ground a person stands on, half width how far from it people wander, person
  size how many picture pixels one sprite pixel is (nearer streets are bigger).
  At most 7 levels, see `walkUniforms.ts`. They reach the shader as uniforms.
- `front.json`, what people walk behind. `things` are boxes
  `[x start, y start, x end, y end]` and `shapes` are polygons
  `[x, y, x, y, ...]`. The bottom of a box, or the lowest corner of a shape, is
  where it meets the ground. Somebody whose feet are further back than that is
  hidden by it. The game draws these into a mask in the browser
  (`frontMask.ts`), exactly, with no colour matching. Where objects overlap
  the one with the lower ground wins.
- `water.json`, the water that ripples, per town and variant a list of polygons
  `[x, y, x, y, ...]`. The game draws them into a mask in the browser
  (`makeAreaMaskUrl` in `areaMask.ts`) at half size, slightly blurred. Even-odd,
  so a polygon inside another is a hole (boats, piers). Water that reaches the
  edge of the picture carries on past it, so the edge is not blurred. The
  ripples, the ripple edge guard and the fog read this mask.
- `sky.json`, the sky clouds may cover, same format as `water.json` and drawn
  by the same function (`makeAreaMaskUrl`). Polygons inside polygons are holes
  (roofs, masts, painted clouds). A picture without polygons has no clouds.
  Fog and rain on the sky read this mask too. The darkness of a gloomy day uses
  a second mask from the same polygons (`GLOOM_AREA`, `u_skyGloom`), grown a few
  pixels and blurred, so it does not shine through trees and round mountains
  where the polygon is not exact. Clouds use the sharp one.
- `flagSprites.json`, the flags the shader draws and waves itself, per town and
  variant `[x start, x end, top and bottom at the pole, top and bottom at the
free end, nation, pole]`, in picture pixels. Nation is an index in
  `FLAG_NATIONS` (`flagUniforms.ts`): 0 England, 1 France, 2 Spain, 3 Holland.
  The pole is 1 when the shader draws a wooden pole with a golden ball for the
  flag, sized from the flag (a pole stands against the pole side of the cloth,
  reaches above it and well below it), and 0 when the picture already has one.
  The pattern covers the whole flag (a French flag gets fleurs a little over a
  third of its height apart). The shader draws the four nations in `flagDesign`
  (`townMapShader.ts`). There is no flag mask any more.

  The pictures in `public/img/towns` have no flags, wall banners or poles, the
  sprites are drawn over them (pole switch on where a pole is needed). The
  flag-free pictures were made by asking ChatGPT to give each picture back
  without them. It redraws the whole picture, so for a new one check that the
  size is exactly the same and that nothing but the flags changed, ships and
  sails included. The painted originals are in the git history.

## People, cats and rats are a sprite sheet

The walkers are not drawn by the shader any more. Drawing them in GLSL (every
sprite pixel an if-chain, plus an outline pass) made the shader take over 20
seconds to build on a Windows GPU.

- `public/img/town-walkers.png` holds every pose, with outline and shadow baked
  in. `npm run generate:walker-sprites` (`scripts/generate-walker-sprites`) draws
  it. Twelve people (each coat once on a man and once on a woman), two cats, one
  rat. Change the pixel art there, then run the script.
- The layout is in `walkSprites.ts`, repeat it in the script when it changes.
  `__tests__/walkers.test.ts` checks the PNG size.
- `walkers.ts` works out where every walker is on every frame (paths, stops,
  turning back, fades, weather) and gives the shader two uniform lists, `u_walkA`
  and `u_walkB`. It reaches the renderer through `frameArrays` of
  `useAmbienceCanvas` (`setFrameArrays` in `ambienceRenderer.ts`).
- `walkerLayer` in `townMapShader.ts` is one loop over the list that looks up the
  sheet and hides walkers behind the front mask. The sheet is texture
  `u_walkSprites`, last in `TEXTURES`.

## Seagulls are a sprite sheet too

- `public/img/town-gulls.png` holds one gull seen from the front in each of
  five wing positions, from wings down to wings up. `npm run generate:gull-sprites`
  (`scripts/generate-gull-sprites`) draws it, the layout is in `gullSprites.ts`.
  The PNG writer is shared with the walker script in `scripts/lib/png.mjs`.
- `gulls.ts` works out where every gull is on every frame (flight, wobble, wing
  beats and glides) as shares of the picture, and gives the shader one uniform
  list, `u_gull`. The flocks are `HARBOUR_GULLS` and `BUILDING_GULLS`, the count
  and how far down they fly. The harbour gets the list through `frameArrays`
  next to the walkers, the building renderers set it themselves
  (`withGulls`), and the sheet is the last texture of both shaders.
- `seagull` in `ambienceRenderer.ts` draws one gull from the list. Its sprite
  pixels are 1 to 2 picture pixels big and it moves in steps of them, so it
  looks like the rest of the art. Buildings only show gulls over the sky
  polygons, in the weather's `u_gulls` strength.

## Keeping it quick to run

The renderer draws only while on screen, at most 30 times a second, only the
part of the canvas the screen shows, and with no more canvas pixels than the
picture has in what is shown. That last one counts the picture the way it is
scaled to cover its box, a building on a phone is cropped to about a third of
its width in a tall box, so the height decides (`imageRatio` in
`ambienceRenderer.ts`). Counting the width only made the phone canvas 80 %
bigger than the picture it showed.

## Keeping the shader quick to build

The GPU driver turns the whole shader into one program, and every function is
copied in at each place it is called. A long function called five times is five
copies. Keep big things out of GLSL where they can be data (a texture, a
uniform list), as with the walkers.

- Call a big function from one place, in a loop if it has to run several times.
  Do not put a `break` in such a loop, it can stop the shader from building.
- `ambienceRenderer.ts` does not wait for the build when the browser says when
  it is done (`KHR_parallel_shader_compile`), so a slow build no longer freezes
  the page. The scene just starts drawing when the program is ready.
- The first build is also done early, in the background, while the ship is at
  sea (`warmUpTownMapShader`, called by `Sea`). The browser keeps the result, so
  the harbour then gets the shader in a few milliseconds. Add the call wherever
  a scene is known to be coming.
- To see what a change costs, time `linkProgram` and the first draw on a
  shader nobody has built before, the browser keeps built programs, so an
  unchanged shader looks fast.

## The mask editor

Storybook story `Ambience editors/Harbor`
(`stories/ambience-editors/TownMaskEditor.tsx`), on http://localhost:6010 after
`npm run storybook`. Pick a town, variant and weather and see the real shader
with the unsaved data, so people and flags move as they will in the game.

- Walk behind tab: Box and Polygon tools. Polygons close by clicking the first
  dot. Double-click a line to add a corner, double-click a box edge to turn it
  into a polygon.
- Streets tab: drag street bands.
- Flags tab: drag on the picture to draw a flag, four corner handles shape it
  (the two at the pole share their x, so do the two at the free end), drag the
  inside to move it. Nation and the pole switch of the selected flag are beside the
  buttons. Saves `flagSprites.json`.
- Water tab: the same polygon tool for `water.json`. A picture without
  polygons has no rippling water.
- Sky tab: the same polygon tool for `sky.json`.
- Save posts to `.storybook/maskEditorServer.ts`, which writes `constants/harbor`
  (restart Storybook after changing that file). It only works in Storybook
  started locally.
  Check the saved diff before moving on, the JSON is formatted by Prettier.

## Seeing what the shader sees

Open the editor or the `game/Harbor/TownMap` story with the Playwright tools and
take screenshots. To check the data alone, a wrong lane shows as people on the
water or on roofs, a wrong front shape as people vanishing near walls. The
picture cannot be judged from numbers, always look at it.

## Trying to make the data for a new picture

A picture is new when there is no town entry in the JSON files in
`constants/harbor` (`lanes`, `front`, `water`, `sky` and `flagSprites`). Nothing is automatic, so work like an artist with the editor as the
check.

1. Look at the picture in pieces (the pictures are large). Note the water, the
   sky, the streets, the flags and things people pass behind.
2. Write a first guess into `lanes.json`: one level per street the picture shows,
   feet on the ground line, person size from how big a person would be there.
3. Add `things` for big objects like barrels and posts, `shapes` for thin or
   odd ones like lampposts. Use boxes first, they are easy to refine.
4. Draw the flags in the editor, Flags tab (they go in `flagSprites.json`).
5. Draw the water in the editor, Water tab (it goes in `water.json`), leaving
   boats and piers out as holes. Draw the sky in the Sky tab (it goes in
   `sky.json`), the blue that reaches the top edge, leaving out painted clouds
   and flags.
6. Open the editor, look at every town variant with sunny and rainy weather,
   and let the user fix what is left. Never claim a mask is right without having
   looked at it on the picture.

Keep data backward compatible with what the game reads in `constants/townMaps.ts`,
run `npm test` and `npm run lint:fix` afterwards. Update this skill when the
formats or the editor change.
