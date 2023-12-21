import { makeAutoObservable } from "mobx";

class CanvasState {
  _canvas = null

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this._canvas = canvas
  }

  get canvas() {
    return this._canvas
  }
}

export default CanvasState