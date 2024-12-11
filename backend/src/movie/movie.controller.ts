import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('/api/v1/movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get("/trending/:day")
    getTrendingMovies(@Param("day") day: string) {
        return this.movieService.getTrendingMovies(day);
    }

    @Get("/search")
    searchMovies(@Query() q: any) {
        const query = new URLSearchParams(q);
        return this.movieService.searchMovies(query.toString());
    }

    @Get("/:id")
    getMovieById(@Param("id") id: string) {
        return this.movieService.getMovieById(id);
    }

    @Get("/:id/credits")
    getMovieCredits(@Param("id") id: string) {
        return this.movieService.getMovieCredits(id);
    }
}
