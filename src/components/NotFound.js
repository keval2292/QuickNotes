import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-4">
        <div className="card bg-transparent border-0">
          <div className="card-body">
            {/* Animated 404 Text (Looping Animation) */}
            <motion.h1
              className="display-1 text-danger"
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: [0, 10, -10, 0], // Slight rotation effect
                scale: [1, 1.1, 1, 1.1],  // Scale effect
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity, // Infinite animation loop
                repeatDelay: 1, // Delay before repeating
              }}
            >
              404
            </motion.h1>

            <motion.h3
              className="card-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Oops! Page Not Found
            </motion.h3>

            <motion.p
              className="card-text text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Sorry, the page you are looking for might have been moved or doesn't exist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <Link to="/" className="btn btn-primary btn-lg mt-4">
                Go to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
