const broadcasting = require('./broadcasting')

const connectUser = ({ ws, clients, msg }) => {
  ws.id = msg.id
  broadcasting({ clients, msg: msg.name })
}

module.exports = connectUser