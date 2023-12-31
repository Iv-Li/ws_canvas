import { Stack, Button } from 'react-bootstrap'
import BrushImg from 'src/assets/brush.svg?react'
import RectImg from 'src/assets/rect.svg?react'
import CircleImg from 'src/assets/circle.svg?react'
import EraserImg from 'src/assets/eraser.svg?react'
import ColourImg from 'src/assets/colour.svg?react'
import UndoImg from 'src/assets/undo.svg?react'
import RedoImg from 'src/assets/redo.svg?react'
import SaveImg from 'src/assets/save.svg?react'
import LineImg from 'src/assets/line.svg?react'
import { observer } from "mobx-react-lite";
import { useStoreContext } from "src/hooks/indes.js";
import { Brush, Rect, Circle, Eraser, Line } from "src/tools"

const ToolsBar = observer(() => {
  const { canvas: { canvas, sessionId, socket}, tool } = useStoreContext()

  const downloadImg = () => {
    const dataUrl = canvas.toDataURL()

    const a = document.createElement("a")
    a.href = dataUrl
    a.download = sessionId +".jpeg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Stack direction="horizontal" gap={3} className="shadow p-2 bg-white">
      <Button variant="light" onClick={() => tool.setTool(new Brush(canvas, socket, sessionId))}><BrushImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Rect(canvas, socket, sessionId))}><RectImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Circle(canvas, socket, sessionId))}><CircleImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Eraser(canvas, socket, sessionId))}><EraserImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Line(canvas, socket, sessionId))}><LineImg /></Button>
      <Button variant="light" ><ColourImg /></Button>
      <Button variant="light" className="ms-auto" onClick={() => canvas.undo()}><UndoImg /></Button>
      <Button variant="light"  onClick={() => canvas.redo()}><RedoImg /></Button>
      <Button variant="light" onClick={downloadImg}><SaveImg /></Button>
    </Stack>
  )
})

export default ToolsBar