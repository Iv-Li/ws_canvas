import { Modal, Button } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import initializeWebSocket from "src/api/ws.js";
import { CONNECTION, DRAW } from "src/consts/methodConsts.js";
import { BRUSH, RECT, FINISH } from "src/consts/drawConsts.js";
import { useStoreContext } from "src/hooks/indes.js";

const CustomModal = () => {
  const [isShown, setShown] = useState(true)
  const ref = useRef()
  const { canvas } = useStoreContext()

  const onHide = () => setShown(false)

  const onEnterClick =  () => {
    if (!ref.current || !ref.current?.value) return
    canvas.setUserName(ref.current.value)
    onHide()
  }

  return (
    <Modal show={isShown} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Set Your Name</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input ref={ref} type="text"/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onEnterClick}>Enter</Button>
      </Modal.Footer>
    </Modal>
  )
}

CustomModal.displayName = 'CustomModal'

export default CustomModal