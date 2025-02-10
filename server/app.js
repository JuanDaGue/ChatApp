import express from "express";
import cors from "cors";
import morgan from "morgan";

const createApp = () => {
  const app = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
};

export default createApp;
