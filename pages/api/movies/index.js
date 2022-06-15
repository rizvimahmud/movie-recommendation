import connect from "../../../mongodb/mongoConnect";

export default async function handler(req, res) {
  try {
    const movie = req.body;
    if (!movie) {
      return res.status(400).json({ error: "Please provide a name" });
    }
    const { db } = await connect();

    const movieExists = await db.collection("movies").findOne(movie.name);

    if (movieExists) {
      return res.status(409).json({ error: "Movie already exists" });
    }

    const response = await db.collection("movies").insertOne(JSON.parse(movie));

    res.status(201);
    res.json({ status: "Success", response });
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occured" });
  }
}
