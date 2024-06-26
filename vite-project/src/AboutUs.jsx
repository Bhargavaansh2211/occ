import React from "react";
import Header from "./header";
import Card from "./Card";

const cardProps1 = {
  card_image:"/images/aryan.png",
  card_name:"Aryan Sharma",
  roll:"LCB2023019",
  git_id:"Aryansharma12344323"
};

const cardProps2 = {
  card_image:"/images/ansh.png",
  card_name:"Ansh Bhargava",
  roll:"LCB2023012",
  git_id:"Bhargavaansh2211"
};
const cardProps3 = {
  card_image:"/images/utkarsh.jpg",
  card_name:"Utkarsh Gupta",
  roll:"LCB2023010",
  git_id:"justkarsh"
};
const cardProps4 = {
  card_image:"/images/ajay.jpg",
  card_name:"Ajay Baghel",
  roll:"LCB2023004",
  git_id:"ajaybaghel05"
};
const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ position: "relative" }}>
        <img src="/images/about.jpg" alt="bck" style={{ position: "absolute", zIndex: 1, top: 0, left: 0, width: "100%", height: "100%",opacity:0.08 }}/>
        <div className="image-container" style={{ position: "relative", zIndex: 2 }}>
          <img src="/images/logo.png" alt="About Us" />
          <h1 className="logohe">Occasionly</h1>
        </div>
        <div className="text-container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{textAlign:'center'}}>About Us</h1>
          <p>
            <h2>What we Are?</h2>Welcome to Occasionly, your go-to platform for
            effortlessly managing and commemorating college events. Our mission
            is to simplify event organization and create lasting memories for
            college communities worldwide.<h2> What Sets Us Apart:</h2> Comprehensive
            Management: From event setup to registration and ticketing,
            Occasionly offers all-in-one event management solutions.<br/> Centralized
            Repository: Access past and upcoming events in one place for easy
            tracking and inspiration.<br/> Community Engagement: Foster collaboration
            and participation with interactive features for sharing upates and
            highlights.<br/> Seamless User Experience: Our user-friendly platform
            ensures a smooth experience for organizers of all levels.<h2> Our
            Commitment:</h2> At Occasionly, we're dedicated to empowering college
            communities to create meaningful events. Join us as we celebrate the
            diversity and spirit of college life, one occasion at a time. <h2>Get
            Started Today:</h2> Sign up now to revolutionize your event planning
            experience with Occasionly. Let's make every college event
            unforgettable together.
          </p>
        </div>
      </div>
      <div>
        <h1 style={{marginLeft:'70px', marginTop:'80px'}}>Our Contributors</h1>
        <div className="event-list-item-container card1">
          <Card {...cardProps1}/>
          <Card {...cardProps2}/>
          <Card {...cardProps3}/>
          <Card {...cardProps4}/>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
