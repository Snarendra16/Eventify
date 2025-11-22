import React, { useState } from 'react';
import './RecordedVideos.css';

function RecordedVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "JavaScript Fundamentals Workshop",
      thumbnail: "/images/shreya.jpg",
      videoPath: "/videos/video1.mp4", 
      date: "January 10, 2025",
      duration: "1:45:30",
      organizer: "Pune JS Community",
      category: "Technology"
    },
    {
      id: 2,
      title: "Personal Finance Workshop",
      thumbnail: "/images/narendra.jpg",
      videoPath: "/videos/video2.mp4",
      date: "January 15, 2025",
      duration: "1:20:00",
      organizer: "Narendra Saraf",
      category: "Financial Experts Guild"
    },
    {
      id: 3,
      title: "Flask Project Building session",
      thumbnail: "/images/me2.jpg",
      videoPath: "/videos/video3.mp4",
      date: "February 22, 2025",
      duration: "0:10:15",
      organizer: "Ayush Dayal",
      category: "Web Development"
    },
    {
      id: 4,
      title: "App Tour",
      thumbnail: "/images/pranav.jpg",
      videoPath: "/videos/video4.mp4",
      date: "April 28, 2025",
      duration: "1:30:45",
      organizer: "Pranav Attarde",
      category: "Guidence"
    }
  ];

  const playVideo = (id) => setActiveVideo(id);
  const closeVideo = () => setActiveVideo(null);

  const currentVideo = videos.find(video => video.id === activeVideo);

  return (
    <div className="recorded-videos-container">
      <h1 className="page-title">Recorded Videos</h1>
      <p className="page-subtitle">Watch recordings of our past events</p>

      {activeVideo && currentVideo && (
        <div className="video-player-overlay">
          <div className="video-player-container">
            <button className="close-video-btn" onClick={closeVideo}>×</button>
            <video
              controls
              autoPlay
              width="100%"
              height="100%"
              src={currentVideo.videoPath}
              crossOrigin="anonymous"
              onError={(e) => {
                console.error("Video error:", e);
                alert("Error loading video. Please check the path or try again later.");
              }}
            />
          </div>
        </div>
      )}

      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thumbnail-img"
                onError={(e) => {
                  e.target.src = "/images/default-thumbnail.jpg"; // optional fallback
                }}
              />
              <div className="video-duration">{video.duration}</div>
            </div>
            <h3 className="video-title">{video.title}</h3>
            <div className="video-details">
              <div className="detail-row"><strong>Date:</strong> {video.date}</div>
              <div className="detail-row"><strong>Organizer:</strong> {video.organizer}</div>
              <div className="detail-row"><strong>Category:</strong> {video.category}</div>
            </div>
            <button className="play-button" onClick={() => playVideo(video.id)}>
              Play Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordedVideos;
