import React from 'react';
import './PagesStyles.css';

function GiftCards() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gift Cards</h1>
        <p>The perfect gift for event enthusiasts</p>
      </div>
      
      <div className="gift-intro">
        <p>Give the gift of experience with BookMyEvent gift cards. Perfect for birthdays, anniversaries, or corporate gifting. Recipients can use gift cards for any event on our platform, from conferences to webinars to local meetups.</p>
      </div>
      
      <div className="gift-cards-container">
        <div className="gift-card purple">
          <h3>Silver Gift Card</h3>
          <div className="amount">₹1,000</div>
          <p className="description">Perfect for gifting access to multiple webinars or a small local event.</p>
          <button>Buy Now</button>
        </div>
        
        <div className="gift-card gold">
          <h3>Gold Gift Card</h3>
          <div className="amount">₹2,500</div>
          <p className="description">Ideal for conference registrations or multiple event access.</p>
          <button>Buy Now</button>
        </div>
        
        <div className="gift-card blue">
          <h3>Platinum Gift Card</h3>
          <div className="amount">₹5,000</div>
          <p className="description">Premium gift for corporate clients or VIP event access.</p>
          <button>Buy Now</button>
        </div>
      </div>
      
      <div className="custom-amount">
        <h3>Custom Amount</h3>
        <p>Create a gift card with your own amount, from ₹500 to ₹25,000.</p>
        <div className="custom-amount-input">
          <span className="currency">₹</span>
          <input type="number" min="500" max="25000" step="500" placeholder="Enter amount" />
          <button>Create Custom Gift Card</button>
        </div>
      </div>
      
      <div className="gift-info">
        <h3>How It Works</h3>
        <ol>
          <li>Choose a gift card amount or create a custom amount</li>
          <li>Enter recipient details or download a printable gift card</li>
          <li>Complete payment</li>
          <li>Your recipient receives the gift card via email or from you in person</li>
          <li>The recipient redeems the gift card on BookMyEvent during checkout</li>
        </ol>
        <p className="note">All gift cards are valid for 1 year from the date of purchase.</p>
      </div>
    </div>
  );
}

export default GiftCards;