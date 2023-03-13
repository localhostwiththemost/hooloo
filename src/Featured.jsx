import React, { useState, useEffect } from "react";
//import { redirect } from "react-router-dom";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

const API_URL = "https://www.omdbapi.com?apikey=9a98a936";

function Featured() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [featured]);

  const getFeaturedMovies = async (title) => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setLoading(false);
    setFeatured(data.Search);
  };

  useEffect(() => {
    getFeaturedMovies("star wars");
  }, []);

  return (
    <>
      <section className="results-section">
        {loading ? (
          <div className="container">
            <div className="empty">
              <Loader />
            </div>
          </div>
        ) : featured.length > 0 ? (
          <div className="container">
            {featured.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="container">
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
}

export default Featured;
