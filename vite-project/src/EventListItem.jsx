import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"; 
const EventListItem = (props) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const imageUrl = `data:image/png;base64,${props.image}`;
  const startDate = props.startDate.slice(0, 10);
  const endDate = props.startDate.slice(0, 10);
  useEffect(() => {
    fetchRegistrationStatus();
  }, []);
  const userID=localStorage.getItem("userID");
  const email=localStorage.getItem("email");

  const fetchRegistrationStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/event/registrationStatus/${userID}/${props.eventID}`
      );
      if (response.ok) {
        const data = await response.json();
        setIsRegistered(data);
      } else {
        console.error("Failed to fetch registration status");
      }
    } catch (error) {
      console.error("Error fetching registration status:", error);
    }
  };

  useEffect(() => {
    let timeout;
    if (showRegistrationMessage) {
      timeout = setTimeout(() => {
        setShowRegistrationMessage(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [showRegistrationMessage]);

  const toggleRegistration = async () => {
    try {
      let endpoint;
      let successMessage;
      if (isRegistered) {
        endpoint = "http://localhost:8080/event/unregister";
        successMessage = "Successfully unregistered from the event!";
      } else {
        endpoint = "http://localhost:8080/event/register";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          eventId: props.eventID,
        }),
      });

      if (response.ok) {
        if (isRegistered) {
          setIsRegistered(false);
          setShowRegistrationMessage(true);
          const mailDetails = {
            recipient: email,
            msgBody: 
            `Hi there,
            You have successfully unregistered for ${props.eventName}, 
            Sorry to see you go.
          
            Best regards,
            The Occasionly Team`,
            subject: "Successfully unregistered",
          };

          await axios.post("http://localhost:8080/sendMail", mailDetails);
          
        } else {
          setIsRegistered(true);
          setRegistrationSuccess(true);
          setShowRegistrationMessage(true);
          const mailDetails = {
            recipient: email ,
            msgBody: 
            `Hi there,
            You have successfully registered for ${props.eventName}, the event starts on ${startDate} at ${props.startTime} 
            and ends on ${endDate} at ${props.endTime}.
            Hope to see you there at the event.
          
            Best regards,
            The Occasionly Team`,
            subject: "Successfully registered",
          };

          await axios.post("http://localhost:8080/sendMail", mailDetails);
        }
        
      } else if (response.status === 400) {
        setShowRegistrationMessage(true);
        setRegistrationError(true);
      } else {
        console.error("Failed to perform action on event registration");
      }

      console.log(successMessage);
    } catch (error) {
      console.error("Error performing action on event registration:", error);
    }
  };

  const isPastEvent = new Date(props.startDate) < new Date();
  return (
    <>
      <div className="event-list-item-container">
        <div className={"list-card" + " my-blogs__list-card"}>
          <div className="list-card__body">
            <div className="list-card__image">
              <img src={imageUrl} alt="" />
            </div>
            <div className="list-card__content">
              <Link className="list-card__body-title" to="#">
                {props.eventName}
                <div>
                  <p className="list-card__content-text">{props.description}</p>
                </div>
              </Link>
            </div>
            <div className="list-card__body-date">
              <div>
                <h6>
                  <FontAwesomeIcon icon={faClock} />
                  {" " + props.startTime + " - " + props.endTime}
                </h6>
              </div>
              <div>
                <h6>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {" " +
                    startDate +
                    (endDate !== startDate ? " - " + endDate : "")}
                </h6>
              </div>
              <div className="ven">
                <h6>Venue:{props.venue}</h6>
              </div>
            </div>
          </div>

          <div className="list-card__fab">
            <button
              className={isRegistered ? "butunreg" : "butreg"}
              onClick={toggleRegistration}
              disabled={props.status === 0 || isPastEvent}
            >
              {props.status === 0
                ? "Event Over"
                : isRegistered
                ? "Unregister"
                : "Register"}
            </button>
            {showRegistrationMessage && (
              <div
                className={`registration-message ${
                  registrationSuccess ? "success" : "error"
                }`}
              >
                {registrationSuccess && isRegistered
                  ? "Successfully registered for the event!"
                  : registrationSuccess && !isRegistered
                  ? "Successfully unregistered from the event!"
                  : "User is already registered for this event."}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventListItem;
