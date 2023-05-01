import MathUtils from '../math/MathUtils.js'
import { gl } from '../renderer/WebGLRenderer.js'

export default class Texture {
  static unit = -1

  constructor(src) {
    this.src = src

    Texture.unit++
    this.unit = Texture.unit

    this.texture = gl.createTexture()

    this._Load()
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  Activate() {
    gl.activeTexture(gl.TEXTURE0 + this.unit)
    this.Bind()
  }

  /** @private */
  _Load() {
    const image = new Image()

    image.onload = () => {
      this.Bind()
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

      const { width, height } = image

      if (MathUtils.IsPowerOf2(width) && MathUtils.IsPowerOf2(height)) {
        gl.generateMipmap(gl.TEXTURE_2D)
      } else {
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      }

      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }

    image.src = this.src
  }
}
