import { Tools } from "src/tools/index.js";

class Line extends Tools {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.onMouseDown.bind(this)
    this.canvas.onmouseup = this.onMouseUp.bind(this)
    this.canvas.onmousemove = this.onMouseMove.bind(this)
  }
  onMouseDown(e) {
    this.mouseDown = true
    const {offsetX, offsetY } = this.getMousePositionRelativeToElement(e)
    this.startX = offsetX
    this.startY = offsetY
    this.startView = this.canvas.toDataURL()
  }

  onMouseUp(e) {
    this.mouseDown = false
  }

  onMouseMove(e) {
    if (this.mouseDown) {
      const {offsetX, offsetY } = this.getMousePositionRelativeToElement(e)
      this.draw(offsetX, offsetY)
    }
  }

  draw(x, y){
    const img = new Image()
    img.src = this.startView
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }
}

export default Line