import ToolsBar from "src/components/ToolsBar.jsx";
import SettingBar from "src/components/SettingBar.jsx";
import Canvas from "src/components/Canvas.jsx";
import CustomModal from "src/components/CustomModal.jsx";

const Painting = () => {
  return (
    <div className='app'>
      <ToolsBar />
      <SettingBar />
      <Canvas />
      <CustomModal />
    </div>
  )
}

export default Painting