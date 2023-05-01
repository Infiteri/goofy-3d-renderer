import Shader from './webgl/Shader.js'

export const gl = document
  .querySelector('canvas')
  .getContext('webgl2', { alpha: false })

const VERTEX = `
    attribute vec4 aPosition;
    attribute vec2 aUVs;
    attribute vec4 aColors;

    uniform mat4 uCamera;
    uniform mat4 uObject;

    varying vec2 vUVs;
    varying vec4 vColors;

    void main() {
        gl_Position = uCamera * uObject * aPosition;
        vUVs = aUVs;
        vColors = aColors;
    }
`

const FRAGMENT = `
    precision mediump float;

    uniform sampler2D sampler;
    uniform int useTexture;
    uniform vec4 uColor;

    varying vec2 vUVs;
    varying vec4 vColors;

    void main() {
      vec4 finalColor = vColors;

      if(useTexture == 1) {
          finalColor = vColors * texture2D(sampler, vUVs);
      }

      gl_FragColor = finalColor;
    }
`

export default class WebGLRenderer {
  constructor() {
    this.isWebGLRenderer = true

    this._canvas = document.querySelector('canvas')
  }

  Start() {
    if (this._canvas === null) {
      throw new Error('WebGLRenderer.Start: Canvas cant be null.')
    }

    if (!gl || gl === undefined) {
      throw new Error('WebGLRenderer.Start: WebGL2 is not supported.')
    }

    this.shader = new Shader(VERTEX, FRAGMENT)

    // Resize code
    this.Resize(innerWidth, innerHeight)

    this.SetClearColor()

    gl.getExtension('EXT_color_buffer_float')
  }

  SetClearColor(r = 0, g = 0, b = 0, a = 1) {
    gl.clearColor(r, g, b, a)
  }

  Resize(width, height, camera) {
    this._canvas.width = width
    this._canvas.height = height

    gl.viewport(0, 0, width, height)

    if (camera) {
      camera.RecalculateView(width, height)
    }
  }

  Render(camera) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.clearDepth(1.0) // Clear everything
    gl.enable(gl.DEPTH_TEST) // Enable depth testing
    gl.depthFunc(gl.LEQUAL) // Near things obscure far things
    // gl.enable(gl.BLEND)
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    if (!this.shader) return

    this.shader.Use()

    this.shader.Mat4('uCamera', camera.GetViewTransform().ToFloat32Array())
  }
}
