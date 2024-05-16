import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [msg, setmsg] = useState("Please wait...");
  const [bg, setbg] = useState("rgba(0, 128, 0, 0.8)");
  const [isSubmitted, setisSubmitted] = useState(false);
  const [showPostMessage, setShowPostMessage] = useState(false);
  useEffect(() => {
    let timeout;
    if (showPostMessage) {
      timeout = setTimeout(() => {
        setShowPostMessage(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [showPostMessage]);
  const togglePost = () => {
    setisSubmitted(!isSubmitted);
    setShowPostMessage(true);
  };

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
          localStorage.setItem("token", response.data);

          const userResponse = await axios.get(
            `http://localhost:8080/user/getuser/${email}`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

          if (userResponse.status === 200) {
            const userData = userResponse.data;
            console.log("User data:", userData);
            localStorage.setItem("userID", userData.userId);
            localStorage.setItem("userHandle", userData.user_handle);
            localStorage.setItem("email", userData.email);

            history.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setbg("red");
        setmsg("Invalid Credentials !");
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
            <button className="button button-primary" onClick={togglePost}>
              Login
            </button>
            {isSubmitted && showPostMessage && (
              <div className="add-eventlog" style={{ backgroundColor: bg }}>
                {msg}
              </div>
            )}
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
