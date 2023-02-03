import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      //history.push("/");
      navigate("/");
    }
  }, [isLoggedIn, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lsUsername = localStorage.getItem("username");
    const lsPassword = localStorage.getItem("password");

    if (username !== "" && password !== "") {
      if (username === lsUsername && password === lsPassword) {
        setIsLoggedIn(true);
        //navigate("/");
      } else {
        alert("Incorrect username or password");
      }
    } else {
      alert("Username and Password are required fields");
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
}

export default Login;
