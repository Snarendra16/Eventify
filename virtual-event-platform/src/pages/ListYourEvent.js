import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PagesStyles.css';

function ListYourEvent() {
  const navigate = useNavigate();
  
  const handleCreateEvent = () => {
    navigate('/create-event');
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>List Your Event</h1>
        <p>Reach thousands of potential attendees by listing your event on BookMyEvent</p>
      </div>
      
      <div className="list-event-promo">
        <h2>Why list with BookMyEvent?</h2>
        <p>BookMyEvent is India's leading platform for event discovery and registration. Whether you're organizing a webinar, conference, or local meetup, we can help you reach your target audience and maximize attendance.</p>
        
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Wide Reach</h3>
            <p>Connect with thousands of potential attendees across India</p>
          </div>
          <div className="benefit-item">
            <h3>Easy Management</h3>
            <p>Manage registrations, payments, and communications in one place</p>
          </div>
          <div className="benefit-item">
            <h3>Powerful Analytics</h3>
            <p>Track registrations and gain insights about your audience</p>
          </div>
          <div className="benefit-item">
            <h3>Promotional Tools</h3>
            <p>Leverage our marketing tools to promote your event effectively</p>
          </div>
        </div>
        
        <button className="create-event-button" onClick={handleCreateEvent}>
          Create Event Now
        </button>
      </div>
      
      <div className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">Free</div>
            <ul className="features-list">
              <li>List your event on the platform</li>
              <li>Basic registration management</li>
              <li>Up to 50 attendees</li>
              <li>Email support</li>
            </ul>
            <button className="pricing-button">Choose Basic</button>
          </div>
          
          <div className="pricing-card featured">
            <div className="featured-tag">Most Popular</div>
            <h3>Professional</h3>
            <div className="price">₹999<span>/event</span></div>
            <ul className="features-list">
              <li>All Basic features</li>
              <li>Featured listing on homepage</li>
              <li>Up to 500 attendees</li>
              <li>Custom registration forms</li>
              <li>Priority support</li>
            </ul>
            <button className="pricing-button">Choose Professional</button>
          </div>
          
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">₹2499<span>/event</span></div>
            <ul className="features-list">
              <li>All Professional features</li>
              <li>Unlimited attendees</li>
              <li>Advanced analytics</li>
              <li>Dedicated account manager</li>
              <li>API access</li>
            </ul>
            <button className="pricing-button">Choose Enterprise</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListYourEvent;