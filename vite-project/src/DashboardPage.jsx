import React, { useEffect, useState } from "react";
import EventListItem from "./EventListItem";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Header from "./header";

const DashboardPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/event/",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const pastEvents = events.filter(
    (event) => new Date(event.start_date) < new Date()
  );

  const upcomingEvents = events.filter(
    (event) => new Date(event.start_date) >= new Date()
  );

  return (
    <div>
      <Header />

      <div className="card">
        <h1 className="headevent">Upcoming Events</h1>
        <div
          className="blog-card event-list-item-container"
          style={{ marginTop: "30px" }}
        >
          
            {upcomingEvents.map((event) => (
              <EventListItem
                key={event.eventId}
                eventID={event.eventId}
                eventName={event.title}
                description={event.description}
                startTime={event.start_time}
                endTime={event.end_time}
                startDate={event.start_date}
                endDate={event.end_date}
                venue={event.venue}
                image={event.image}
                status={event.status}
              />
            ))}
          
        </div>
        <h1 className="headevent">Past Events</h1>
        <div
          className="blog-card event-list-item-container"
          style={{ marginTop: "20px" }}
        >
          {pastEvents.map((event) => (
            <EventListItem
              key={event.eventId}
              eventID={event.eventId}
              eventName={event.title}
              description={event.description}
              startTime={event.start_time}
              endTime={event.end_time}
              startDate={event.start_date}
              endDate={event.end_date}
              venue={event.venue}
              image={event.image}
              status={event.status}
            />
          ))}
        </div>
        <Link to="/add" className="button-floating">
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
