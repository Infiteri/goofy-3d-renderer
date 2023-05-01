export default class Geometry {
  constructor() {
    this.indices = []
    this.vertices = []
    this.uvs = []
    this.normals = []
    this.tangents = []
  }

  GetCount() {
    return this.indices.length
  }
}
