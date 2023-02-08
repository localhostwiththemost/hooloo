import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import ErrorPage from "./ErrorPage";
import { OMDB_API_KEY } from "./env.js";

const API_KEY = OMDB_API_KEY;

const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Movie");
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const location = useLocation();
  const navigate = useNavigate();

  // A callback function to update the isLoggedIn state in the App component
  const updateIsLoggedIn = (status) => {
    setIsLoggedIn(status);
    navigate("/");
  };

  // Redirects user to login page when the app is first opened
  useEffect(() => {
    navigate("/login");
  }, []);

  useEffect(() => {
    const isLoggedInLS = localStorage.getItem("isLoggedIn");
    if (!isLoggedInLS) {
      localStorage.setItem("isLoggedIn", false);
    }

    if (isLoggedInLS === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // If user navigates to the login page they will be logged out
  useEffect(() => {
    if (location.pathname === "/login" && isLoggedIn) {
      localStorage.setItem("isLoggedIn", false);
      setIsLoggedIn(false);
    }
  }, [location.pathname, isLoggedIn]);

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
      {isLoggedIn ? (
        <>
          <ScrollToTop />
          <NavBar
            searchMovies={searchMovies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            className={className}
          />
        </>
      ) : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={<Results loading={loading} movies={movies} />}
            />
            <Route
              path="/login"
              element={
                <div className="login-page">
                  <Login updateIsLoggedIn={updateIsLoggedIn} />
                </div>
              }
            />
            <Route path="/featured" element={<Featured />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/starred" element={<Starred />} />
            <Route
              path="/account"
              element={<Account updateIsLoggedIn={updateIsLoggedIn} />}
            />
          </>
        ) : (
          <Route
            path="/login"
            element={
              <div className="login-page">
                <Login updateIsLoggedIn={updateIsLoggedIn} />
              </div>
            }
          />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {isLoggedIn ? <Footer className={className} /> : null}
    </>
  );
}

export default App;
