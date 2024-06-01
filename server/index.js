const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("A new client connection");

  // received data from sensor and transfer to client
  const initializeData = { temperature: 0, humidity: 0 };
  socket.send(JSON.stringify(initializeData));

  socket.on("message", (message) => {
    console.log("Received: ", message.toString());

    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === "sensorData") {
        const { temperature, humidity } = parsedMessage;
        console.log(
          "🚀 ~ socket.on ~ temperature, humidity:",
          temperature,
          humidity
        );

        const dataToSend = { temperature, humidity };
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(dataToSend));
          }
        });
      } else if (parsedMessage.type === "fanControl") {
        const { status } = parsedMessage;
        console.log("🚀 ~ socket.on ~ status:", status);
        const fanStatus = { type: "fanControl", status };
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(fanStatus));
          }
        });
      } else if (parsedMessage.type === "ledControl") {
        const { status } = parsedMessage;
        console.log("🚀 ~ socket.on ~ status:", status);
        const ledStatus = { type: "ledControl", status };
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(ledStatus));
          }
        });
      } else {
        console.log("Unknow message type");
      }
    } catch (error) {
      console.log("🚀 ~ socket.on ~ error:", error);
    }
  });
  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", () => {
    console.log("🚀 ~ soket.error ~ error:", error);
  });
});

console.log("Server listening on port " + PORT);
