export default class Color {
  constructor(r = 255, g = 255, b = 255, a = 255) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  ToArray() {
    return [this.r, this.g, this.b, this.a]
  }

  ToFloatArray() {
    return [this.r / 255, this.g / 255, this.b / 255, this.a / 255]
  }

  Get32FloatArray() {
    return new Float32Array(this.ToFloatArray())
  }
}
