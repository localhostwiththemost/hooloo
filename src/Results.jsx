import React from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

function Results(props) {
  return (
    <>
      {props.loading ? (
        <section className="results-section">
          <div className="container">
            <div className="empty">
              <Loader />
            </div>
          </div>
        </section>
      ) : props.movies && props.movies.length > 0 && props.movies.length > 5 ? (
        <section className="results-section">
          <div className="container">
            {props.movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        </section>
      ) : props.movies && props.movies.length < 5 ? (
        <section className="results-section__few">
          <div className="container">
            {props.movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        </section>
      ) : (
        !props.loading && (
          <section className="results-section">
            <div className="container">
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default Results;
