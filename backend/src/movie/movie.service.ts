import { Injectable } from '@nestjs/common';

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

@Injectable()
export class MovieService {

    async getTrendingMovies(day: string) {
        const url = `${API_URL}/trending/movie/${day}?api_key=${API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getMovieById(id: string) {
        const url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }

    async searchMovies(query: string) {
        const url = `${API_URL}/search/movie?api_key=${API_KEY}&${query}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getMovieCredits(id: string) {
        const url = `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }
}
