import { Server as socketIO } from "socket.io";

const setupSocket = (server) => {
  const io = new socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("chat", (data) => {
      console.log("Chat message received:", data);
      socket.broadcast.emit("chat", data);
    });

    socket.on("message", (data) => {
      console.log("Message received:", data);
      socket.broadcast.emit("message", data);
    });
  });

  return io;
};

export default setupSocket;
