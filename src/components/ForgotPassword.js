import React, { useState, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);  // Destructure showAlert from context
    const [email, setEmail] = useState(""); // Only email required for forgot password
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for empty email field
        if (!email) {
            setError("Please enter your email.");
            showAlert("Please enter your email.", 'danger');
            return;
        }

        setError(""); // Clear any previous error
        setLoading(true); // Start loading

        try {
            const response = await fetch(`${host}/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || "Failed to send password reset link.");
            } else {
                setEmail(""); // Clear email field
                showAlert(json.message, 'success');
                navigate("/login"); // Redirect user to login page after successful submission
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value); // Update email state
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '630px',
                backgroundColor: '#f4f4f4' // Optional: set a background color
            }}
        >
            <div className="card shadow-sm p-4 mx-1" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-1">
                    <i className="bi bi-lock" style={{ fontSize: '40px' }}></i> {/* Bootstrap Icon */}
                </div>
                <h3 className="text-center mb-3">Forgot Password</h3>

                {/* Error Message Display */}
                {error && <div className="alert alert-danger">{error}</div>}

                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                aria-label="Email address"
                                aria-describedby="basic-addon2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
