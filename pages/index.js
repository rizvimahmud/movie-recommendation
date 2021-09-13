import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/List";
import MovieData from "../data/data";

export default function Home({ movies }) {
  return (
    <div className="h-screen bg-gray-50">
      <Container>
        <Header />
        <List movies={movies} />
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      movies: MovieData,
    },
  };
}
