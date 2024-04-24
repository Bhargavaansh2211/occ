import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import Header from "./header";

const EventForm = (props) => {
  const [eventName, onEventNameChange] = useState(
    props.event ? props.event.eventName : ""
  );
  const [description, onDescriptionChange] = useState(
    props.event ? props.event.description : ""
  );
  const [imageUrl, onImageUrlChange] = useState(
    props.event ? props.event.imageUrl : ""
  );
  const [startDate, onStartDateChange] = useState(
    props.event ? new Date(props.event.startDate) : new Date()
  );
  const [endDate, onEndDateChange] = useState(
    props.event ? new Date(props.event.endDate) : new Date()
  );
  const [startTime, onStartTimeChange] = useState(
    props.event ? new Date(props.event.startTime) : new Date()
  );
  const [endTime, onEndTimeChange] = useState(
    props.event ? new Date(props.event.endTime) : new Date()
  );
  const [location, onLocationChange] = useState(
    props.event ? props.event.location : ""
  );
  const [fee, onFeeChange] = useState(props.event ? props.event.fee : "");
  const [error, onErrorChange] = useState("");
  const [image, onImage] = useState();
  const [multiDayEvent, onMultiDayEventChange] = useState("");
  const formData = new FormData();

  const onTitleChange = (e) => {
    onEventNameChange(e.target.value);
  };

  const handleLocationChange = (e) => {
    onLocationChange(e.target.value);
  };
  const handleFeeChange = (e) => {
    const fees = e.target.value;
    if (!fees || fees.match(/^\d{1,}(\.\d{0,2})?$/)) {
      onFeeChange(fees);
    }
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    onDescriptionChange(description);
  };

  const handleStartTimeChange = (startTime) => {
    onStartTimeChange(startTime);
    console.log(startTime);
  };

  const handleEndTimeChange = (endTime) => {
    onEndTimeChange(endTime);
    console.log(endTime);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageChange");
    fileInput.click();
  };
  const onImageChange = (e) => {
    onImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    onImageUrlChange(url);
    console.log(!!image);
  };

  const isMultiDayEvent = () => {
    onMultiDayEventChange(!multiDayEvent);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!eventName) {
      onErrorChange("Please provide the Event name.");
    } else if (!description) {
      onErrorChange("Please provide the description.");
    } else if (!location) {
      onErrorChange("Please provide the venue.");
    } else if (!fee) {
      onErrorChange("Please provide the fee.");
    } else {
      onErrorChange("");
      const check = {
        eventName,
        description,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        startTime: startTime.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
        fee,
        location,
      };
      formData.append("eventName", eventName);
      formData.append("description", description);
      formData.append("startDate", startDate.toLocaleDateString());
      formData.append("endDate", endDate.toLocaleDateString());
      formData.append("startTime", startTime.toLocaleTimeString());
      formData.append("endTime", endTime.toLocaleTimeString());
      formData.append("fee", fee);
      formData.append("location", location);
      console.log(!!image);
      !!image && formData.append("image", image, image.name);
      console.log(check);
      props.onSubmit(formData);
    }
  };
  return (
    <div>
      <Header />
      <div className="form">
        <div className="form-image">
          {props.event ? (
            <div className="form-image-exist">
              <img src={imageUrl || props.event.imageUrl} alt="" />
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt="" />
          ) : (
            <img src="images/empty.jpg" alt="" />
          )}
          <input
            type="file"
            hidden="hidden"
            name=""
            id="imageChange"
            onChange={onImageChange}
          />
          <button className="btn third" onClick={handleEditPicture}>
            {props.event ? "edit image" : "add image"}
          </button>
        </div>
        <form action="" onSubmit={onSubmit}>
          {error && <p className="form__error">{error}</p>}
          <div className="form-content__main">
            <input
              type="text"
              placeholder="Enter the title here"
              className="form-title"
              value={eventName}
              onChange={onTitleChange}
            />
            <textarea
              placeholder="A description for your event"
              className="form-description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <div className="form-content__others">
              <div className="form-content__others-others">
                <div className="form-venue">
                  <label>Venue:</label>
                  <input
                    type="text"
                    className=""
                    value={location}
                    onChange={handleLocationChange}
                  />
                </div>
                <div className="form-fees">
                  <label>Fees:</label>
                  <div className="form-fees__icon">
                    <input type="text" value={fee} onChange={handleFeeChange} />
                  </div>
                </div>
                <div className="form-time">
                  <label>Time:</label>
                  <TimePicker
                    onChange={handleStartTimeChange}
                    value={startTime}
                  />
                  <label className="to">to</label>
                  <TimePicker onChange={handleEndTimeChange} value={endTime} />
                </div>
              </div>
              <div className="form-content__checkbox">
                <div>
                  <input type="checkbox" onClick={isMultiDayEvent} />
                  <label>Multi-day Event?</label>
                </div>
                <div className="form-content__checkbox-calendar">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => onStartDateChange(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Start Date"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => onEndDateChange(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="End Date"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button button-primary button-submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
