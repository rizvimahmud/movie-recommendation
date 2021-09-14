import { useEffect, useState } from "react";
import { mutate } from "swr";

function Movies({ movie }) {
  const [disabled, setDisabled] = useState(false);
  const { _id } = movie;

  const handleUpdate = async () => {
    try {
      mutate(
        "/api/get-movies",
        async (movies) => {
          const updatedMovie = movies.find((movie) => movie._id === _id);
          updatedMovie.likes = updatedMovie.likes++;
        },
        false
      );

      await fetch("/api/movies/update", {
        method: "POST",
        body: JSON.stringify({ id: _id }),
      });

      mutate("/api/get-movies");
      localStorage.setItem("disabled", true);

      setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-6 border-t border-gray-200 dark:border-gray-500 first-of-type:border-none">
      <div className="flex justify-between items-center space-x-3">
        <button
          className={`flex justify-center items-center  p-2 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 active:bg-gray-100 active:ring-inset active:ring-[1px] active:ring-blue-300 dark:active:ring-gray-100 ${
            disabled ? "disabled:bg-blue-300 dark:disabled:bg-gray-400" : ""
          }`}
          onClick={handleUpdate}
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 dark:text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        </button>

        <h3 className="flex-1 text-gray-800 dark:text-gray-100 font-medium">
          {movie.title}
        </h3>
        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-xl text-sm dark:text-gray-100">
          {movie.likes}
        </span>
      </div>
    </div>
  );
}

export default Movies;
