import useSWR from "swr";
import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/List";

import connect from "../mongodb/mongoConnect";

async function fetcher(url) {
  const res = await fetch(url);

  return res.json();
}

export default function Home({ movieList }) {
  const { data: movies } = useSWR("/api/movies/get-movies", fetcher, {
    fallbackData: movieList,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <Header />
        <List movies={movies} />
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { db } = await connect();
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ likes: 1 })
      .toArray();
    return {
      props: {
        movieList: JSON.parse(JSON.stringify(movies)),
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
