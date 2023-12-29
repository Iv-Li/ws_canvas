const broadcasting = ({ clients, msg }) => {
  clients.forEach((client) => {
    if(client.id === msg.id) {
      client.send(JSON.stringify(msg), (error) => {
        if (error) {
          console.error("Error sending message:", error);
        }
      })
    }
  })
}

module.exports = broadcasting