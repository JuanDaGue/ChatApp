// Import necessary modules
import http from "http";
import dotenv from "dotenv";
import createApp from "./app.js";
import setupSocket from "./socket.js";

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = createApp();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up WebSocket communication
setupSocket(server);

// Define the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
