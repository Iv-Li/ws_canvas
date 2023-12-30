import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStoreContext } from "src/hooks/indes.js";
import { Brush, Rect } from "src/tools/index.js";
import initializeWebSocket from "src/api/ws.js";
import { CONNECTION, DRAW } from "src/consts/methodConsts.js";
import { useParams } from "react-router-dom";
import { BRUSH, FINISH, RECT } from "src/consts/drawConsts.js";
import { axiosInstance } from "src/config/axios.js";
import axios from "axios";

const Canvas = observer(() => {
  const ref = useRef()
  const { canvas: canvasContext, tool } = useStoreContext()
  const params = useParams()

  useEffect(() => {
    canvasContext.setCanvas(ref.current)
    getStartImg()
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
      getStartImg()

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
        Brush.draw(ctx, data.figure.x, data.figure.y, data.figure.color)
        break;
      case RECT:
        const { x, y, width, height, color } = data.figure
        Rect.staticDraw(ctx, x, y, width, height, color)
        break;
      case FINISH:
        ctx.beginPath()
        break;

    }
  }

  const getStartImg = () => {
    axiosInstance.get(`/images?id=${params.id}`)
      .then(res => {
        const img = res.data?.data
        if(!img) return
        setStartImg(img)
      })
  }
  const setStartImg = (imgDataUrl) => {
    const canvas = canvasContext.canvas
    const ctx = canvas.getContext('2d')
    const img = new Image();
    img.src = imgDataUrl;

    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }

  const onMouseDown = () => {
    canvasContext.pushToUndoList(canvasContext.canvas.toDataURL())
  }

  const onMouseUp = async () => {
    axiosInstance.post(`/images?id=${canvasContext.sessionId}`, { img: canvasContext.canvas.toDataURL()})
  }

  return (
    <Container className="vh-100 position-relative">
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>Canvas</canvas>
    </Container>
  );
});

export default Canvas;