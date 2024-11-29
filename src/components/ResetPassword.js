import React, { useState, useContext } from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';

const ResetPassword = () => {

    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);
    const { token } = useParams(); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    // Handle password change
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
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

        setError(""); // Clear previous error
        setLoading(true); // Start loading

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
                navigate("/login"); // Redirect user to login page after successful reset
            }
        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '630px',
                backgroundColor: '#f4f4f4'
            }}
        >
            <div className="card shadow-sm p-4 mx-1" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-1">
                    <i className="bi bi-lock" style={{ fontSize: '40px' }}></i>
                </div>
                <h3 className="text-center mb-3">Reset Password</h3>

                {/* Error Message Display */}
                {error && <div className="alert alert-danger">{error}</div>}

                <div>
                    <form onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div className="input-group mb-3">
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
                        </div>

                        {/* Confirm Password */}
                        <div className="input-group mb-3">
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
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Changing..." : "Reset Password"}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-2">
                    <Link to="/login" className="text-dark btn">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
