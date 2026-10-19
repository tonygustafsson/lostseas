// Shared WebGL setup for the animated scenes: draws one fragment shader over
// the whole canvas, with an image and its masks as textures.

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

// Drifting clouds at position p (CSS pixels) on an image shown width wide
vec4 clouds(vec4 base, vec2 p, float width, float mask) {
  // Cloud size follows the image width, stretched to look flatter. They drift
  // sideways and slowly change shape.
  vec2 q = p / width * vec2(12.0, 30.0);
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
`

// Everything moves slowly, 30 frames per second is plenty and halves the work
const FRAME_INTERVAL = 1000 / 30

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

// The first texture is the image, its size is passed as u_imageSize
export const createAmbienceRenderer = (
  canvas: HTMLCanvasElement,
  fragmentShader: string,
  textureNames: readonly string[]
) => {
  const gl = canvas.getContext("webgl", { antialias: false })

  if (!gl) return null

  // Browsers only allow a few contexts at once, never leave one behind
  const releaseContext = () =>
    gl.getExtension("WEBGL_lose_context")?.loseContext()

  const program = gl.createProgram()
  const shaders = [
    compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER),
    compile(gl, gl.FRAGMENT_SHADER, fragmentShader),
  ]
  shaders.forEach((shader) => gl.attachShader(program, shader))
  gl.linkProgram(program)

  // The program keeps what it needs, the shaders can go
  shaders.forEach((shader) => gl.deleteShader(shader))

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("Ambience shader failed:", gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    releaseContext()

    return null
  }

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

  const textures = textureNames.map((name, unit) => {
    gl.uniform1i(gl.getUniformLocation(program, name), unit)

    return createTexture(gl, unit)
  })

  const timeLocation = gl.getUniformLocation(program, "u_time")
  const sizeLocation = gl.getUniformLocation(program, "u_size")
  const imageSizeLocation = gl.getUniformLocation(program, "u_imageSize")

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
    // In the same order as the texture names
    setTextures: (sources: [HTMLImageElement, ...TexImageSource[]]) => {
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

      gl.uniform2f(
        imageSizeLocation,
        sources[0].naturalWidth,
        sources[0].naturalHeight
      )
      hasTextures = true
    },
    start: () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    },
    stop: () => cancelAnimationFrame(frame),
    // Frees the GPU memory and the context
    destroy: () => {
      cancelAnimationFrame(frame)
      textures.forEach((texture) => gl.deleteTexture(texture))
      gl.deleteProgram(program)
      releaseContext()
    },
  }
}

export type AmbienceRenderer = NonNullable<
  ReturnType<typeof createAmbienceRenderer>
>
