// Brings a town map to life with WebGL, in a single pass over one canvas:
// rippling water (where the water mask is), drifting clouds (where the sky
// mask is) and a few seagulls flying over everything.

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = vec2(a_position.x + 1.0, 1.0 - a_position.y) / 2.0;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_image;
uniform sampler2D u_water;
uniform sampler2D u_sky;
uniform float u_time;
uniform vec2 u_size;

varying vec2 v_uv;

// Water ripple strength in CSS pixels
const float WATER_AMPLITUDE = 1.875;
const int SEAGULLS = 5;

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

vec4 water(vec2 p, float mask) {
  float t = u_time;
  float wave =
    sin(p.y * 0.35 + sin(p.x * 0.02 + t * 0.6) * 2.0 + t * 1.6) +
    0.5 * sin(p.y * 0.6 - p.x * 0.05 + t * 2.3);

  vec2 uv = v_uv + vec2(wave, wave * 0.6) * WATER_AMPLITUDE / u_size;

  // Never pull in pixels from land, boats or piers
  if (texture2D(u_water, uv).a < 0.5) {
    uv = v_uv;
  }

  vec3 color = texture2D(u_image, uv).rgb * (1.0 + 0.05 * wave);

  return vec4(color * mask, mask);
}

vec4 clouds(vec4 base, vec2 p, float mask) {
  // Cloud size follows the map width, stretched to look flatter. They drift
  // sideways and slowly change shape.
  vec2 q = p / u_size.x * vec2(12.0, 30.0);
  q.x -= u_time * 0.08;
  q.y += u_time * 0.01;

  float density = fbm(q);
  float cover = smoothstep(0.5, 0.6, density);

  if (cover <= 0.0) {
    return base;
  }

  // Lit from above: brighter where there is less cloud above, shaded below
  float above = fbm(q - vec2(0.0, 0.3));
  float light = clamp(0.65 + (density - above) * 3.0, 0.0, 1.0);
  vec3 color = mix(vec3(0.7, 0.77, 0.88), vec3(1.0), light);

  return over(base, color, cover * 0.9 * mask);
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
    color = water(p, waterMask);
  }

  if (skyMask > 0.01) {
    color = clouds(color, p, skyMask);
  }

  for (int i = 0; i < SEAGULLS; i++) {
    color = seagull(color, p, float(i));
  }

  gl_FragColor = color;
}
`

// Everything moves slowly, 30 frames per second is plenty and halves the work
const FRAME_INTERVAL = 1000 / 30

const TEXTURES = ["u_image", "u_water", "u_sky"] as const

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

export type TownMapTextures = {
  image: TexImageSource
  water: TexImageSource
  sky: TexImageSource
}

export const createTownMapRenderer = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl", { antialias: false })

  if (!gl) return null

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null

  gl.useProgram(program)

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

  const textures = TEXTURES.map((name, unit) => {
    gl.uniform1i(gl.getUniformLocation(program, name), unit)

    return createTexture(gl, unit)
  })

  const timeLocation = gl.getUniformLocation(program, "u_time")
  const sizeLocation = gl.getUniformLocation(program, "u_size")

  let hasTextures = false
  let frame = 0
  let lastDraw = 0

  const draw = (now: number) => {
    frame = requestAnimationFrame(draw)

    if (!hasTextures || now - lastDraw < FRAME_INTERVAL) return
    lastDraw = now

    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    const width = Math.round(canvas.clientWidth * pixelRatio)
    const height = Math.round(canvas.clientHeight * pixelRatio)

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    gl.uniform1f(timeLocation, now / 1000)
    gl.uniform2f(sizeLocation, canvas.clientWidth, canvas.clientHeight)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  return {
    setTextures: ({ image, water, sky }: TownMapTextures) => {
      const sources = [image, water, sky]

      sources.forEach((source, unit) => {
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, textures[unit])
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source
        )
      })

      hasTextures = true
    },
    start: () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    },
    stop: () => cancelAnimationFrame(frame),
  }
}
