import express from "express";
import http from "http";
import {Server as socketIO} from "socket.io";
import cors from "cors";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);
const io = new socketIO(server);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});