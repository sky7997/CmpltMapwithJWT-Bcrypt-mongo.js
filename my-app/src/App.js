import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";

import Reglog from "./components/Reglog";
import Cofvendmac from "./components/Cofvendmac";
import Navbar from "./components/Navbar";
import Details from "./components/details";
import About from "./components/about";
import Cart from "./components/Cart";
import Home from "./components/Home";

const Wrapper = () => {
  const navigate = useNavigate();
  const [yes, setYes] = useState(false);

  // ✅ Check login status on mount
  useEffect(() => {
    fetch("http://localhost:5000/protected", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setYes(true);
        } else {
          setYes(false);
          navigate("/reglog");
        }
      });
  }, [navigate]);

  const logFF = () => {
    // ✅ Call logout API and update state
    fetch("http://localhost:5000/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setYes(false);
      navigate("/reglog");
    });
  };

  const logInn = () => {
    setYes(true);
    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={logFF} />
      <Routes>
        {!yes ? (
          <Route path="*" element={<Reglog onLogging={logInn} />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Cofvendmac" element={<Cofvendmac />} />
            <Route path="/details" element={<Details />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Wrapper />
    </Router>
  );
};

export default App;
