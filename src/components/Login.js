import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { showAlert, getNotes } = useContext(NoteContext);
    const [login, setLogin] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "https://quicknotes-xw3t.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login.email || !login.password) {
            setError("Please fill in both fields.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: login.email, password: login.password })
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || "Login failed.");
            } else {
                setLogin({ email: "", password: "" });
                localStorage.setItem('token', json.authtoken);
                showAlert('Login successful!', 'success');
                navigate("/");
                getNotes();
            }
        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
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
                    className="bi bi-person text-center mb-1 d-block"
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
                    Login
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
                            value={login.email}
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
                            value={login.password}
                            onChange={handleChange}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
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
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                {/* Forgot Password Link Animation */}
                <motion.div
                    className="text-center mt-2"
                    variants={itemVariants}
                >
                    <Link to="/ForgotPassword" className="text-dark btn">
                        Forgot Password?
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;