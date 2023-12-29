import { Tools } from "src/tools/index.js";
import { DRAW } from "src/consts/methodConsts.js";
import { BRUSH, FINISH } from "src/consts/drawConsts.js";

class Brush extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
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

    this.socket.send(JSON.stringify({
      method: DRAW,
      id: this.id,
      figure: {
        type: FINISH,
      }
    }))
  }

  onMouseMove(e) {
    if (this.mouseDown) {
      const {offsetX, offsetY } = this.getMousePositionRelativeToElement(e)
      //this.draw(offsetX, offsetY)
      this.socket.send(JSON.stringify({
        method: DRAW,
        id: this.id,
        figure: {
          type: BRUSH,
          x: offsetX,
          y: offsetY
        }
      }))
    }
  }

  static draw(ctx, x, y){
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

export default Brush