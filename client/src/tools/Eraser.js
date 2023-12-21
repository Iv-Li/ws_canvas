import { Tools } from "src/tools/index.js";

class Eraser extends Tools {
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

    this.ctx.beginPath()
    this.ctx.moveTo(offsetX, offsetY )
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
    this.ctx.lineTo(x, y)
    this.ctx.strokeStyle = '#fff'
    this.ctx.stroke()
  }
}

export default Eraser