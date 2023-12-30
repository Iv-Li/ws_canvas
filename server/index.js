const express = require('express')
const app = express()
const wss = require('express-ws')(app)
const { CONNECTION, DRAW} = require('./consts/methodConsts')
const { broadcasting, connectUser} = require('./services/index')
const { downloadImg, uploadImg} = require('./controllers/images')
const errorMiddleware = require('./middleware/errorMiddleware')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const morgan = require('morgan')

const wssClients = wss.getWss()

const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
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

app.post('/images', errorMiddleware(downloadImg))
app.get('/images', errorMiddleware(uploadImg))
app.use(errorHandler)

app.listen(PORT)