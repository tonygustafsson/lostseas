// Shared WebGL setup for the animated scenes: draws one fragment shader over
// the whole canvas, with an image and its masks as textures.

import { GULL_SHEET } from "./gullSprites"

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = vec2(a_position.x + 1.0, 1.0 - a_position.y) / 2.0;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Helpers shared by the fragment shaders
export const SHADER_COMMON = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_image;
uniform float u_time;
uniform vec2 u_size;

varying vec2 v_uv;

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

// Without sin, which loses precision on some GPUs and shows up as blocks
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);

  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }

  return value;
}

// Premultiplied "over" blending
vec4 over(vec4 base, vec3 color, float alpha) {
  return vec4(color * alpha + base.rgb * (1.0 - alpha), alpha + base.a * (1.0 - alpha));
}

// One seagull of a list worked out in gulls.ts, as x and y (shares of the area
// it flies over, which p is in pixels of), size and wing position. It is a
// sprite whose pixels are as big as the pictures' own, and moves in steps of
// them. Strength fades it, 0 hides it.
uniform sampler2D u_gullSprites;
const vec2 GULL_CELL = vec2(${GULL_SHEET.cellWidth}.0, ${GULL_SHEET.cellHeight}.0);
const vec2 GULL_SHEET_SIZE = vec2(${GULL_SHEET.cellWidth * GULL_SHEET.frames}.0, ${GULL_SHEET.cellHeight}.0);

vec4 seagull(vec4 base, vec2 p, vec4 gull, vec2 area, float strength) {
  float pixel = clamp(area.x * 0.0011, 1.0, 2.0) * gull.z;
  vec2 middle = floor(gull.xy * area / pixel) * pixel;
  vec2 cell = floor((p - middle) / pixel + GULL_CELL * 0.5);

  if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= GULL_CELL.x || cell.y >= GULL_CELL.y) {
    return base;
  }

  // The middle of a texel, so the sheet is not blurred
  vec4 sprite = texture2D(u_gullSprites, (vec2(gull.w, 0.0) * GULL_CELL + cell + 0.5) / GULL_SHEET_SIZE);

  return over(base, sprite.rgb, sprite.a * strength);
}

// Rippling water at image position uv, where the image is shown at size.
// Strength is in CSS pixels.
vec4 water(sampler2D waterMask, vec2 uv, vec2 size, float mask, float amplitude) {
  vec2 p = uv * size;
  float t = u_time;
  float wave =
    sin(p.y * 0.35 + sin(p.x * 0.02 + t * 0.6) * 2.0 + t * 1.6) +
    0.5 * sin(p.y * 0.6 - p.x * 0.05 + t * 2.3);

  vec2 rippled = uv + vec2(wave, wave * 0.6) * amplitude / size;

  // Never pull in pixels from land, boats or piers
  if (texture2D(waterMask, rippled).a < 0.5) {
    rippled = uv;
  }

  vec3 color = texture2D(u_image, rippled).rgb * (1.0 + 0.05 * wave);

  return vec4(color * mask, mask);
}

// Drifting clouds at position p (CSS pixels) on an image shown width wide.
// Cover from 0 (a few wisps) to 1 (overcast), shade from 0 (white) to 1 (storm
// grey).
vec4 clouds(vec4 base, vec2 p, float width, float mask, float cover, float shade) {
  // Cloud size follows the image width, stretched to look flatter. They drift
  // sideways and slowly change shape.
  vec2 q = p / width * vec2(12.0, 30.0);
  q.x -= u_time * 0.08;
  q.y += u_time * 0.01;

  float density = fbm(q);
  float threshold = mix(0.62, 0.3, cover);
  float alpha = smoothstep(threshold, threshold + 0.1, density);

  if (alpha <= 0.0) {
    return base;
  }

  // Lit from above: brighter where there is less cloud above, shaded below
  float above = fbm(q - vec2(0.0, 0.3));
  float light = clamp(0.65 + (density - above) * 3.0, 0.0, 1.0);
  vec3 color = mix(vec3(0.7, 0.77, 0.88), vec3(1.0), light);
  color = mix(color, color * vec3(0.5, 0.53, 0.58), shade);

  return over(base, color, alpha * 0.9 * mask);
}

