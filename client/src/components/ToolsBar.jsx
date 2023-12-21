import { Stack, Button, Container } from 'react-bootstrap'
import BrushImg from 'src/assets/brush.svg?react'
import RectImg from 'src/assets/rect.svg?react'
import CircleImg from 'src/assets/circle.svg?react'
import EraserImg from 'src/assets/eraser.svg?react'
import ColourImg from 'src/assets/colour.svg?react'
import UndoImg from 'src/assets/undo.svg?react'
import RedoImg from 'src/assets/redo.svg?react'
import SaveImg from 'src/assets/save.svg?react'

const ToolsBar = () => {
  return (
    <Stack direction="horizontal" gap={3} className="shadow p-2 bg-white">
      <Button variant="light"><BrushImg /></Button>
      <Button variant="light"><RectImg /></Button>
      <Button variant="light"><CircleImg /></Button>
      <Button variant="light"><EraserImg /></Button>
      <Button variant="light" ><ColourImg /></Button>
      <Button variant="light" className="ms-auto"><UndoImg /></Button>
      <Button variant="light"><RedoImg /></Button>
      <Button variant="light"><SaveImg /></Button>
    </Stack>
  )
}

export default ToolsBar