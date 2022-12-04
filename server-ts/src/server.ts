import { Request, Response, Application } from "express";
import { mongoConnection } from "./mongodb/driver";
import { mongoConnection2 } from "./mongodb/driver-mongoose";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { setupSocketServer } from "./socket/handle-connection";
const express = require("express");
const app: Application = express();
const http = require("http").createServer(app);
const cors = require("cors");

async function setup() {
  require("dotenv").config();

  const corsOptions = {
    origin: "http://localhost:4200",
  };

  const db = await mongoConnection2();
  // const { db } = await mongoConnection();

  // const collection = await db
  //   .collection("users")
  //   .find({ name: "John" })
  //   .toArray()
  //   .then((a) => console.log(a));

  app
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello" });
    // res.send("<h1>Hey Socket.io</h1>");
  });

  authRoutes(app);
  userRoutes(app);

  setupSocketServer(http, ["http://localhost:4200"]);

  http.listen(process.env.PORT, () => console.log("listening on *:3000"));
}

setup();
