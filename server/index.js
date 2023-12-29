const express = require('express')
const app = express()
const wss = require('express-ws')(app)
const { CONNECTION, DRAW} = require('./consts/methodConsts')
const { broadcasting, connectUser} = require('./services/index')


const wssClients = wss.getWss()


const PORT = process.env.PORT || 5000
app.ws('/', function (ws, req){
  ws.on('message', function (msg) {
    const parsedMsg = JSON.parse(msg);

    switch (parsedMsg.method) {
      case CONNECTION:
        connectUser({ ws, clients: wssClients.clients, msg: parsedMsg })
        break;
      case DRAW:
        broadcasting({ clients: wssClients.clients, msg: parsedMsg })
        break;
    }
  })
})

app.listen(PORT)