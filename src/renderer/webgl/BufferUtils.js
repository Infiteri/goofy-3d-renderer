import { gl } from '../WebGLRenderer.js'

export default class BufferUtils {
  static buffers = {}

  /**
   * @param {string} name
   * @param {"VERTEX" | "INDEX"} type
   * @param {any} data
   */
  static BufferData(name, type, data) {
    const b = gl.createBuffer()

    if (type === 'INDEX') {
      let bufferType = null
      bufferType = gl.ELEMENT_ARRAY_BUFFER
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b)
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(data),
        gl.STATIC_DRAW
      )
      this.buffers[name] = { buffer: b, bufferType }
    }

    if (type === 'VERTEX') {
      let bufferType = null
      bufferType = gl.ARRAY_BUFFER
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
      this.buffers[name] = { buffer: b, bufferType }
    }
  }

  static AttribInfo(location, offset, size) {
    gl.vertexAttribPointer(
      location,
      size,
      gl.FLOAT,
      false,
      size * Float32Array.BYTES_PER_ELEMENT,
      offset * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(location)
  }

  static BindBuffer(name) {
    const b = this.buffers[name]

    if (!b) {
      console.warn(`BufferUtils.BindBuffer: No buffer under name` + name)
      return
    }

    gl.bindBuffer(b.bufferType, b.buffer)
  }
}
