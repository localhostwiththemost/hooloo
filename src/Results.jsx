import React from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

function Results(props) {
  return (
    <section className="results-section">
      {props.loading ? (
        <div className="container">
          <div className="empty">
            <Loader />
          </div>
        </div>
      ) : props.movies && props.movies.length > 0 ? (
        <div className="container">
          {props.movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        !props.loading && (
          <div className="container">
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default Results;
