import { Tools } from "src/tools/index.js";

class Circle extends Tools {
  constructor(canvas) {
    super(canvas);
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.onMouseDown.bind(this)
    this.canvas.onmouseup = this.onMouseUp.bind(this)
    this.canvas.onmousemove = this.onMouseMove.bind(this)
  }

  onMouseDown(e) {
    this.mousedown = true
    const { offsetX, offsetY} = this.getMousePositionRelativeToElement(e)
    this.startX = offsetX
    this.startY = offsetY
    this.startView = this.canvas.toDataURL()
  }

  onMouseUp() {
    this.mousedown = false
  }

  onMouseMove(e) {
    if(!this.mousedown) return
    const { offsetX, offsetY} = this.getMousePositionRelativeToElement(e)
    const w = offsetX - this.startX
    const h = offsetY - this.startY
    const centerX = offsetX - (w / 2)
    const centerY = offsetY - (h / 2)
    const radius = w >= h ? w / 2 : h / 2
    const startAngle = 0
    const endAngle = 2 * Math.PI

    this.draw(centerX, centerY, radius, startAngle, endAngle)
  }

  draw(x, y, radius, startAngle, endAngle) {
    const img = new Image()
    img.src = this.startView
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, startAngle, endAngle)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
    }

  }
}

export default Circle