import React, { useState, useEffect } from "react";

const Reglog = ({ onLogging }) => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState("login");

  // Fetch users and check if already logged in
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(dat => setData(dat));

    // Check if logged in
    fetch("http://localhost:5000/users/protected", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setMsg(`Welcome back, ${data.user.username}`);
          onLogging(); // Notify parent if logged in
        }
      });
  }, [onLogging]);

  const regF = () => {
    if (!username || !password) return;
    const fnd = data.find(t => t.username === username);
    if (fnd) {
      setMsg("User already exists");
      return;
    }
    const newdat = { username, password };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newdat)
    })
      .then(res => res.json())
      .then(dat => {
        setData(prev => [...prev, dat]);
        setPage("login");
        setUsername("");
        setPassword("");
        setMsg("Registration successful");
      });
  };

  const logF = () => {
    if (!username || !password) {
      setMsg("Please enter both fields");
      return;
    }

    const credentials = { username, password };

    fetch("http://localhost:5000/users/loginn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // ⬅️ Automatically stores cookie
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(dat => {
        if (dat.error) {
          setMsg(dat.error);
        } else {
          setMsg("Login successful!");
          setUsername("");
          setPassword("");
          onLogging(); // Tell parent we're logged in
        }
      });
  };

  const wanReg = () => {
    setPage("register");
  };

  return (
    <div>
      {page === "login" ? <p>Login</p> : <p>Register</p>}
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {page === "login" ? (
        <button onClick={logF}>Login</button>
      ) : (
        <button onClick={regF}>Register</button>
      )}
      <button onClick={wanReg}>Wanna register?</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Reglog;
