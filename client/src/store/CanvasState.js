import { makeAutoObservable } from "mobx";

class CanvasState {
  _canvas = null
  _undoList = []
  _redoList = []
  _username = ''
  _socket = null
  _sessionId = null

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this._canvas = canvas
  }

  get canvas() {
    return this._canvas
  }

  setUserName(name) {
    this._username = name
  }

  get userName() {
    return this._username
  }

  setSocket(socket) {
    this._socket = socket
  }

  get socket() {
    return this._socket
  }

  setSessionId(id) {
    this._sessionId = id
  }

  get sessionId() {
    return this._sessionId
  }

  pushToUndoList(view) {
    this._undoList.push(view)
  }

  updateCanvasView(ctx, imgUrl) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
      ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
      ctx.drawImage(img,  0, 0, this._canvas.width, this._canvas.height)
    }
  }
  undo() {
    const ctx = this._canvas.getContext('2d')
    if (this._undoList.length) {
      const last = this._undoList.pop()
      this._redoList.push(this._canvas.toDataURL())
      this.updateCanvasView(ctx, last)
    } else {
      ctx.clearRect(0, 0, ctx.width, ctx.height)
    }
  }

  redo() {
    const ctx = this._canvas.getContext('2d')
    if (this._redoList.length) {
      const last = this._redoList.pop()
      this._undoList.push(this._canvas.toDataURL())
      this.updateCanvasView(ctx, last)
    }
  }
}

export default CanvasState