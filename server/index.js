import http from "http";
import dotenv from "dotenv";
import createApp from "./app.js";
import setupSocket from "./socket.js";

dotenv.config();

const app = createApp();
const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
