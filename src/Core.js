import Mesh from './draw/Mesh.js'
import BoxGeometry from './geometry/BoxGeometry.js'
import BasicMaterial from './materials/BasicMaterial.js'
import Color from './renderer/Color.js'
import WebGLRenderer from './renderer/WebGLRenderer.js'
import PerspectiveCamera from './renderer/camera/PerspectiveCamera.js'
import Texture from './texture/Texture.js'

const Core = {
  WebGLRenderer,
  Mesh,
  PerspectiveCamera,

  BoxGeometry,
  BasicMaterial,
  Color,
  Texture,
}

export default Core
