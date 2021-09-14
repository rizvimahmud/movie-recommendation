import { useState } from "react";
import { mutate } from "swr";

function AddForm() {
  const [movieName, setMovieName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieName || movieName.length < 3) {
      throw new Error("PLease, enter a valid name");
    }

    try {
      const movie = {
        title: movieName,
        likes: 0,
      };

      mutate(
        "/api/get-movies",
        async (movies) => {
          console.log(movies);
          return [...movies, { ...movie, _id: 1231245 }];
        },
        false
      );

      await fetch("/api/movies", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ ...movie }),
      });

      mutate("/api/movies/get-movies");
    } catch (err) {
      console.log(err);
    }

    setMovieName("");
  };

  return (
    <div className="py-6">
      <div className="w-full">
        <form className="flex justify-between items-center space-x-3 w-full h-12 bg-gray-50 dark:bg-gray-700  px-4 py-3 rounded-md border border-gray-200 dark:border-gray-500">
          <input
            type="text"
            placeholder="Movie name..."
            maxLength="150"
            required
            autoComplete="false"
            onChange={(e) => setMovieName(e.target.value)}
            className="flex-1 appearance-none border-0 ring-0 outline-none group bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleSubmit}
            className="px-6 xs:px-4  py-[6px] bg-gray-700 rounded-md font-medium uppercase text-white dark:text-black hover:bg-gray-900 dark:bg-gray-200 active:bg-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
