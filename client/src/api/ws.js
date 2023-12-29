const initializeWebSocket = (initData) => {
  const WS_DOMAIN = import.meta.env.VITE_WS_DOMAIN;
  const ws = new WebSocket(WS_DOMAIN);

  ws.onopen = () => {
    initData && ws.send(JSON.stringify(initData))
  };

  ws.onerror = (error) => {
    console.error('WebSocket connection error:', error);
  };

  return ws;
}
export default initializeWebSocket