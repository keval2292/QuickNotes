import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion'; // Import Framer Motion

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);
    const [email, setEmail] = useState(""); // Only email required for forgot password
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email.");
            showAlert("Please enter your email.", 'danger');
            return;
        }
        setError(""); // Clear any previous error
        setLoading(true); // Start loading
        try {
            const response = await fetch(`${host}/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || "Failed to send password reset link.");
            } else {
                setEmail(""); // Clear email field
                showAlert(json.message, 'success');
                navigate("/login"); // Redirect user to login page after successful submission
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value); // Update email state
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '880px',
                backgroundColor: '#f4f4f4'
            }}
        >
            {/* Card Animation */}
            <motion.div
                className="card shadow-sm p-4 mx-1"
                style={{ maxWidth: '450px', width: '100%' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Icon Animation */}
                <motion.i
                    className="bi bi-lock text-center mb-1 d-block"
                    style={{ fontSize: '40px' }}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 15 }} // Rotate slightly on hover
                    transition={{ type: 'spring', stiffness: 300 }}
                />

                {/* Title Animation */}
                <motion.h3
                    className="text-center mb-3"
                    variants={itemVariants}
                >
                    Forgot Password
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
                    {/* Email Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            aria-label="Email address"
                            aria-describedby="basic-addon2"
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
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                </form>

                {/* Back to Login Link Animation */}
                <motion.div
                    className="text-center mt-2"
                    variants={itemVariants}
                >
                    <Link to="/login" className="text-dark btn">
                        Back to Login
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ForgotPasswordForm;