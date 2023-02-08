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
  const [displayGenres, setDisplayGenres] = useState(true);

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
      {displayGenres ? (
        <section className="genres-section__empty">
          <ul className="genre-link__container">
            <li>
              <a
                onClick={() => {
                  setGenre("action");
                  setDisplayGenres(false);
                }}
              >
                Action
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("adventure");
                  setDisplayGenres(false);
                }}
              >
                Adventure
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("comedy");
                  setDisplayGenres(false);
                }}
              >
                Comedy
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("crime");
                  setDisplayGenres(false);
                }}
              >
                Crime
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("documentary");
                  setDisplayGenres(false);
                }}
              >
                Documentary
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("drama");
                  setDisplayGenres(false);
                }}
              >
                Drama
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("family");
                  setDisplayGenres(false);
                }}
              >
                Family
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("fantasy");
                  setDisplayGenres(false);
                }}
              >
                Fantasy
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setGenre("horror");
                  setDisplayGenres(false);
                }}
              >
                Horror
              </a>
            </li>
          </ul>
        </section>
      ) : (
        <>
          {loading ? (
            <>
              <section className="genres-section__empty">
                <ion-icon
                  name="arrow-back-outline"
                  className="back-icon"
                  onClick={() => {
                    setGenre("");
                    setDisplayGenres(true);
                  }}
                ></ion-icon>
                <div className="container">
                  <div className="empty">
                    <Loader />
                  </div>
                </div>
              </section>
            </>
          ) : movies.length > 0 ? (
            <>
              <section className="genres-section">
                <ion-icon
                  name="arrow-back-outline"
                  className="back-icon"
                  onClick={() => {
                    setGenre("");
                    setDisplayGenres(true);
                  }}
                ></ion-icon>
                <br></br>
                <br></br>
                <br></br>
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="genres-section__empty">
                <ion-icon
                  name="arrow-back-outline"
                  className="back-icon"
                  onClick={() => {
                    setGenre("");
                    setDisplayGenres(true);
                  }}
                ></ion-icon>
                <div className="container">
                  <div className="empty">
                    <h2>No movies found</h2>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Genres;
