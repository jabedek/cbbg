import { db } from "./models/models.index";

const uri = `mongodb+srv://jabedek:6HPObdDeK0zOyM2C@cbbg-cluster.re9mwpk.mongodb.net/cbbg-main?retryWrites=true&w=majority`;

const User = db.user;

export async function mongoConnection2() {
  return db?.mongoose
    ?.connect(uri)
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      // initial();
    })
    .catch((err: any) => {
      console.error("Connection error", err);
      process.exit();
    });
}
