// Import necessary modules
import express from "express";
import cors from "cors";
import morgan from "morgan";

/**
 * Creates and configures an Express application.
 * @returns {express.Application} Configured Express app.
 */
const createApp = () => {
    const app = express();

    // Middleware for logging HTTP requests
    app.use(morgan("dev"));

    // Middleware to parse JSON request bodies
    app.use(express.json());

    // Middleware to enable Cross-Origin Resource Sharing (CORS)
    app.use(cors());

    // Basic route to test server functionality
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    return app;
};

export default createApp;
