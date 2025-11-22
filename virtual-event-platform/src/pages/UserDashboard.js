import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PagesStyles.css'; // Assuming we can reuse some styles or create new ones

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ dob: '', password: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditForm({ dob: parsedUser.dob || '', password: '' });

        // Fetch Bookings
        fetchBookings(parsedUser._id);
    }, [navigate]);

    const fetchBookings = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/my-bookings/${userId}`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, editForm);
            const updatedUser = response.data.user;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update profile');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="dashboard-container" style={{ padding: '20px', color: 'white' }}>
            <h1>User Dashboard</h1>

            <div className="profile-section" style={{ marginBottom: '30px', background: '#333', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Profile</h2>
                    <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdate} style={{ marginTop: '15px' }}>
                        <p><strong>Name:</strong> {user.fullName} (Read-only)</p>
                        <p><strong>Email:</strong> {user.email} (Read-only)</p>
                        <div style={{ margin: '10px 0' }}>
                            <label>Date of Birth: </label>
                            <input
                                type="date"
                                value={editForm.dob}
                                onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                            />
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            <label>New Password: </label>
                            <input
                                type="password"
                                placeholder="Leave blank to keep current"
                                value={editForm.password}
                                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            />
                        </div>
                        <button type="submit" style={{ padding: '5px 15px', background: '#28a745', color: 'white', border: 'none' }}>Save Changes</button>
                    </form>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.fullName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phoneNumber}</p>
                        <p><strong>Date of Birth:</strong> {user.dob || 'Not set'}</p>
                    </>
                )}
            </div>

            <div className="bookings-section">
                <h2>My Bookings</h2>
                {bookings.length === 0 ? (
                    <p>No bookings yet.</p>
                ) : (
                    <div className="bookings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {bookings.map((booking) => (
                            <div key={booking._id} className="booking-card" style={{ background: '#444', padding: '15px', borderRadius: '10px' }}>
                                {booking.eventId ? (
                                    <>
                                        <h3>{booking.eventId.eventName}</h3>
                                        <p><strong>Date:</strong> {booking.eventId.startDate}</p>
                                        <p><strong>Venue:</strong> {booking.eventId.venueName || 'Online'}</p>
                                        <p><strong>Status:</strong> {booking.status}</p>
                                        <p><small>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</small></p>
                                    </>
                                ) : (
                                    <p>Event details unavailable</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
