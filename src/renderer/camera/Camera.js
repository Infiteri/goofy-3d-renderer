import Object3D from '../../core/Object3D.js'
import { Matrix4x4 } from '../../math/Matrix4x4.js'

export default class Camera extends Object3D {
  constructor() {
    super()

    this.viewMatrix = Matrix4x4.Identity()
  }

  GetView() {
    return this.viewMatrix
  }

  GetViewTransform() {
    return Matrix4x4.Multiply(this.viewMatrix, this.GetTransformMatrix())
  }

  RecalculateView(width, height) {}
}
