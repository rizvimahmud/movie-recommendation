import AddForm from "./AddForm";
import Movies from "./Movies";

function List({ movies }) {
  return (
    <div>
      <div className="px-6 py-6 rounded-lg bg-white shadow-xl dark:bg-gray-900">
        <AddForm />
        <div className="border border-gray-200  dark:border-gray-500 rounded-lg ">
          {movies.map((movie) => (
            <Movies key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
