const express = require("express");

const app = express();
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});
const users = [];
io.on("connection", (socket) => {
  // console.log("what is socket", socket);
  //   console.log("socket is active and connected");

  socket.on("join", (payload) => {
    users.push(payload);
    console.log(payload);
    io.emit("joined", users);
  });

  socket.on("messageTo", (payload) => {
    console.log(payload);
    // socket.to(payload.user).emit("fromMessage", payload.userName);
    io.emit(payload.user, payload.userName);
  });

  socket.on("chat", (payload) => {
    // console.log("what is payload", payload);
    console.log(payload);
    const data = [payload.userName, payload.message];
    io.emit(payload.user, data);
    // io.emit("chat", payload);
  });
});
httpServer.listen(5000, console.log("server started on port 5000"));
