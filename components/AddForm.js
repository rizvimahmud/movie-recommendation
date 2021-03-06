import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

import { capitalize } from "../utils/helper-functions";

toast.configure();

function AddForm() {
  const [movieName, setMovieName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieName.length < 3) {
      toast.info("Please, enter a valid name");
      return;
    }

    try {
      const movie = {
        title: capitalize(movieName),
        likes: 0,
      };

      mutate(
        "/api/movies/get-movies",
        async (movies) => {
          return [...movies, { ...movie, _id: 1231245 }];
        },
        false
      );

      const response = await fetch("/api/movies", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ ...movie }),
      });
      const data = await response.json();

      response.ok
        ? toast.success("Successfully added your movie")
        : toast.error(data?.error ?? "Failed to add your movie");

      mutate("/api/movies/get-movies");

      setMovieName("");
    } catch (err) {
      toast.error("An unexpected error occured");
    }
  };

  return (
    <div className="py-6">
      <div className="w-full">
        <form className="flex justify-between items-center space-x-1 sm:space-x-3 w-full h-12 bg-gray-50 dark:bg-gray-700  px-2 sm:px-4 py-3 rounded-md border border-gray-200 dark:border-gray-500">
          <input
            type="text"
            placeholder="Movie name..."
            maxLength="150"
            required
            autoComplete="false"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="flex-1 appearance-none border-0 ring-0 outline-none  bg-gray-50 dark:bg-gray-700 text-gray-900 text-sm sm:text-base dark:text-gray-100"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-2 sm:px-6 py-[6px] bg-gray-700 rounded-md font-medium uppercase text-sm sm:text-base text-white dark:text-black hover:bg-gray-900 dark:bg-gray-200 active:bg-gray-500 disabled:bg-gray-400"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