// Streaks falling in one layer of a grid, cells CSS pixels wide and tall,
// leaning a little with the wind. Strength from 0 to 1.
vec4 rain(vec4 base, vec2 p, vec2 cell, float speed, float seed, float strength) {
  vec2 q = vec2(p.x + p.y * 0.2, p.y) / cell - vec2(0.0, u_time * speed);
  vec2 id = floor(q);
  float h = hash(id + seed);

  if (h > 0.3) {
    return base;
  }

  vec2 f = fract(q);
  float x = abs(f.x - 0.5 - (h - 0.15) * 2.0) * cell.x;
  float streakLength = 0.3 + 0.4 * hash(id + seed + 2.0);
  float start = hash(id + seed + 3.0) * (1.0 - streakLength);
  float streak =
    smoothstep(start, start + 0.05, f.y) *
    (1.0 - smoothstep(start + streakLength - 0.05, start + streakLength, f.y));
  float alpha = (1.0 - smoothstep(0.3, 0.9, x)) * streak * 0.35;

  return over(base, vec3(0.8, 0.85, 0.9), alpha * strength);
}
`

// Everything moves slowly, 30 frames per second is plenty and halves the work.
// A few milliseconds are taken off because screen frames come 16.7 ms apart
// with some jitter, so a threshold of exactly 33.3 ms is often missed by a hair
// and skips to every third frame, about 22 per second.
const FRAME_INTERVAL = 1000 / 30 - 4

export const loadImage = (src: string) => {
  const image = new Image()
  image.src = src

  return image.decode().then(() => image)
}

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  return shader
}

const createTexture = (gl: WebGLRenderingContext, unit: number) => {
  const texture = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

  return texture
}

// Many phones can't hold a texture over 4096 pixels wide, a larger image is
// scaled down to fit or it would draw nothing
const fitTextureSize = (source: TexImageSource, maxSize: number) => {
  if (!(source instanceof HTMLImageElement)) {
    return source
  }

  const scale = Math.min(
    1,
    maxSize / source.naturalWidth,
    maxSize / source.naturalHeight
  )

  if (scale === 1) {
    return source
  }

  const canvas = document.createElement("canvas")
  canvas.width = Math.floor(source.naturalWidth * scale)
  canvas.height = Math.floor(source.naturalHeight * scale)
  canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height)

  return canvas
}

const buildProgram = (gl: WebGLRenderingContext, fragmentShader: string) => {
  const program = gl.createProgram()
  const shaders = [
    compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER),
    compile(gl, gl.FRAGMENT_SHADER, fragmentShader),
  ]
  shaders.forEach((shader) => gl.attachShader(program, shader))
  gl.linkProgram(program)

  // The program keeps what it needs, the shaders can go
  shaders.forEach((shader) => gl.deleteShader(shader))

  return program
}

const warmedUp = new Set<string>()
const WARM_UP_TIMEOUT = 30000

// Builds a shader on a canvas nobody sees, so the browser already has the
// result when a scene asks for it. The first build of a big shader takes a few
// seconds and the browser keeps what it built, a later scene gets it in a few
// milliseconds. Only where the browser builds in the background, anywhere else
// this would freeze the page just like the scene would.
export const warmUpShader = (fragmentShader: string) => {
  if (typeof document === "undefined" || warmedUp.has(fragmentShader)) {
    return
  }

  warmedUp.add(fragmentShader)

  const gl = document
    .createElement("canvas")
    .getContext("webgl", { antialias: false })
  const parallelCompile = gl?.getExtension("KHR_parallel_shader_compile")

  if (!gl) {
    return
  }

  const release = () => gl.getExtension("WEBGL_lose_context")?.loseContext()

  if (!parallelCompile) {
    release()

    return
  }

  const program = buildProgram(gl, fragmentShader)

  const startedAt = Date.now()

  const finish = () => {
    // Gives up on a build that never completes, like one on a lost context
    if (
      !gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR) &&
      Date.now() - startedAt < WARM_UP_TIMEOUT
    ) {
      setTimeout(finish, 100)

      return
    }

    gl.deleteProgram(program)
    release()
  }

  finish()
}

export type AmbienceUniforms = Record<string, number>

// A uniform array of floats (size 1) or vec4s (size 4), for the values that
// belong to one picture and do not fade
export type AmbienceArrays = Record<
  string,
  { size: 1 | 2 | 4; values: number[] }
>

// How long a change of uniforms, like the weather, takes to fade in
const UNIFORM_FADE = 1500

// The first texture is the image, its size is passed as u_imageSize. With
// imageResolution the canvas has as many pixels as the image, for scenes that
// are scaled up with a CSS transform.
export const createAmbienceRenderer = (
  canvas: HTMLCanvasElement,
  fragmentShader: string,
  textureNames: readonly string[],
  { imageResolution = false } = {}
) => {
  const gl = canvas.getContext("webgl", { antialias: false })

  if (!gl) return null

  // Browsers only allow a few contexts at once, never leave one behind
  const releaseContext = () =>
    gl.getExtension("WEBGL_lose_context")?.loseContext()

  const program = buildProgram(gl, fragmentShader)

  // A big shader takes the GPU driver seconds to build. Asking for the result
  // right away freezes the whole page for that long, so where the browser can
  // say when the program is done, nothing touches it until it is.
  const parallelCompile = gl.getExtension("KHR_parallel_shader_compile")

  let textures: (WebGLTexture | null)[] = []
  let timeLocation: WebGLUniformLocation | null = null
  let frameArrays: ((time: number) => AmbienceArrays) | null = null
  let sizeLocation: WebGLUniformLocation | null = null
  let imageSizeLocation: WebGLUniformLocation | null = null
  let isReady = false
  let hasFailed = false
  let hasTextures = false
  let imageWidth = 0
  let imageHeight = 0
  let frame = 0
  let compileFrame = 0
  let lastDraw = 0
  // What was asked of the renderer before the program was ready, in order
  let waiting: (() => void)[] = []
  // Float uniforms ease from their current value towards the target
  const uniforms: Record<
    string,
    { location: WebGLUniformLocation | null; value: number; target: number }
  > = {}

  const whenReady = (action: () => void) => {
    if (isReady) {
      action()
    } else {
      waiting.push(action)
    }
  }

  // Returns false when the program did not build
  const setUp = () => {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Ambience shader failed:", gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      releaseContext()

      return false
    }

    gl.useProgram(program)
    gl.enable(gl.SCISSOR_TEST)

    // Two triangles covering the whole canvas
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const position = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    textures = textureNames.map((name, unit) => {
      gl.uniform1i(gl.getUniformLocation(program, name), unit)

      return createTexture(gl, unit)
    })

    timeLocation = gl.getUniformLocation(program, "u_time")
    sizeLocation = gl.getUniformLocation(program, "u_size")
    imageSizeLocation = gl.getUniformLocation(program, "u_imageSize")

    isReady = true
    waiting.forEach((action) => action())
    waiting = []

    return true
  }

  const waitForProgram = () => {
    if (
      parallelCompile &&
      !gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR)
    ) {
      compileFrame = requestAnimationFrame(waitForProgram)

      return
    }

    // A program that did not build leaves the canvas empty, nothing to draw
    hasFailed = !setUp()
  }

  if (parallelCompile) {
    waitForProgram()
  } else if (!setUp()) {
    return null
  }

  const updateUniforms = (elapsed: number) => {
    const step = Math.min(1, elapsed / UNIFORM_FADE)

    Object.values(uniforms).forEach((uniform) => {
      uniform.value += (uniform.target - uniform.value) * step
      gl.uniform1f(uniform.location, uniform.value)
    })
  }

  const arrayLocations = new Map<string, WebGLUniformLocation | null>()

  const applyArrays = (arrays: AmbienceArrays) => {
    Object.entries(arrays).forEach(([name, { size, values }]) => {
      // The count says how many are used, an empty list is not allowed
      if (!values.length) {
        return
      }

      if (!arrayLocations.has(name)) {
        arrayLocations.set(name, gl.getUniformLocation(program, name))
      }

      const location = arrayLocations.get(name)!

      if (size === 1) {
        gl.uniform1fv(location, values)
      } else if (size === 2) {
        gl.uniform2fv(location, values)
      } else {
        gl.uniform4fv(location, values)
      }
    })
  }

  const draw = (now: number) => {
    if (hasFailed) {
      return
    }

    frame = requestAnimationFrame(draw)

    if (!isReady || !hasTextures || now - lastDraw < FRAME_INTERVAL) return
    updateUniforms(lastDraw ? now - lastDraw : 0)
    lastDraw = now

    // Nothing to draw while the scene has no size
    if (!canvas.clientWidth || !canvas.clientHeight) {
      return
    }

    // More pixels than the image has add no detail, they only cost GPU time.
    // Nor do more than the screen shows of a scaled up scene.
    const rect = canvas.getBoundingClientRect()
    // Image pixels per CSS pixel. A picture that covers a box taller than it
    // is shown cropped and bigger, so the height can be what counts.
    const imageRatio = Math.min(
      imageWidth / canvas.clientWidth,
      imageHeight / canvas.clientHeight
    )
    const screenRatio =
      (rect.width / canvas.clientWidth) * Math.min(window.devicePixelRatio, 2)
    const pixelRatio = imageResolution
      ? Math.min(imageRatio, screenRatio)
      : Math.min(window.devicePixelRatio, 2, Math.max(1, imageRatio))
    const width = Math.round(canvas.clientWidth * pixelRatio)
    const height = Math.round(canvas.clientHeight * pixelRatio)

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    // Only shade the part of the canvas that is on screen. The rest is left
    // clear, so the image underneath shows through until it scrolls into view.
    const toCanvasX = (x: number) =>
      Math.min(Math.max(((x - rect.left) * width) / rect.width, 0), width)
    const toCanvasY = (y: number) =>
      Math.min(Math.max(((y - rect.top) * height) / rect.height, 0), height)
    const left = Math.floor(toCanvasX(0))
    const right = Math.ceil(toCanvasX(window.innerWidth))
    const top = Math.floor(toCanvasY(0))
    const bottom = Math.ceil(toCanvasY(window.innerHeight))

    if (right <= left || bottom <= top) {
      return
    }

    // The scissor box is measured from the bottom of the canvas
    gl.scissor(left, height - bottom, right - left, bottom - top)
    gl.uniform1f(timeLocation, now / 1000)

    if (frameArrays) {
      applyArrays(frameArrays(now / 1000))
    }

    gl.uniform2f(sizeLocation, canvas.clientWidth, canvas.clientHeight)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  return {
    // In the same order as the texture names
    setTextures: (sources: [HTMLImageElement, ...TexImageSource[]]) =>
      whenReady(() => {
        const maxSize: number = gl.getParameter(gl.MAX_TEXTURE_SIZE)

        sources.forEach((source, unit) => {
          gl.activeTexture(gl.TEXTURE0 + unit)
          gl.bindTexture(gl.TEXTURE_2D, textures[unit])
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            fitTextureSize(source, maxSize)
          )
        })

        imageWidth = sources[0].naturalWidth
        imageHeight = sources[0].naturalHeight
        gl.uniform2f(
          imageSizeLocation,
          sources[0].naturalWidth,
          sources[0].naturalHeight
        )
        hasTextures = true
      }),
    // New values fade in, the first ones apply straight away
    setUniforms: (values: AmbienceUniforms) =>
      whenReady(() => {
        Object.entries(values).forEach(([name, target]) => {
          if (uniforms[name]) {
            uniforms[name].target = target
          } else {
            const location = gl.getUniformLocation(program, name)
            uniforms[name] = { location, value: target, target }
            gl.uniform1f(location, target)
          }
        })
      }),
    // Uniform arrays, like a list of boxes. Size is the numbers in one entry.
    setArrays: (arrays: AmbienceArrays) => whenReady(() => applyArrays(arrays)),
    // Arrays that change with time, like where everybody walks. Asked for on
    // every frame with the time in seconds, the same as u_time.
    setFrameArrays: (get: ((time: number) => AmbienceArrays) | null) => {
      frameArrays = get
    },
    start: () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    },
    stop: () => cancelAnimationFrame(frame),
    // Frees the GPU memory and the context
    destroy: () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(compileFrame)
      textures.forEach((texture) => gl.deleteTexture(texture))
      gl.deleteProgram(program)
      releaseContext()
    },
  }
}

export type AmbienceRenderer = NonNullable<
  ReturnType<typeof createAmbienceRenderer>
>
