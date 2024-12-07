const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });
  socket.on("new_user", (data) => {
    socket.broadcast.emit("new_user");
    console.log("data", data);
  });

  // Handling disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Server is Connected...");
});
