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
  const { canvas, tool } = useStoreContext()
  return (
    <Stack direction="horizontal" gap={3} className="shadow p-2 bg-white">
      <Button variant="light" onClick={() => tool.setTool(new Brush(canvas.canvas))}><BrushImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Rect(canvas.canvas))}><RectImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Circle(canvas.canvas))}><CircleImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Eraser(canvas.canvas))}><EraserImg /></Button>
      <Button variant="light" onClick={() => tool.setTool(new Line(canvas.canvas))}><LineImg /></Button>
      <Button variant="light" ><ColourImg /></Button>
      <Button variant="light" className="ms-auto"><UndoImg /></Button>
      <Button variant="light"><RedoImg /></Button>
      <Button variant="light"><SaveImg /></Button>
    </Stack>
  )
})

export default ToolsBar