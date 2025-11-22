import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaLanguage,
  FaMapMarkerAlt,
  FaCreditCard,
  FaThumbsUp,
} from "react-icons/fa";
import "./EventDetail.css";

function EventDetail({ event }) {
  const navigate = useNavigate();

  if (!event) return null;

  const handleJoinZoom = () => {
    // Navigate to the meeting route passing the necessary meeting data.
    navigate("/meeting", {
      state: {
        meetingNumber: event.meetingNumber,
        // Provide your Zoom SDK credentials here (or from event if available)
        sdkKey: event.sdkKey || "your_sdk_key_here",
        sdkSecret: event.sdkSecret || "your_sdk_secret_here",
        role: event.role || 0,
        userName: "John Doe",
        userEmail: "john@example.com",
        password: event.password,
        leaveUrl: event.leaveUrl || "http://localhost:3000",
      },
    });
  };

  return (
    <div className="event-detail-container">
      <h2 className="event-title">{event.title}</h2>
      <div className="event-main">
        <div className="event-left">
          <img src={event.image} alt={event.title} className="event-banner" />
          <div className="event-about">
            <h3>About The Event</h3>
            <p>~ {event.organizer}</p>
            <p>~ {event.date}</p>
            <p>~ Join us for a deep dive into {event.category} related topics.</p>
            <div className="interested">
              <FaThumbsUp /> 60 Are Interested{" "}
              <button className="btn-interest">I'm Interested</button>
            </div>
          </div>
        </div>
        <div className="event-info-card">
          <p>
            <FaCalendarAlt /> {event.date}
          </p>
          <p>
            <FaClock /> {event.time}
          </p>
          <p>
            <FaUsers /> Age Limit - 16+
          </p>
          <p>
            <FaLanguage /> Hinglish
          </p>
          <p>
            <FaCreditCard /> Mode - Online
          </p>
          <p>
            <FaMapMarkerAlt /> Location: Virtual
          </p>
          <hr />
          <div className="price-section">
            <strong>Available : Join Fast</strong>
            <br />
            {/* <button className="btn-book">JOIN</button> */}
            <button className="btn-book" onClick={handleJoinZoom}>
              JOIN ZOOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
