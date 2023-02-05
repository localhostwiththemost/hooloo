import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Account(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  // Initially set username and password in localStorage
  useEffect(() => {
    const lsUsername = localStorage.getItem("username");
    if (!lsUsername) {
      localStorage.setItem("username", username);
    }
  }, []);

  useEffect(() => {
    const lsPassword = localStorage.getItem("password");
    if (!lsPassword) {
      localStorage.setItem("password", password);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    localStorage.setItem("name", event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    localStorage.setItem("username", event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    localStorage.setItem("password", event.target.value);
  };

  useEffect(() => {
    const lsName = localStorage.getItem("name");
    if (lsName) {
      setName(lsName);
    }
  }, []);

  useEffect(() => {
    const lsUsername = localStorage.getItem("username");
    if (lsUsername) {
      setUsername(lsUsername);
    }
  }, []);

  useEffect(() => {
    const lsPassword = localStorage.getItem("password");
    if (lsPassword) {
      setPassword(lsPassword);
    }
  }, []);

  return (
    <>
      <section className="account-section">
        <Link to="/login">
          <ion-icon
            name="log-out-outline"
            className="logout-icon"
            onClick={() => {
              localStorage.setItem("isLoggedIn", false);
              props.updateIsLoggedIn(false);
            }}
          ></ion-icon>
        </Link>
        <div className="account-container">
          <h1 className="account-heading">Manage Your Account</h1>
          <form className="account-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </form>
        </div>
      </section>
    </>
  );
}

export default Account;
