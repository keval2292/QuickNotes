// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="text-center p-4">
        {/* Card container for the 404 page */}
        <div className="card bg-transparent border-0">
          <div className="card-body">
            {/* The animated 404 header */}
            <h1 className="display-1 text-danger animate__animated animate__bounceIn animate__delay-1s">
              404
            </h1>
            <h3 className="card-title">Oops! Page Not Found</h3>
            <p className="card-text text-muted">
              Sorry, the page you are looking for might have been moved or doesn't exist.
            </p>
            {/* Link to Home */}
            <Link to="/" className="btn btn-primary btn-lg mt-4 animate__animated animate__fadeIn animate__delay-2s">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
