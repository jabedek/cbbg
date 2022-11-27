const app = require("express")();
const http = require("http").createServer(app);
require("dotenv").config();

import { Request, Response } from "express";
import { mongoConnection } from "./mongodb/driver";
import { setupSocketServer } from "./socket/handle-connection";

async function setup() {
  const { db } = await mongoConnection();

  const collection = await db
    .collection("users")
    .find({ name: "John" })
    .toArray()
    .then((a) => console.log(a));

  app.get("/", (req: Request, res: Response) =>
    res.send("<h1>Hey Socket.io</h1>")
  );

  setupSocketServer(http, ["http://localhost:4200"]);

  http.listen(process.env.PORT, () => console.log("listening on *:3000"));
}

setup();
