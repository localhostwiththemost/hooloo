import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./sass/main.css";
import Login from "./Login";
import ScrollToTop from "./ScrollToTop";
import NavBar from "./NavBar";
import Results from "./Results";
import Featured from "./Featured";
import Genres from "./Genres";
import Starred from "./Starred";
import Account from "./Account";
import Footer from "./Footer";
import { OMDB_API_KEY } from "./env.js";

const API_KEY = OMDB_API_KEY;

const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Movie");
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");

  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  const searchMovies = async (title) => {
    setLoading(true);
    let response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setLoading(false);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setClassName(location.pathname === "/login" ? "hide" : "");
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <NavBar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className={className}
      />
      <Routes>
        <Route
          path="/"
          element={<Results loading={loading} movies={movies} />}
        />
        <Route
          path="/login"
          element={
            <div className="login-page">
              <Login />
            </div>
          }
        />
        <Route path="/featured" element={<Featured />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer className={className} />
    </>
  );
}

export default App;
