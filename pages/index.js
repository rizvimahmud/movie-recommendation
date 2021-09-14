import useSWR from "swr";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import List from "../components/List";
const Header = dynamic(() => import("../components/Header"), { ssr: false });

import connect from "../mongodb/mongoConnect";

async function fetcher(url) {
  const res = await fetch(url);

  return res.json();
}

export default function Home({ movieList }) {
  const { data: movies } = useSWR("/api/get-movies", fetcher, {
    fallbackData: movieList,
  });

  return (
    <div className="min-h-screen bg-gray-50 antialiased dark:bg-gray-800">
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
