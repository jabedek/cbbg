import { Request, Response, Application } from "express";
import { authRoutes } from "./api/routes/auth.routes";
import { userRoutes } from "./api/routes/user.routes";
import { initMongoConnection } from "./mongodb/driver-mongoose";
import { setupSocketServer } from "./socket/handle-connection";
const express = require("express");
const app: Application = express();
const http = require("http").createServer(app);
const cors = require("cors");

async function setup() {
  const frontendUrl = "http://localhost:4200";
  require("dotenv").config();

  const corsOptions = {
    origin: frontendUrl,
  };

  initMongoConnection();

  app
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello" });
  });

  authRoutes(app);
  userRoutes(app);
  setupSocketServer(http, [frontendUrl]);
  http.listen(process.env.PORT, () => console.log("listening on *:3000"));
}

setup();
