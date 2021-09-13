import connect from "../../../mongodb/mongoConnect";

export default async function handler(_, res) {
  try {
    const { db } = await connect();
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ likes: 1 })
      .toArray();

    res.status(200);
    res.json(movies);
  } catch (err) {
    res.status(500);
    res.json({ error: "Failed to fetch" });
  }
}
