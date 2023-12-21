import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStoreContext } from "src/hooks/indes.js";
import { Brush } from "src/tools/index.js";

const Canvas = observer(() => {
  const ref = useRef()
  const { canvas: canvasContext, tool } = useStoreContext()

  useEffect(() => {
    canvasContext.setCanvas(ref.current)
    tool.setTool(new Brush(ref.current))
  }, []);
  return (
    <Container className="vh-100 position-relative">
      <canvas ref={ref}>Canvas</canvas>
    </Container>
  );
});

export default Canvas;