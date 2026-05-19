import { useEffect, useRef } from 'react'

type RGB = { r: number; g: number; b: number }

type PointerState = {
  id: number
  texcoordX: number
  texcoordY: number
  prevTexcoordX: number
  prevTexcoordY: number
  deltaX: number
  deltaY: number
  down: boolean
  moved: boolean
  color: RGB
}

type FramebufferObject = {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}

type DoubleFramebufferObject = {
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  read: FramebufferObject
  write: FramebufferObject
  swap: () => void
}

type SupportedFormat = {
  internalFormat: number
  format: number
}

type UniformMap = Record<string, WebGLUniformLocation | null>

type SplashCursorProps = {
  SIM_RESOLUTION?: number
  DYE_RESOLUTION?: number
  CAPTURE_RESOLUTION?: number
  DENSITY_DISSIPATION?: number
  VELOCITY_DISSIPATION?: number
  PRESSURE?: number
  PRESSURE_ITERATIONS?: number
  CURL?: number
  SPLAT_RADIUS?: number
  SPLAT_FORCE?: number
  SHADING?: boolean
  COLOR_UPDATE_SPEED?: number
  BACK_COLOR?: RGB
  TRANSPARENT?: boolean
  RAINBOW_MODE?: boolean
  COLOR?: string
}

class Material {
  vertexShader: WebGLShader
  fragmentShaderSource: string
  programs: Record<number, WebGLProgram | undefined> = {}
  activeProgram: WebGLProgram | null = null
  uniforms: UniformMap = {}
  gl: WebGLRenderingContext | WebGL2RenderingContext

  constructor(
    gl: WebGLRenderingContext | WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShaderSource: string
  ) {
    this.gl = gl
    this.vertexShader = vertexShader
    this.fragmentShaderSource = fragmentShaderSource
  }

  setKeywords(keywords: string[], compileShader: ShaderCompiler, createProgram: ProgramCreator, getUniforms: UniformGetter) {
    let hash = 0
    for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i])
    let program = this.programs[hash]
    if (program == null) {
      const fragmentShader = compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords)
      program = createProgram(this.vertexShader, fragmentShader)
      this.programs[hash] = program
    }
    if (program === this.activeProgram) return
    this.uniforms = getUniforms(program)
    this.activeProgram = program
  }

  bind() {
    if (this.activeProgram) this.gl.useProgram(this.activeProgram)
  }
}

class Program {
  gl: WebGLRenderingContext | WebGL2RenderingContext
  program: WebGLProgram
  uniforms: UniformMap

  constructor(
    gl: WebGLRenderingContext | WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
    createProgram: ProgramCreator,
    getUniforms: UniformGetter
  ) {
    this.gl = gl
    this.program = createProgram(vertexShader, fragmentShader)
    this.uniforms = getUniforms(this.program)
  }

  bind() {
    this.gl.useProgram(this.program)
  }
}

type ShaderCompiler = (type: number, source: string, keywords?: string[] | null) => WebGLShader
type ProgramCreator = (vertexShader: WebGLShader, fragmentShader: WebGLShader) => WebGLProgram
type UniformGetter = (program: WebGLProgram) => UniformMap

function createPointerState(): PointerState {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  }
}

function addKeywords(source: string, keywords?: string[] | null) {
  if (!keywords || keywords.length === 0) return source
  return `${keywords.map((keyword) => `#define ${keyword}`).join('\n')}\n${source}`
}

