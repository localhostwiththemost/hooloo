import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function NavBar(props) {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("home");
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedPath") || "/"
  );

  const navigate = useNavigate();

  const searchMovies = async (title) => {
    navigate("/");
    props.searchMovies(title);
    setActiveTab("home");
  };

  // Reset select to "Home" when user logs in
  useEffect(() => {
    if (props.isLoggedIn) {
      setSelectedOption("");
    }
  }, [props.isLoggedIn]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(`/${event.target.value}`);
    localStorage.setItem("selectedPath", event.target.value);
  };

  return (
    <>
      <header className={props.className}>
        <nav>
          <div className="title-container">
            <Link
              to="/"
              onClick={() => {
                setActiveTab("home");
                setSelectedOption("");
                localStorage.setItem("selectedPath", "/");
              }}
            >
              <h1>hooloo</h1>
            </Link>
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setActiveTab("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/featured"
                className={location.pathname === "/featured" ? "active" : ""}
                onClick={() => setActiveTab("featured")}
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                to="/genres"
                className={location.pathname === "/genres" ? "active" : ""}
                onClick={() => setActiveTab("genres")}
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                to="/starred"
                className={location.pathname === "/starred" ? "active" : ""}
                onClick={() => setActiveTab("starred")}
              >
                My Starred
              </Link>
            </li>
          </ul>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="">Home</option>
            <option value="featured">Featured</option>
            <option value="genres">Genres</option>
            <option value="starred">Starred</option>
            <option value="account">Account</option>
          </select>
          <div className="icon-container">
            <div className="search">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  searchMovies(props.searchTerm);
                }}
              >
                <input
                  placeholder="Search"
                  value={props.searchTerm}
                  onChange={(e) => props.setSearchTerm(e.target.value)}
                  spellCheck="false"
                />
              </form>
              <ion-icon
                name="search"
                onClick={() => searchMovies(props.searchTerm)}
              ></ion-icon>
            </div>
          </div>
          <Link
            to="/account"
            className={location.pathname === "/account" ? "active-account" : ""}
            onClick={() => {
              setActiveTab("account");
              setSelectedOption("account");
              localStorage.setItem("selectedPath", "account");
            }}
          >
            <ion-icon name="person-circle"></ion-icon>
          </Link>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
