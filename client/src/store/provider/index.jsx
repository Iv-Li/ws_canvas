import { createContext } from "react";
import CanvasState from "src/store/CanvasState.js";
import ToolState from "src/store/ToolState.js";

export const StoreContext = createContext({})

const StoreProvider =({ children }) => {
  const value = {
    canvas: new CanvasState(),
    tool: new ToolState()
  }
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider