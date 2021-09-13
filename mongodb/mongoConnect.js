import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect() {
  await client.connect();
  const db = client.db("movie_application");
  return { client, db };
}
