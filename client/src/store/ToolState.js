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
}

export default ToolState

