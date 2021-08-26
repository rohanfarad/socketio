const express = require("express");

const app = express();
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("what is socket", socket);
  //   console.log("socket is active and connected");
  socket.on("chat", (payload) => {
    console.log("what is payload", payload);
    io.emit("chat", payload);
  });
});
httpServer.listen(5000, console.log("server started on port 5000"));
