import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCalendarAlt,
  faClock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EventListItem = (props) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);

  useEffect(() => {
    let timeout;
    if (showRegistrationMessage) {
      timeout = setTimeout(() => {
        setShowRegistrationMessage(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [showRegistrationMessage]);

  const toggleRegistration = () => {
    setIsRegistered(!isRegistered);
    setShowRegistrationMessage(true);
  };

  return (
    <>
      <div className="event-list-item-container">
        <div className={"list-card" + " my-blogs__list-card"}>
          <div className="list-card__body">
            <div className="list-card__image">
              {<img src={props?.image} alt="" />}
            </div>
            <div className="list-card__content">
              <Link className="list-card__body-title" to="#">
                {props?.eventName}
                <div>
                  <p className="list-card__content-text">
                    {props?.description}
                  </p>
                </div>
              </Link>
            </div>
            <div className="list-card__body-date">
              <div>
                <h6>
                  <FontAwesomeIcon icon={faClock} />
                  {" " + props?.startTime + " - " + props?.endTime}
                </h6>
              </div>
              <div>
                <h6>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {" " +
                    (props?.startDate?.split(",")[0] || "") +
                    (props?.endDate !== props?.startDate
                      ? " - " + (props?.endDate?.split(",")[0] || "")
                      : "")}
                </h6>
              </div>
              <div className="ven">
                <h6>Venue:{props?.venue}</h6>
              </div>
            </div>
          </div>

          <div className="list-card__fab">
            <button
              className={isRegistered ? "butunreg" : "butreg"}
              onClick={toggleRegistration}
              disabled={props?.status === 0}
            >
              {props?.status === 0
                ? "Event Over"
                : isRegistered
                ? "Unregister"
                : "Register"}
            </button>
            {((isRegistered) && showRegistrationMessage) && (
              <div className="registration-message">
                Successfully registered for the event!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventListItem;
