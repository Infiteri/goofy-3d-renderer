export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static get ZERO() {
    return new Vector3(0, 0, 0)
  }

  static get ONE() {
    return new Vector3(1, 1, 1)
  }

  ToArray() {
    return [this.x, this.y, this.z]
  }

  To32Array() {
    return new Float32Array(this.ToArray())
  }

  Add(vector) {
    this.x += vector.x
    this.y += vector.y

    return this
  }

  Sub(vector) {
    this.x -= vector.x
    this.y -= vector.y

    return this
  }

  Div(vector) {
    this.x /= vector.x
    this.y /= vector.y

    return this
  }

  Mul(vector) {
    this.x *= vector.x
    this.y *= vector.y

    return this
  }

  Clone() {
    return new Vector3(this.x, this.y, this.z)
  }
}
