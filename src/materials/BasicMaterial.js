import Color from '../renderer/Color.js'
import Material from './Material.js'

const mbParams = {
  color: new Color(),
  texture: null,
}

export default class BasicMaterial extends Material {
  /**
   * @param {mbParams} params
   */
  constructor(params) {
    super()

    this.color = params.color || new Color()
    this.texture = params.texture || null

    this.faceColors = [
      [...this.color.ToFloatArray()], // Front face
      [...this.color.ToFloatArray()], // Back face
      [...this.color.ToFloatArray()], // Top face
      [...this.color.ToFloatArray()], // Bottom face
      [...this.color.ToFloatArray()], // Right face
      [...this.color.ToFloatArray()], // Left face
    ]
  }

  /**
   * @param {Color} color
   */
  set frontFaceColor(color) {
    this.faceColors[0] = [...color.ToFloatArray()]
  }

  /**
   * @param {Color} color
   */
  set backFaceColor(color) {
    this.faceColors[1] = [...color.ToFloatArray()]
  }

  /**
   * @param {Color} color
   */
  set topFaceColor(color) {
    this.faceColors[2] = [...color.ToFloatArray()]
  }

  /**
   * @param {Color} color
   */
  set bottomFaceColor(color) {
    this.faceColors[3] = [...color.ToFloatArray()]
  }

  /**
   * @param {Color} color
   */
  set rightFaceColor(color) {
    this.faceColors[4] = [...color.ToFloatArray()]
  }

  /**
   * @param {Color} color
   */
  set leftFaceColor(color) {
    this.faceColors[5] = [...color.ToFloatArray()]
  }

  GetColorArray() {
    let colors = []

    for (var j = 0; j < this.faceColors.length; ++j) {
      const c = this.faceColors[j]
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c)
    }

    return colors
  }

  Use(shader) {
    super.Use(shader)

    shader.Int('useTexture', 0)
    if (this.texture !== null) {
      shader.Int('useTexture', 1)

      this.texture.Activate()
      shader.Int('sampler', this.texture.unit)
    }

    // Send color
    shader.Vec4f(
      'uColor',
      this.color.r / 255,
      this.color.g / 255,
      this.color.b / 255,
      this.color.a / 255
    )
  }
}
