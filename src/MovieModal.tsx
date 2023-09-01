import React from "react";
import useSWR from "swr";
import "./MovieModal.css";

const API_KEY = "7e9307a5";

interface MovieModalProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
  };
  onClose: () => void;
}
const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`,
    fetcher
  );
  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {data ? (
          <div className="container">
            <div className="image">
              <img
                className="movie-poster"
                src={data.Poster}
                alt={data.Title}
              />
            </div>
            <div className="text">
              <h2>{data.Title}</h2>
              <p>{data.Year}</p>
              <p>{data.Plot}</p>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
