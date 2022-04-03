const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5001/chat",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected.");
});
