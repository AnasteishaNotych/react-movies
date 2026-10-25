import axios from "axios";
import type { Movie } from "../types/movie";

const tmdbToken = import.meta.env.VITE_API_KEY;

interface MovieResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
      },
    },
  );
  return response.data.results;
};
