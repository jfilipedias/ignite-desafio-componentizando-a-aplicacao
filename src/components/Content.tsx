import { MovieCard } from './MovieCard';

import '../styles/content.scss';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export interface MovieResponseProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  genreTitle: string;
  selectedGenreId: number;
}

export function Content({ genreTitle, selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieResponseProps[]>([]);

  useEffect(() => {
    api.get<MovieResponseProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span>{genreTitle}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}