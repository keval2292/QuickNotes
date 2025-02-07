import React, { useContext } from 'react';
import NoteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion'; // Import Framer Motion

const Alert = (props) => {
    const { alert } = useContext(NoteContext);

    // If the alert is not visible, return null
    if (!alert.show) return null;

    // Define animation variants for the alert
    const alertVariants = {
        hidden: { opacity: 0, y: -20 }, // Start above the screen with no opacity
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // Fade in and slide down
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }, // Fade out and slide up when dismissed
    };

    // Dynamically determine the alert class based on type
    const alertClass = `alert alert-${alert.type} alert-dismissible fade show shadow-lg rounded-3 d-flex align-items-center justify-content-between m-1`;

    return (
        <motion.div
            className={alertClass}
            role="alert"
            variants={alertVariants} // Apply animation variants
            initial="hidden" // Start in the hidden state
            animate="visible" // Animate to the visible state
            exit="exit" // Exit animation when the component unmounts
        >
            <div className="d-flex align-items-center justify-content-center w-100">
                {/* Icon based on alert type */}
                {alert.type === 'success' && (
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                )}
                {alert.type === 'danger' && (
                    <i className="bi bi-x-circle-fill text-danger me-2"></i>
                )}
                {alert.type === 'warning' && (
                    <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                )}
                {alert.type === 'info' && (
                    <i className="bi bi-info-circle-fill text-info me-2"></i>
                )}
                {/* Alert message */}
                <span className="fw-semibold me-auto">{alert.message}</span>
            </div>
        </motion.div>
    );
};

export default Alert;