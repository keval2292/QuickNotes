import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate("/Login");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details. Please try again.');
                }

                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                // Handle error gracefully elsewhere, no need to show error in this component
                console.error(err.message);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return (
            <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Format the creation date (assuming `createdAt` is in ISO format)
    const formattedDate = new Date(user.date).toLocaleDateString();
    const avatarText = user.name.charAt(0).toUpperCase();  // Get the first character of the name

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            {/* Avatar */}
                            <div className="profile-avatar">
                                {avatarText}
                            </div>

                            {/* Profile Details */}
                            <h4 className="card-title text-dark text-center d-flex align-items-center justify-content-center">
                                {user.name}
                            </h4>
                            <p className="card-text text-center d-flex align-items-center justify-content-center">
                                {user.email}
                            </p>
                            <p className="text-center text-muted d-flex align-items-center justify-content-center">

                                Member since: {formattedDate}
                            </p>

                            {/* Edit Profile Button */}
                            <div className="text-center mt-4">
                                <Link className="btn btn-dark edit-profile-btn" to="/ProfileUpdate">
                                    <i className="bi bi-pencil" /> {/* Pencil (edit) icon */}
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
