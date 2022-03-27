import { createSever } from "http";

const server = require("http").createServer(app);

const io = reuire("socket.io")(server, {});

io.on("connection", (socket) => {
  console.log("What is socket: ", socket);
});
