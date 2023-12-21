import { Stack, Form, Row, Col } from "react-bootstrap";

const SettingBar = () => {
  return (
    <Stack className="shadow p-2 bg-white">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" as={Row}>
        <Form.Label column sm={2}>Товщина лінії</Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="1" min={1}/>
        </Col>
      </Form.Group>
    </Stack>
  );
};

export default SettingBar;