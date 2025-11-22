import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Webinars from './pages/Webinars';
import Conferences from './pages/Conferences';
import Meetups from './pages/Meetups';
import ListYourEvent from './pages/ListYourEvent';
import Offers from './pages/Offers';
import GiftCards from './pages/GiftCards';
import Signup from './pages/Signup';
import Login from './pages/Login';

import MyEvents from './pages/MyEvents';
import RecordedVideos from './pages/RecordedVideo';

import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AllEvents from './pages/AllEvents';
import Meeting from './meeting.js'; // ✅ Make sure it's imported once
// import ZoomMeeting from './pages/ZoomMeeting'; // ✅ Make sure it's imported once

import './App.css';

function App() {

  const payload = {
    sdkKey: "rAv_eE0WQXeVwuKknVbnSQ",
    sdkSecret: "QjEX2B1ppWhs6W127324v8KE736BV7WB",
    meetingNumber: "89753305986",
    role: 0,
    userName: "Eventify User",
    userEmail: "user@example.com",
    password: "1rn4rV",
    leaveUrl: "http://localhost:3000/meeting"
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/webinars" element={<ProtectedRoute><Webinars /></ProtectedRoute>} />
            <Route path="/conferences" element={<ProtectedRoute><Conferences /></ProtectedRoute>} />
            <Route path="/meetups" element={<ProtectedRoute><Meetups /></ProtectedRoute>} />
            <Route path="/listyourevent" element={<ProtectedRoute><ListYourEvent /></ProtectedRoute>} />
            <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
            <Route path="/giftcards" element={<ProtectedRoute><GiftCards /></ProtectedRoute>} />
            <Route path="/myevents" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><AllEvents /></ProtectedRoute>} />
            <Route path="/recorded-videos" element={<ProtectedRoute><RecordedVideos /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/meeting" element={<ProtectedRoute><Meeting payload={payload} /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
