import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStoreContext } from "src/hooks/indes.js";
import { Brush, Rect } from "src/tools/index.js";
import initializeWebSocket from "src/api/ws.js";
import { CONNECTION, DRAW } from "src/consts/methodConsts.js";
import { useParams } from "react-router-dom";
import { BRUSH, FINISH, RECT } from "src/consts/drawConsts.js";

const Canvas = observer(() => {
  const ref = useRef()
  const { canvas: canvasContext, tool } = useStoreContext()
  const params = useParams()

  useEffect(() => {
    canvasContext.setCanvas(ref.current)
  }, []);

  useEffect(() => {
    if (canvasContext.userName) {
      const socket = initializeWebSocket({
        id: params.id,
        name: canvasContext.userName,
        method: CONNECTION
      })

      canvasContext.setSocket(socket)
      canvasContext.setSessionId(params.id)
      tool.setTool(new Brush(ref.current, socket, params.id))


      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data)

        switch (msg.method) {
          case CONNECTION:
            break
          case DRAW:
            draw(msg)
            break
        }
      }
    }
  }, [canvasContext.userName]);

  const draw = (data) => {
    const figure = data.figure.type
    const ctx = canvasContext.canvas.getContext('2d')
    switch (figure) {
      case BRUSH:
        Brush.draw(ctx, data.figure.x, data.figure.y)
        break;
      case RECT:
        const { x, y, width, height } = data.figure
        Rect.staticDraw(ctx, x, y, width, height)
        break;
      case FINISH:
        ctx.beginPath()
        break;

    }
  }

  const onMouseDown = () => {
    canvasContext.pushToUndoList(canvasContext.canvas.toDataURL())
  }

  return (
    <Container className="vh-100 position-relative">
      <canvas ref={ref} onMouseDown={onMouseDown}>Canvas</canvas>
    </Container>
  );
});

export default Canvas;