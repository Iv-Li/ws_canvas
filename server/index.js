const express = require('express')
const app = express()
const wss = require('express-ws')(app)
const { CONNECTION, DRAW} = require('./consts/methodConsts')
const { broadcasting, connectUser} = require('./services/index')


const wssClients = wss.getWss()


const PORT = process.env.PORT || 5000
app.ws('/', function (ws, req){
  ws.on('message', function (msg) {
    switch (msg.method) {
      case CONNECTION:
        connectUser({ ws, clients: wssClients.clients, msg })
        break;
      case DRAW:
        broadcasting({ ws, clients: wssClients.clients, msg })
        break;
    }
  })
})

app.listen(PORT)