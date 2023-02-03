import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import { OMDB_API_KEY } from "./env.js";

const API_KEY = OMDB_API_KEY;

const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

function Genres() {
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  useEffect(() => {
    if (genre) {
      setLoading(true);
      const fetchMovies = async () => {
        const response = await fetch(`${API_URL}&s=${genre}`);
        const data = await response.json();
        setLoading(false);
        setMovies(data.Search);
      };

      fetchMovies();
    }
  }, [genre]);

  return (
    <>
      <section className="results-section">
        <ul className="genre-link__container">
          <li>
            <a onClick={() => setGenre("action")}>Action</a>
          </li>
          <li>
            <a onClick={() => setGenre("adventure")}>Adventure</a>
          </li>
          <li>
            <a onClick={() => setGenre("comedy")}>Comedy</a>
          </li>
          <li>
            <a onClick={() => setGenre("crime")}>Crime</a>
          </li>
          <li>
            <a onClick={() => setGenre("documentary")}>Documentary</a>
          </li>
          <li>
            <a onClick={() => setGenre("drama")}>Drama</a>
          </li>
          <li>
            <a onClick={() => setGenre("family")}>Family</a>
          </li>
          <li>
            <a onClick={() => setGenre("fantasy")}>Fantasy</a>
          </li>
          <li>
            <a onClick={() => setGenre("horror")}>Horror</a>
          </li>
        </ul>

        {loading ? (
          <div className="container">
            <div className="empty">
              <Loader />
            </div>
          </div>
        ) : movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="container">
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Genres;
