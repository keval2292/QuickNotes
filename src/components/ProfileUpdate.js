import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword :''

    });
   
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/Login");
                }
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });

                const json = await response.json();
                if (!response.ok) {
                    throw new Error(json.error || "Failed to fetch user data.");
                }

                setUserData({
                    name: json.user.name,
                    email: json.user.email,
                    password: '', // Don't prefill password
                });
            } catch (err) {
                setError(err.message);
                showAlert(err.message, 'danger');
            }
        };

        fetchUserData();
    }, [showAlert, navigate]);

    // Handle form field changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        // if (!userData.name || !userData.email) {
        //     setError("Please fill in all required fields.");
        //     return;
        // }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setError("Please enter a valid email.");
            return;
        }

        
        if (userData.password && userData.password.length < 5) {
            setError("Password must be at least 5 characters long.");
            return;
        }

        
        if (userData.password && userData.password !== userData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${host}/api/auth/updateuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem('token')}`,
                },

                body: JSON.stringify({name : userData.name , email : userData.email , password : userData.password}),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || "Profile update failed.");
            } else {
                showAlert("Profile updated successfully!", 'success');
                navigate("/Profile");  // Redirect to profile page or another page as required
            }

        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '680px',
                backgroundColor: '#f4f4f4',
            }}
        >
            <div className="card shadow-sm py-3 px-4 mx-1" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="text-center mb-1">
                    <i className="bi bi-person-circle" style={{ fontSize: '40px' }}></i>
                </div>
                <h3 className="text-center mb-3">Update Profile</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name ||""}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            // required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userData.email || ""}
                            onChange={handleChange}
                            placeholder="Email"
                            aria-label="Email address"
                            aria-describedby="basic-addon2"
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={userData.password || ""}
                            onChange={handleChange}
                            placeholder="New Password (optional)"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon4"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            value={userData.confirmPassword || ""}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon4"
                            required={userData.password.length > 0}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span>Want to go back to your profile? </span>
                    <Link to="/profile" className="text-dark text-decoration-none">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
