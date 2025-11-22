

import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredConferences, setRegisteredConferences] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    date: 'All Dates',
    price: 'Price - Any',
  });

  useEffect(() => {
    setTimeout(() => {
      const predefinedConferences = [
        {
          id: 1,
          title: "Annual Tech Summit 2025",
          date: "2025-06-10",
          time: "9:00 AM - 5:00 PM",
          location: "Hyderabad International Convention Center",
          organizer: "TechLeaders Association",
          category: "Technology",
          price: 0,
          image: "https://img.freepik.com/free-vector/technology-conference-bannertemplate_1361-2226.jpg"
        },
        {
          id: 2,
          title: "Healthcare Innovation Conference",
          date: "2025-06-18",
          time: "10:00 AM - 4:00 PM",
          location: "Taj Conference Center, Mumbai",
          organizer: "Health Innovations India",
          category: "Healthcare",
          price: 100,
          image: "https://img.freepik.com/free-psd/gradient-medical-care-facebook-template_23-2150514853.jpg"
        },
        {
          id: 3,
          title: "Financial Markets Summit",
          date: "2025-07-05",
          time: "11:00 AM - 6:00 PM",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          price: 200,
          image: "https://img.freepik.com/free-vector/financial-business-world-successful-management-concept_1284-5601.jpg"
        },
        {
          id: 4,
          title: "Future Economics Conference",
          date: "2025-07-05",
          time: "2:00 PM - 8:00 PM",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          price: 0,
          image: "https://img.freepik.com/premium-psd/elegant-black-gold-theme-digital-marketing-live-webinar-social-media-post-template_236275-328.jpg"
        }
      ];

      const storedConferences = JSON.parse(localStorage.getItem('Conference')) || [];
      const allConferences = [...predefinedConferences, ...storedConferences];
      const uniqueConferences = Array.from(new Map(allConferences.map(e => [e.id, e])).values());

      setConferences(uniqueConferences);
      setFilteredConferences(uniqueConferences);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...conferences];

    // Filter by category
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(c => c.category === filters.category);
    }

    // Filter by date
    if (filters.date !== 'All Dates') {
      const today = new Date();
      filtered = filtered.filter(c => {
        const eventDate = new Date(c.date);
        if (filters.date === 'Today') {
          return eventDate.toDateString() === today.toDateString();
        } else if (filters.date === 'Tomorrow') {
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return eventDate.toDateString() === tomorrow.toDateString();
        } else if (filters.date === 'This Weekend') {
          const day = today.getDay();
          const weekendStart = new Date(today);
          weekendStart.setDate(today.getDate() + (5 - day));
          const weekendEnd = new Date(weekendStart);
          weekendEnd.setDate(weekendStart.getDate() + 2);
          return eventDate >= weekendStart && eventDate <= weekendEnd;
        } else if (filters.date === 'This Month') {
          return eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    // Filter by price
    if (filters.price !== 'Price - Any') {
      filtered = filtered.filter(c => {
        if (filters.price === 'Free') return c.price === 0;
        if (filters.price === 'Paid') return c.price > 0;
        return true;
      });
    }

    setFilteredConferences(filtered);
  }, [filters, conferences]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = (id) => {
    setRegisteredConferences(prev => ({ ...prev, [id]: true }));
  };

  const handleDelete = (id) => {
    const updated = conferences.filter(c => c.id !== id);
    setConferences(updated);
    localStorage.setItem('Conference', JSON.stringify(updated));
  };

  const handleImageClick = (conference) => {
    if (registeredConferences[conference.id]) {
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
        <h1>Conferences</h1>
        <p>Explore upcoming conferences and events</p>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option>All Categories</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Education</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>

        <select
          className="filter-select"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        >
          <option>All Dates</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Weekend</option>
          <option>This Month</option>
        </select>

        <select
          className="filter-select"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
        >
          <option>Price - Any</option>
          <option>Free</option>
          <option>Paid</option>
        </select>

        <button className="filter-button" onClick={() => setFilteredConferences(conferences)}>
          Reset Filters
        </button>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading conferences...</div>
        ) : (
          filteredConferences.map(conference => (
            <div className="event-card" key={conference.id}>
              <div className="event-image">
                <img
                  src={conference.image || '/placeholder.jpg'}
                  alt={conference.title}
                  onClick={() => handleImageClick(conference)}
                  style={{ cursor: registeredConferences[conference.id] ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{conference.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {new Date(conference.date).toLocaleDateString()}</p>
                  <p><span>Time:</span> {conference.time || 'N/A'}</p>
                  <p><span>Location:</span> {conference.location}</p>
                  <p><span>Organizer:</span> {conference.organizer}</p>
                  <p><span>Category:</span> {conference.category}</p>
                  <p><span>Price:</span> {conference.price === 0 ? 'Free' : `${conference.price} ₹`}</p>
                </div>
                {registeredConferences[conference.id] ? (
                  <div className="register-button done">Reegistered</div>
                ) : (
                  <button className="register-button" onClick={() => handleRegisterClick(conference.id)}>
                    Register Now
                  </button>
                )}
                {conference.createdByUser && (
                  <button className="theme-delete-button" onClick={() => handleDelete(conference.id)}>
                    Delete
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
