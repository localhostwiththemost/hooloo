import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function Starred() {
  const [starred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starred")) || []
  );

  useEffect(() => {
    const lsStarred = JSON.parse(localStorage.getItem("starred")) || [];
    setStarred(lsStarred);
  }, []);

  const handleRemoveClick = (id) => {
    const updatedStarred = starred.filter((movie) => movie.imdbID !== id);
    setStarred(updatedStarred);
    localStorage.setItem("starred", JSON.stringify(updatedStarred));
  };

  return (
    <>
      {starred.length > 0 ? (
        <section className="starred-section__full">
          <div className="container">
            {starred.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onRemoveClick={() => handleRemoveClick(movie.imdbID)}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="starred-section">
          <div className="empty">
            <h2>You have no starred movies</h2>
          </div>
        </section>
      )}
    </>
  );
}

export default Starred;
