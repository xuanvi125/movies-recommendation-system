import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Banner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  function handleSubmit() {
    if (query) {
      navigate(`/search?query=${query}`);
    }
  }
  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <div className="h-[400px] w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 hue-rotate-180"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/w1920_and_h427_multi_faces/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg')",
        }}
      ></div>

      <div className="absolute inset-0 flex flex-col w-4/5 mx-auto justify-center text-white px-4">
        <h1 className="font-bold text-6xl mb-4">Welcome.</h1>
        <h3 className="text-3xl mb-8">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
        <div className="mt-6">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full h-[45px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for a movie, TV show, person..."
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
