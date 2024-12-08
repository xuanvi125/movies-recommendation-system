const API_KEY = import.meta.env.VITE_API_KEY;
export async function searchMovies(queryString) {
  const query = queryString.toString();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&${query}`
  );
  return await response.json();
}
