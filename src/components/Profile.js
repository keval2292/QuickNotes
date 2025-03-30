import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

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
                const response = await fetch('https://quicknotes-xw3t.onrender.com/api/auth/getuser', {
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
                console.error(err.message);
            }
        };
        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return (
            <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Format the creation date (assuming `createdAt` is in ISO format)
    const formattedDate = new Date(user.date).toLocaleDateString();
    const avatarText = user.name.charAt(0).toUpperCase(); // Get the first character of the name

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const avatarVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: "easeInOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className="container mt-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <motion.div className="card shadow-lg" variants={containerVariants}>
                        <div className="card-body">
                            {/* Avatar */}
                            <motion.div
                                className="profile-avatar d-flex justify-content-center align-items-center"
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    backgroundColor: '#0d6efd',
                                    color: '#fff',
                                    fontSize: '35px',
                                    margin: '0 auto',
                                }}
                                variants={avatarVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {avatarText}
                            </motion.div>
                            {/* Profile Details */}
                            <motion.h4
                                className="card-title text-dark text-center d-flex align-items-center justify-content-center"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {user.name}
                            </motion.h4>
                            <motion.p
                                className="card-text text-center d-flex align-items-center justify-content-center"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {user.email}
                            </motion.p>
                            <motion.p
                                className="text-center text-muted d-flex align-items-center justify-content-center"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                Member since: {formattedDate}
                            </motion.p>
                            {/* Edit Profile Button */}
                            <div className="text-center mt-4">
                                <motion.div
                                    
                                    whileTap="tap"
                                    variants={buttonVariants}
                                >
                                    <Link className="btn btn-dark edit-profile-btn" to="/ProfileUpdate">
                                        <i className="bi bi-pencil" /> {/* Pencil (edit) icon */}
                                        Edit Profile
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;