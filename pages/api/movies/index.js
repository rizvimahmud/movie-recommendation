import connect from "../../../mongodb/mongoConnect";

export default async function handler(req, res) {
  try {
    const movie = req.body;
    const { db } = await connect();
    const response = await db.collection("movies").insertOne(JSON.parse(movie));

    if (!movie) {
      return res.status(400).json({ error: "Please provide a name" });
    }

    res.status(200);
    res.json({ status: "Success", response });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "Failed to fetch" });
  }
}
