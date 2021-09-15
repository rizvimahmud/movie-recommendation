import useSWR from "swr";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../components/Container";
import List from "../components/List";
const Header = dynamic(() => import("../components/Header"), { ssr: false });

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
    <>
      <Head>
        <title>Movie Recommendation</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="A site for movie recommendation" />
      </Head>
      <div className="min-h-screen bg-gray-100 antialiased dark:bg-gray-800">
        <Container>
          <Header />
          <List movies={movies} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            colored={true}
            closeOnClick
            pauseOnHover
          />
        </Container>
      </div>
    </>
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
