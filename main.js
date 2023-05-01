import Core from './src/Core.js'

const renderer = new Core.WebGLRenderer()
renderer.Start()

const camera = new Core.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.01,
  1000
)
camera.SetPosition(0, 0, -10)

window.onresize = () => {
  renderer.Resize(innerWidth, innerHeight, camera)
}

const material = new Core.BasicMaterial({
  texture: new Core.Texture('/res/crate_color.png'),
  
})

const mesh = new Core.Mesh(new Core.BoxGeometry(), material)
mesh.Init()

function Loop() {
  renderer.Render(camera)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01

  mesh.Render(renderer.shader)

  requestAnimationFrame(Loop)
}

Loop()
