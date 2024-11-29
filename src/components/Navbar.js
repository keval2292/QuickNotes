import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';

const Navbar = () => {
    const host = "http://localhost:5000";
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { setNotes } = useContext(NoteContext);

    const [userName, setUserName] = useState(''); // State to hold user name
    const loggedIn = token !== null;

    // Fetch user details from the backend API
    const getUserDetails = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                }
            });

            if (response.ok) {
                const json = await response.json();
                if (json.user.name) {
                    setUserName(json.user.name); // Set the user name if the response contains the name
                }
            } else {
                console.error('Failed to fetch user details');
                setNotes([]); // Reset notes if there's an error
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            setNotes([]); // Reset notes on error
        }
    }, [setNotes]);

    // Call getUserDetails when the component mounts or when token changes
    useEffect(() => {
        if (loggedIn) {
            getUserDetails();
        }
    }, [loggedIn, getUserDetails]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserName(''); // Reset user name on logout
        navigate('/login');
        setNotes([]);
    };

    // Get the first letter of the user's name
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : ''; // Get the first letter and capitalize it
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-journals me-2"></i>
                    Quick Notes
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`} to="/About">About</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {loggedIn ? (
                            <>
                                <li className="nav-item">

                                    {/* Display initials in a circle */}
                                    <Link to="/Profile" className='nav-link text-light d-flex align-items-center'>
                                        <div className="avatar me-2">
                                            {getInitials(userName)}
                                        </div>
                                        Hello, {userName}
                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link d-flex align-items-center btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link d-flex align-items-center ${location.pathname === '/Login' ? 'active' : ''}`} to="/Login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link d-flex align-items-center ${location.pathname === '/Signup' ? 'active' : ''}`} to="/Signup">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
