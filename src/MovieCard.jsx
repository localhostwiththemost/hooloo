import React, { useState, useEffect } from "react";

function MovieCard({ movie: { imdbID, Year, Poster, Title, Type } }) {
  const [starred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starred")) || []
  );
  const [starImg, setStarImg] = useState(
    starred.find((f) => f.imdbID === imdbID)
      ? "src/images/star-filled.png"
      : "src/images/star-empty.png"
  );

  useEffect(() => {
    const lsStarred = JSON.parse(localStorage.getItem("starred")) || [];
    setStarred(lsStarred);
  }, []);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setStarImg((prevStarURL) => {
      let newStarURL;
      let newStarred = JSON.parse(localStorage.getItem("starred")) || [];
      if (prevStarURL === "src/images/star-empty.png") {
        newStarURL = "src/images/star-filled.png";

        if (!newStarred.find((movie) => movie.imdbID === imdbID)) {
          newStarred.push({ imdbID, Year, Poster, Title, Type });
        }
      } else {
        newStarURL = "src/images/star-empty.png";
        newStarred = newStarred.filter((movie) => movie.imdbID !== imdbID);
      }
      setStarred(newStarred);
      localStorage.setItem("starred", JSON.stringify(newStarred));
      return newStarURL;
    });
  };

  return (
    <div className="movie" key={imdbID} onClick={handleFavoriteClick}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
          className="poster"
        />
      </div>
      <img src={starImg} onClick={handleFavoriteClick} className="star" />

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
