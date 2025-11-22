import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Meeting from './meeting.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const payload = {
  sdkKey: "rAv_eE0WQXeVwuKknVbnSQ",
  sdkSecret: "QjEX2B1ppWhs6W127324v8KE736BV7WB",
  meetingNumber: "89753305986",
  role: 0,
  userName: "Eventizer User",
  userEmail: "user@example.com",
  password: "1rn4rV",
  leaveUrl: "http://localhost:3000/meeting"
};



const root = ReactDOM.createRoot(document.getElementById('root'));
// const router = createBrowserRouter([
//   // {
//   //   path: '/meeting',
//   //   element: <Meeting payload={payload} />
//   // }
// ]);
root.render(
  <GoogleOAuthProvider clientId="294215027727-0pg1fdjv8hen09ikhtf61c5t0tp6mr6p.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);


reportWebVitals();