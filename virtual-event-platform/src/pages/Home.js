import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setConferences([
        {
          id: 1,
          title: "Annual Tech Summit 2025",
          date: "June 10-12, 2025",
          location: "Hyderabad International Convention Center",
          organizer: "TechLeaders Association",
          category: "Technology",
          image: "https://img.freepik.com/free-vector/technology-conference-bannertemplate_1361-2226.jpg"
        },
        {
          id: 2,
          title: "Healthcare Innovation Conference",
          date: "June 18-20, 2025",
          location: "Taj Conference Center, Mumbai",
          organizer: "Health Innovations India",
          category: "Healthcare",
          image: "https://img.freepik.com/free-psd/gradient-medical-care-facebook-template_23-2150514853.jpg"
        },
        {
          id: 3,
          title: "Financial Markets Summit",
          date: "July 5-7, 2025",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          image: "https://img.freepik.com/free-vector/financial-business-world-successful-management-concept_1284-5601.jpg"
        },
        {
          id: 4,
          title: "Future Economics Conference",
          date: "July 5-7, 2025",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          image: "https://img.freepik.com/premium-psd/elegant-black-gold-theme-digital-marketing-live-webinar-social-media-post-template_236275-328.jpg"
        },
        {
            id: 5,
            title: "Pune JavaScript Developers",
            date: "April 20, 2025",
            time: "6:00 PM - 8:00 PM",
            location: "Workspaces Co., Koregaon Park",
            organizer: "Pune JS Community",
            category: "Technology",
            image: "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149195110.jpg"
          },
          {
            id: 6,
            title: "Book Lovers Club Meetup",
            date: "April 25, 2025",
            time: "5:00 PM - 7:00 PM",
            location: "Cafe Reading Room, Aundh",
            organizer: "Pune Readers Circle",
            category: "Books & Literature",
            image: "https://img.freepik.com/free-vector/hand-drawn-book-club-youtube-thumbnail_23-2149702259.jpg"
          },
          {
            id: 7,
            title: "Entrepreneurship Networking",
            date: "May 2, 2025",
            time: "7:00 PM - 9:00 PM",
            location: "Business Hub, Viman Nagar",
            organizer: "Startup Catalysts",
            category: "Business",
            image: "https://img.freepik.com/free-vector/flat-design-business-workshop-youtube-thumbnail-template_23-2149393100.jpg"
          },
          {
            id: 8,
            title: "Finance Management",
            date: "May 2, 2025",
            time: "7:00 PM - 9:00 PM",
            location: "Business Hub, Viman Nagar",
            organizer: "Startup Catalysts",
            category: "Business",
            image: "https://img.freepik.com/free-psd/financial-management-concept_23-2151964759.jpg"
          },
          {
            id: 9,
            title: "Modern Web Development",
            date: "May 15, 2025",
            time: "10:00 AM - 12:00 PM",
            organizer: "Tech Solutions Inc.",
            category: "Technology",
            image: "https://img.freepik.com/free-vector/advertising-agency-webinar-template_23-2150034479.jpg"
          },
          {
            id: 10,
            title: "Data Science for Beginners",
            date: "May 20, 2025",
            time: "2:00 PM - 4:00 PM",
            organizer: "DataMinds Academy",
            category: "Education",
            image: "https://img.freepik.com/free-vector/data-analysis-template-design_23-2150713832.jpg"
          },
          {
            id: 11,
            title: "Digital Marketing Strategies",
            date: "May 25, 2025",
            time: "11:00 AM - 1:00 PM",
            organizer: "Marketing Pro",
            category: "Business",
            image: "https://img.freepik.com/free-vector/webinar-banner-invitation_52683-50986.jpg"
          },
          {
            id: 12,
            title: "Language Learnings",
            date: "May 27, 2025",
            time: "11:00 AM - 1:00 PM",
            organizer: "Languages Pro",
            category: "Education",
            image: "https://img.freepik.com/free-psd/flat-design-language-learning-facebook-template_23-2150550297.jpg"
          }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleRegister = (id) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents(prev => [...prev, id]);
    }
  };

  const handleImageClick = (conference) => {
    if (registeredEvents.includes(conference.id)) {
      setSelectedEvent(conference);
    }
  };

  if (selectedEvent) {
    return (
      <div className="page-container">
        <EventDetail event={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Home</h1>
        <p>Discover upcoming all industry/ industry/ technological events</p>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading conferences...</div>
        ) : (
          conferences.map(conference => (
            <div className="event-card" key={conference.id}>
              <div className="event-image">
                <img
                  src={conference.image}
                  alt={conference.title}
                  onClick={() => handleImageClick(conference)}
                  style={{ cursor: registeredEvents.includes(conference.id) ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{conference.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {conference.date}</p>
                  <p><span>Location:</span> {conference.location}</p>
                  <p><span>Organizer:</span> {conference.organizer}</p>
                  <p><span>Category:</span> {conference.category}</p>
                </div>
                {registeredEvents.includes(conference.id) ? (
                  <div className="register-button done">Registered</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegister(conference.id)}
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Conferences;
