import AddForm from "./AddForm";
import Movies from "./Movies";

function List({ movies }) {
  return (
    <div>
      <div className="px-6 py-6 rounded-lg bg-white shadow-md">
        <AddForm />
        <div className="border border-gray-200 rounded-lg">
          {movies.map((movie) => (
            <Movies key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
