const broadcasting = require('broadcastiong')

const connectUser = ({ ws, clients, msg }) => {
  broadcasting({ ws, clients, msg: msg.name })
}

module.exports = connectUser