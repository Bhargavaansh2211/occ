import React from 'react';
import {Link} from 'react-router-dom';
import { faCalendarAlt, faClock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const EventListItem = ({ eventName="App dev", description="make an app", userImageUrl, time, userHandle="ansh", imageUrl, startTime="10:00", endTime="11:00",eventId=1, location, startDate="1-11-11", endDate="1-11-11", fee, id=1, venues }) => (
    <div className={"list-card"+ " my-blogs__list-card" }>
        <div className="list-card__body">
            <div className="list-card__image">
                {imageUrl ? <img src={imageUrl} alt="" /> : <img src='/images/img5.jpeg' alt="" />}
            </div>
            <div className="list-card__content">
               
                <Link className="list-card__body-title" to={`/event/${id||eventId}`}>
                    {eventName}
                    <div className="list-card__body-author">
                        <img src={userImageUrl} alt="" />
                        <h3>{userHandle}</h3>
                    </div>
                    <div>
                        <p className="list-card__content-text">{description.substring(0, 300) + ' ...'}</p>
                    </div>
                </Link>
            </div>
            <div className="list-card__body-date">
                <div><h6><FontAwesomeIcon icon={faClock}/>{" " + startTime + " - " + endTime}</h6></div>
                <div>
                    <h6><FontAwesomeIcon icon={faCalendarAlt} />{" " + startDate.split(',')[0] + (endDate !== startDate ? " - " + endDate.split(',')[0] : "")}</h6>
                </div>
                <ul>
                    {/* <li><FontAwesomeIcon icon={faHeart}  size="lg"/></li>
                    <li><FontAwesomeIcon icon={faComment}  size="lg"/></li>
                    <li><FontAwesomeIcon icon={faShare} size="lg"/></li> */}
                </ul>
            </div>
        </div>

        <div className="list-card__fab">
                <Link to={`/event/${id}`}>
                    <FontAwesomeIcon icon={faArrowRight} size="2x" color="#eb6e80"/>
                </Link>
            </div>  
    </div>
);

export default EventListItem;