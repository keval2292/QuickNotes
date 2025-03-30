import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion'; // Import Framer Motion

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const host = "https://quicknotes-xw3t.onrender.com";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/Login");
                }
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });
                const json = await response.json();
                if (!response.ok) {
                    throw new Error(json.error || "Failed to fetch user data.");
                }
                setUserData({
                    name: json.user.name || '',
                    email: json.user.email || '',
                    password: '',
                    confirmPassword: '',
                });
            } catch (err) {
                setError(err.message);
                showAlert(err.message, 'danger');
            }
        };
        fetchUserData();
    }, [showAlert, navigate]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setError("Please enter a valid email.");
            return;
        }

        if (userData.password && userData.password.length < 5) {
            setError("Password must be at least 5 characters long.");
            return;
        }

        if (userData.password && userData.password !== userData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError('');
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/updateuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                }),
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || "Profile update failed.");
            } else {
                showAlert("Profile updated successfully!", 'success');
                navigate("/Profile");
            }
        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '680px',
                backgroundColor: '#f4f4f4',
            }}
        >
            {/* Animate the Card */}
            <motion.div
                className="card shadow-sm py-3 px-4 mx-1"
                style={{ maxWidth: '600px', width: '100%' }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center mb-1">
                    <i className="bi bi-person-circle" style={{ fontSize: '40px' }}></i>
                </div>
                <h3 className="text-center mb-3">Update Profile</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {/* Animate Input Fields */}
                    <motion.div className="input-group mb-3" variants={inputVariants} initial="hidden" animate="visible">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name || ""}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </motion.div>
                    <motion.div className="input-group mb-3" variants={inputVariants} initial="hidden" animate="visible">
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userData.email || ""}
                            onChange={handleChange}
                            placeholder="Email"
                            aria-label="Email address"
                            aria-describedby="basic-addon2"
                            required
                        />
                    </motion.div>
                    <motion.div className="input-group mb-3" variants={inputVariants} initial="hidden" animate="visible">
                        <span className="input-group-text" id="basic-addon3"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={userData.password || ""}
                            onChange={handleChange}
                            placeholder="New Password (optional)"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </motion.div>
                    <motion.div className="input-group mb-3" variants={inputVariants} initial="hidden" animate="visible">
                        <span className="input-group-text" id="basic-addon4"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={userData.confirmPassword || ""}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon4"
                            required={userData.password.length > 0}
                        />
                    </motion.div>
                    {/* Animate the Button */}
                    <motion.button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </motion.button>
                </form>
                <div className="text-center mt-3">
                    <span>Want to go back to your profile? </span>
                    <Link to="/profile" className="text-dark text-decoration-none">
                        View Profile
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileUpdate;