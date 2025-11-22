import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Webinars() {
  const [webinars, setWebinars] = useState([]);
  const [filteredWebinars, setFilteredWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredWebinars, setRegisteredWebinars] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    date: 'All Dates',
    price: 'Price - Any'
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('registeredWebinars')) || {};
    setRegisteredWebinars(saved);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const predefinedWebinars = [
        {
          id: 1,
          title: "Modern Web Development",
          date: "2025-05-15",
          time: "10:00 AM - 12:00 PM",
          organizer: "Tech Solutions Inc.",
          category: "Technology",
          price: 0,
          image: "https://img.freepik.com/free-vector/advertising-agency-webinar-template_23-2150034479.jpg"
        },
        {
          id: 2,
          title: "Data Science for Beginners",
          date: "2025-05-20",
          time: "2:00 PM - 4:00 PM",
          organizer: "DataMinds Academy",
          category: "Education",
          price: 100,
          image: "https://img.freepik.com/free-vector/data-analysis-template-design_23-2150713832.jpg"
        },
        {
          id: 3,
          title: "Digital Marketing Strategies",
          date: "2025-05-25",
          time: "11:00 AM - 1:00 PM",
          organizer: "Marketing Pro",
          category: "Business",
          price: 0,
          image: "https://img.freepik.com/free-vector/webinar-banner-invitation_52683-50986.jpg"
        },
        {
          id: 4,
          title: "Language Learnings",
          date: "2025-05-27",
          time: "11:00 AM - 1:00 PM",
          organizer: "Languages Pro",
          category: "Education",
          price: 0,
          image: "https://img.freepik.com/free-psd/flat-design-language-learning-facebook-template_23-2150550297.jpg"
        }
      ];

      const storedWebinars = JSON.parse(localStorage.getItem('Webinar')) || [];
      const allWebinars = [...predefinedWebinars, ...storedWebinars];
      const uniqueWebinars = Array.from(new Map(allWebinars.map(w => [w.id, w])).values());

      setWebinars(uniqueWebinars);
      setFilteredWebinars(uniqueWebinars);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...webinars];

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(w => w.category === filters.category);
    }

    if (filters.date !== 'All Dates') {
      const today = new Date();
      filtered = filtered.filter(w => {
        const eventDate = new Date(w.date);
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

    if (filters.price !== 'Price - Any') {
      filtered = filtered.filter(w => {
        if (filters.price === 'Free') return w.price === 0;
        if (filters.price === 'Paid') return w.price > 0;
        return true;
      });
    }

    setFilteredWebinars(filtered);
  }, [filters, webinars]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = (id) => {
    const updated = { ...registeredWebinars, [id]: true };
    setRegisteredWebinars(updated);
    localStorage.setItem('registeredWebinars', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = webinars.filter(w => w.id !== id);
    setWebinars(updated);
    localStorage.setItem('Webinar', JSON.stringify(updated.filter(w => w.createdByUser)));
  };

  const handleImageClick = (webinar) => {
    if (registeredWebinars[webinar.id]) {
      setSelectedEvent(webinar);
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
        <h1>Webinars</h1>
        <p>Find and join online webinars on various topics</p>
      </div>

      <div className="filters">
        <select className="filter-select" name="category" value={filters.category} onChange={handleFilterChange}>
          <option>All Categories</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Education</option>
          <option>Health</option>
        </select>

        <select className="filter-select" name="date" value={filters.date} onChange={handleFilterChange}>
          <option>All Dates</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Weekend</option>
          <option>This Month</option>
        </select>

        <select className="filter-select" name="price" value={filters.price} onChange={handleFilterChange}>
          <option>Price - Any</option>
          <option>Free</option>
          <option>Paid</option>
        </select>

        <button className="filter-button" onClick={() => setFilteredWebinars(webinars)}>Reset Filters</button>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading webinars...</div>
        ) : (
          filteredWebinars.map(webinar => (
            <div className="event-card" key={webinar.id}>
              <div className="event-image">
                <img
                  src={webinar.image || '/placeholder.jpg'}
                  alt={webinar.title}
                  onClick={() => handleImageClick(webinar)}
                  style={{ cursor: registeredWebinars[webinar.id] ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{webinar.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {new Date(webinar.date).toLocaleDateString()}</p>
                  <p><span>Time:</span> {webinar.time}</p>
                  <p><span>Organizer:</span> {webinar.organizer}</p>
                  <p><span>Category:</span> {webinar.category}</p>
                  <p><span>Price:</span> {webinar.price === 0 ? 'Free' : `${webinar.price} ₹`}</p>
                </div>
                {registeredWebinars[webinar.id] ? (
                  <div className="register-button done">Registered</div>
                ) : (
                  <button className="register-button" onClick={() => handleRegisterClick(webinar.id)}>
                    Register Now
                  </button>
                )}
                {webinar.createdByUser && (
                  <button className="theme-delete-button" onClick={() => handleDelete(webinar.id)}>
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

export default Webinars;