import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Initially set username and password in localStorage
  useEffect(() => {
    const lsUsername = localStorage.getItem("username");
    if (!lsUsername) {
      localStorage.setItem("username", "admin");
    }
  }, []);

  useEffect(() => {
    const lsPassword = localStorage.getItem("password");
    if (!lsPassword) {
      localStorage.setItem("password", "admin");
    }
  }, []);

  // Sets the initial value of isLoggedin in ls to false
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      localStorage.setItem("isLoggedIn", false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
  }, [isLoggedIn, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lsUsername = localStorage.getItem("username");
    const lsPassword = localStorage.getItem("password");

    if (username === "" || password === "") {
      alert("Username and Password are required fields");
      return;
    }

    if (username === lsUsername && password === lsPassword) {
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      // Pass the updated isLoggedIn value to the parent component(App) using props
      props.updateIsLoggedIn(true);
      // Set select element back to "Home"
      setSelectedValue("");
    } else {
      alert("Incorrect username or password");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="post-it">
          <h1>"Super Secure Login"</h1>
          <ul className="post-it__ul">
            <li>Username: {localStorage.getItem("username")}</li>
            <li>Password: {localStorage.getItem("password")}</li>
          </ul>
        </div>

        <div className="login-title__container">
          <h1 className="login-title">hooloo</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
