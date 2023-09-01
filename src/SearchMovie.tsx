import React, { useState, FormEvent } from "react";
import useSWR from "swr";
import "./SearchMovie.css";
import MovieModal from "./MovieModal";

const API_KEY = "7e9307a5";

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
  }

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const SearchMovie: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
    fetcher
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Fetch data based on the query
  };

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <form className="form-container">
        <input
          className="input-field"
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
      {data?.Search ? (
        <ul className="movie-grid">
          {data.Search.map((result: any) => (
            <li className="movie-item" key={result.imdbID} onClick={() => handleMovieClick(result)}>
              <img
                className="movie-poster"
                src={result.Poster}
                alt={result.Title}
              />
              <div className="movie-title">{result.Title}</div>
              <div className="movie-year">{result.Year}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchMovie;
