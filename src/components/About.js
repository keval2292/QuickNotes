import React, { useEffect } from 'react';

const About = () => {

  // Simple fade-in effect for the page content
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
      el.classList.add('animate__animated', 'animate__fadeIn');
    });
  }, []);

  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="text-center mb-5 fade-in animate__delay-1s">
        <h1 className="display-4 text-color">About Us</h1>
        <p className="lead text-muted">Welcome to Quick Notes, the simplest and most secure way to organize your daily tasks and ideas in the cloud.</p>
      </div>

      {/* Our Mission Section */}
      <div className="row mb-5">
        
        {/* Our Mission Section with Icon and Text Split */}
        <div className="col-12 mb-4 fade-in animate__delay-2s">
          <div className="card shadow-lg border-light h-100">
            <div className="card-body d-flex">
              {/* Left side: Icon */}
              <div className="d-flex align-items-center justify-content-center" style={{ width: '30%' }}>
                <i className="bi bi-flag-fill text-dark" style={{ fontSize: '3rem' }}></i>
              </div>

              {/* Right side: Text */}
              <div className="d-flex flex-column justify-content-center" style={{ width: '70%' }}>
                <h4 className="card-title text-color">Our Mission</h4>
                <p className="card-text text-muted">
                  Our mission is to provide an easy-to-use, secure platform for managing notes and tasks, where you can create, edit, and store your ideas with peace of mind. 
                  With Quick Notes, you'll never lose track of an important task again.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Quick Notes Section */}
        <div className="col-12 mb-4 fade-in animate__delay-3s">
          <h4 className="text-color text-center mb-4">Why Quick Notes?</h4>
          <div className="row">
            {/* Each "Why Quick Notes" item will be in its own box */}
            <div className="col-md-3 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-rocket-fill text-dark mb-3" style={{ fontSize: '3rem' }} /> {/* Simple and Fast */}
                  <h5><strong>Simple and Fast</strong></h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-cloud-fill text-dark mb-3" style={{ fontSize: '3rem' }} /> {/* Cloud Storage */}
                  <h5><strong>Cloud Storage</strong></h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-shield-lock-fill text-dark mb-3" style={{ fontSize: '3rem' }} /> {/* Top-Notch Security */}
                  <h5><strong>Top-Notch Security</strong></h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-list-check text-dark mb-3" style={{ fontSize: '3rem' }} /> {/* Task Management Made Easy */}
                  <h5><strong>Task Management Made Easy</strong></h5>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Built with React Section */}
      <div className="row mb-5 text-center fade-in animate__delay-4s">
        <div className="col">
          <h2 className="text-color">Built with React.js</h2>
          <p className="lead text-muted">
            Quick Notes is powered by <strong>React.js</strong>, ensuring a fast, responsive, and user-friendly experience. Our app is designed to be lightweight, smooth, and highly performant, with real-time synchronization across devices.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="row mb-5 fade-in animate__delay-5s">
        <div className="col">
          <h4 className="card-title text-color text-center mb-4">Our Values</h4>
          <div className="row">
            {/* Simplicity Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-gear-fill text-dark mb-3" style={{ fontSize: '3rem' }} />
                  <h5><strong>Simplicity</strong></h5>
                  <p className="text-muted text-center">
                    We aim to make task management as simple as possible, so you can focus on what matters most.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-shield-lock-fill text-dark mb-3" style={{ fontSize: '3rem' }} />
                  <h5><strong>Security</strong></h5>
                  <p className="text-muted text-center">
                    Your privacy is our top priority. We implement the highest standards of encryption and data protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Innovation Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-light h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-lightbulb-fill text-dark mb-3" style={{ fontSize: '3rem' }} />
                  <h5><strong>Innovation</strong></h5>
                  <p className="text-muted text-center">
                    We’re constantly improving Quick Notes to meet your evolving needs. Expect new features and enhancements in the future!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="row text-center mt-5 fade-in animate__delay-6s">
        <div className="col">
          <a href="/signup" className="btn btn-dark btn-lg btn-rounded shadow-lg px-4 py-2">
            Get Started Today
          </a>
        </div>
      </div>

    </div>
  );
};

export default About;
