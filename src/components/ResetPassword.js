import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion'; // Import Framer Motion

const ResetPassword = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            setError("Please fill in both password fields.");
            showAlert("Please fill in both password fields.", 'danger');
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            showAlert("Passwords do not match.", 'danger');
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/resetpassword/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || "Failed to reset password.");
            } else {
                showAlert(json.message, 'success');
                localStorage.removeItem('token');
                navigate("/login");
            }
        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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
                height: '630px',
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
                    Reset Password
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
                    {/* New Password Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-lock"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            aria-label="New Password"
                            aria-describedby="basic-addon2"
                        />
                    </motion.div>

                    {/* Confirm Password Field Animation */}
                    <motion.div className="input-group mb-3" variants={itemVariants}>
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-lock"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
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
                        {loading ? "Changing..." : "Reset Password"}
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

export default ResetPassword;