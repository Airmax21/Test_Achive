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
  const [favorites, setFavorites] = useState<Movie[]>([]);
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

  const addFavorite = (movie: Movie) => {
    setFavorites([...favorites, movie]);
  };

  const removeFavorite = (imdbID: string) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== imdbID
    );
    setFavorites(updatedFavorites);
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div>
        <h2>Favorite Movies</h2>
        <table className="favorite-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Tahun</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr key={favorite.imdbID}>
                <td>{favorite.Title}</td>
                <td>{favorite.Year}</td>
                <td>
                  <button onClick={() => removeFavorite(favorite.imdbID)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
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
            <li className="movie-item" key={result.imdbID}>
              <div onClick={() => handleMovieClick(result)}>
                <img
                  className="movie-poster"
                  src={result.Poster}
                  alt={result.Title}
                />
                <div className="movie-title">{result.Title}</div>
                <div className="movie-year">{result.Year}</div>
              </div>
              <button className="favorite-button" onClick={() => addFavorite(result)}>
                Tambahkan Ke Favorite
              </button>
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
