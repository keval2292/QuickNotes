import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const About = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    };

    const cardHoverVariants = {
        hover: { scale: 1.03, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" },
        tap: { scale: 0.97 },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className="container my-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div className="text-center mb-5" variants={itemVariants}>
                <h1 className="display-4 text-color">About Us</h1>
                <p className="lead text-muted">
                    Welcome to Quick Notes, the simplest and most secure way to organize your daily tasks and ideas in the cloud.
                </p>
            </motion.div>

            {/* Our Mission Section */}
            <motion.div className="row mb-5" variants={containerVariants}>
                <motion.div className="col-12 mb-4" variants={itemVariants}>
                    <motion.div
                        className="card shadow-lg border-light h-100"
                        variants={cardHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className="card-body d-flex">
                            {/* Left side: Icon */}
                            <motion.div
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: '30%' }}
                                variants={iconVariants}
                            >
                                <i className="bi bi-flag-fill text-dark" style={{ fontSize: '3rem' }}></i>
                            </motion.div>
                            {/* Right side: Text */}
                            <div className="d-flex flex-column justify-content-center" style={{ width: '70%' }}>
                                <h4 className="card-title text-color">Our Mission</h4>
                                <p className="card-text text-muted">
                                    Our mission is to provide an easy-to-use, secure platform for managing notes and tasks, where you can create,
                                    edit, and store your ideas with peace of mind. With Quick Notes, you'll never lose track of an important task again.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Why Quick Notes Section */}
            <motion.div className="row mb-5" variants={containerVariants}>
                <motion.h4 className="text-color text-center mb-4" variants={itemVariants}>
                    Why Quick Notes?
                </motion.h4>
                <div className="row">
                    {/* Each "Why Quick Notes" item will be in its own box */}
                    {[
                        { icon: 'bi-rocket-fill', title: 'Simple and Fast' },
                        { icon: 'bi-cloud-fill', title: 'Cloud Storage' },
                        { icon: 'bi-shield-lock-fill', title: 'Top-Notch Security' },
                        { icon: 'bi-list-check', title: 'Task Management Made Easy' },
                    ].map((item, index) => (
                        <motion.div key={index} className="col-md-3 mb-4" variants={itemVariants}>
                            <motion.div
                                className="card shadow-lg border-light h-100"
                                variants={cardHoverVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="card-body d-flex flex-column align-items-center">
                                    <motion.i
                                        className={`bi ${item.icon} text-dark mb-3`}
                                        style={{ fontSize: '3rem' }}
                                        variants={iconVariants}
                                    />
                                    <h5><strong>{item.title}</strong></h5>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Built with React Section */}
            <motion.div className="row mb-5 text-center" variants={itemVariants}>
                <div className="col">
                    <h2 className="text-color">Built with React.js</h2>
                    <p className="lead text-muted">
                        Quick Notes is powered by <strong>React.js</strong>, ensuring a fast, responsive, and user-friendly experience. Our app is
                        designed to be lightweight, smooth, and highly performant, with real-time synchronization across devices.
                    </p>
                </div>
            </motion.div>

            {/* Our Values Section */}
            <motion.div className="row mb-5" variants={containerVariants}>
                <motion.h4 className="card-title text-color text-center mb-4" variants={itemVariants}>
                    Our Values
                </motion.h4>
                <div className="row">
                    {[
                        { icon: 'bi-gear-fill', title: 'Simplicity', description: 'We aim to make task management as simple as possible, so you can focus on what matters most.' },
                        { icon: 'bi-shield-lock-fill', title: 'Security', description: 'Your privacy is our top priority. We implement the highest standards of encryption and data protection.' },
                        { icon: 'bi-lightbulb-fill', title: 'Innovation', description: "We’re constantly improving Quick Notes to meet your evolving needs. Expect new features and enhancements in the future!" },
                    ].map((item, index) => (
                        <motion.div key={index} className="col-md-4 mb-4" variants={itemVariants}>
                            <motion.div
                                className="card shadow-lg border-light h-100"
                                variants={cardHoverVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <div className="card-body d-flex flex-column align-items-center">
                                    <motion.i
                                        className={`bi ${item.icon} text-dark mb-3`}
                                        style={{ fontSize: '3rem' }}
                                        variants={iconVariants}
                                    />
                                    <h5><strong>{item.title}</strong></h5>
                                    <p className="text-muted text-center">{item.description}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Get Started Button */}
            <motion.div className="row text-center mt-5" variants={itemVariants}>
                <div className="col">
                    <motion.a
                        href="/signup"
                        className="btn btn-dark btn-lg btn-rounded shadow-lg px-4 py-2"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Get Started Today
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default About;