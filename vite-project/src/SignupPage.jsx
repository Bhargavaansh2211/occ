import React, { useState } from "react";

import isEmail from "validator/lib/isEmail";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setUserHandle] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const onStartSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword && isEmail(email)) {
      const credentials = {
        email,
        name,
        password,
        confirmPassword,
        handle,
      };

      alert(
        "Verification Link has been sent successfully to your email. Please verify it and then login"
      );
      console.log("signup success");
    } else {
      alert("Your password doesn't match! or your email is not correct");
    }
  };

  return (
    <div className="box-layout">
      <div className="box-layout__logo-outside "></div>

      <div className="box-layout__signup-box ">
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
          <form onSubmit={onStartSignUp}>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={handle}
              placeholder="user handle"
              onChange={(e) => setUserHandle(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="button button-primary ">Sign Up</button>
          </form>
          
          <label className="box-layout__question ">
            Already have an account?
          </label>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
