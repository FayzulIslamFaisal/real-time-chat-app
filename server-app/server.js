const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected with ID===>>:", socket.id);
  // Listening for 'btn_clicked' event
  socket.on("btn_clicked", () => {
    console.log("Button clicked by user:");
    socket.emit("click_smt");
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Server is Connected...");
});
