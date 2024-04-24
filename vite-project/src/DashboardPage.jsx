import React from "react";
import EventListItem from "./EventListItem";
import EventFilters from "./EventFilters";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./header";
import Footer from "./Footer";
const DashboardPage = () => {
  const propsToPass = {
    eventName: "Foss Weekend",
    description: "Discover the power of open source at IIIT Lucknow's Foss Weekend! Join us for a dynamic event dedicated to exploring the world of Free and Open Source Software. Engage in workshops, discussions, and hand-on activities led industry experts. Immerse yourself in a weekend of learning, collab, and community building.",
    startTime: "10:00",
    endTime: "17:00",
    eventId: 1,
    startDate: "24-04-2024",
    endDate: "26-04-2024",
    venue: "Room 120, IIIT Lucknow",
    image:"/images/img5.jpeg"
  };
  const propsToPass1 = {
    eventName: "HackOFiesta",
    description:"Join us for an exhilarating hackathon organized by IIIT Lucknow. Unleash your creativity, problem-solving skills, Whether you're a seasoned coder or a newcomer to the world of programming, this event offers a platform to innovate, learn, and network. Get ready to dive into a 48-hour marathon of coding, ideation, and teamwork, where your ingenuity has the power to shape the future.",
    startTime: "18:00",
    endTime: "06:00",
    eventId: 2,
    startDate: "29-04-2024",
    endDate: "01-05-2024",
    venue: "Admin Block, IIIT Lucknow",
    image:"/images/hof.png"
  };

  const propsToPassPst = {
    eventName: "Infinito",
    description:"Join us for 'Infinito,' an electrifying event organized by IIIT Lucknow, where sports enthusiasts converge to celebrate a diverse array of athletic competitions, including esports. Experience the thrill of competition, and sportsmanship as participants showcase their skills. From traditional sports to cutting-edge esports, 'Infinito' offers a platform for players of all levels.",
    startTime: "08:00",
    endTime: "16:00",
    eventId: 1,
    startDate: "21-03-2024",
    endDate: "27-03-2024",
    venue: "Football Ground, IIIT Lucknow",
    image:"/images/infinito.jpeg"
  };

  return (
    <div>
      <Header />
      <EventFilters />
      <div className="card">
        <h1 className="headevent">Upcoming Events</h1>
        <div className="blog-card event-list-item-container">
          <EventListItem {...propsToPass} />
          <EventListItem {...propsToPass1} />
        </div>
        <h1 className="headevent">Past Events</h1>
        <div className="blog-card event-list-item-container">
          <EventListItem {...propsToPassPst} />
        </div>
        <Link to="/add" className="button-floating">
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardPage;
