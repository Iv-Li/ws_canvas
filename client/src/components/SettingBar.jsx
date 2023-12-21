import { Stack, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "src/hooks/indes.js";

const SettingBar = observer(() => {
  const { tool } = useStoreContext()

  return (
    <Stack className="shadow p-2 bg-white" direction="horizontal" gap={3}>
      <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
          <Form.Label column sm={5}>Товщина лінії</Form.Label>
          <Col sm={7}>
            <Form.Control type="number" placeholder="1" min={1} onChange={e => tool.setLineWidth(e.target.value)}/>
          </Col>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
          <Form.Label column sm={5}>Колір заливки</Form.Label>
          <Col sm={7}>
            <Form.Control type="color" onChange={e => tool.setFillColor(e.target.value)}/>
          </Col>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
          <Form.Label column sm={5}>Колір обводки / лінії</Form.Label>
          <Col sm={7}>
            <Form.Control type="color" onChange={e => tool.setStrokeColor(e.target.value)}/>
          </Col>
        </Form.Group>
      </Col>
    </Stack>
  );
});

export default SettingBar;