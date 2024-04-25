import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onStartLogin = async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/authenticate",
          {
            email,
            password,
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          history.push("/dashboard");
          localStorage.setItem("token", response.data);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Failed to login. Please check your credentials.");
      }
    } else {
      alert("Invalid email format.");
    }
  };

  return (
    <div
      className="box-layout"
      style={{ marginLeft: "-9px", marginBottom: "-15px" }}
    >
      <div className="box-layout__logo-outside "></div>
      <div className="box-layout__box ">
        <div className="box-layout__logo-inside">
          <Tilt className="Tilt" options={{ max: 25 }}>
            <img src="images/logo.png" alt="" />
            <h1 className="box-layout__title ">Occasionly</h1>
            <h2 className="box-layout__subtitle">
              Explore different activities held in IIIT
            </h2>
          </Tilt>
        </div>
        <div className="box-layout__form">
          <form onSubmit={onStartLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button className="button button-primary">Login</button>
          </form>
          <div className="box-layout__question">
            <label>Don't have an account? </label>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