function hashCode(value: string) {
  if (value.length === 0) return 0
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
  RAINBOW_MODE = true,
  COLOR = '#ff0000',
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas = canvasEl

    let isActive = true
    const pointers: PointerState[] = [createPointerState()]

    const context = getWebGLContext(canvas)
    if (!context) return

    const { gl, ext } = context

    const config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION: ext.supportLinearFiltering ? DYE_RESOLUTION : 256,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING: ext.supportLinearFiltering ? SHADING : false,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
      RAINBOW_MODE,
      COLOR,
    }

    const compileShader: ShaderCompiler = (type, source, keywords) => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Failed to create shader')
      gl.shaderSource(shader, addKeywords(source, keywords))
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || 'Failed to compile shader')
      }
      return shader
    }

    const createProgram: ProgramCreator = (vertexShader, fragmentShader) => {
      const program = gl.createProgram()
      if (!program) throw new Error('Failed to create program')
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Failed to link program')
      }
      return program
    }

    const getUniforms: UniformGetter = (program) => {
      const uniforms: UniformMap = {}
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
      for (let i = 0; i < uniformCount; i++) {
        const activeUniform = gl.getActiveUniform(program, i)
        if (!activeUniform) continue
        uniforms[activeUniform.name] = gl.getUniformLocation(program, activeUniform.name)
      }
      return uniforms
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    )

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
          gl_FragColor = texture2D(uTexture, vUv);
        }
      `
    )

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `
    )

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;

      void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;

          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);

          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);
          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
        #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
        }
      `
    )

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
          #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
          #endif

          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    )

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) L = -C.x;
          if (vR.x > 1.0) R = -C.x;
          if (vT.y > 1.0) T = -C.y;
          if (vB.y < 0.0) B = -C.y;

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `
    )

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    )

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    )

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    )

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    )

    gl.getExtension('OES_standard_derivatives')

    const copyProgram = new Program(gl, baseVertexShader, copyShader, createProgram, getUniforms)
    const clearProgram = new Program(gl, baseVertexShader, clearShader, createProgram, getUniforms)
    const splatProgram = new Program(gl, baseVertexShader, splatShader, createProgram, getUniforms)
    const advectionProgram = new Program(gl, baseVertexShader, advectionShader, createProgram, getUniforms)
    const divergenceProgram = new Program(gl, baseVertexShader, divergenceShader, createProgram, getUniforms)
    const curlProgram = new Program(gl, baseVertexShader, curlShader, createProgram, getUniforms)
    const vorticityProgram = new Program(gl, baseVertexShader, vorticityShader, createProgram, getUniforms)
    const pressureProgram = new Program(gl, baseVertexShader, pressureShader, createProgram, getUniforms)
    const gradientSubtractProgram = new Program(
      gl,
      baseVertexShader,
      gradientSubtractShader,
      createProgram,
      getUniforms
    )
    const displayMaterial = new Material(gl, baseVertexShader, displayShaderSource)

    const blit = (() => {
      const vertexBuffer = gl.createBuffer()
      const indexBuffer = gl.createBuffer()
      if (!vertexBuffer || !indexBuffer) throw new Error('Failed to create buffers')

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(0)

      return (target: FramebufferObject | null, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
          gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        } else {
          gl.viewport(0, 0, target.width, target.height)
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
        }
        if (clear) {
          gl.clearColor(0, 0, 0, 1)
          gl.clear(gl.COLOR_BUFFER_BIT)
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
      }
    })()

    let dye: DoubleFramebufferObject
    let velocity: DoubleFramebufferObject
    let divergence: FramebufferObject
    let curl: FramebufferObject
    let pressure: DoubleFramebufferObject

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FramebufferObject {
      gl.activeTexture(gl.TEXTURE0)
      const texture = gl.createTexture()
      const fbo = gl.createFramebuffer()
      if (!texture || !fbo) throw new Error('Failed to create framebuffer')

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      gl.viewport(0, 0, w, h)
      gl.clear(gl.COLOR_BUFFER_BIT)

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          return id
        },
      }
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): DoubleFramebufferObject {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param)
      let fbo2 = createFBO(w, h, internalFormat, format, type, param)

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1
        },
        set read(value) {
          fbo1 = value
        },
        get write() {
          return fbo2
        },
        set write(value) {
          fbo2 = value
        },
        swap() {
          const temp = fbo1
          fbo1 = fbo2
          fbo2 = temp
        },
      }
    }

    function resizeFBO(
      target: FramebufferObject,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param)
      copyProgram.bind()
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0))
      blit(newFBO)
      return newFBO
    }

    function resizeDoubleFBO(
      target: DoubleFramebufferObject,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      if (target.width === w && target.height === h) return target
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
      target.write = createFBO(w, h, internalFormat, format, type, param)
      target.width = w
      target.height = h
      target.texelSizeX = 1 / w
      target.texelSizeY = 1 / h
      return target
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
      if (aspectRatio < 1) aspectRatio = 1 / aspectRatio
      const min = Math.round(resolution)
      const max = Math.round(resolution * aspectRatio)
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max }
    }

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION)
      const dyeRes = getResolution(config.DYE_RESOLUTION)
      const texType = ext.halfFloatTexType
      const rgba = ext.formatRGBA
      const rg = ext.formatRG
      const r = ext.formatR
      if (!rgba || !rg || !r) throw new Error('Required framebuffer formats are not supported')

      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
      gl.disable(gl.BLEND)

      dye = dye
        ? resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
        : createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)

      velocity = velocity
        ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
        : createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
    }

    function updateKeywords() {
      const keywords: string[] = []
      if (config.SHADING) keywords.push('SHADING')
      displayMaterial.setKeywords(keywords, compileShader, createProgram, getUniforms)
    }

    function calcDeltaTime(lastUpdateTime: { current: number }) {
      const now = Date.now()
      let dt = (now - lastUpdateTime.current) / 1000
      dt = Math.min(dt, 0.016666)
      lastUpdateTime.current = now
      return dt
    }

    function scaleByPixelRatio(input: number) {
      const pixelRatio = window.devicePixelRatio || 1
      return Math.floor(input * pixelRatio)
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvas.clientWidth)
      const height = scaleByPixelRatio(canvas.clientHeight)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        return true
      }
      return false
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvas.width / canvas.height
      if (aspectRatio < 1) delta *= aspectRatio
      return delta
    }

    function correctDeltaY(delta: number) {
      const aspectRatio = canvas.width / canvas.height
      if (aspectRatio > 1) delta /= aspectRatio
      return delta
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvas.width / canvas.height
      return aspectRatio > 1 ? radius * aspectRatio : radius
    }

    function wrap(value: number, min: number, max: number) {
      const range = max - min
      if (range === 0) return min
      return ((value - min) % range) + min
    }

    function hexToRGB(hex: string): RGB {
      let value = hex.replace('#', '')
      if (value.length === 3) value = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`
      return {
        r: (parseInt(value.slice(0, 2), 16) / 255) * 0.15,
        g: (parseInt(value.slice(2, 4), 16) / 255) * 0.15,
        b: (parseInt(value.slice(4, 6), 16) / 255) * 0.15,
      }
    }

    function HSVtoRGB(h: number, s: number, v: number): RGB {
      const i = Math.floor(h * 6)
      const f = h * 6 - i
      const p = v * (1 - s)
      const q = v * (1 - f * s)
      const t = v * (1 - (1 - f) * s)
      switch (i % 6) {
        case 0: return { r: v, g: t, b: p }
        case 1: return { r: q, g: v, b: p }
        case 2: return { r: p, g: v, b: t }
        case 3: return { r: p, g: q, b: v }
        case 4: return { r: t, g: p, b: v }
        default: return { r: v, g: p, b: q }
      }
    }

    function generateColor() {
      if (!config.RAINBOW_MODE) return hexToRGB(config.COLOR)
      const color = HSVtoRGB(Math.random(), 1, 1)
      color.r *= 0.15
      color.g *= 0.15
      color.b *= 0.15
      return color
    }

    function updatePointerDownData(pointer: PointerState, id: number, posX: number, posY: number) {
      pointer.id = id
      pointer.down = true
      pointer.moved = false
      pointer.texcoordX = posX / canvas.width
      pointer.texcoordY = 1 - posY / canvas.height
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.deltaX = 0
      pointer.deltaY = 0
      pointer.color = generateColor()
    }

    function updatePointerMoveData(pointer: PointerState, posX: number, posY: number, color: RGB) {
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.texcoordX = posX / canvas.width
      pointer.texcoordY = 1 - posY / canvas.height
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
      pointer.color = color
    }

    function updatePointerUpData(pointer: PointerState) {
      pointer.down = false
    }

    function splat(x: number, y: number, dx: number, dy: number, color: RGB) {
      splatProgram.bind()
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
      gl.uniform2f(splatProgram.uniforms.point, x, y)
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0)
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100))
      blit(velocity.write)
      velocity.swap()

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
      blit(dye.write)
      dye.swap()
    }

    function splatPointer(pointer: PointerState) {
      splat(
        pointer.texcoordX,
        pointer.texcoordY,
        pointer.deltaX * config.SPLAT_FORCE,
        pointer.deltaY * config.SPLAT_FORCE,
        pointer.color
      )
    }

    function clickSplat(pointer: PointerState) {
      const color = generateColor()
      color.r *= 10
      color.g *= 10
      color.b *= 10
      const dx = 10 * (Math.random() - 0.5)
      const dy = 30 * (Math.random() - 0.5)
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color)
    }

    function updateColors(dt: number, colorUpdateTimer: { current: number }) {
      colorUpdateTimer.current += dt * config.COLOR_UPDATE_SPEED
      if (colorUpdateTimer.current >= 1) {
        colorUpdateTimer.current = wrap(colorUpdateTimer.current, 0, 1)
        pointers.forEach((pointer) => {
          pointer.color = generateColor()
        })
      }
    }

    function applyInputs() {
      pointers.forEach((pointer) => {
        if (!pointer.moved) return
        pointer.moved = false
        splatPointer(pointer)
      })
    }

    function step(dt: number) {
      gl.disable(gl.BLEND)

      curlProgram.bind()
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      vorticityProgram.bind()
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
      gl.uniform1f(vorticityProgram.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      divergenceProgram.bind()
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      clearProgram.bind()
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE)
      blit(pressure.write)
      pressure.swap()

      pressureProgram.bind()
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      gradientSubtractProgram.bind()
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      advectionProgram.bind()
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
      }
      const velocityId = velocity.read.attach(0)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId)
      gl.uniform1f(advectionProgram.uniforms.dt, dt)
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    function drawDisplay(target: FramebufferObject | null) {
      const width = target == null ? gl.drawingBufferWidth : target.width
      const height = target == null ? gl.drawingBufferHeight : target.height
      displayMaterial.bind()
      if (config.SHADING) {
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1 / width, 1 / height)
      }
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0))
      blit(target)
    }

    function render(target: FramebufferObject | null) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.enable(gl.BLEND)
      drawDisplay(target)
    }

    updateKeywords()
    initFramebuffers()

    const lastUpdateTime = { current: Date.now() }
    const colorUpdateTimer = { current: 0 }

    function updateFrame() {
      if (!isActive) return
      const dt = calcDeltaTime(lastUpdateTime)
      if (resizeCanvas()) initFramebuffers()
      updateColors(dt, colorUpdateTimer)
      applyInputs()
      step(dt)
      render(null)
      animationFrameId.current = requestAnimationFrame(updateFrame)
    }

    let firstMouseMoveHandled = false

    function handleMouseDown(event: MouseEvent) {
      const pointer = pointers[0]
      const posX = scaleByPixelRatio(event.clientX)
      const posY = scaleByPixelRatio(event.clientY)
      updatePointerDownData(pointer, -1, posX, posY)
      clickSplat(pointer)
    }

    function handleMouseMove(event: MouseEvent) {
      const pointer = pointers[0]
      const posX = scaleByPixelRatio(event.clientX)
      const posY = scaleByPixelRatio(event.clientY)
      if (!firstMouseMoveHandled) {
        updatePointerMoveData(pointer, posX, posY, generateColor())
        firstMouseMoveHandled = true
        return
      }
      updatePointerMoveData(pointer, posX, posY, pointer.color)
    }

    function handleTouchStart(event: TouchEvent) {
      const pointer = pointers[0]
      for (let i = 0; i < event.targetTouches.length; i++) {
        const touch = event.targetTouches[i]
        updatePointerDownData(pointer, touch.identifier, scaleByPixelRatio(touch.clientX), scaleByPixelRatio(touch.clientY))
      }
    }

    function handleTouchMove(event: TouchEvent) {
      const pointer = pointers[0]
      for (let i = 0; i < event.targetTouches.length; i++) {
        const touch = event.targetTouches[i]
        updatePointerMoveData(pointer, scaleByPixelRatio(touch.clientX), scaleByPixelRatio(touch.clientY), pointer.color)
      }
    }

    function handleTouchEnd(event: TouchEvent) {
      const pointer = pointers[0]
      for (let i = 0; i < event.changedTouches.length; i++) {
        updatePointerUpData(pointer)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    updateFrame()

    return () => {
      isActive = false
      if (animationFrameId.current != null) cancelAnimationFrame(animationFrameId.current)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    BACK_COLOR,
    CAPTURE_RESOLUTION,
    COLOR,
    COLOR_UPDATE_SPEED,
    CURL,
    DENSITY_DISSIPATION,
    DYE_RESOLUTION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    RAINBOW_MODE,
    SHADING,
    SIM_RESOLUTION,
    SPLAT_FORCE,
    SPLAT_RADIUS,
    TRANSPARENT,
    VELOCITY_DISSIPATION,
  ])

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-70 mix-blend-screen">
      <canvas ref={canvasRef} className="block h-screen w-screen" />
    </div>
  )
}

function getWebGLContext(canvas: HTMLCanvasElement) {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  }

  const webgl2 = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null
  const isWebGL2 = Boolean(webgl2)
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = webgl2
  if (!gl) {
    gl =
      (canvas.getContext('webgl', params) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', params) as WebGLRenderingContext | null)
  }
  if (!gl) return null

  let halfFloat: OES_texture_half_float | null = null
  let supportLinearFiltering: OES_texture_float_linear | OES_texture_half_float_linear | null = null

  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float')
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear')
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float')
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear')
  }

  gl.clearColor(0, 0, 0, 1)

  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : halfFloat?.HALF_FLOAT_OES
  if (!halfFloatTexType) return null

  const formatRGBA = isWebGL2
    ? getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType)
    : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
  const formatRG = isWebGL2
    ? getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType)
    : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
  const formatR = isWebGL2
    ? getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType)
    : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering: Boolean(supportLinearFiltering),
    },
  }
}

function getSupportedFormat(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  internalFormat: number,
  format: number,
  type: number
): SupportedFormat | null {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    if ('R16F' in gl && internalFormat === gl.R16F) {
      return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
    }
    if ('RG16F' in gl && internalFormat === gl.RG16F) {
      return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
    }
    return null
  }

  return { internalFormat, format }
}

function supportRenderTextureFormat(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  internalFormat: number,
  format: number,
  type: number
) {
  const texture = gl.createTexture()
  const fbo = gl.createFramebuffer()
  if (!texture || !fbo) return false

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
}
