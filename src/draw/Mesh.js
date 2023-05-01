import Object3D from '../core/Object3D.js'
import BoxGeometry from '../geometry/BoxGeometry.js'
import BasicMaterial from '../materials/BasicMaterial.js'
import BufferUtils from '../renderer/webgl/BufferUtils.js'
import { gl } from '../renderer/WebGLRenderer.js'

export default class Mesh extends Object3D {
  constructor(geometry = new BoxGeometry(), material = new BasicMaterial()) {
    super()

    this.geometry = geometry
    this.material = material
  }

  Init() {
    BufferUtils.BufferData(this.id + 'Vertex', 'VERTEX', this.geometry.vertices)
    BufferUtils.AttribInfo(0, 0, 3)

    BufferUtils.BufferData(this.id + 'UVs', 'VERTEX', this.geometry.uvs)
    BufferUtils.AttribInfo(1, 0, 2)

    BufferUtils.BufferData(
      this.id + 'Colors',
      'VERTEX',
      this.material.GetColorArray()
    )
    BufferUtils.AttribInfo(2, 0, 4)

    BufferUtils.BufferData(this.id + 'Index', 'INDEX', this.geometry.indices)
  }

  Render(shader) {
    super.Render(shader)
    this.material.Use(shader)

    BufferUtils.BindBuffer(this.id + 'Index')

    const count = this.geometry.GetCount()
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0)
  }
}
