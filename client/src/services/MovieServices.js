const API_KEY = import.meta.env.VITE_API_KEY;
export async function searchMovies(queryString) {
  const query = queryString.toString();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&${query}`
  );
  return await response.json();
}

export async function getTrendingMovies(day = 'day') {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${day}?api_key=${API_KEY}`
    );
    return await response.json();
}   

export async function getMovieDetail(movieId) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    return await response.json();
}

export async function getCreditsFromMovieId(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return await response.json();
}