import { Matrix4x4 } from '../../math/Matrix4x4.js'
import Camera from './Camera.js'

export default class PerspectiveCamera extends Camera {
  constructor(fov, aspect, near, far) {
    super()

    this.fov = fov
    this.aspect = aspect
    this.near = near
    this.far = far

    this.viewMatrix = Matrix4x4.Perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }

  RecalculateView(width, height) {
    this.aspect = width / height
    

    this.viewMatrix = Matrix4x4.Perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }
}
