import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion'; // Import Framer Motion

const Signup = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signup.name || !signup.email || !signup.password || !signup.confirmPassword) {
            setError("Please fill in all fields.");
            showAlert("Please fill in all fields.", 'danger');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signup.email)) {
            setError("Please enter a valid email.");
            showAlert("Please enter a valid email.", 'danger');
            return;
        }
        if (signup.password.length < 5) {
            setError("Password must be at least 5 characters long.");
            showAlert("Password must be at least 5 characters long.", 'danger');
            return;
        }
        if (signup.password !== signup.confirmPassword) {
            setError("Passwords do not match.");
            showAlert("Passwords do not match.", 'danger');
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/createnewuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: signup.name,
                    email: signup.email,
                    password: signup.password
                })
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || "Signup failed.");
            } else {
                setSignup({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                showAlert("Signup successful! Please log in.", 'success');
                navigate("/login");
            }
        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    };

    const itemVariants = {
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
                backgroundColor: '#f4f4f4'
            }}
        >
            {/* Card Animation */}
            <motion.div
                className="card shadow-sm py-3 px-4 mx-1"
                style={{ maxWidth: '600px', width: '100%' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Icon Animation */}
                <motion.div
                    className="text-center mb-1"
                    variants={itemVariants}
                >
                    <i className="bi bi-person-plus-fill" style={{ fontSize: '40px' }}></i>
                </motion.div>

                {/* Title Animation */}
                <motion.h3
                    className="text-center mb-3"
                    variants={itemVariants}
                >
                    Signup
                </motion.h3>

                {/* Error Message Animation */}
                {error && (
                    <motion.div
                        className="alert alert-danger"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={signup.name}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </motion.div>

                    {/* Email Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={signup.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            aria-label="Email address"
                            aria-describedby="basic-addon2"
                        />
                    </motion.div>

                    {/* Password Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon3"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={signup.password}
                            onChange={handleChange}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </motion.div>

                    {/* Confirm Password Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon4"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={signup.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon4"
                        />
                    </motion.div>

                    {/* Button Animation */}
                    <motion.button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </motion.button>
                </form>

                {/* Login Link Animation */}
                <motion.div
                    className="text-center mt-3"
                    variants={itemVariants}
                >
                    <span>Already have an account? </span>
                    <a href="/login" className="text-dark text-decoration-none">
                        Login
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;