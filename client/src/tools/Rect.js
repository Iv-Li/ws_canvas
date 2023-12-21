import { Tools } from "src/tools/index.js";

class Rect extends Tools {
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
    this.mouseDown = true
    const { offsetX, offsetY} = this.getMousePositionRelativeToElement(e)
    this.startX = offsetX
    this.startY = offsetY
    this.startView = this.canvas.toDataURL()
  }

  onMouseUp() {
    this.mouseDown = false
  }

  onMouseMove(e) {
    if (!this.mouseDown) return
    const { offsetX, offsetY} = this.getMousePositionRelativeToElement(e)
    const w = offsetX - this.startX
    const h = offsetY - this.startY
    this.draw(this.startX, this.startY, w, h)
  }

  draw(x, y, w, h) {
    const img = new Image()
    img.src = this.startView
    img.onload = () => {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }
}

export default Rect