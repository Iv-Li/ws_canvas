const broadcasting = ({ ws, clients, msg }) => {
  clients.forEach((client) => {
    if(client.id === msg.id) {
      ws.send(JSON.stringify(msg))
    }
  })
}

module.exports = broadcasting