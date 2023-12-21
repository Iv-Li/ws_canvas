class Tools {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
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
}

export default Tools