require("dotenv").config();
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://jabedek:6HPObdDeK0zOyM2C@cbbg-cluster.re9mwpk.mongodb.net/?retryWrites=true&w=majority`;

export const mongoConnection = async () => {
  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
  });

  const db = await client.db("cbbg-main");

  return { db };
};
