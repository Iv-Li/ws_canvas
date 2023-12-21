import { makeAutoObservable } from "mobx";
class ToolState {
  _tool = null

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool) {
    this._tool = tool
  }

  get tool() {
    return this._tool
  }

  setFillColor(color) {
    this._tool.fillColor = color
    console.log(this._tool)
  }

  setStrokeColor(color) {
    this._tool.strokeColor = color
  }

  setLineWidth(width) {
    this._tool.lineWidth = width
  }
}

export default ToolState

