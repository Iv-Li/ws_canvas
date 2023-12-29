import { Tools } from "src/tools/index.js";
import { DRAW } from "src/consts/methodConsts.js";
import { RECT } from "src/consts/drawConsts.js";

class Rect extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

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

    this.socket.send(JSON.stringify({
      method: DRAW,
      id: this.id,
      figure: {
        type: RECT,
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height
      }
    }))
  }

  onMouseMove(e) {
    if (!this.mouseDown) return
    const { offsetX, offsetY} = this.getMousePositionRelativeToElement(e)
    this.width = offsetX - this.startX
    this.height = offsetY - this.startY
    this.draw(this.startX, this.startY, this.width, this.height)
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

  static staticDraw(ctx, x, y, w, h) {
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
}

export default Rect