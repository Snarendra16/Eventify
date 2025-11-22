import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [filteredMeetups, setFilteredMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    date: 'All Dates',
    price: 'Price - Any',
  });

  // Load joined events from localStorage on mount
  useEffect(() => {
    const savedJoined = JSON.parse(localStorage.getItem('joinedMeetups')) || [];
    setJoinedEvents(savedJoined);
  }, []);

  // Load dummy meetups data (with price added for filtering)
  useEffect(() => {
    setTimeout(() => {
      const dummyMeetups = [
        {
          id: 1,
          title: "Pune JavaScript Developers",
          date: "2025-04-20",
          time: "18:00 - 20:00",
          location: "Workspaces Co., Koregaon Park",
          organizer: "Pune JS Community",
          category: "Technology",
          price: 0, // Free
          image: "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149195110.jpg"
        },
        {
          id: 2,
          title: "Book Lovers Club Meetup",
          date: "2025-04-25",
          time: "17:00 - 19:00",
          location: "Cafe Reading Room, Aundh",
          organizer: "Pune Readers Circle",
          category: "Books & Literature",
          price: 0, // Free
          image: "https://img.freepik.com/free-vector/hand-drawn-book-club-youtube-thumbnail_23-2149702259.jpg"
        },
        {
          id: 3,
          title: "Entrepreneurship Networking",
          date: "2025-05-02",
          time: "19:00 - 21:00",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
          category: "Business",
          price: 50, // Paid
          image: "https://img.freepik.com/free-vector/flat-design-business-workshop-youtube-thumbnail-template_23-2149393100.jpg"
        },
        {
          id: 4,
          title: "Finance Management",
          date: "2025-05-02",
          time: "19:00 - 21:00",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
          category: "Business",
          price: 100, // Paid
          image: "https://img.freepik.com/free-psd/financial-management-concept_23-2151964759.jpg"
        }
      ];
      setMeetups(dummyMeetups);
      setFilteredMeetups(dummyMeetups);
      setLoading(false);
    }, 800);
  }, []);

  // Update the filteredMeetups whenever filters or meetups change
  useEffect(() => {
    let filtered = [...meetups];

    // Filter by category
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(m => m.category === filters.category);
    }

    // Filter by date
    if (filters.date !== 'All Dates') {
      const today = new Date();
      filtered = filtered.filter(m => {
        const eventDate = new Date(m.date);
        if (filters.date === 'Today') {
          return eventDate.toDateString() === today.toDateString();
        } else if (filters.date === 'Tomorrow') {
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return eventDate.toDateString() === tomorrow.toDateString();
        } else if (filters.date === 'This Weekend') {
          // Assuming weekend as Saturday and Sunday
          const day = today.getDay();
          const weekendStart = new Date(today);
          // Calculate next Saturday (day 6)
          weekendStart.setDate(today.getDate() + ((6 - day + 7) % 7));
          const weekendEnd = new Date(weekendStart);
          weekendEnd.setDate(weekendStart.getDate() + 1);
          return eventDate >= weekendStart && eventDate <= weekendEnd;
        } else if (filters.date === 'This Month') {
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        }
        return true;
      });
    }

    // Filter by price
    if (filters.price !== 'Price - Any') {
      filtered = filtered.filter(m => {
        if (filters.price === 'Free') return m.price === 0;
        if (filters.price === 'Paid') return m.price > 0;
        return true;
      });
    }

    setFilteredMeetups(filtered);
  }, [filters, meetups]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleJoin = (id) => {
    if (!joinedEvents.includes(id)) {
      const updated = [...joinedEvents, id];
      setJoinedEvents(updated);
      localStorage.setItem('joinedMeetups', JSON.stringify(updated));
    }
  };

  const handleImageClick = (meetup) => {
    if (joinedEvents.includes(meetup.id)) {
      setSelectedEvent(meetup);
    }
  };

  if (selectedEvent) {
    return (
      <div className="page-container">
        <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Meetups</h1>
        <p>Connect with like-minded people at local meetups</p>
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
          <option>Books & Literature</option>
          <option>Business</option>
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

        <button className="filter-button" onClick={() => setFilteredMeetups(meetups)}>
          Reset Filters
        </button>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading meetups...</div>
        ) : (
          filteredMeetups.map(meetup => (
            <div className="event-card" key={meetup.id}>
              <div className="event-image">
                <img
                  src={meetup.image || '/placeholder.jpg'}
                  alt={meetup.title}
                  onClick={() => handleImageClick(meetup)}
                  style={{ cursor: joinedEvents.includes(meetup.id) ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{meetup.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {new Date(meetup.date).toLocaleDateString()}</p>
                  <p><span>Time:</span> {meetup.time}</p>
                  <p><span>Location:</span> {meetup.location}</p>
                  <p><span>Organizer:</span> {meetup.organizer}</p>
                  <p><span>Category:</span> {meetup.category}</p>
                  <p><span>Price:</span> {meetup.price === 0 ? 'Free' : `${meetup.price} ₹`}</p>
                </div>
                {joinedEvents.includes(meetup.id) ? (
                  <div className="register-button done">Registered</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleJoin(meetup.id)}
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

export default Meetups;
