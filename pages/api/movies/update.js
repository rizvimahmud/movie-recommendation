import connect from "../../../mongodb/mongoConnect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { id } = JSON.parse(req.body);
    const { db } = await connect();

    await db
      .collection("movies")
      .updateOne({ _id: ObjectId(id) }, { $inc: { likes: 1 } });

    res.status(200);
    res.json({ status: "Success" });
  } catch (err) {
    res.status(500);
    res.json({ error: "Failed to fetch" });
  }
}
