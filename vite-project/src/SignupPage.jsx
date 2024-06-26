import React, { useState,useEffect } from "react";
import axios from "axios"; 
import isEmail from "validator/lib/isEmail";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  const [msg, setMsg] = useState("Please Wait");
  const [bg, setBg] = useState("rgba(0, 128, 0, 0.8)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setUserHandle] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");


  const [isSubmitted,setisSubmitted]=useState(false);
  const [showPostMessage,setShowPostMessage]=useState(false);
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

  const onStartSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && isEmail(email)) {
      const credentials = {
        name,
        userHandle: handle,
        email,
        password,
      };
  
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/register",
          credentials
        );
  
        
        const mailDetails = {
          recipient: email,
          msgBody: `Hello ${name},
        
        Welcome to Occasionly, your go-to platform for exploring and participating in exciting events happening around your college campus! 🎉
        
        We're thrilled to have you join our vibrant community of event enthusiasts. Whether you're into academic seminars, cultural festivals, sports competitions, or social gatherings, Occasionly has something for everyone.
        
        Here's what you can expect from Occasionly:
        
        1. Discover a diverse range of events: Explore an extensive list of upcoming events, including workshops, hackathons, music concerts, art exhibitions, and much more. With our intuitive platform, finding events that match your interests has never been easier.
        
        2. Seamless event registration: Sign up for events directly through Occasionly with just a few clicks. Say goodbye to long queues and paper forms – our streamlined registration process makes attending events hassle-free.
        
        3. Stay updated on the latest happenings
        
        Best regards,
        The Occasionly Team`,
          subject: "Welcome to Occasionly",
        };
        
        await axios.post("http://localhost:8080/sendMail", mailDetails);
  
        setMsg("Signed Up Successfully");
        console.log("signup success");
  
        setShowPostMessage(true);
      } catch (error) {
        console.error("Error signing up:", error);
        setBg("red");
        setMsg("Error Occurred while Signing Up");
      }
    } else {
      alert("Your password doesn't match! or your email is not correct");
    }
  };
  

  return (
    <div
      className="bl"
      style={{ marginLeft: "-9px", marginBottom: "-15px" }}
    >
      <div className="bl__logo-outside "></div>

      <div className="bl__signup-box">
        <div className="bl__logo-inside">
          <Tilt className="Tilt" options={{ max: 25 }}>
            <img src="images/logo.png" alt="" />
            <h1 className="bl__title ">Occasionly</h1>
            <h2 className="bl__subtitle">
              Explore different activities held in IIIT
            </h2>
          </Tilt>
        </div>
        <div className="bl__form">
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

            <button className="button button-primary " onClick={togglePost}>Sign Up</button>
            {(showPostMessage )&&(
              <div className="add-eventsign" style={{backgroundColor:bg}}>
                {msg}
              </div>
            )}
          </form>

          <label className="bl__question ">
            Already have an account?
          </label>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
