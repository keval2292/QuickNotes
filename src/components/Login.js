import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';  // Import context

const Login = () => {
    const navigate = useNavigate();
    const { showAlert ,getNotes } = useContext(NoteContext);  // Destructure showAlert from context
    const [login, setLogin] = useState({ email: "", password: "" });
    const [error, setError] = useState("");  
    const [loading, setLoading] = useState(false); 
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for empty email and password
        if (!login.email || !login.password) {
            setError("Please fill in both fields.");
            showAlert("Please fill in both fields.", 'danger');
            return;
        }

        setError(""); // Clear any previous error
        setLoading(true); // Start loading

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
            showAlert(error.message, 'danger'); // Trigger error alert
        } finally {
            setLoading(false); 
        }
    };

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
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
                    <i className="bi bi-person" style={{ fontSize: '40px' }}></i> {/* Bootstrap Icon */}
                </div>
                <h3 className="text-center mb-3">Login</h3>

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
                                value={login.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                aria-label="Email address"
                                aria-describedby="basic-addon2"
                            />
                        </div>

                        <div className="input-group mb-3">
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
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-2">
                    <Link to="/ForgotPassword" className="text-dark btn">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
