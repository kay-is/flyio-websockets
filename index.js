const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const wsSever = socketIo(httpServer);

app.get("/", (request, response) =>
  response.sendFile(__dirname + "/index.html")
);

let userNumber = 1;
wsSever.on("connection", (socket) => {
  const userId = "User-" + userNumber++;
  socket.on("msg", (msg) => wsSever.emit("msg", userId + ": " + msg));
});

httpServer.listen(8080);
