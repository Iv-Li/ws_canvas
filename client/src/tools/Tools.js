class Tools {

  constructor(canvas, socket, id) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.socket = socket
    this.id = id

    this.destroy()
  }

  getMousePositionRelativeToElement(e) {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (e.target.width / rect.width);
    const y = (e.clientY - rect.top) * (e.target.height / rect.height);

    return { offsetX: x, offsetY: y };
  }

  destroy() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width
  }
}

export default Tools