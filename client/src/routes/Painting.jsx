import ToolsBar from "src/components/ToolsBar.jsx";
import SettingBar from "src/components/SettingBar.jsx";
import Canvas from "src/components/Canvas.jsx";

const Painting = () => {
  return (
    <div className='app'>
      <ToolsBar />
      <SettingBar />
      <Canvas />
    </div>
  )
}

export default Painting