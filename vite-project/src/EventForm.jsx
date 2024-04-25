import React, { useState,useEffect} from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
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

 

  const [isSubmitted,setisSubmitted]=useState(false);
  const [showPostMessage,setShowPostMessage]=useState(false);

  useEffect(()=>{
    let timeout;
    if(showPostMessage){
      timeout=setTimeout(()=>{
        setShowPostMessage(false);
      },1200);
      console.log("POstmme")

    } 
    return ()=>clearTimeout(timeout);
  },[showPostMessage]);
  const togglePost=()=>{
    setisSubmitted(!isSubmitted);
    setShowPostMessage(true);
  }

  const onSubmit = async (e) => {
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
      formData.append("title", eventName);
      formData.append("description", description);
      formData.append("venue", location);
      formData.append("fees", fee);
      formData.append("start_time", startTime);
      formData.append("end_time", endTime);
      formData.append("start_date", startDate.toISOString().slice(0, 10));
      formData.append("end_date", endDate.toISOString().slice(0, 10));
      formData.append("image", image);
  
      console.log("FormData:", formData); 
      console.log("image:", image); 
      console.log("startDate:", startDate); 
      console.log("endDate:", endDate); 
      console.log("start_time", endTime.toString().slice(16,21))
  
      try {
        const response = await axios.post(
          'http://localhost:8080/event/create',
          formData
        );
        console.log(response.data); 
       
        setisSubmitted(!setisSubmitted);
        setShowPostMessage(true);
      } catch (error) {
        console.error('Error creating event:', error);
       
      }
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
          <button className="btn third" onClick={handleEditPicture} style={{color:'black'}}>
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
                
                <div className="form-content__checkbox-calendar">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => onStartDateChange(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
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
                    id="startdate"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button button-primary button-submit"
              onClick={togglePost}
            >
              Post
            </button>
            {isSubmitted && showPostMessage &&(
              <h1 className="disp">
                Event is add.
              </h1>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
