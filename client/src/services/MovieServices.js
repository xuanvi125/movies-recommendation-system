const API_URL = import.meta.env.VITE_API_URL;
const movieUrl = `${API_URL}/api/v1/movie`;

export async function searchMovies(queryString) {
  const query = queryString.toString();
  const response = await fetch(`${movieUrl}/search?${query}`);
  return await response.json();
}

export async function getTrendingMovies(day = 'day') {
    const response = await fetch(`${movieUrl}/trending/${day}`);
    return await response.json();
}   

export async function getMovieDetail(movieId) {
    const response = await fetch(`${movieUrl}/${movieId}`);
    return await response.json();
}

export async function getCreditsFromMovieId(movieId) {
  const response = await fetch(`${movieUrl}/${movieId}/credits`);
  return await response.json();
}