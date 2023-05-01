import { Matrix4x4 } from '../math/Matrix4x4.js'
import { Vector3 } from '../math/Vector3.js'

export default class Object3D {
  static id = -1

  constructor() {
    Object3D.id++
    this.id = Object3D.id

    this.isObject3D = true

    this.position = new Vector3(0, 0, 0)
    this.rotation = new Vector3(0, 0, 0)
  }

  SetPosition(x, y, z) {
    this.position.x = x
    this.position.y = y
    this.position.z = z
  }

  SetRotation(x, y, z) {
    this.rotation.x = x
    this.rotation.y = y
    this.rotation.z = z
  }

  RotateX(value) {
    this.rotation.x += value
  }

  RotateY(value) {
    this.rotation.y += value
  }

  RotateZ(value) {
    this.rotation.z += value
  }

  Init() {}

  Render(shader) {
    if (!shader) return

    shader.Mat4('uObject', this.GetTransformMatrix().ToFloat32Array())
  }

  GetTransformMatrix() {
    const translation = Matrix4x4.Translation(this.position)
    const rotation = Matrix4x4.RotationXYZ(this.rotation)

    return Matrix4x4.Multiply(translation, rotation)
  }
}
